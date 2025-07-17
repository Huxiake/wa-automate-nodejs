// API 基础地址
const API_BASE = '/api/v1';

// 全局变量
let sessions = [];
let currentSessionId = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadSessions();
    checkServerStatus();
    
    // 定期刷新会话状态
    setInterval(loadSessions, 10000); // 每10秒刷新一次
    setInterval(checkServerStatus, 5000); // 每5秒检查服务器状态
});

// 检查服务器状态
async function checkServerStatus() {
    try {
        const response = await fetch(`${API_BASE}/sessions`);
        const statusIndicator = document.getElementById('serverStatus');
        
        if (response.ok) {
            statusIndicator.className = 'status-indicator online';
        } else {
            statusIndicator.className = 'status-indicator offline';
        }
    } catch (error) {
        document.getElementById('serverStatus').className = 'status-indicator offline';
    }
}

// 加载所有会话
async function loadSessions() {
    try {
        const response = await fetch(`${API_BASE}/sessions`, {
            cache: 'no-cache' // 强制从服务器获取最新数据
        });
        const data = await response.json();
        
        // 确保能正确处理后端直接返回的会话数组
        sessions = Array.isArray(data.data) ? data.data : [];

        renderSessions();
        updateSessionCount();

    } catch (error) {
        console.error('加载会话失败:', error);
        showToast('无法连接到服务器', 'error');
    }
}

// 渲染会话列表
function renderSessions() {
    const container = document.getElementById('sessionsGrid');
    
    if (sessions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-comments"></i>
                <h3>暂无会话</h3>
                <p>点击上方的"新建会话"按钮来创建您的第一个会话</p>
                <button class="btn btn-primary" onclick="showCreateSessionModal()">
                    <i class="fas fa-plus"></i> 新建会话
                </button>
            </div>
        `;
        return;
    }
    
    container.innerHTML = sessions.map(session => createSessionCard(session)).join('');
}

// 创建会话卡片HTML
function createSessionCard(session) {
    const createdAt = new Date(session.createdAt).toLocaleString('zh-CN');
    const lastActivity = new Date(session.lastActivity).toLocaleString('zh-CN');
    
    return `
        <div class="session-card" data-session-id="${session.sessionId}">
            <div class="session-header">
                <div class="session-title">${session.sessionId}</div>
                <div class="session-status status-${session.status}">${getStatusText(session.status)}</div>
            </div>
            
            <div class="session-info">
                <div class="session-info-item">
                    <span class="session-info-label">创建时间:</span>
                    <span class="session-info-value">${createdAt}</span>
                </div>
                <div class="session-info-item">
                    <span class="session-info-label">最后活动:</span>
                    <span class="session-info-value">${lastActivity}</span>
                </div>
                <div class="session-info-item">
                    <span class="session-info-label">状态:</span>
                    <span class="session-info-value">${getStatusText(session.status)}</span>
                </div>
            </div>
            
            <div class="session-actions">
                ${getSessionActions(session)}
            </div>
        </div>
    `;
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'initializing': '初始化中',
        'qr_ready': '待扫码',
        'authenticated': '已认证',
        'ready': '已就绪',
        'failed': '失败',
        'terminated': '已终止'
    };
    return statusMap[status] || status;
}

// 获取会话操作按钮
function getSessionActions(session) {
    let actions = [];
    
    if (session.status === 'qr_ready') {
        actions.push(`<button class="btn btn-primary" onclick="showQR('${session.sessionId}')">
            <i class="fas fa-qrcode"></i> 显示二维码
        </button>`);
    }
    
    if (session.status === 'ready') {
        actions.push(`<button class="btn btn-success" onclick="showChatwootModal('${session.sessionId}')">
            <i class="fas fa-link"></i> 配置Chatwoot
        </button>`);
        actions.push(`<button class="btn btn-secondary" onclick="showProxyModal('${session.sessionId}')">
            <i class="fas fa-shield-alt"></i> 代理
        </button>`);
    }
    
    // 将删除操作收进一个下拉菜单中，防止误触
    actions.push(`
        <div class="more-actions">
            <button class="btn btn-secondary" onclick="toggleMoreActions(this)">
                <i class="fas fa-ellipsis-h"></i>
            </button>
            <div class="dropdown-menu">
                <button class="dropdown-item" onclick="deleteSession('${session.sessionId}')">
                    <i class="fas fa-trash"></i> 删除会话
                </button>
            </div>
        </div>
    `);
    
    return actions.join('');
}

// 切换更多操作菜单的显示
function toggleMoreActions(btn) {
    const menu = btn.nextElementSibling;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// 点击页面其他地方关闭所有“更多操作”菜单
document.addEventListener('click', function(event) {
    if (!event.target.closest('.more-actions')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});

// 更新会话数量
function updateSessionCount() {
    document.getElementById('sessionCount').textContent = sessions.length;
}

// 搜索过滤会话
function filterSessions() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.session-card');
    
    cards.forEach(card => {
        const sessionId = card.getAttribute('data-session-id').toLowerCase();
        if (sessionId.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// 显示创建会话模态框
function showCreateSessionModal() {
    document.getElementById('createSessionModal').style.display = 'block';
    document.getElementById('newSessionId').value = '';
    document.getElementById('proxyConfig').value = '';
    document.getElementById('waitForQR').checked = true;
}

// 创建新会话
async function createSession() {
    const sessionId = document.getElementById('newSessionId').value.trim();
    const proxyConfig = document.getElementById('proxyConfig').value.trim();
    const waitForQR = document.getElementById('waitForQR').checked;
    
    if (!sessionId) {
        showToast('请输入会话ID', 'error');
        return;
    }
    
    // 检查会话ID是否已存在
    if (sessions.find(s => s.sessionId === sessionId)) {
        showToast('会话ID已存在，请使用其他ID', 'error');
        return;
    }
    
    const requestBody = {
        sessionId: sessionId,
        waitForQR: waitForQR,
        config: {
            multiDevice: true,
            headless: true
        }
    };
    
    // 添加代理配置
    if (proxyConfig) {
        requestBody.config.proxyServerCredentials = proxyConfig;
    }
    
    try {
        showToast('正在创建会话...', 'info');
        
        const response = await fetch(`${API_BASE}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('会话创建成功!', 'success');
            closeModal('createSessionModal');
            
            // 创建成功后，不再依赖返回的单个对象，而是直接重新加载整个列表
            // 这是最可靠的UI同步方式
            loadSessions();

            // 如果后端返回了二维码，则显示它
            if (data.qrCode) {
                currentSessionId = sessionId;
                displayQRCode(data.qrCode);
                document.getElementById('qrModal').style.display = 'block';
            }
            
        } else {
            showToast('创建会话失败: ' + (data.error || '未知错误'), 'error');
        }
    } catch (error) {
        console.error('创建会话失败:', error);
        showToast('创建会话失败: ' + error.message, 'error');
    }
}

