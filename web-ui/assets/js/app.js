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
                    <span class="session-info-label">代理:</span>
                    <span class="session-info-value">${getProxyDisplayText(session.config)}</span>
                </div>
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

// 获取代理显示文本
function getProxyDisplayText(config) {
    if (!config) return '无';
    
    const proxy = config.proxyServerCredentials;
    if (!proxy || !proxy.address) {
        return '无';
    }
    
    // 显示代理地址，如果有用户名则显示用户名
    let displayText = proxy.address;
    if (proxy.username) {
        displayText += ` (${proxy.username})`;
    }
    
    return displayText;
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
        actions.push(`<button class="btn btn-info" onclick="checkIp('${session.sessionId}')">
            <i class="fas fa-network-wired"></i> 检查IP
        </button>`);
    }

    actions.push(`<button class="btn btn-secondary" onclick="showEditProxyModal('${session.sessionId}')">
        <i class="fas fa-proxy"></i> 代理设置
    </button>`);
    
    // 将更多操作收进一个下拉菜单中，防止误触
    actions.push(`
        <div class="more-actions">
            <button class="btn btn-secondary" onclick="toggleMoreActions(this)">
                <i class="fas fa-ellipsis-h"></i> 更多
            </button>
            <div class="dropdown-menu">
                <button class="dropdown-item" onclick="restartSession('${session.sessionId}')">
                    <i class="fas fa-sync-alt"></i> 重启会话 (保持数据)
                </button>
                <button class="dropdown-item" onclick="deleteAndRecreateSession('${session.sessionId}')">
                    <i class="fas fa-redo"></i> 删除重建 (清空数据)
                </button>
                <button class="dropdown-item" onclick="debugSessionConfig('${session.sessionId}')">
                    <i class="fas fa-bug"></i> 调试配置
                </button>
                <div class="dropdown-divider"></div>
                <button class="dropdown-item danger" onclick="deleteSession('${session.sessionId}')">
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
    document.getElementById('waitForQR').checked = true;
    // 重置代理字段
    document.getElementById('enableProxy').checked = false;
    document.getElementById('createProxyFields').style.display = 'none';
    document.getElementById('createProxyHost').value = '';
    document.getElementById('createProxyPort').value = '';
    document.getElementById('createProxyUser').value = '';
    document.getElementById('createProxyPass').value = '';
    document.getElementById('createProxyTestResult').style.display = 'none';
}

// 切换创建会话模态框中的代理输入字段
function toggleCreateProxyFields() {
    const enableProxy = document.getElementById('enableProxy').checked;
    document.getElementById('createProxyFields').style.display = enableProxy ? 'block' : 'none';
}

// 在创建会话模态框中测试代理
async function testHttpProxy(type) {
    const host = document.getElementById(`${type}ProxyHost`).value.trim();
    const port = document.getElementById(`${type}ProxyPort`).value.trim();
    const user = document.getElementById(`${type}ProxyUser`).value.trim();
    const pass = document.getElementById(`${type}ProxyPass`).value.trim();
    const resultDiv = document.getElementById(`${type}ProxyTestResult`);

    if (!host || !port) {
        showToast('代理地址和端口不能为空', 'error');
        return;
    }

    resultDiv.style.display = 'block';
    resultDiv.className = 'proxy-test-result';
    resultDiv.textContent = '正在测试代理连通性...';

    try {
        const response = await fetch(`${API_BASE}/proxy/test`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ host, port, username: user, password: pass })
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

// 创建新会话
async function createSession() {
    const sessionId = document.getElementById('newSessionId').value.trim();
    const waitForQR = document.getElementById('waitForQR').checked;
    const enableProxy = document.getElementById('enableProxy').checked;
    
    if (!sessionId) {
        showToast('请输入会话ID', 'error');
        return;
    }
    
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
    if (enableProxy) {
        const host = document.getElementById('createProxyHost').value.trim();
        const port = document.getElementById('createProxyPort').value.trim();
        const user = document.getElementById('createProxyUser').value.trim();
        const pass = document.getElementById('createProxyPass').value.trim();

        if (!host || !port) {
            showToast('启用了代理，则代理地址和端口不能为空', 'error');
            return;
        }

        requestBody.config.useNativeProxy = true;
        
        requestBody.config.proxyServerCredentials = {
            protocol: 'http',
            address: `${host}:${port}`,
            username: user,
            password: pass
        };
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
            
            loadSessions();

            // 如果后端返回了二维码，则显示它
            if (data.qrCode) {
                showQR(sessionId, data.qrCode);
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

// 重启会话（真正的重启，保持会话数据）
async function restartSession(sessionId) {
    if (!confirm(`确定要重启会话 "${sessionId}" 吗？\n\n这将保持会话数据，只重新拉取二维码。`)) {
        return;
    }
    
    try {
        showToast('正在重启会话...', 'info');
        
        const response = await fetch(`${API_BASE}/sessions/${sessionId}/restart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                waitForQR: true
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showToast('会话重启成功!', 'success');
            
            // 如果返回了新的二维码，显示它
            if (data.qrCode) {
                showQR(sessionId, data.qrCode);
            }
            
            loadSessions();
        } else {
            showToast('重启会话失败: ' + (data.error || '未知错误'), 'error');
        }
        
    } catch (error) {
        console.error('重启会话失败:', error);
        showToast('重启会话失败: ' + error.message, 'error');
    }
}

