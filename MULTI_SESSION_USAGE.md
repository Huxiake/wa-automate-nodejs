# Open-WA 多Session模式使用指南

## 概述

多Session模式允许你在同一个服务器实例上同时运行多个WhatsApp会话，每个会话都是独立的，可以连接不同的WhatsApp账号。

## 快速开始

### 1. 构建项目

```bash
npm run build
```

### 2. 启动多Session服务器

```bash
# 使用默认配置启动
node bin/multi-session.js

# 或指定端口和最大session数
node bin/multi-session.js --port 3000 --max-sessions 5 --use-chrome
```

### 3. 服务器信息

启动后，服务器将在以下端点可用：

- **服务器信息**: `GET http://localhost:8080/info`
- **健康检查**: `GET http://localhost:8080/health`
- **Session管理**: `http://localhost:8080/api/v1/sessions`

## API接口

### Session管理

#### 创建新Session并获取QR码

```bash
# 创建session并等待QR码生成
curl -X POST http://localhost:8080/api/v1/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "my-session-1",
    "waitForQR": true,
    "config": {
      "multiDevice": true,
      "headless": true
    }
  }'
```

响应示例：
```json
{
  "success": true,
  "message": "Session created successfully",
  "data": {
    "sessionId": "my-session-1",
    "status": "qr_ready",
    "createdAt": "2024-01-16T10:30:00.000Z",
    "lastActivity": "2024-01-16T10:30:05.000Z",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
    "hasQRCode": true,
    "qrCodeUrl": "/api/v1/sessions/my-session-1/qr.png"
  }
}
```

#### 获取QR码的多种方式

**方式1: 获取QR码JSON数据**
```bash
# 获取base64格式的QR码
curl http://localhost:8080/api/v1/sessions/my-session-1/qr

# 获取QR码URL引用
curl http://localhost:8080/api/v1/sessions/my-session-1/qr?format=url

# 等待QR码生成（如果还未生成）
curl http://localhost:8080/api/v1/sessions/my-session-1/qr?wait=true
```

**方式2: 直接获取QR码图片**
```bash
# 直接下载QR码图片
curl http://localhost:8080/api/v1/sessions/my-session-1/qr.png -o qr-code.png

# 在浏览器中直接查看QR码
# 访问: http://localhost:8080/api/v1/sessions/my-session-1/qr.png
```

#### 获取所有Sessions

```bash
curl http://localhost:8080/api/v1/sessions
```

#### 获取特定Session信息

```bash
curl http://localhost:8080/api/v1/sessions/my-session-1
```

#### 获取Session状态

```bash
curl http://localhost:8080/api/v1/sessions/my-session-1/status
```

#### 删除Session

```bash
curl -X DELETE http://localhost:8080/api/v1/sessions/my-session-1
```

### 消息发送

#### 发送文本消息

```bash
curl -X POST http://localhost:8080/api/v1/sessions/my-session-1/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "to": "1234567890@c.us",
    "message": "Hello from Open-WA!"
  }'
```

## 前端集成示例

### HTML + JavaScript 示例

