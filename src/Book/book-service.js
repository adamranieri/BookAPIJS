// use this for our business logic and custom middleware 
const BookService = {
    getAllBooks(db) {
        return db('books').select('*')
    },

    serializedBook(book) {
        return {
            bookId: book.book_id,
            title: book.title,
            author: book.author,
            condition: book.book_condition, 
            available: book.available,
            returnDate: book.return_date
        }
    }
}

module.exports = BookService