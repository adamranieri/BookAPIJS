export default class Book{
    bookId;
    title;
    author;
    condtion;
    available;
    return;

    constructor(id, title, author, condition, available, returnDate){
        this.bookId = id;
        this.title = title;
        this.author = author;
        this.condition = condition || 1;
        this.available = available || false;
        this.returnDate = returnDate || Date.now() + 7  ;
    }
}