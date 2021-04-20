// use this for our sql db logic and queries
const BookService = {
  getAllBooks(db) {
    return db("books").select("*");
  },

  addBook(db, newBook) {
    return db("books")
      .insert(newBook)
      .returning("*")
      .then(([book]) => book);
  },

  getBookById(db, book_id) {
    return db.from("books").select("*").where({ book_id }).first();
  },

  updateBook(db, book_id, fields) {
    return db("books")
      .where({ book_id })
      .update(fields)
      .returning("*")
      .then(([book]) => book);
  },

  checkOutBook(db, book_id) {
    let todaysTimestamp = new Date()
    let checkoutPeriodDays = 14
    todaysTimestamp.setDate(todaysTimestamp.getDate() + checkoutPeriodDays);
    let returnTimestamp = todaysTimestamp.toUTCString()

    return db("books")
      .where({book_id})
      .update({
          'available': false,
          'return_date': returnTimestamp
      })
      .returning("*")
      .then(([book]) => book);
  },

  serializeBook(book) {
    return {
      bookId: book.book_id,
      title: book.title,
      author: book.author,
      book_condition: book.book_condition,
      available: book.available,
      return_date: book.return_date,
    };
  },

  serializeBooks(books) {
    return books.map((book) => this.serializeBook(book));
  },

 

  checkInFields(condition) {
    return {
      available: true,
      book_condition: condition.value,
      return_date: `Now()`,
    };
  },
};

module.exports = BookService;
