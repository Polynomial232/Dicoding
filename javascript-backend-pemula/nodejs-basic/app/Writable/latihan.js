const fs = require('fs')
const path = require('path')

const readText = fs.createReadStream(path.resolve(__dirname, 'input.txt'), {
    highWaterMark: 15
})

const writeText = fs.createWriteStream(path.resolve(__dirname, 'output.txt'))

readText.on('readable', () => {
    try{
        writeText.write(`${readText.read()}\n`)
    }catch(e){
        console.log(e)
    }
})

readText.on('end', () => {
    writeText.end()
    console.log('Done')
})