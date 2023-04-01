const noName = (action) => {
    return `Gagal ${action} buku. Mohon isi nama buku`
}
const readPageGrather = (action) => {
    return `Gagal ${action} buku. readPage tidak boleh lebih besar dari pageCount`
}

module.exports = {
    noName,
    readPageGrather
}