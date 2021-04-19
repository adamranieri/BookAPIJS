export default class Book{
    constructor(id, title, author, condition, available, returnDate){
        this.id = id;
        this.title = title;
        this.author = author;
        this.condition = condition || 1;
        this.available = available || false;
        this.returnDate = returnDate || Date.now() + 7  ;
    }
}