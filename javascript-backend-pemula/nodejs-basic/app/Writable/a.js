const fs = require('fs');
const path = require('path')
 
const writableStream = fs.createWriteStream(path.resolve(__dirname, 'output.txt'));