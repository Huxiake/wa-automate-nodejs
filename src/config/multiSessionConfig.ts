import { ConfigObject } from '../api/model/config';

/**
 * 多Session模式的默认配置
 */
export const DEFAULT_MULTI_SESSION_CONFIG: Partial<ConfigObject> = {
    // 强制启用多设备模式
    multiDevice: true,
    
    // 推荐的浏览器设置
    headless: true,
    useChrome: false,
    
    // 稳定性设置
    killProcessOnBrowserClose: false,
    restartOnCrash: false,
    
    // 性能优化
    disableSpins: true,
    blockCrashLogs: true,
    
    // 会话管理
    sessionDataPath: './sessions',
    
    // 默认关闭一些可能冲突的功能
    popup: false,
    qrTimeout: 120,
    
    // 日志设置
    logging: [],
    
    // 网络设置
    proxyServerCredentials: undefined,
};

/**
 * 为特定session生成配置
 */
export const generateSessionConfig = (
    sessionId: string, 
    customConfig: Partial<ConfigObject> = {}
): ConfigObject => {
    return {
        ...DEFAULT_MULTI_SESSION_CONFIG,
        ...customConfig,
        sessionId,
        // 确保session有独立的数据目录
        sessionDataPath: customConfig.sessionDataPath || `./sessions/${sessionId}`,
    } as ConfigObject;
};

/**
 * 验证多session配置
 */
export const validateMultiSessionConfig = (config: Partial<ConfigObject>): {
    valid: boolean;
    errors: string[];
    warnings: string[];
} => {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 必须启用multiDevice
    if (config.multiDevice !== true) {
        errors.push('multiDevice must be true for multi-session mode');
    }

    // 检查端口冲突
    if (config.port && (config.port < 1024 || config.port > 65535)) {
        errors.push('port must be between 1024 and 65535');
    }

    // 检查sessionId
    if (!config.sessionId) {
        errors.push('sessionId is required');
    } else if (!/^[a-zA-Z0-9_-]+$/.test(config.sessionId)) {
        errors.push('sessionId must contain only alphanumeric characters, hyphens, and underscores');
    }

    // 性能相关警告
    if (config.headless === false) {
        warnings.push('Running in non-headless mode may impact performance with multiple sessions');
    }

    if (config.useChrome === true && config.chromiumArgs) {
        warnings.push('Custom chromium args with useChrome may cause issues');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
};

/**
 * 多Session环境变量配置
 */
export const MULTI_SESSION_ENV_DEFAULTS = {
    // 服务器设置
    PORT: '8081',
    HOST: '0.0.0.0',
    MAX_SESSIONS: '10',
    
    // WhatsApp设置
    MULTI_DEVICE: 'true',
    HEADLESS: 'true',
    USE_CHROME: 'false',
    
    // 功能设置
    ENABLE_CORS: 'true',
    DISABLE_SPINS: 'true',
    BLOCK_CRASH_LOGS: 'true',
    
    // 会话设置
    SESSION_DATA_PATH: './sessions',
    QR_TIMEOUT: '120',
} as const;

/**
 * 从环境变量获取多session配置
 */
export const getMultiSessionConfigFromEnv = (): Partial<ConfigObject> => {
    return {
        multiDevice: process.env.MULTI_DEVICE === 'true',
        headless: process.env.HEADLESS !== 'false',
        useChrome: process.env.USE_CHROME === 'true',
        disableSpins: process.env.DISABLE_SPINS === 'true',
        blockCrashLogs: process.env.BLOCK_CRASH_LOGS === 'true',
        sessionDataPath: process.env.SESSION_DATA_PATH || MULTI_SESSION_ENV_DEFAULTS.SESSION_DATA_PATH,
        qrTimeout: parseInt(process.env.QR_TIMEOUT || MULTI_SESSION_ENV_DEFAULTS.QR_TIMEOUT),
    };
}; 