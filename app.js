// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI class
class UI {
  static displayBooks() {

    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;
    list.appendChild(row);
  }

  static removeBook(el) {
    if(el.classList.contains("delete")){
      el.parentElement.parentElement.remove();
    }
  }

  static alert(message, className){

    // Create the alert & add the appropriate classes and the message
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    // div.style = "transition: display 0.5s ease-in";
    div.appendChild(document.createTextNode(message));

    // Append the alert ijn the approppriate place in the DOM
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    // Remove the alert from the actual DOM after 3 seconds of popping up
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000)

  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}

// Display Books - Event
document.addEventListener("DOMContentLoaded", UI.displayBooks);


// Add a Book - Event
document.querySelector("#book-form").addEventListener("submit", (e) => {
  
  // Prevent default submit behavior
  e.preventDefault();

  // Get the values from the form inputs
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //Instatiate a  brand new book
  const book = new Book(title, author, isbn);
  
  // Add book to th UI
  UI.addBookToList(book);

  // Add the book to the local Storage
  Store.addBook(book);

  // Show alert of success if the book were added to the book list
  UI.alert("The book was added successfully", "success");

  // Clear Up the fields
  UI.clearFields();
})

// Remove a Book
document.querySelector("#book-list").addEventListener("click", (e) => {

  // Remove the book frokm the UI
  UI.removeBook(e.target)

  // Remove the books from the localStorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

  // Alerting the user that a book was removed
  UI.alert("Book was removed successfully from the book list", "danger")
});

// Local Store
class Store{
  static getBooks(){
    if(localStorage.getItem("books") === null){
      return [];
    } 

    return JSON.parse(localStorage.getItem("books"));
  }

  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn){
    const books = Store.getBooks();
    const newBooks = books.filter(book => book.isbn !== isbn);

    localStorage.setItem("books", JSON.stringify(newBooks));
  }
}