// 显示二维码
async function showQR(sessionId) {
    currentSessionId = sessionId;
    document.getElementById('qrModal').style.display = 'block';
    
    // 重置二维码容器
    const container = document.getElementById('qrCodeContainer');
    container.innerHTML = `
        <div class="qr-loading">
            <i class="fas fa-spinner fa-spin"></i>
            <p>正在获取二维码...</p>
        </div>
    `;
    
    try {
        const response = await fetch(`${API_BASE}/sessions/${sessionId}/qr`);
        const data = await response.json();
        if (data.success && data.data.qrCode) {
            displayQRCode(data.data.qrCode);
        } else {
            container.innerHTML = `
                <div class="qr-loading">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>无法获取二维码</p>
                    <p><small>${data.error || '未知错误'}</small></p>
                </div>
            `;
        }
    } catch (error) {
        console.error('获取二维码失败:', error);
        container.innerHTML = `
            <div class="qr-loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>获取二维码失败</p>
            </div>
        `;
    }
}

// 显示二维码图片
function displayQRCode(qrCodeData) {
    console.log('qrCodeData', qrCodeData)
    const container = document.getElementById('qrCodeContainer');
    
    // 如果是SVG格式的二维码
    if (qrCodeData.includes('<svg')) {
        container.innerHTML = qrCodeData;
    } else {
        // 如果是base64或URL格式的二维码
        container.innerHTML = `<img src="${qrCodeData}" alt="QR Code" class="qr-image">`;
    }
}

