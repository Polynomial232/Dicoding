const fs = require('fs');
const path = require('path')

let filePath = path.resolve(__dirname, 'notes.txt');
const data = fs.readFileSync(filePath, 'UTF-8');
console.log(data);