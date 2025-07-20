#!/usr/bin/env node

/**
 * 调试代理配置的脚本
 * 用于测试代理配置的保存和读取是否正常
 */

const fs = require('fs');
const path = require('path');

function debugProxyConfig(sessionId) {
    const sessionDir = path.join('./sessions', sessionId);
    const configPath = path.join(sessionDir, 'config.json');
    
    console.log(`\n=== 调试会话 ${sessionId} 的代理配置 ===`);
    console.log(`会话目录: ${sessionDir}`);
    console.log(`配置文件: ${configPath}`);
    
    if (!fs.existsSync(configPath)) {
        console.log('❌ 配置文件不存在');
        return;
    }
    
    try {
        const configContent = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(configContent);
        
        console.log('\n📄 配置文件内容:');
        console.log(JSON.stringify(config, null, 2));
        
        console.log('\n🔍 代理配置分析:');
        if (config.proxyServerCredentials) {
            console.log('✅ 找到代理配置:');
            console.log(`   地址: ${config.proxyServerCredentials.address}`);
            console.log(`   协议: ${config.proxyServerCredentials.protocol || 'http'}`);
            console.log(`   用户名: ${config.proxyServerCredentials.username || '无'}`);
            console.log(`   密码: ${config.proxyServerCredentials.password ? '已设置' : '无'}`);
        } else {
            console.log('❌ 未找到代理配置');
        }
        
        console.log(`\n🔧 原生代理模式: ${config.useNativeProxy ? '启用' : '禁用'}`);
        
    } catch (error) {
        console.log('❌ 读取配置文件失败:', error.message);
    }
}

function listAllSessions() {
    const sessionsDir = './sessions';
    
    console.log('\n=== 所有会话列表 ===');
    
    if (!fs.existsSync(sessionsDir)) {
        console.log('❌ sessions目录不存在');
        return [];
    }
    
    const sessionFolders = fs.readdirSync(sessionsDir).filter(file => 
        fs.statSync(path.join(sessionsDir, file)).isDirectory()
    );
    
    console.log(`找到 ${sessionFolders.length} 个会话:`);
    sessionFolders.forEach(sessionId => {
        console.log(`  - ${sessionId}`);
    });
    
    return sessionFolders;
}

// 主函数
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('用法:');
        console.log('  node debug_proxy_config.js <sessionId>  # 调试特定会话');
        console.log('  node debug_proxy_config.js --all        # 调试所有会话');
        return;
    }
    
    if (args[0] === '--all') {
        const sessions = listAllSessions();
        sessions.forEach(sessionId => {
            debugProxyConfig(sessionId);
        });
    } else {
        const sessionId = args[0];
        debugProxyConfig(sessionId);
    }
}

main();