// 刷新二维码
function refreshQR() {
    if (currentSessionId) {
        showQR(currentSessionId);
    }
}

// 显示Chatwoot配置模态框
function showChatwootModal(sessionId) {
    currentSessionId = sessionId;
    document.getElementById('chatwootModal').style.display = 'block';
    document.getElementById('chatwootUrl').value = '';
    document.getElementById('chatwootToken').value = '';
    document.getElementById('forceUpdateWebhook').checked = true;
}

// 配置Chatwoot集成
async function setupChatwoot() {
    const chatwootUrl = document.getElementById('chatwootUrl').value.trim();
    const chatwootToken = document.getElementById('chatwootToken').value.trim();
    const forceUpdate = document.getElementById('forceUpdateWebhook').checked;
    
    if (!chatwootUrl || !chatwootToken) {
        showToast('请填写完整的Chatwoot配置信息', 'error');
        return;
    }
    
    if (!currentSessionId) {
        showToast('请选择一个会话', 'error');
        return;
    }
    
    const config = {
        chatwootUrl: chatwootUrl,
        chatwootApiAccessToken: chatwootToken,
        forceUpdateCwWebhook: forceUpdate
    };
    
    try {
        showToast('正在配置Chatwoot集成...', 'info');
        
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/integrations/chatwoot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(config)
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('Chatwoot集成配置成功!', 'success');
            closeModal('chatwootModal');
            
            if (data.webhookUrl) {
                showToast(`Webhook地址: ${data.webhookUrl}`, 'info');
            }
        } else {
            showToast('配置Chatwoot失败: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('配置Chatwoot失败:', error);
        showToast('配置Chatwoot失败: ' + error.message, 'error');
    }
}

// 重启会话
async function restartSession(sessionId) {
    if (!confirm(`确定要重启会话 "${sessionId}" 吗？`)) {
        return;
    }
    
    try {
        showToast('正在重启会话...', 'info');
        
        // 先删除会话
        await fetch(`${API_BASE}/sessions/${sessionId}`, {
            method: 'DELETE'
        });
        
        // 等待一秒后重新创建
        setTimeout(async () => {
            const response = await fetch(`${API_BASE}/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    config: {
                        multiDevice: true,
                        headless: true
                    }
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showToast('会话重启成功!', 'success');
            } else {
                showToast('重启会话失败: ' + data.error, 'error');
            }
            
            loadSessions();
        }, 1000);
        
    } catch (error) {
        console.error('重启会话失败:', error);
        showToast('重启会话失败: ' + error.message, 'error');
    }
}

// 删除会话
async function deleteSession(sessionId) {
    if (!confirm(`确定要删除会话 "${sessionId}" 吗？此操作不可恢复。`)) {
        return;
    }
    
    try {
        showToast('正在删除会话...', 'info');
        
        const response = await fetch(`${API_BASE}/sessions/${sessionId}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('会话删除成功!', 'success');
            loadSessions();
        } else {
            showToast('删除会话失败: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('删除会话失败:', error);
        showToast('删除会话失败: ' + error.message, 'error');
    }
}

// 刷新会话列表
function refreshSessions() {
    showToast('正在刷新会话列表...', 'info');
    loadSessions();
}

// 关闭模态框
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    currentSessionId = null;
}

// 显示消息提示
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    // 3秒后自动移除
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 3000);
}

// 获取Toast图标
function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// 键盘事件处理
document.addEventListener('keydown', function(event) {
    // ESC键关闭模态框
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
    
    // Enter键提交表单
    if (event.key === 'Enter') {
        const createModal = document.getElementById('createSessionModal');
        const chatwootModal = document.getElementById('chatwootModal');
        const proxyModal = document.getElementById('proxyModal');
        
        if (createModal.style.display === 'block') {
            createSession();
        } else if (chatwootModal.style.display === 'block') {
            setupChatwoot();
        } else if (proxyModal.style.display === 'block') {
            saveProxy();
        }
    }
});

// 代理配置相关函数
function showProxyModal(sessionId) {
    currentSessionId = sessionId;
    const session = sessions.find(s => s.sessionId === sessionId);
    
    // 重置表单
    document.getElementById('proxyType').value = 'none';
    document.getElementById('proxyHost').value = '';
    document.getElementById('proxyPort').value = '';
    document.getElementById('proxyUser').value = '';
    document.getElementById('proxyPass').value = '';
    document.getElementById('socks5Fields').style.display = 'none';
    document.getElementById('proxyTestResult').style.display = 'none';

    // 如果已有代理配置，则填充表单
    if (session && session.config && session.config.proxyServerCredentials) {
        const proxy = session.config.proxyServerCredentials;
        if (proxy.startsWith('socks5://')) {
            document.getElementById('proxyType').value = 'socks5';
            const withoutProtocol = proxy.substring('socks5://'.length);
            const [auth, hostPort] = withoutProtocol.split('@');
            
            if (hostPort) { // 存在认证和主机
                const [user, pass] = auth.split(':');
                const [host, port] = hostPort.split(':');
                document.getElementById('proxyUser').value = user;
                document.getElementById('proxyPass').value = pass;
                document.getElementById('proxyHost').value = host;
                document.getElementById('proxyPort').value = port;
            } else { // 只存在主机
                const [host, port] = auth.split(':');
                document.getElementById('proxyHost').value = host;
                document.getElementById('proxyPort').value = port;
            }
            document.getElementById('socks5Fields').style.display = 'block';
        }
    }
    
    document.getElementById('proxyModal').style.display = 'block';
}

function toggleProxyFields() {
    const type = document.getElementById('proxyType').value;
    document.getElementById('socks5Fields').style.display = type === 'socks5' ? 'block' : 'none';
}

function getProxyString() {
    const type = document.getElementById('proxyType').value;
    if (type === 'none') {
        return null;
    }

    const host = document.getElementById('proxyHost').value.trim();
    const port = document.getElementById('proxyPort').value.trim();
    const user = document.getElementById('proxyUser').value.trim();
    const pass = document.getElementById('proxyPass').value.trim();

    if (!host || !port) {
        showToast('代理主机和端口不能为空', 'error');
        return false;
    }
    
    let proxyString = 'socks5://';
    if (user && pass) {
        proxyString += `${user}:${pass}@`;
    }
    proxyString += `${host}:${port}`;
    return proxyString;
}

async function testProxy() {
    const proxyString = getProxyString();
    if (proxyString === false) return; // 校验失败

    const resultDiv = document.getElementById('proxyTestResult');
    resultDiv.style.display = 'block';
    resultDiv.className = 'proxy-test-result';
    resultDiv.textContent = '正在测试代理连通性...';

    try {
        const response = await fetch(`${API_BASE}/sessions/${currentSessionId}/test-proxy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proxy: proxyString })
        });
        const data = await response.json();

        if (data.success) {
            resultDiv.classList.add('success');
            resultDiv.textContent = `测试成功！代理IP: ${data.ip}`;
        } else {
            resultDiv.classList.add('error');
            resultDiv.textContent = `测试失败: ${data.error}`;
        }
    } catch (error) {
        resultDiv.classList.add('error');
        resultDiv.textContent = `测试请求失败: ${error.message}`;
    }
}

async function saveProxy() {
    const proxyString = getProxyString();
    if (proxyString === false && document.getElementById('proxyType').value !== 'none') return;
    
    showToast('正在保存代理配置并重启会话...', 'info');

    try {
        // 1. 删除现有会话
        await fetch(`${API_BASE}/sessions/${currentSessionId}`, { method: 'DELETE' });

        // 2. 延迟后用新配置创建会话
        setTimeout(async () => {
            const requestBody = {
                sessionId: currentSessionId,
                waitForQR: false, // 重启后不自动打开二维码
                config: {
                    multiDevice: true,
                    headless: true,
                    proxyServerCredentials: proxyString // 应用新的代理配置
                }
            };
            const response = await fetch(`${API_BASE}/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            const data = await response.json();

            if (data.success) {
                showToast('会话已使用新配置重启！', 'success');
                closeModal('proxyModal');
                loadSessions();
            } else {
                showToast('重启会话失败: ' + data.error, 'error');
            }
        }, 1500); // 延迟以确保旧会话完全终止

    } catch (error) {
        showToast('保存代理配置失败: ' + error.message, 'error');
    }
} 