```html
<!DOCTYPE html>
<html>
<head>
    <title>WhatsApp Multi-Session QR Scanner</title>
    <style>
        .session-card {
            border: 1px solid #ccc;
            margin: 10px;
            padding: 20px;
            border-radius: 8px;
        }
        .qr-code {
            max-width: 300px;
            height: auto;
        }
        .status {
            font-weight: bold;
            margin: 10px 0;
        }
        .status.qr_ready { color: orange; }
        .status.authenticated { color: green; }
        .status.ready { color: blue; }
        .status.failed { color: red; }
    </style>
</head>
<body>
    <h1>WhatsApp Multi-Session Manager</h1>
    
    <div>
        <input type="text" id="sessionId" placeholder="Session ID">
        <button onclick="createSession()">Create Session</button>
    </div>
    
    <div id="sessions"></div>

    <script>
        const API_BASE = 'http://localhost:8080/api/v1';
        
        async function createSession() {
            const sessionId = document.getElementById('sessionId').value;
            if (!sessionId) {
                alert('请输入Session ID');
                return;
            }
            
            try {
                const response = await fetch(`${API_BASE}/sessions`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: sessionId,
                        waitForQR: true,
                        config: {
                            multiDevice: true,
                            headless: true
                        }
                    })
                });
                
                const result = await response.json();
                if (result.success) {
                    displaySession(result.data);
                    // 定期检查session状态
                    monitorSession(sessionId);
                } else {
                    alert('创建session失败: ' + result.error);
                }
            } catch (error) {
                alert('创建session出错: ' + error.message);
            }
        }
        
        function displaySession(session) {
            const container = document.getElementById('sessions');
            const sessionDiv = document.createElement('div');
            sessionDiv.className = 'session-card';
            sessionDiv.id = `session-${session.sessionId}`;
            
            sessionDiv.innerHTML = `
                <h3>Session: ${session.sessionId}</h3>
                <div class="status ${session.status}">状态: ${session.status}</div>
                <div>创建时间: ${new Date(session.createdAt).toLocaleString()}</div>
                ${session.hasQRCode ? `
                    <div>
                        <h4>扫描二维码登录:</h4>
                        <img src="${API_BASE}/sessions/${session.sessionId}/qr.png" 
                             class="qr-code" alt="QR Code">
                        <br>
                        <small>用WhatsApp扫描上方二维码</small>
                    </div>
                ` : '<div>等待QR码生成...</div>'}
                <button onclick="deleteSession('${session.sessionId}')">删除Session</button>
            `;
            
            container.appendChild(sessionDiv);
        }
        
        async function monitorSession(sessionId) {
            const checkStatus = async () => {
                try {
                    const response = await fetch(`${API_BASE}/sessions/${sessionId}/status`);
                    const result = await response.json();
                    
                    if (result.success) {
                        const sessionDiv = document.getElementById(`session-${sessionId}`);
                        if (sessionDiv) {
                            const statusDiv = sessionDiv.querySelector('.status');
                            statusDiv.textContent = `状态: ${result.data.status}`;
                            statusDiv.className = `status ${result.data.status}`;
                            
                            // 如果已认证，停止监控
                            if (result.data.status === 'authenticated' || result.data.status === 'ready') {
                                sessionDiv.querySelector('.qr-code')?.style.setProperty('display', 'none');
                                const qrDiv = sessionDiv.querySelector('h4');
                                if (qrDiv) qrDiv.textContent = '✅ 已成功登录！';
                                return;
                            }
                        }
                    }
                } catch (error) {
                    console.error('检查session状态失败:', error);
                }
                
                // 继续监控
                setTimeout(checkStatus, 3000);
            };
            
            checkStatus();
        }
        
        async function deleteSession(sessionId) {
            try {
                const response = await fetch(`${API_BASE}/sessions/${sessionId}`, {
                    method: 'DELETE'
                });
                
                const result = await response.json();
                if (result.success) {
                    document.getElementById(`session-${sessionId}`).remove();
                } else {
                    alert('删除session失败: ' + result.error);
                }
            } catch (error) {
                alert('删除session出错: ' + error.message);
            }
        }
        
        // 页面加载时获取现有sessions
        window.onload = async function() {
            try {
                const response = await fetch(`${API_BASE}/sessions`);
                const result = await response.json();
                
                if (result.success) {
                    Object.keys(result.data).forEach(sessionId => {
                        const session = result.data[sessionId];
                        displaySession({
                            sessionId,
                            ...session
                        });
                        
                        if (session.status !== 'authenticated' && session.status !== 'ready') {
                            monitorSession(sessionId);
                        }
                    });
                }
            } catch (error) {
                console.error('获取sessions失败:', error);
            }
        };
    </script>
</body>
</html>
```

### React 组件示例

