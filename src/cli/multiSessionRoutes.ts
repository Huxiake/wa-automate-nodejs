import { Express } from 'express';
import { multiSessionAPI } from '../api/MultiSessionAPI';

/**
 * 设置多Session路由
 */
export const setupMultiSessionRoutes = (app: Express): void => {
    // 添加API版本前缀
    app.use('/api/v1', multiSessionAPI.getRouter());
}; 