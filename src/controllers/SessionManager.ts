import { Client } from '../api/Client';
import { create } from './initializer';
import { ev } from './events';
import { ConfigObject } from '../api/model/config';
import { log } from '../logging/logging';
import * as fs from 'fs';
import * as path from 'path';

export interface SessionInstance {
    client: Client | null;
    config: ConfigObject;
    status: 'initializing' | 'qr_ready' | 'authenticated' | 'ready' | 'failed' | 'terminated';
    createdAt: Date;
    lastActivity: Date;
    qrCode?: string; // 存储QR码
    qrCodeUrl?: string; // 存储QR码URL
}

export class SessionManager {
    private sessions: Map<string, SessionInstance> = new Map();
    private defaultConfig: Partial<ConfigObject>;
    private qrPromises: Map<string, { resolve: (qr: string) => void, reject: (error: any) => void }> = new Map();
    private isQRListenerSetup: boolean = false;

    constructor(defaultConfig: Partial<ConfigObject> = {}) {
        this.defaultConfig = defaultConfig;
        this.setupGlobalQRCodeListener();
        this.loadAndRestoreSessions(); // 在构造函数中调用，以恢复现有会话
    }

    /**
     * 在服务启动时，扫描sessions目录，并恢复所有已存在的会话
     */
    public loadAndRestoreSessions(): void {
        const sessionsDir = path.resolve('./sessions');
        if (!fs.existsSync(sessionsDir)) {
            fs.mkdirSync(sessionsDir, { recursive: true });
            return;
        }

        const sessionFolders = fs.readdirSync(sessionsDir).filter(file => 
            fs.statSync(path.join(sessionsDir, file)).isDirectory()
        );
        
        log.info(`Found ${sessionFolders.length} existing session(s) to restore: ${sessionFolders.join(', ')}`);

        sessionFolders.forEach(sessionId => {
            if (!this.sessions.has(sessionId)) {
                log.info(`Restoring session: ${sessionId}`);
                // 使用createSession来恢复，但不等待QR码
                // 这将触发底层的puppeteer来从现有文件中加载会话
                this.createSession(sessionId, {}, false).catch(error => {
                    log.error(`Failed to restore session ${sessionId}:`, error);
                });
            }
        });
    }

    /**
     * 设置全局QR码监听器（只设置一次）
     */
    private setupGlobalQRCodeListener(): void {
        if (this.isQRListenerSetup) return;
        
        log.info('Setting up global QR code listener');
        
        // 监听所有QR码事件 - 按照demo中的确切格式
        ev.on('qr.**', async (qrcode: string, sessionId: string) => {
            log.info(`=== QR CODE EVENT RECEIVED ===`);
            log.info(`Session ID: ${sessionId}`);
            log.info(`QR code length: ${qrcode ? qrcode.length : 'null'}`);
            log.info(`QR code preview: ${qrcode ? qrcode.substring(0, 80) : 'null'}...`);
            
            // 获取session
            const session = this.sessions.get(sessionId);
            if (session) {
                // 存储QR码
                session.qrCode = qrcode;
                session.status = 'qr_ready';
                session.lastActivity = new Date();
                
                log.info(`QR code stored for session: ${sessionId}`);
                
                // 解决等待的Promise
                const promiseHandlers = this.qrPromises.get(sessionId);
                if (promiseHandlers) {
                    log.info(`Resolving QR promise for session: ${sessionId}`);
                    promiseHandlers.resolve(qrcode);
                    this.qrPromises.delete(sessionId);
                    log.info(`QR promise resolved for session: ${sessionId}`);
                }
            } else {
                log.warn(`Unknown session: ${sessionId}`);
            }
        });
        
        // 监听session data事件 - 按照官方文档
        ev.on('sessionData.**', (sessionData: any, sessionId: string) => {
            log.info(`Session data received for: ${sessionId}`);
            const session = this.sessions.get(sessionId);
            if (session) {
                session.lastActivity = new Date();
                log.info(`Session ${sessionId} data updated`);
            }
        });

        // 监听认证成功事件
        ev.on('authenticated.**', (data: any, sessionId: string) => {
            log.info(`Session authenticated: ${sessionId}`);
            const session = this.sessions.get(sessionId);
            if (session) {
                session.status = 'authenticated';
                session.lastActivity = new Date();
                // 清除QR码
                delete session.qrCode;
                delete session.qrCodeUrl;
                log.info(`Session ${sessionId} authenticated, QR code cleared`);
            }
        });

        // 监听连接状态变化
        ev.on('**.**', (data: any, sessionId: string, namespace: string) => {
            if (sessionId && this.sessions.has(sessionId)) {
                log.info(`Event ${namespace} for session ${sessionId}:`, typeof data === 'string' ? data.substring(0, 100) : data);
            }
        });

        this.isQRListenerSetup = true;
        log.info('Global QR code listener setup complete');
    }

