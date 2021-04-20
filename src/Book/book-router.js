// we use this as our controller to manage routes
const express = require("express");
const BookService = require("./book-service");

const bookRouter = express.Router();
const jsonBodyParser = express.json();

bookRouter
  .route("/")
  .get((req, res, next) => {
    BookService.getAllBooks(req.app.get("db"))
      .then((books) => {
        //   const serializedBooks = books.map(book => BookService.serializedBook(book))
        res.status(200).json(BookService.serializeBooks(books));
      })
      .catch(next);
  })
  .post(jsonBodyParser, (req, res, next) => {
    const { title, author, book_condition } = req.body;
    for (const field of ["title", "author", "book_condition"]) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: { message: `Missing ${field} field in request body` },
        });
      }
    }
    const newBook = {
      title,
      author,
      book_condition,
      available: true,
      return_date: "now()",
    };
    return BookService.addBook(req.app.get("db"), newBook).then((book) => {
      res.status(201).json(BookService.serializeBook(book));
    });
  });

bookRouter
  .route("/:book_id")
  .all((req, res, next) => {
    BookService.getBookById(req.app.get("db"), req.params.book_id)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            error: {
              message: `Book doesn't exist, please add book or check your path param`,
            },
          });
        }
        res.book = book;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(BookService.serializeBook(res.book));
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const { title, author, available, book_condition, return_date } = req.body;
    const bookToUpdate = {
      title,
      author,
      available,
      book_condition,
      return_date,
    };

    const numberOfValues = Object.values(bookToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
        return res
          .status(400)
          .json({
              error: { message: `Request body cannot be empty`}
          })
    }

    BookService.updateBook(req.app.get("db"), req.params.book_id, bookToUpdate)
      .then((numRowsAffected) => {
        res.status(201).json(BookService.serializeBook(book));
      })
      .catch(next);
  });

bookRouter
  .route("/:book_id/in")
  .all((req, res, next) => {
    BookService.getBookById(req.app.get("db"), req.params.book_id)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            error: {
              message: `Book doesn't exist, please add book or check your path param`,
            },
          });
        }
        res.book = book;
        next();
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    const returnCondition = req.body;
    BookService.updateBook(req.app.get("db"), req.params.book_id, BookService.checkInFields(returnCondition))
      .then((book) => {
        res.status(201).json(BookService.serializeBook(book));
      })
      .catch(next);
  });


  bookRouter
  .route("/:book_id/out")
  .all((req, res, next) => {
    BookService.getBookById(req.app.get("db"), req.params.book_id)
      .then((book) => {
        if (!book) {
          return res.status(404).json({
            error: {
              message: `Book doesn't exist, please add book or check your path param`,
            },
          });
        }
        res.book = book;
        if(!res.book.available) {
            return res.status(404).json({
                error: {
                  message: `Book is already checked out`,
                },
              });
        }
        res.book = book;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    BookService.checkOutBook(req.app.get("db"), req.params.book_id)
      .then((book) => {
        res.status(201).json(BookService.serializeBook(book));
      })
      .catch(next);
  });

module.exports = bookRouter;
