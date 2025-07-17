const { SessionManager } = require('./dist/controllers/SessionManager.js');
const { DEFAULT_MULTI_SESSION_CONFIG } = require('./dist/config/multiSessionConfig.js');

console.log('Starting QR code debug test...');

async function testQRCodeGeneration() {
    try {
        console.log('1. Creating SessionManager...');
        const sessionManager = new SessionManager(DEFAULT_MULTI_SESSION_CONFIG);
        
        console.log('2. Creating session with waitForQR=true...');
        const sessionId = 'debug_test_' + Date.now();
        
        const result = await sessionManager.createSession(sessionId, {
            multiDevice: true,
            headless: true
        }, true); // waitForQR = true
        
        console.log('3. Session creation result:', result);
        
        if (result.success && result.qrCode) {
            console.log('SUCCESS: QR code received!');
            console.log('QR code length:', result.qrCode.length);
            console.log('QR code preview:', result.qrCode.substring(0, 100) + '...');
        } else {
            console.log('FAILED: No QR code received');
        }
        
        // Cleanup
        await sessionManager.removeSession(sessionId);
        await sessionManager.cleanup();
        
    } catch (error) {
        console.error('Error during test:', error);
        process.exit(1);
    }
}

testQRCodeGeneration(); 