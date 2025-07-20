import { Client } from '../api/Client';
import { create } from './initializer';
import { ev } from './events';
import { ConfigObject } from '../api/model/config';
import { log } from '../logging/logging';
import * as fs from 'fs-extra'; // Use fs-extra for robust file operations
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
        
        log.info(`Found ${sessionFolders.length} session folder(s): ${sessionFolders.join(', ')}`);

        // 验证并恢复有效的会话
        const validSessions: string[] = [];
        const invalidSessions: string[] = [];

        sessionFolders.forEach(sessionId => {
            if (!this.sessions.has(sessionId)) {
                const configPath = path.join(sessionsDir, sessionId, 'config.json');
                
                if (!fs.existsSync(configPath)) {
                    log.warn(`Session ${sessionId} has no config.json, marking as invalid`);
                    invalidSessions.push(sessionId);
                    return;
                }

                try {
                    const configContent = fs.readFileSync(configPath, 'utf-8');
                    const config = JSON.parse(configContent);
                    
                    // 检查配置文件是否有效
                    if (!config || typeof config !== 'object') {
                        throw new Error('Invalid config format');
                    }

                    // 检查是否有必要的字段
                    if (!config.sessionId && !sessionId) {
                        throw new Error('Missing sessionId');
                    }

                    // 确保代理配置被正确恢复
                    if (config.proxyServerCredentials) {
                        log.info(`Session ${sessionId} has proxy config: ${config.proxyServerCredentials.address}`);
                        // 确保启用原生代理模式
                        config.useNativeProxy = true;
                    }

                    log.info(`Restoring valid session: ${sessionId} with config:`, {
                        sessionId,
                        hasProxy: !!config.proxyServerCredentials,
                        proxyAddress: config.proxyServerCredentials?.address,
                        useNativeProxy: config.useNativeProxy
                    });
                    validSessions.push(sessionId);
                    
                    this.createSession(sessionId, config, false).catch(error => {
                        log.error(`Failed to restore session ${sessionId}:`, error);
                        // 如果恢复失败，也将其标记为无效
                        invalidSessions.push(sessionId);
                    });

                } catch (error) {
                    log.error(`Failed to parse config for session ${sessionId}:`, error);
                    invalidSessions.push(sessionId);
                }
            }
        });

        log.info(`Valid sessions to restore: ${validSessions.length} (${validSessions.join(', ')})`);
        
        if (invalidSessions.length > 0) {
            log.warn(`Invalid sessions found: ${invalidSessions.length} (${invalidSessions.join(', ')})`);
            log.info('Cleaning up invalid session directories...');
            
            // 异步清理无效的会话目录
            this.cleanupInvalidSessions(invalidSessions).catch(error => {
                log.error('Error during invalid session cleanup:', error);
            });
        }
    }

    /**
     * 清理无效的会话目录
     */
    private async cleanupInvalidSessions(invalidSessionIds: string[]): Promise<void> {
        const cleanupPromises = invalidSessionIds.map(async sessionId => {
            try {
                log.info(`Cleaning up invalid session: ${sessionId}`);
                const success = await this.forceCleanupSessionFiles(sessionId);
                if (success) {
                    log.info(`Successfully cleaned up invalid session: ${sessionId}`);
                } else {
                    log.warn(`Could not fully clean up invalid session: ${sessionId}`);
                }
            } catch (error) {
                log.error(`Error cleaning up invalid session ${sessionId}:`, error);
            }
        });

        await Promise.all(cleanupPromises);
        log.info('Invalid session cleanup completed');
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
            sessionId,
            // 强制qrLogSkip为true，以防止在控制台打印QR码
            qrLogSkip: true,
            qrTimeout: config.qrTimeout || 120,
            sessionDataPath: config.sessionDataPath || `./sessions/${sessionId}`,
            port: config.port || this.generateUniquePort(),
            // 如果提供了代理，则强制启用原生代理模式
            useNativeProxy: config.useNativeProxy === true, // Only enable if explicitly set to true
            ...config, // 将文件配置放在最后，确保其优先级最高
        };

        console.log('sessionConfig', sessionConfig);

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

        // 保存初始配置
        const sessionDir = path.join('./sessions', sessionId);
        if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, { recursive: true });
        }
        const configPath = path.join(sessionDir, 'config.json');
        fs.writeFileSync(configPath, JSON.stringify(sessionConfig, null, 4));
        log.info(`Initial config for ${sessionId} saved to ${configPath}`);

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
            log.warn(`Session ${sessionId} not found in memory, checking filesystem...`);
            // 即使内存中没有会话，也尝试清理文件系统
            const cleanupSuccess = await this.forceCleanupSessionFiles(sessionId);
            return cleanupSuccess;
        }

        log.info(`Attempting to remove session: ${sessionId}`);

        // 1. Immediately remove the session from the map to prevent race conditions.
        // This is now the single source of truth for the session's existence.
        this.sessions.delete(sessionId);
        log.info(`Session ${sessionId} removed from in-memory map.`);

        // 2. Clean up any pending QR code promises for this session.
        this.qrPromises.delete(sessionId);

        let clientKillSuccess = true;
        try {
            // 3. Attempt to gracefully kill the client process.
            if (session.client) {
                await session.client.kill('SESSION_REMOVED');
                log.info(`Client for session ${sessionId} killed.`);
                // 等待一段时间让进程完全退出和文件句柄释放
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        } catch (error) {
            log.error(`Error during client kill for session ${sessionId}, continuing cleanup:`, error);
            clientKillSuccess = false;
            // 即使杀死进程失败，也给一些时间让进程自然结束
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        // 4. 强制清理文件系统
        const filesystemCleanupSuccess = await this.forceCleanupSessionFiles(sessionId);

        const overallSuccess = clientKillSuccess && filesystemCleanupSuccess;
        log.info(`Session ${sessionId} removal process completed. Success: ${overallSuccess}`);
        return overallSuccess;
    }

    /**
     * 强制清理会话文件，包含重试机制
     */
    private async forceCleanupSessionFiles(sessionId: string): Promise<boolean> {
        const sessionDir = path.resolve('./sessions', sessionId);
        
        if (!fs.existsSync(sessionDir)) {
            log.info(`Session directory ${sessionDir} does not exist, cleanup not needed.`);
            return true;
        }

        log.info(`Attempting to remove session directory: ${sessionDir}`);

        // 重试删除，最多3次
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                // 如果是Windows系统，先尝试修改权限
                if (process.platform === 'win32') {
                    try {
                        // 递归设置文件夹权限为可写
                        await this.setDirectoryPermissions(sessionDir);
                    } catch (permError) {
                        log.warn(`Could not set permissions for ${sessionDir}:`, permError.message);
                    }
                }

                await fs.remove(sessionDir);
                log.info(`Session directory ${sessionDir} successfully removed on attempt ${attempt}.`);
                return true;

            } catch (error) {
                log.error(`Attempt ${attempt} to remove session directory failed:`, error.message);
                
                if (attempt < 3) {
                    // 等待时间逐渐增加
                    const waitTime = attempt * 1000;
                    log.info(`Waiting ${waitTime}ms before retry...`);
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                } else {
                    log.error(`Failed to remove session directory ${sessionDir} after ${attempt} attempts. Manual cleanup may be required.`);
                    
                    // 最后尝试：至少删除配置文件，这样重启时不会恢复会话
                    try {
                        const configPath = path.join(sessionDir, 'config.json');
                        if (fs.existsSync(configPath)) {
                            await fs.unlink(configPath);
                            log.info(`Removed config file ${configPath} to prevent session resurrection.`);
                        }
                    } catch (configError) {
                        log.error(`Failed to remove config file:`, configError.message);
                    }
                    
                    return false;
                }
            }
        }

        return false;
    }

    /**
     * 设置目录权限（Windows系统）
     */
    private async setDirectoryPermissions(dirPath: string): Promise<void> {
        if (process.platform !== 'win32') return;

        try {
            // 递归遍历目录并设置权限
            const items = await fs.readdir(dirPath);
            
            for (const item of items) {
                const itemPath = path.join(dirPath, item);
                const stats = await fs.stat(itemPath);
                
                if (stats.isDirectory()) {
                    await this.setDirectoryPermissions(itemPath);
                } else {
                    // 尝试设置文件为可写
                    try {
                        await fs.chmod(itemPath, 0o666);
                    } catch (chmodError) {
                        // 忽略权限设置错误
                    }
                }
            }
            
            // 设置目录权限
            await fs.chmod(dirPath, 0o777);
        } catch (error) {
            // 权限设置失败不是致命错误
            throw error;
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
     * 真正重启会话 - 保持会话数据，只重新拉取二维码
     * @param sessionId 会话ID
     * @param waitForQR 是否等待新的QR码
     */
    public async restartSession(sessionId: string, waitForQR: boolean = true): Promise<{
        success: boolean;
        message: string;
        qrCode?: string;
    }> {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        log.info(`真正重启会话: ${sessionId}`);

        try {
            // 1. 保存当前配置
            const currentConfig = { ...session.config };
            
            // 2. 如果有客户端，优雅地关闭它但不删除会话数据
            if (session.client) {
                log.info(`关闭会话 ${sessionId} 的客户端连接...`);
                await session.client.kill('SESSION_RESTART');
                // 等待客户端完全关闭
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            // 3. 重置会话状态但保留基本信息
            session.client = null;
            session.status = 'initializing';
            session.lastActivity = new Date();
            delete session.qrCode;
            delete session.qrCodeUrl;

            log.info(`会话 ${sessionId} 状态已重置，开始重新初始化...`);

            // 4. 如果需要等待QR码，设置Promise
            let qrCodePromise: Promise<string | null> | null = null;
            if (waitForQR) {
                qrCodePromise = this.waitForQRCode(sessionId, 35000);
            }

            // 5. 重新创建客户端（使用相同的sessionId和配置）
            create(currentConfig)
                .then(client => {
                    log.info(`会话 ${sessionId} 客户端重新创建成功`);
                    session.client = client;
                    session.status = 'ready';
                    session.lastActivity = new Date();
                    this.setupSessionEvents(sessionId, client);
                })
                .catch(error => {
                    log.error(`会话 ${sessionId} 重启失败:`, error);
                    session.status = 'failed';
                    
                    // 如果有等待的Promise，则拒绝它
                    const promiseHandlers = this.qrPromises.get(sessionId);
                    if (promiseHandlers) {
                        promiseHandlers.reject(error);
                        this.qrPromises.delete(sessionId);
                    }
                });

            // 6. 如果需要，等待QR码
            if (waitForQR && qrCodePromise) {
                log.info(`等待会话 ${sessionId} 的新QR码...`);
                try {
                    const qrCode = await qrCodePromise;
                    if (qrCode) {
                        log.info(`会话 ${sessionId} 重启成功，获得新QR码`);
                        return {
                            success: true,
                            message: "会话重启成功，请扫描新的二维码",
                            qrCode,
                        };
                    } else {
                        log.warn(`会话 ${sessionId} 重启超时`);
                        return {
                            success: false,
                            message: '重启超时，未能获取新的二维码',
                        };
                    }
                } catch(error) {
                    log.error(`会话 ${sessionId} 重启过程中出错:`, error);
                    return {
                        success: false,
                        message: `重启失败: ${error.message}`,
                    };
                }
            } else {
                return {
                    success: true,
                    message: '会话重启已启动，请稍后获取二维码',
                };
            }

        } catch (error) {
            log.error(`重启会话 ${sessionId} 时发生错误:`, error);
            session.status = 'failed';
            throw error;
        }
    }

    /**
     * 更新并保存会话的代理配置，然后重启会话
     * @param sessionId 会话ID
     * @param proxyConfig 新的代理配置
     */
    public async updateSessionProxy(sessionId: string, proxyConfig: any): Promise<boolean> {
        const session = this.sessions.get(sessionId);
        if (!session) {
            throw new Error(`Session ${sessionId} not found`);
        }

        const sessionDir = path.join('./sessions', sessionId);
        if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, { recursive: true });
        }
        
        const configPath = path.join(sessionDir, 'config.json');
        let config: Partial<ConfigObject> = {};
        if (fs.existsSync(configPath)) {
            try {
                config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
            } catch (e) {
                log.error(`Error reading config file for ${sessionId}, a new one will be created.`);
            }
        }

        // 更新代理配置
        config.proxyServerCredentials = proxyConfig;
        // 同步useNativeProxy状态
        if (proxyConfig && proxyConfig.address) {
            config.useNativeProxy = true;
        } else {
            delete config.useNativeProxy;
            delete config.proxyServerCredentials;
        }

        // 保存更新后的配置
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        log.info(`Proxy config for ${sessionId} saved to ${configPath}:`, {
            proxyAddress: config.proxyServerCredentials?.address,
            useNativeProxy: config.useNativeProxy
        });

        // 立即更新内存中的配置
        session.config = { ...session.config, ...config };
        session.lastActivity = new Date();
        
        log.info(`Memory config updated for ${sessionId}:`, {
            proxyAddress: session.config.proxyServerCredentials?.address,
            useNativeProxy: session.config.useNativeProxy
        });

        // 使用真正的重启功能
        log.info(`重启会话 ${sessionId} 以应用新的代理设置...`);
        await this.restartSession(sessionId, false);
        log.info(`会话 ${sessionId} 重启成功，代理配置已应用`);

        return true;
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