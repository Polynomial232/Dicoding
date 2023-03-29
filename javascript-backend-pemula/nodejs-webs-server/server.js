const http = require('http'); 

// console.log('Halo, kita akan belajar membuat server');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html')
    response.setHeader('X-Powered-By', 'NodeJS');
    
    const { method, url } = request
    
    if(url == '/') {
        response.statusCode = 200
        response.end(JSON.stringify({
            message: "path /"
        }))
    }else if(url == '/about') {
        if(method == 'GET') {
            response.statusCode = 200
            // response.end('<h1>GET!</h1>')
            response.end(JSON.stringify({
                message: 'GET!'
            }))
        }else if(method == 'POST') {
            let body = []

            response.statusCode = 200
            request.on('data', (chunk) => {
                body.push(chunk)
            })
            request.on('end', () => {
                body = Buffer.concat(body).toString()
                const { name } = JSON.parse(body)
                response.end(JSON.stringify({
                    message: `POST ${name}!`
                }))
            })
        }else if(method == 'PUT') {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'PUT!'
            }))
        }else if(method == 'DELETE') {
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'DELETE!'
            }))
        }else {
            response.statusCode = 404
            response.statusMessage = 'method tidak ditemukan'
            response.end(JSON.stringify({
                message: 'method tidak ditemukan!'
            }))
        }
    }else {
        response.statusCode = 404
        response.statusMessage = 'routing tidak ditemukan'
        response.end(JSON.stringify({
            message: 'routing tidak ditemukan!'
        }))
    }
}

const server = http.createServer(requestListener)

const port = 5000;
const host = 'localhost'

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`)
})