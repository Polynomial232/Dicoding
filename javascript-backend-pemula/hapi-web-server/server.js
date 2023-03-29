const Hapi = require('@hapi/hapi')
const routes = require('./routes.js')

// console.log('Halo, kita akan belajar membuat server menggunakan Hapi');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)

    server.route(routes)
}

init()