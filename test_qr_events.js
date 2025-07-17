const { ev } = require('./dist/index.js');

console.log('Testing QR event listener...');

// 监听所有事件来调试
ev.on('**', (data, sessionId, namespace) => {
    console.log(`EVENT: ${namespace}, Session: ${sessionId}, Data: ${typeof data === 'string' ? data.substring(0, 50) : typeof data}`);
});

// 专门监听QR码事件
ev.on('qr.**', (qrcode) => {
    console.log('QR EVENT CAUGHT!');
    console.log('QR length:', qrcode ? qrcode.length : 'null');
});

console.log('Event listeners set up. Monitoring for 60 seconds...');

setTimeout(() => {
    console.log('Test completed');
    process.exit(0);
}, 60000); 