    /**
     * 创建新的session并可选择等待QR码
     */
    public async createSession(sessionId: string, config: Partial<ConfigObject> = {}, waitForQR: boolean = false): Promise<{
        success: boolean;
        message: string;
        qrCode?: string;
    }> {
        if (this.sessions.has(sessionId)) {
            throw new Error(`Session ${sessionId} already exists`);
        }

        const sessionConfig: ConfigObject = {
            ...this.defaultConfig,
            ...config,
            sessionId,
            // 强制qrLogSkip为true，以防止在控制台打印QR码
            qrLogSkip: true,
            qrTimeout: config.qrTimeout || 120,
            sessionDataPath: config.sessionDataPath || `./sessions/${sessionId}`,
            port: config.port || this.generateUniquePort(),
        };

        log.info(`Creating session: ${sessionId} with config:`, {
            sessionId,
            qrLogSkip: sessionConfig.qrLogSkip,
            qrTimeout: sessionConfig.qrTimeout,
            multiDevice: sessionConfig.multiDevice,
            waitForQR
        });

        const sessionInstance: SessionInstance = {
            client: null,
            config: sessionConfig,
            status: 'initializing',
            createdAt: new Date(),
            lastActivity: new Date(),
        };
        this.sessions.set(sessionId, sessionInstance);

        // 只有在需要时才等待QR码
        let qrCodePromise: Promise<string | null> | null = null;
        if (waitForQR) {
            qrCodePromise = this.waitForQRCode(sessionId, 35000); // 35秒超时
        }

        // 在后台启动客户端创建
        create(sessionConfig)
            .then(client => {
                log.info(`Client object created for session: ${sessionId}. Session is ready.`);
                sessionInstance.client = client;
                sessionInstance.status = 'ready';
                sessionInstance.lastActivity = new Date();
                this.setupSessionEvents(sessionId, client);
            })
            .catch(error => {
                log.error(`Error during client creation for session ${sessionId}:`, error);
                sessionInstance.status = 'failed';
                
                // 如果有等待的Promise，则拒绝它
                const promiseHandlers = this.qrPromises.get(sessionId);
                if (promiseHandlers) {
                    promiseHandlers.reject(error);
                    this.qrPromises.delete(sessionId);
                }
            });

        log.info(`Client creation for session ${sessionId} has been initiated.`);

        // 如果需要，等待QR码Promise
        if (waitForQR) {
            log.info(`Now waiting for QR code for session ${sessionId}...`);
            try {
                const qrCode = await qrCodePromise;
                if (qrCode) {
                    log.info(`QR code successfully retrieved for session ${sessionId}.`);
                    return {
                        success: true,
                        message: "QR code received.",
                        qrCode,
                    };
                } else {
                    log.warn(`waitForQRCode returned null (timeout) for session ${sessionId}.`);
                    await this.removeSession(sessionId); // 清理失败的会话
                    return {
                        success: false,
                        message: 'Timed out waiting for QR code.',
                    };
                }
            } catch(error) {
                log.error(`Error while waiting for QR code promise for session ${sessionId}:`, error);
                await this.removeSession(sessionId); // 清理失败的会话
                return {
                    success: false,
                    message: `Failed to create session: ${error.message}`,
                };
            }
        } else {
            return {
                success: true,
                message: 'Session creation initiated. Get QR code from the relevant endpoint.',
            };
        }
    }

