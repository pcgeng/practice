const fs = require('fs');
const zlib = require('zlib');

const filepath = 'practice/nodejs/static/stream-test.txt';
fs.stat(filepath, (err) => {
    if (err) {
        console.log(err);
    } else {
        // read data stream
        let rs = fs.createReadStream(filepath);
        rs.on('data', (chunk) => {
            console.log(`Received data of ${chunk.length} bytes`);
        });
        rs.on('end', () => {
            console.log('Data receiving done');
        });
        rs.on('error', (err) => {
            console.log(err);
        });

        // file compression
        let gz = zlib.createGzip();

        // write data stream
        let ws = fs.createWriteStream('practice/nodejs/static/stream-test.txt.gz');
        ws.on('finish', () => {
            console.log('Data writing done');
        })
        ws.on('error', (err) => {
            console.log(err);
        });

        rs.pipe(gz).pipe(ws);
    }
})