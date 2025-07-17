import { Router, Request, Response } from 'express';
import { globalSessionManager } from '../controllers/SessionManager';
import { ConfigObject } from './model/config';
import { log } from '../logging/logging';
import { multiSessionChatwoot, ChatwootConfig } from '../cli/integrations/chatwoot';

export interface CreateSessionRequest {
    sessionId: string;
    config?: Partial<ConfigObject>;
    waitForQR?: boolean; // 是否等待QR码生成
}

export interface SessionResponse {
    sessionId: string;
    status: string;
    createdAt: string;
    lastActivity: string;
    qrCode?: string;
    message?: string;
}

export class MultiSessionAPI {
    private router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        // 创建新session
        this.router.post('/sessions', this.createSession.bind(this));
        
        // 获取所有sessions
        this.router.get('/sessions', this.getAllSessions.bind(this));
        
        // 获取特定session信息
        this.router.get('/sessions/:sessionId', this.getSessionInfo.bind(this));
        
        // 获取session状态
        this.router.get('/sessions/:sessionId/status', this.getSessionStatus.bind(this));
        
        // 获取session QR码（JSON格式）
        this.router.get('/sessions/:sessionId/qr', this.getSessionQR.bind(this));
        
        // 获取session QR码图片（直接返回图片）
        this.router.get('/sessions/:sessionId/qr.png', this.getSessionQRImage.bind(this));
        
        // 删除session
        this.router.delete('/sessions/:sessionId', this.deleteSession.bind(this));
        
        // 发送消息
        this.router.post('/sessions/:sessionId/send-message', this.sendMessage.bind(this));
        this.router.post('/sessions/:id/integrations/chatwoot', this.setupChatwootIntegration.bind(this));
        this.router.delete('/sessions/:id/integrations/chatwoot', this.removeChatwootIntegration.bind(this));
        this.router.get('/sessions/:id/integrations/chatwoot', this.getChatwootIntegrationStatus.bind(this));
        
        // 代理测试路由
        this.router.post('/sessions/:sessionId/test-proxy', this.testProxy.bind(this));
        
