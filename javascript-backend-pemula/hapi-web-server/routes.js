const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            const { name, location } = request.query

            /* 
            const response = h.response('success')

            response.type('text/plain')
            response.header('X-Custom', 'some-value')

            return response
            */

            return h.response('success')
                .type('text/plain')
                .header('X-Custom', 'some-value')

            // return `Hello, ${name} from ${location}`
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Method tidak dapat diakses'
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About Page'
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Page Not Found'
        },
    },
    {
        method: 'GET',
        path: '/users/{username?}',
        handler: (request, h) => {
            const { lang } = request.query
            const { username = 'Tidak dikenal' } = request.params

            if(lang == 'id') {
                return `Halooo, ${username}`
            }

            return `Hello, ${username}`
        },
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload
            return `Welcome ${username}`
        },
    },
]

module.exports = routes