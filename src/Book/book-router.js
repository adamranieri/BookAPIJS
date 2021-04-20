// we use this as our controller to manage routes
const express = require('express')
const BookService = require('./book-service')

const bookRouter = express.Router()
const jsonBodyParser = express.json()

bookRouter
    .route('/')
    .get((req, res, next) => {
        BookService.getAllBooks(req.app.get('db'))
          .then(books => {
              const serializedBooks = books.map(book => BookService.serializedBook(book))
              res.status(200).json(serializedBooks)
          })
          .catch(next)
    })


module.exports = bookRouter