/**
 * 多Session模式服务器
 * 在现有单session服务器基础上，添加多session支持
 */

import { globalSessionManager, SessionManager } from '../controllers/SessionManager';
import { setupMultiSessionRoutes } from './multiSessionRoutes';
import { log } from '../logging/logging';
import { ConfigObject } from '../api/model/config';

// 导入现有的服务器设置函数
import { 
    app, 
    server, 
    setUpExpressApp, 
    setupHttpServer, 
    setupMediaMiddleware,
    enableCORSRequests 
} from './server';
import * as express from 'express';

/**
 * 多Session服务器配置
 */
export interface MultiSessionConfig {
    port?: number;
    host?: string;
    enableCors?: boolean;
    defaultSessionConfig?: Partial<ConfigObject>;
    maxSessions?: number;
}

/**
 * 启动多Session服务器
 */
export const startMultiSessionServer = async (config: MultiSessionConfig = {}) => {
    const {
        port = 8080,
        host = '0.0.0.0',
        enableCors = true,
        defaultSessionConfig = {},
        maxSessions = 10
    } = config;

    try {
        // 设置Express应用
        setUpExpressApp();
        log.info('Express app setup complete');

        // 启用CORS（如果需要）
        if (enableCors) {
            await enableCORSRequests({ cors: true });
            log.info('CORS enabled');
        }

        // 设置HTTP服务器
        await setupHttpServer({ port });
        log.info('HTTP server setup complete');

        // 设置媒体中间件
        setupMediaMiddleware();
        log.info('Media middleware setup complete');

        // 设置多session路由
        setupMultiSessionRoutes(app);
        log.info('Multi-session routes setup complete');

        // 初始化全局session管理器
        const newManager = new SessionManager(defaultSessionConfig);
        Object.assign(globalSessionManager, newManager);
        log.info('Session manager initialized');

        // 添加健康检查端点
        app.get('/health', (req, res) => {
            res.json({
                status: 'ok',
                timestamp: new Date().toISOString(),
                sessions: {
                    count: globalSessionManager.getSessionCount(),
                    limit: maxSessions
                }
            });
        });

        // 添加多session信息端点
        app.get('/info', (req, res) => {
            res.json({
                name: 'Open-WA Multi-Session Server',
                version: require('../../package.json').version,
                multiSession: true,
                maxSessions,
                currentSessions: globalSessionManager.getSessionCount(),
                endpoints: {
                    sessions: '/api/v1/sessions',
                    health: '/health',
                    info: '/info'
                }
            });
        });

        // 启动服务器
        return new Promise((resolve, reject) => {
            try {
                server.listen(port, host, () => {
                    log.info(`🚀 Multi-Session Server started successfully!`);
                    log.info(`📡 Server running at http://${host}:${port}`);
                    log.info(`📊 Health check: http://${host}:${port}/health`);
                    log.info(`📋 Session API: http://${host}:${port}/api/v1/sessions`);
                    log.info(`📖 Server info: http://${host}:${port}/info`);
                    log.info(`🔧 Max sessions: ${maxSessions}`);
                    resolve(server);
                });

                server.on('error', (error) => {
                    log.error('Server error:', error);
                    reject(error);
                });

                // 优雅关闭处理
                const gracefulShutdown = async (signal: string) => {
                    log.info(`📥 Received ${signal}. Starting graceful shutdown...`);
                    
                    // 清理所有session
                    await globalSessionManager.cleanup();
                    
                    // 关闭服务器
                    server.close(() => {
                        log.info('🛑 Multi-Session Server shutdown complete');
                        process.exit(0);
                    });

                    // 强制退出保护
                    setTimeout(() => {
                        log.error('💥 Forced shutdown after timeout');
                        process.exit(1);
                    }, 30000);
                };

                // 注册信号处理
                process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
                process.on('SIGINT', () => gracefulShutdown('SIGINT'));

            } catch (error) {
                log.error('Failed to start server:', error);
                reject(error);
            }
        });

    } catch (error) {
        log.error('❌ Failed to start Multi-Session Server:', error);
        throw error;
    }
};

/**
 * CLI启动函数
 */
export const startFromCLI = async () => {
    try {
        const config: MultiSessionConfig = {
            port: parseInt(process.env.PORT || '8080'),
            host: process.env.HOST || '0.0.0.0',
            enableCors: process.env.ENABLE_CORS !== 'false',
            maxSessions: parseInt(process.env.MAX_SESSIONS || '10'),
            defaultSessionConfig: {
                multiDevice: true,
                headless: process.env.HEADLESS !== 'false',
                useChrome: process.env.USE_CHROME === 'true',
            }
        };

        log.info('Starting server with config:', config);
        await startMultiSessionServer(config);
    } catch (error) {
        log.error('Failed to start from CLI:', error);
        process.exit(1);
    }
}; 