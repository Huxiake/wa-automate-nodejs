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
        
        // 重启session（真正的重启，保持会话数据）
        this.router.post('/sessions/:sessionId/restart', this.restartSession.bind(this));
        
        // 发送消息
        this.router.post('/sessions/:sessionId/send-message', this.sendMessage.bind(this));
        this.router.post('/sessions/:id/integrations/chatwoot', this.setupChatwootIntegration.bind(this));
        this.router.delete('/sessions/:id/integrations/chatwoot', this.removeChatwootIntegration.bind(this));
        this.router.get('/sessions/:id/integrations/chatwoot', this.getChatwootIntegrationStatus.bind(this));
        
        // 代理测试路由
        this.router.post('/check-proxy', this.testProxy.bind(this));
        this.router.post('/proxy/test', this.testHttpProxy.bind(this));
        this.router.get('/sessions/:sessionId/ip', this.getIp.bind(this));
        this.router.post('/sessions/:sessionId/proxy', this.updateSessionProxy.bind(this));
        
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
     * 重启session（真正的重启，保持会话数据）
     */
    private async restartSession(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const { waitForQR = true } = req.body;

            if (!globalSessionManager.hasSession(sessionId)) {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
                return;
            }

            log.info(`API: Restarting session ${sessionId}, waitForQR: ${waitForQR}`);

            const result = await globalSessionManager.restartSession(sessionId, waitForQR);
            
            res.json({
                success: result.success,
                message: result.message,
                qrCode: result.qrCode,
                data: {
                    sessionId,
                    restarted: true,
                    timestamp: new Date().toISOString(),
                    hasQRCode: !!result.qrCode
                }
            });

        } catch (error) {
            log.error(`Restart session error:`, error);
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
        const { server } = req.body;
        if (!server) {
            res.status(400).json({ success: false, error: 'Proxy server address is required.' });
            return;
        }

        try {
            const { SocksProxyAgent } = require('socks-proxy-agent');
            const https = require('https');

            const agent = new SocksProxyAgent(server);

            const request = https.get('https://api.ipify.org?format=json', { agent, timeout: 15000 }, (response) => {
                let data = '';
                response.on('data', (chunk) => {
                    data += chunk;
                });
                response.on('end', () => {
                    try {
                        if (response.statusCode >= 200 && response.statusCode < 300) {
                            const jsonData = JSON.parse(data);
                            res.status(200).json({ success: true, ip: jsonData.ip, message: 'Proxy connection successful.' });
                        } else {
                            log.error(`Proxy test error - Status: ${response.statusCode}, Body: ${data}`);
                            res.status(500).json({ success: false, error: `Request failed with status code ${response.statusCode}` });
                        }
                    } catch (e) {
                        log.error('Proxy test error - invalid JSON:', e.message);
                        res.status(500).json({ success: false, error: 'Failed to parse response from ipify.org' });
                    }
                });
            });

            request.on('error', (error) => {
                log.error('Proxy test request error:', error);
                res.status(500).json({ success: false, error: `Request error: ${error.message}`, code: error.code });
            });

            request.on('timeout', () => {
                request.destroy();
                log.error('Proxy test timeout');
                res.status(500).json({ success: false, error: 'Request timed out after 15 seconds' });
            });

        } catch (error) {
            log.error('Proxy test setup error:', error);
            res.status(500).json({ success: false, error: `Setup error: ${error.message}` });
        }
    }

    private async testHttpProxy(req: Request, res: Response): Promise<void> {
        const { host, port, username, password } = req.body;
        if (!host || !port) {
            res.status(400).json({ success: false, error: 'Proxy host and port are required.' });
            return;
        }

        try {
            const axios = require('axios');
            const { HttpProxyAgent } = require('http-proxy-agent');
            
            // 构造代理 URL
            let proxyUrl;
            if (username && password) {
                proxyUrl = `http://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}`;
            } else {
                proxyUrl = `http://${host}:${port}`;
            }
            
            log.info(`Testing HTTP proxy: ${host}:${port} ${username ? 'with auth' : 'without auth'}`);
            
            // 创建代理 agent
            const proxyAgent = new HttpProxyAgent(proxyUrl);

            const response = await axios.get('http://api.ipify.org?format=json', {
                httpAgent: proxyAgent,
                httpsAgent: proxyAgent,
                timeout: 15000,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                }
            });

            if (response.status >= 200 && response.status < 300) {
                log.info(`Proxy test successful, IP: ${response.data.ip}`);
                res.status(200).json({ success: true, ip: response.data.ip, message: 'Proxy connection successful.' });
            } else {
                log.error(`Proxy test error - Status: ${response.status}, Body: ${JSON.stringify(response.data)}`);
                res.status(500).json({ success: false, error: `Request failed with status code ${response.status}` });
            }
        } catch (error) {
            log.error('Proxy test request error:', error.message, error.code);
            
            let errorMessage = 'Unknown error';
            let errorCode = error.code;
            
            if (error.response) {
                // Axios 响应错误
                errorMessage = `HTTP ${error.response.status}: ${error.response.statusText}`;
                if (error.response.data) {
                    errorMessage += ` - ${JSON.stringify(error.response.data)}`;
                }
            } else if (error.request) {
                // 请求发送失败
                if (error.code === 'ECONNREFUSED') {
                    errorMessage = '代理服务器拒绝连接，请检查代理地址和端口是否正确';
                } else if (error.code === 'ENOTFOUND') {
                    errorMessage = '无法解析代理服务器地址，请检查主机名是否正确';
                } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET') {
                    errorMessage = '代理连接超时，请检查网络连接或增加超时时间';
                } else if (error.code === 'EPROTO') {
                    errorMessage = '协议错误，可能是代理认证失败或协议不匹配';
                } else {
                    errorMessage = `网络错误: ${error.message}`;
                }
            } else {
                // 其他错误
                errorMessage = error.message;
            }
            
            res.status(500).json({ 
                success: false, 
                error: `Request error: ${errorMessage}`, 
                code: errorCode,
                details: {
                    proxyHost: host,
                    proxyPort: port,
                    hasAuth: !!(username && password)
                }
            });
        }
    }

    private async getIp(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const client = globalSessionManager.getClient(sessionId);

            if (!client) {
                res.status(404).json({ success: false, error: `Session ${sessionId} not found or not ready.` });
                return;
            }

            const ip = await client.getIp();
            res.status(200).json({ success: true, ip });
        } catch (error) {
            log.error('Get IP error:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }

    private async updateSessionProxy(req: Request, res: Response): Promise<void> {
        try {
            const { sessionId } = req.params;
            const { proxy } = req.body;

            const success = await globalSessionManager.updateSessionProxy(sessionId, proxy);

            if (success) {
                res.json({
                    success: true,
                    message: `Proxy for session ${sessionId} updated and session restarted.`
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: `Session ${sessionId} not found`
                });
            }
        } catch (error) {
            log.error('Update session proxy error:', error);
            res.status(500).json({
                success: false,
                error: error.message
            });
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