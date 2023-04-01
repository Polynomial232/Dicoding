const { nanoid } = require('nanoid')
const books = require('./books')
const { noName, readPageGrather } = require('./message')

const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload

    const id = nanoid(16)
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt
    const finished = pageCount === readPage ? true:false

    if(name == null){
        const response = h.response({
            status: 'fail',
            message: noName('menambahkan')
        })
        response.code(400)
        return response
    }else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: readPageGrather(`menambahkan`)
        })
        response.code(400)
        return response
    }

    const newBooks = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt
    }

    books.push(newBooks)

    const isSuccess = books.filter((book) => {
        book.id == id.length > 0
    })

    if(isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201)
        return response
    }
}

const getAllBooksHandler = (request, h) => {
    const { reading, finished, name } = request.query

    if(reading){
        let booksFiltered = books.filter((book) => book.reading == true)
        const response = h.response({
            status: 'success',
            data: {
                books: booksFiltered.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        })
        response.code(200)
        return response
    }else if(finished){
        let booksFiltered = books.filter((book) => book.finished == Boolean(Number(finished)))
        const response = h.response({
            status: 'success',
            data: {
                books: booksFiltered.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        })
        response.code(200)
        return response
    }else if(name){
        let booksFiltered = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
        const response = h.response({
            status: 'success',
            data: {
                books: booksFiltered.map((book) => ({
                    id: book.id,
                    name: book.name,
                    publisher: book.publisher
                }))
            }
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'success',
        data: {
            books: books.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher
            }))
        }
    })
    response.code(200)
    return response
}

const getBookByIdHandler = (request, h) => {
    const { id } = request.params

    const book = books.filter(
        (n) => n.id == id
    )[0]

    if(book != undefined){
        return {
            status: 'success',
            data: {
                book
            }
        }
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan'
    })
    response.code(404)
    return response
}

const editBookByIdHandler = (request, h) => {
    const { id } = request.params
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload

    if(name == null){
        const response = h.response({
            status: 'fail',
            message: noName('memperbarui')
        })
        response.code(400)
        return response
    }else if(readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: readPageGrather('memperbarui')
        })
        response.code(400)
        return response
    }

    const index = books.findIndex(
        (book) => book.id === id
    )

    if(index !== -1){
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        }

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
}

const deleteBookHandler = (request, h) => {
    const { id } = request.params

    const index = books.findIndex(
        (book) => book.id === id
    )

    if(index !== -1 ){
        books.splice(index, 1)
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = { 
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookHandler
}