        // Chatwoot的专用webhook - 修正路由，确保调用正确的处理程序
        this.router.post('/sessions/:id/chatwoot/webhook', (req, res) => {
            const { id } = req.params;
            if (multiSessionChatwoot) {
                // 调用正确的 webhook handler
                return multiSessionChatwoot.createWebhookHandler(id)(req, res);
            } else {
                log.error('Chatwoot integration not initialized before receiving webhook.');
                res.status(500).json({ success: false, error: 'Chatwoot integration not initialized.' });
            }
        });
    }

    /**
     * 创建新session
     */
    private async createSession(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId, config = {}, waitForQR = true }: CreateSessionRequest = req.body;

            if (!sessionId) {
                res.status(400).json({
                    success: false,
                    error: 'sessionId is required'
                });
                return;
            }

            if (globalSessionManager.hasSession(sessionId)) {
                res.status(409).json({
                    success: false,
                    error: `Session ${sessionId} already exists`
                });
                return;
            }

            log.info(`API: Creating session ${sessionId}, waitForQR: ${waitForQR}`);

            const result = await globalSessionManager.createSession(sessionId, config, waitForQR);
            // 确保将包含二维码的完整结果返回给前端
            res.status(201).json({
                success: result.success,
                message: result.message,
                qrCode: result.qrCode,
                session: { // 同时返回会话信息以供更新
                    sessionId,
                    config,
                    status: result.qrCode ? 'qr_ready' : 'initializing',
                    createdAt: new Date(),
                    lastActivity: new Date()
                }
            });

        } catch (error) {
            log.error(`Create session error:`, error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 获取所有sessions
     */
    private getAllSessions(req: Request, res: Response): void {
        try {
            const sessions = globalSessionManager.getAllSessions();
            // 直接返回真实的会话数组，不再进行任何多余的包装
            res.status(200).json({data: sessions });
        } catch (error) {
            log.error('Get all sessions error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 获取特定session信息
     */
    private async getSessionInfo(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const session = globalSessionManager.getSession(sessionId);

            if (!session) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
                return;
            }

            res.json({
                success: true,
                data: {
                    sessionId,
                    status: session.status,
                    createdAt: session.createdAt.toISOString(),
                    lastActivity: session.lastActivity.toISOString(),
                    config: session.config,
                    hasQRCode: !!session.qrCode,
                    qrCodeUrl: session.qrCode ? `/api/v1/sessions/${sessionId}/qr.png` : null
                }
            });

        } catch (error) {
            log.error('Get session info error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 获取session状态
     */
    private async getSessionStatus(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const session = globalSessionManager.getSession(sessionId);

            if (!session) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
                return;
            }

            res.json({
                success: true,
                data: {
                    sessionId,
                    status: session.status,
                    lastActivity: session.lastActivity.toISOString(),
                    hasQRCode: !!session.qrCode,
                    qrCodeUrl: session.qrCode ? `/api/v1/sessions/${sessionId}/qr.png` : null
                }
            });

        } catch (error) {
            log.error('Get session status error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 获取session QR码（JSON格式）
     */
    private async getSessionQR(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const { wait = 'false', format = 'base64' } = req.query;
            
            const session = globalSessionManager.getSession(sessionId);

            if (!session) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
                return;
            }

            let qrCode = session.qrCode;

            // 如果当前没有QR码但请求等待
            if (!qrCode && wait === 'true') {
                log.info(`API: Waiting for QR code for session ${sessionId}...`);
                qrCode = await globalSessionManager.waitForQRCode(sessionId, 30000);
            }

            if (!qrCode) {
                res.status(404).json({
                    success: false,
                    error: 'QR code not available',
                    status: session.status,
                    message: session.status === 'authenticated' ? 'Session is already authenticated' : 'QR code not yet generated'
                });
                return;
            }

            // 根据格式参数返回不同格式
            let responseData: any = {
                sessionId,
                qrCode,
                status: session.status,
                timestamp: new Date().toISOString(),
                format: 'base64'
            };

            if (format === 'url') {
                responseData.qrCodeUrl = `/api/v1/sessions/${sessionId}/qr.png`;
                responseData.format = 'url';
                // 不包含完整的base64数据
                delete responseData.qrCode;
            }

            res.json({
                success: true,
                data: responseData
            });

        } catch (error) {
            log.error('Get session QR error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 获取session QR码图片（直接返回图片）
     */
    private async getSessionQRImage(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const { wait = 'false' } = req.query;
            
            const session = globalSessionManager.getSession(sessionId);

            if (!session) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
                return;
            }

            let qrCode = session.qrCode;

            // 如果当前没有QR码但请求等待
            if (!qrCode && wait === 'true') {
                qrCode = await globalSessionManager.waitForQRCode(sessionId, 30000);
            }

            if (!qrCode) {
                res.status(404).json({
                    success: false,
                    error: 'QR code not available',
                    status: session.status
                });
                return;
            }

            // 提取base64数据
            let base64Data = qrCode;
            if (qrCode.startsWith('data:image/png;base64,')) {
                base64Data = qrCode.split(',')[1];
            }

            // 转换为Buffer
            const imageBuffer = Buffer.from(base64Data, 'base64');

            // 设置响应头
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Length', imageBuffer.length);
            res.setHeader('Cache-Control', 'no-cache');
            
            // 返回图片
            res.send(imageBuffer);

        } catch (error) {
            log.error('Get session QR image error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 删除session
     */
    private async deleteSession(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            
            const success = await globalSessionManager.removeSession(sessionId);
            
            if (success) {
                res.json({
                    success: true,
                    message: `Session ${sessionId} deleted successfully`
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
            }

        } catch (error) {
            log.error('Delete session error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    /**
     * 发送消息
     */
    private async sendMessage(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const { to, message } = req.body;

            if (!to || !message) {
                res.status(400).json({
                    success: false,
                    error: 'to and message are required'
                });
                return;
            }

            const client = globalSessionManager.getClient(sessionId);
            
            if (!client) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found or not ready`
                });
                return;
            }

            // 更新session活动时间
            globalSessionManager.updateSessionActivity(sessionId);

            // 发送消息
            const result = await client.sendText(to, message);
            
            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            log.error('Send message error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

    private async setupChatwootIntegration(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { chatwootUrl, chatwootApiAccessToken, forceUpdateCwWebhook } = req.body;

            if (!chatwootUrl || !chatwootApiAccessToken) {
                res.status(400).json({ success: false, error: 'chatwootUrl and chatwootApiAccessToken are required' });
                return;
            }

            const client = globalSessionManager.getClient(id);
            if (!client) {
                res.status(404).json({ success: false, error: `Session ${id} not found or not ready.` });
                return;
            }

            const sessionConfig = globalSessionManager.getSession(id)?.config;

            const chatwootConfig: ChatwootConfig = {
                chatwootUrl,
                chatwootApiAccessToken,
                forceUpdateCwWebhook: !!forceUpdateCwWebhook,
                client: client,
                // 从session配置中获取网络参数
                apiHost: sessionConfig.apiHost,
                host: sessionConfig.host,
                port: sessionConfig.port,
                cert: sessionConfig.cert,
                privkey: sessionConfig.privkey,
            };

            const success = await multiSessionChatwoot.initSessionChatwoot(id, chatwootConfig);
            if (success) {
                const webhookUrl = `${multiSessionChatwoot.config.webhookBaseUrl}/${id}/chatwoot/webhook`;
                res.status(200).json({ 
                    success: true, 
                    message: `Chatwoot integration enabled for session ${id}.`,
                    webhookUrl: webhookUrl
                });
            } else {
                res.status(500).json({ success: false, error: 'Failed to initialize Chatwoot integration.' });
            }
        } catch (error) {
            log.error('Setup Chatwoot error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    private async removeChatwootIntegration(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const success = await multiSessionChatwoot.removeSessionChatwoot(id);
            if (success) {
                res.json({ success: true, message: `Chatwoot integration removed for session ${id}.` });
            } else {
                res.status(404).json({ success: false, error: `Chatwoot integration not found for session ${id}.` });
            }
        } catch (error) {
            log.error('Remove Chatwoot error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    private async getChatwootIntegrationStatus(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const status = await multiSessionChatwoot.getSessionChatwootStatus(id);
            if (status) {
                res.json({ success: true, data: status });
            } else {
                res.status(404).json({ success: false, error: `Chatwoot integration not found for session ${id}.` });
            }
        } catch (error) {
            log.error('Get Chatwoot status error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    private async testProxy(req: Request, res: Response): Promise<void> {
        const { proxy } = req.body;
        
        if (!proxy) {
            // 如果没有提供代理，则直接获取本机IP
            try {
                const axios = require('axios');
                const response = await axios.get('https://api.ipify.org?format=json');
                res.status(200).json({ success: true, ip: response.data.ip, message: 'No proxy provided. Fetched public IP.' });
            } catch (error) {
                res.status(500).json({ success: false, error: 'Failed to fetch public IP.' });
            }
            return;
        }

        try {
            const { SocksProxyAgent } = require('socks-proxy-agent');
            const axios = require('axios');
            
            const agent = new SocksProxyAgent(proxy);
            const httpClient = axios.create({ httpsAgent: agent, httpAgent: agent });
            
            // 使用代理请求MaxMind的IP查询服务
            const response = await httpClient.get('https://api.ipify.org?format=json', { timeout: 10000 });
            
            res.status(200).json({ success: true, ip: response.data.ip });
        } catch (error) {
            let errorMessage = 'Unknown error';
            if (error.code) {
                errorMessage = `Connection error: ${error.code}`;
            } else if (error.response) {
                errorMessage = `Request failed with status: ${error.response.status}`;
            } else {
                errorMessage = error.message;
            }
            log.error('Proxy test error:', errorMessage);
            res.status(500).json({ success: false, error: errorMessage });
        }
    }

    /**
     * 获取路由器
     */
    public getRouter(): Router {
        return this.router;
    }
}

export const multiSessionAPI = new MultiSessionAPI(); 