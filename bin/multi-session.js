#!/usr/bin/env node

/**
 * Open-WA Multi-Session Server
 * Supports running multiple WhatsApp sessions simultaneously
 */
const express = require('express');
const http = require('http');
const path = require('path');
const { log } = require('../dist/logging/logging');
const { version } = require('../package.json');
const { MultiSessionAPI } = require('../dist/api/MultiSessionAPI');
const { initMultiSessionChatwoot, multiSessionChatwoot } = require('../dist/cli/integrations/chatwoot');
const { SessionManager, globalSessionManager } = require('../dist/controllers/SessionManager');

// Import the shared express app and its setup functions
const { app, setUpExpressApp, setupMediaMiddleware } = require('../dist/cli/server');

// This block is preserved as it correctly handles command-line help and version flags.
const args = process.argv.slice(2);
const helpFlags = ['-h', '--help'];
const versionFlags = ['-v', '--version'];

if (args.some(arg => helpFlags.includes(arg))) {
    console.log(`
🤖 Open-WA Multi-Session Server (Corrected Single-Server Architecture)

Usage:
  node bin/multi-session.js [options]

Options:
  --port <port>           Server port (default: 8081)
  --host <host>           Server host (default: 0.0.0.0)
  --webhook-host <host>   Publicly accessible host/IP for Chatwoot webhooks (default: localhost)
  -h, --help             Show this help
  -v, --version          Show version
    `);
    process.exit(0);
}

if (args.some(arg => versionFlags.includes(arg))) {
    console.log(`Open-WA Multi-Session Server v${version}`);
    process.exit(0);
}

// This function correctly parses arguments and is preserved.
const parseArgs = () => {
    const config = {};
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const nextArg = args[i + 1];
        switch (arg) {
            case '--port':
                config.port = parseInt(nextArg);
                i++;
                break;
            case '--webhook-host':
                config.webhookHost = nextArg;
                i++;
                break;
            case '--host':
                config.host = nextArg;
                i++;
                break;
        }
    }
    return config;
};

// Main startup function, now unified into a single server architecture.
async function start() {
    try {
        console.log('🚀 Starting Open-WA Multi-Session Server (Unified Architecture)...');
        const cliConfig = parseArgs();

        // 1. Setup the Express app, which correctly includes JSON parsing.
        setUpExpressApp();
        
        const port = cliConfig.port || 8081;
        const host = cliConfig.host || '0.0.0.0';
        const webhookHost = cliConfig.webhookHost || 'localhost';

        // 2. Initialize the global session manager. This is a critical step.
        const manager = new SessionManager({});
        Object.assign(globalSessionManager, manager);
        log.info('Global Session Manager Initialized.');

        // 3. Initialize Chatwoot integration service.
        initMultiSessionChatwoot({
            webhookBaseUrl: `http://${webhookHost}:${port}/api/v1/sessions`
        });
        log.info('Chatwoot Integration Service Initialized.');

        // 4. Setup the Multi-Session API routes on the single, unified app.
        const multiSessionAPI = new MultiSessionAPI();
        app.use('/api/v1', multiSessionAPI.getRouter());
        log.info('Multi-Session API routes configured.');
        
        // 5. Setup media handling middleware.
        setupMediaMiddleware();
        log.info('Media middleware configured.');

        // 6. Add Web Management Interface with correct absolute paths
        const webUIPath = path.join(__dirname, '../web-ui');
        app.use('/assets', express.static(path.join(webUIPath, 'assets')));
        
        app.get('/', (req, res) => {
            res.sendFile(path.join(webUIPath, 'index.html'));
        });
        app.get('/dashboard', (req, res) => {
            res.sendFile(path.join(webUIPath, 'index.html'));
        });
        log.info('Web Management Interface configured.');

        // 7. Create and start the single, unified HTTP server.
        const server = http.createServer(app);
        server.listen(port, host, () => {
            log.info(`✅ Server is unified and running at http://${host}:${port}`);
            log.info(`🌐 Web Management Interface: http://${host}:${port}`);
            log.info(`📡 API Base URL: http://${host}:${port}/api/v1`);
        });

    } catch (error) {
        console.error('❌ FATAL: Failed to start Multi-Session Server:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

// Set a debug flag for more verbose logging, then start the server.
process.env.DEBUG = 'true';
start(); 