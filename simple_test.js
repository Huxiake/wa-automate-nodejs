const { create, ev } = require('./dist/index.js');

console.log('Starting simple QR test...');

let qrReceived = false;

// 监听QR码
ev.on('qr.**', (qrcode) => {
    console.log('QR CODE RECEIVED!');
    console.log('Length:', qrcode.length);
    console.log('Preview:', qrcode.substring(0, 100));
    qrReceived = true;
    
    // 保存到文件验证
    const fs = require('fs');
    const imageBuffer = Buffer.from(qrcode.replace('data:image/png;base64,',''), 'base64');
    fs.writeFileSync('test_qr.png', imageBuffer);
    console.log('QR code saved to test_qr.png');
    
    process.exit(0);
});

// 设置超时
setTimeout(() => {
    if (!qrReceived) {
        console.log('TIMEOUT: No QR code received in 30 seconds');
        process.exit(1);
    }
}, 30000);

// 创建client
create({
    sessionId: 'simple_test',
    multiDevice: true,
    headless: true,
    qrLogSkip: true
}).then(() => {
    console.log('Client created, waiting for QR...');
}).catch(error => {
    console.error('Error creating client:', error);
    process.exit(1);
}); 