// 删除并重建会话（旧的重启方式）
async function deleteAndRecreateSession(sessionId) {
    if (!confirm(`确定要删除并重建会话 "${sessionId}" 吗？\n\n这将完全删除会话数据并重新创建。`)) {
        return;
    }
    
    try {
        showToast('正在删除并重建会话...', 'info');
        
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
                    waitForQR: true,
                    config: {
                        multiDevice: true,
                        headless: true
                    }
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                showToast('会话重建成功!', 'success');
                
                // 如果返回了二维码，显示它
                if (data.qrCode) {
                    showQR(sessionId, data.qrCode);
                }
            } else {
                showToast('重建会话失败: ' + data.error, 'error');
            }
            
            loadSessions();
        }, 1000);
        
    } catch (error) {
        console.error('重建会话失败:', error);
        showToast('重建会话失败: ' + error.message, 'error');
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



// 编辑代理相关函数
function showEditProxyModal(sessionId) {
    currentSessionId = sessionId;
    const session = sessions.find(s => s.sessionId === sessionId);
    
    document.getElementById('editProxySessionId').value = sessionId;

    const proxy = session?.config?.proxyServerCredentials;
    const enableProxyCheckbox = document.getElementById('editEnableProxy');
    const proxyFields = document.getElementById('editProxyFields');

    if (proxy && proxy.address) {
        enableProxyCheckbox.checked = true;
        proxyFields.style.display = 'block';
        const [host, port] = proxy.address.split(':');
        document.getElementById('editProxyHost').value = host || '';
        document.getElementById('editProxyPort').value = port || '';
        document.getElementById('editProxyUser').value = proxy.username || '';
        document.getElementById('editProxyPass').value = proxy.password || '';
    } else {
        enableProxyCheckbox.checked = false;
        proxyFields.style.display = 'none';
        document.getElementById('editProxyHost').value = '';
        document.getElementById('editProxyPort').value = '';
        document.getElementById('editProxyUser').value = '';
        document.getElementById('editProxyPass').value = '';
    }

    document.getElementById('editProxyModal').style.display = 'block';
}

function toggleEditProxyFields() {
    const enableProxy = document.getElementById('editEnableProxy').checked;
    document.getElementById('editProxyFields').style.display = enableProxy ? 'block' : 'none';
}



async function saveAndRestartSession() {
    const sessionId = document.getElementById('editProxySessionId').value;
    const enableProxy = document.getElementById('editEnableProxy').checked;
    
    let proxyConfig = null;
    if (enableProxy) {
        const host = document.getElementById('editProxyHost').value.trim();
        const port = document.getElementById('editProxyPort').value.trim();
        const user = document.getElementById('editProxyUser').value.trim();
        const pass = document.getElementById('editProxyPass').value.trim();

        if (!host || !port) {
            showToast('启用了代理，则代理地址和端口不能为空', 'error');
            return;
        }
        
        // Ensure the proxy format is what the backend expects for native proxy
        proxyConfig = {
            protocol: 'http', // Explicitly set protocol
            address: `${host}:${port}`,
            username: user,
            password: pass
        };
    }

    showToast('正在保存配置并重启会话...', 'info');

    try {
        // The backend endpoint expects the entire config object
        const response = await fetch(`${API_BASE}/sessions/${sessionId}/proxy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proxy: proxyConfig })
        });
        const data = await response.json();

        if (data.success) {
            showToast('配置已保存，会话正在重启', 'success');
            closeModal('editProxyModal');
            // 强制刷新会话数据
            setTimeout(() => {
                loadSessions();
                // 再次刷新确保获取最新数据
                setTimeout(loadSessions, 2000);
            }, 1500);
        } else {
            showToast('保存失败: ' + data.error, 'error');
        }
    } catch (error) {
        showToast('请求失败: ' + error.message, 'error');
    }
}

// 调试会话配置
async function debugSessionConfig(sessionId) {
    try {
        const response = await fetch(`${API_BASE}/sessions/${sessionId}`);
        const data = await response.json();
        
        if (data.success) {
            const config = data.data.config;
            const proxyInfo = config.proxyServerCredentials;
            
            let debugInfo = `会话 ${sessionId} 配置信息：\n\n`;
            debugInfo += `状态: ${data.data.status}\n`;
            debugInfo += `创建时间: ${new Date(data.data.createdAt).toLocaleString()}\n`;
            debugInfo += `最后活动: ${new Date(data.data.lastActivity).toLocaleString()}\n\n`;
            
            debugInfo += `代理配置:\n`;
            if (proxyInfo && proxyInfo.address) {
                debugInfo += `- 地址: ${proxyInfo.address}\n`;
                debugInfo += `- 协议: ${proxyInfo.protocol || 'http'}\n`;
                debugInfo += `- 用户名: ${proxyInfo.username || '无'}\n`;
                debugInfo += `- 密码: ${proxyInfo.password ? '已设置' : '无'}\n`;
                debugInfo += `- 原生代理模式: ${config.useNativeProxy ? '启用' : '禁用'}\n`;
            } else {
                debugInfo += `- 未配置代理\n`;
            }
            
            debugInfo += `\n其他配置:\n`;
            debugInfo += `- 多设备模式: ${config.multiDevice ? '启用' : '禁用'}\n`;
            debugInfo += `- 无头模式: ${config.headless ? '启用' : '禁用'}\n`;
            debugInfo += `- 会话数据路径: ${config.sessionDataPath}\n`;
            
            alert(debugInfo);
        } else {
            showToast('获取会话配置失败: ' + data.error, 'error');
        }
    } catch (error) {
        console.error('调试会话配置失败:', error);
        showToast('调试会话配置失败: ' + error.message, 'error');
    }
} 