```jsx
import React, { useState, useEffect } from 'react';

const WhatsAppSessionManager = () => {
    const [sessions, setSessions] = useState({});
    const [sessionId, setSessionId] = useState('');
    const [loading, setLoading] = useState(false);
    
    const API_BASE = 'http://localhost:8080/api/v1';
    
    useEffect(() => {
        loadSessions();
    }, []);
    
    const loadSessions = async () => {
        try {
            const response = await fetch(`${API_BASE}/sessions`);
            const result = await response.json();
            if (result.success) {
                setSessions(result.data);
            }
        } catch (error) {
            console.error('加载sessions失败:', error);
        }
    };
    
    const createSession = async () => {
        if (!sessionId.trim()) {
            alert('请输入Session ID');
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: sessionId.trim(),
                    waitForQR: true,
                    config: {
                        multiDevice: true,
                        headless: true
                    }
                })
            });
            
            const result = await response.json();
            if (result.success) {
                setSessions(prev => ({
                    ...prev,
                    [sessionId]: result.data
                }));
                setSessionId('');
                
                // 开始监控session状态
                monitorSession(sessionId);
            } else {
                alert('创建session失败: ' + result.error);
            }
        } catch (error) {
            alert('创建session出错: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const monitorSession = (sessionId) => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${API_BASE}/sessions/${sessionId}/status`);
                const result = await response.json();
                
                if (result.success) {
                    setSessions(prev => ({
                        ...prev,
                        [sessionId]: {
                            ...prev[sessionId],
                            status: result.data.status,
                            lastActivity: result.data.lastActivity
                        }
                    }));
                    
                    // 如果已认证，停止监控
                    if (result.data.status === 'authenticated' || result.data.status === 'ready') {
                        clearInterval(interval);
                    }
                }
            } catch (error) {
                console.error('检查session状态失败:', error);
            }
        }, 3000);
        
        return interval;
    };
    
    const deleteSession = async (sessionId) => {
        try {
            const response = await fetch(`${API_BASE}/sessions/${sessionId}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            if (result.success) {
                setSessions(prev => {
                    const newSessions = { ...prev };
                    delete newSessions[sessionId];
                    return newSessions;
                });
            } else {
                alert('删除session失败: ' + result.error);
            }
        } catch (error) {
            alert('删除session出错: ' + error.message);
        }
    };
    
    const getStatusColor = (status) => {
        switch (status) {
            case 'qr_ready': return '#ff9800';
            case 'authenticated': case 'ready': return '#4caf50';
            case 'failed': return '#f44336';
            default: return '#757575';
        }
    };
    
    return (
        <div style={{ padding: '20px' }}>
            <h1>WhatsApp Multi-Session Manager</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    placeholder="Session ID"
                    style={{ marginRight: '10px', padding: '8px' }}
                />
                <button 
                    onClick={createSession} 
                    disabled={loading}
                    style={{ padding: '8px 16px' }}
                >
                    {loading ? '创建中...' : '创建Session'}
                </button>
            </div>
            
            <div>
                {Object.entries(sessions).map(([id, session]) => (
                    <div 
                        key={id} 
                        style={{ 
                            border: '1px solid #ccc', 
                            margin: '10px 0', 
                            padding: '20px', 
                            borderRadius: '8px' 
                        }}
                    >
                        <h3>Session: {id}</h3>
                        <div style={{ 
                            fontWeight: 'bold', 
                            color: getStatusColor(session.status),
                            marginBottom: '10px'
                        }}>
                            状态: {session.status}
                        </div>
                        <div>创建时间: {new Date(session.createdAt).toLocaleString()}</div>
                        
                        {session.hasQRCode && session.status === 'qr_ready' && (
                            <div style={{ marginTop: '15px' }}>
                                <h4>扫描二维码登录:</h4>
                                <img 
                                    src={`${API_BASE}/sessions/${id}/qr.png`}
                                    alt="QR Code"
                                    style={{ maxWidth: '300px', height: 'auto' }}
                                />
                                <br />
                                <small>用WhatsApp扫描上方二维码</small>
                            </div>
                        )}
                        
                        {(session.status === 'authenticated' || session.status === 'ready') && (
                            <div style={{ marginTop: '15px', color: '#4caf50' }}>
                                ✅ 已成功登录！
                            </div>
                        )}
                        
                        <button 
                            onClick={() => deleteSession(id)}
                            style={{ 
                                marginTop: '10px', 
                                padding: '8px 16px',
                                backgroundColor: '#f44336',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                        >
                            删除Session
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhatsAppSessionManager;
```

## 部署指南

### 1. 服务器部署

#### 使用PM2部署

```bash
# 安装PM2
npm install -g pm2

# 创建ecosystem文件
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'open-wa-multi-session',
    script: 'bin/multi-session.js',
    args: '--port 8080 --max-sessions 10',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 8080,
      MAX_SESSIONS: 10,
      HEADLESS: true,
      USE_CHROME: false
    }
  }]
}
EOF

# 启动应用
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### 使用Docker部署

```dockerfile
# Dockerfile
FROM node:18-alpine

# 安装Chrome依赖
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# 设置Chrome路径
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 8080

CMD ["node", "bin/multi-session.js"]
```

```bash
# 构建和运行
docker build -t open-wa-multi-session .
docker run -d -p 8080:8080 --name open-wa-ms open-wa-multi-session
```

### 2. 环境变量配置

创建 `.env` 文件：

```env
# 服务器配置
PORT=8080
HOST=0.0.0.0
MAX_SESSIONS=10

# WhatsApp配置
MULTI_DEVICE=true
HEADLESS=true
USE_CHROME=false

# 功能配置
ENABLE_CORS=true
DISABLE_SPINS=true
BLOCK_CRASH_LOGS=true

# 会话配置
SESSION_DATA_PATH=./sessions
QR_TIMEOUT=120
```

## 使用示例

### Node.js客户端示例

```javascript
const axios = require('axios');

class OpenWAMultiSessionClient {
    constructor(baseURL = 'http://localhost:8080') {
        this.baseURL = baseURL;
        this.api = axios.create({ baseURL: `${baseURL}/api/v1` });
    }

    async createSession(sessionId, config = {}) {
        const response = await this.api.post('/sessions', {
            sessionId,
            config: { multiDevice: true, ...config }
        });
        return response.data;
    }

    async getSessionStatus(sessionId) {
        const response = await this.api.get(`/sessions/${sessionId}/status`);
        return response.data;
    }

    async sendMessage(sessionId, to, message) {
        const response = await this.api.post(`/sessions/${sessionId}/send-message`, {
            to,
            message
        });
        return response.data;
    }

    async deleteSession(sessionId) {
        const response = await this.api.delete(`/sessions/${sessionId}`);
        return response.data;
    }
}

// 使用示例
async function main() {
    const client = new OpenWAMultiSessionClient();

    try {
        // 创建session
        await client.createSession('user1', { headless: true });
        console.log('Session created');

        // 等待session准备就绪
        await new Promise(resolve => setTimeout(resolve, 10000));

        // 发送消息
        await client.sendMessage('user1', '1234567890@c.us', 'Hello!');
        console.log('Message sent');

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

main();
```

### Python客户端示例

```python
import requests
import time

class OpenWAMultiSessionClient:
    def __init__(self, base_url="http://localhost:8080"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api/v1"

    def create_session(self, session_id, config=None):
        if config is None:
            config = {}
        
        payload = {
            "sessionId": session_id,
            "config": {"multiDevice": True, **config}
        }
        
        response = requests.post(f"{self.api_url}/sessions", json=payload)
        response.raise_for_status()
        return response.json()

    def get_session_status(self, session_id):
        response = requests.get(f"{self.api_url}/sessions/{session_id}/status")
        response.raise_for_status()
        return response.json()

    def send_message(self, session_id, to, message):
        payload = {"to": to, "message": message}
        response = requests.post(
            f"{self.api_url}/sessions/{session_id}/send-message", 
            json=payload
        )
        response.raise_for_status()
        return response.json()

# 使用示例
client = OpenWAMultiSessionClient()

# 创建session
client.create_session("user1", {"headless": True})
print("Session created")

# 等待session准备
time.sleep(10)

# 发送消息
client.send_message("user1", "1234567890@c.us", "Hello from Python!")
print("Message sent")
```

## 注意事项

### 1. 系统要求

- **内存**: 每个session大约需要200-500MB内存
- **CPU**: 多核CPU推荐，每个session会占用一定CPU资源
- **存储**: 每个session会创建独立的数据目录

### 2. 限制和建议

- **最大Session数**: 建议不超过10个（取决于服务器性能）
- **QR码扫描**: 每个session需要独立扫描QR码登录
- **账号限制**: 每个WhatsApp账号只能同时在一个session中使用
- **稳定性**: 建议使用headless模式以提高稳定性

### 3. 故障排除

#### Session创建失败
```bash
# 检查服务器日志
pm2 logs open-wa-multi-session

# 检查session状态
curl http://localhost:8080/api/v1/sessions
```

#### 内存不足
```bash
# 监控资源使用
pm2 monit

# 调整最大session数
export MAX_SESSIONS=5
```

#### 端口冲突
```bash
# 使用不同端口启动
node bin/multi-session.js --port 3001
```

## 扩展功能

你可以通过以下方式扩展多session功能：

1. **添加新的API端点** - 在 `src/api/MultiSessionAPI.ts` 中添加
2. **自定义Session配置** - 修改 `src/config/multiSessionConfig.ts`
3. **添加中间件** - 在 `src/cli/multiSessionRoutes.ts` 中扩展路由

## 技术支持

如有问题，请参考：

- [Open-WA文档](https://docs.openwa.dev)
- [GitHub仓库](https://github.com/open-wa/wa-automate-nodejs)
- [问题反馈](https://github.com/open-wa/wa-automate-nodejs/issues) 