    /**
     * 等待QR码生成
     */
    async waitForQRCode(sessionId: string, timeout: number = 30000): Promise<string | null> {
        log.info(`=== WAIT FOR QR CODE START ===`);
        log.info(`Session: ${sessionId}, Timeout: ${timeout}ms`);
        
        const session = this.sessions.get(sessionId);
        if (!session) {
            log.error(`Session ${sessionId} not found`);
            throw new Error(`Session ${sessionId} not found`);
        }

        // 如果已经有QR码，直接返回
        if (session.qrCode) {
            log.info(`QR code already available for session: ${sessionId}, returning immediately`);
            return session.qrCode;
        }

        log.info(`Setting up QR code wait for session: ${sessionId}`);

        // 等待QR码生成
        return new Promise((resolve, reject) => {
            log.info(`Setting promise for session: ${sessionId}`);
            this.qrPromises.set(sessionId, { resolve, reject });
            log.info(`Promise set. Current promises: [${Array.from(this.qrPromises.keys()).join(', ')}]`);

            // 设置超时
            setTimeout(() => {
                if (this.qrPromises.has(sessionId)) {
                    log.warn(`=== QR CODE TIMEOUT ===`);
                    log.warn(`Session: ${sessionId} timed out after ${timeout}ms`);
                    this.qrPromises.delete(sessionId);
                    resolve(null);
                } else {
                    log.info(`Timeout check: promise for ${sessionId} already removed (success)`);
                }
            }, timeout);
            
            log.info(`=== WAIT FOR QR CODE SETUP COMPLETE ===`);
        });
    }

    /**
     * 获取session的QR码
     */
    getSessionQRCode(sessionId: string): string | null {
        const session = this.sessions.get(sessionId);
        return session?.qrCode || null;
    }

    /**
     * 获取session
     */
    getSession(sessionId: string): SessionInstance | undefined {
        return this.sessions.get(sessionId);
    }

    getAllSessions(): (Omit<SessionInstance, 'client'> & { sessionId: string })[] {
        const allSessions = [];
        this.sessions.forEach((instance, sessionId) => {
            const { client, ...sessionData } = instance;
            allSessions.push({
                sessionId,
                ...sessionData
            });
        });
        return allSessions;
    }

    /**
     * 获取session的Client实例
     */
    getClient(sessionId: string): Client | undefined {
        const session = this.sessions.get(sessionId);
        return session?.client;
    }

    /**
     * 删除session
     */
    async removeSession(sessionId: string): Promise<boolean> {
        const session = this.sessions.get(sessionId);
        if (!session) {
            return false;
        }

        try {
            if (session.client && session.status === 'ready') {
                await session.client.kill('SESSION_REMOVED');
            }
            
            // 清理QR码Promise
            this.qrPromises.delete(sessionId);
            
            this.sessions.delete(sessionId);
            log.info(`Session ${sessionId} removed successfully`);
            return true;

        } catch (error) {
            log.error(`Failed to remove session ${sessionId}:`, error);
            return false;
        }
    }

    /**
     * 检查session是否存在
     */
    hasSession(sessionId: string): boolean {
        return this.sessions.has(sessionId);
    }

    /**
     * 获取session数量
     */
    getSessionCount(): number {
        return this.sessions.size;
    }

    /**
     * 更新session活动时间
     */
    updateSessionActivity(sessionId: string): void {
        const session = this.sessions.get(sessionId);
        if (session) {
            session.lastActivity = new Date();
        }
    }

    /**
     * 设置session事件监听
     */
    private setupSessionEvents(sessionId: string, client: Client): void {
        // 监听session断开连接
        client.onLogout(() => {
            log.info(`Session ${sessionId} logged out`);
            const session = this.sessions.get(sessionId);
            if (session) {
                session.status = 'terminated';
            }
        });

        // 监听其他重要事件
        client.onMessage(() => {
            this.updateSessionActivity(sessionId);
        });
    }

    /**
     * 生成唯一端口号
     */
    private generateUniquePort(): number {
        const usedPorts = Array.from(this.sessions.values())
            .map(session => session.config.port)
            .filter(port => port !== undefined);

        let port = 8080;
        while (usedPorts.includes(port)) {
            port++;
        }
        return port;
    }

    /**
     * 清理所有session
     */
    async cleanup(): Promise<void> {
        log.info('Cleaning up all sessions...');
        
        // 清理所有QR码Promise
        this.qrPromises.clear();
        
        const cleanupPromises = Array.from(this.sessions.keys()).map(sessionId => 
            this.removeSession(sessionId)
        );
        await Promise.all(cleanupPromises);
        log.info('All sessions cleaned up');
    }
}

// 全局session管理器实例
export const globalSessionManager = new SessionManager(); 