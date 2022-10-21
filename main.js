"use strict";

// books will be stored here
let myLibrary = [];

// will create books
class Book {
  constructor(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
  }
}

// will append the book within the page
class UI extends Book {
  constructor(title, author, pages, readState) {
    super(title, author, pages, readState);
  }
  appendBook(book) {
    const lybraryBooks = document.querySelector(".library__books");

    const libraryBook = document.createElement("section");
    libraryBook.classList.add("library__book");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = this.title;

    const bookAuthor = document.createElement("h2");
    bookAuthor.textContent = this.author;

    const bookPages = document.createElement("h2");
    bookPages.textContent = this.pages;

    const bookReadState = document.createElement("button");
    if (this.readState === true) {
      this.readState = "Read";
      bookReadState.style.background = "#83f084";
    } else {
      this.readState = "Not Read";
      bookReadState.style.background = "#f95959";
    }
    bookReadState.textContent = this.readState;
    bookReadState.classList.add("button", "button__status");

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("button", "button__remove");

    lybraryBooks.appendChild(libraryBook);
    libraryBook.appendChild(bookTitle);
    libraryBook.appendChild(bookAuthor);
    libraryBook.appendChild(bookPages);
    libraryBook.appendChild(bookReadState);
    libraryBook.appendChild(removeButton);
    const removeBook = new Features().removeBook(book);
    const toggleBook = new Features().toggleStatus(book);
  }
}

class Features {
  removeBook(book) {
    let indexNumber = myLibrary.indexOf(book);
    const removeButton = document.querySelectorAll(".button__remove")[indexNumber];
    const libraryBook = document.querySelectorAll(".library__book")[indexNumber];
    const library = document.querySelector(".library__books");
    libraryBook.dataset.book = indexNumber;
    removeButton.dataset.book = indexNumber;
    removeButton.addEventListener("click", function () {
      console.log(indexNumber, libraryBook.dataset.book);
      indexNumber = myLibrary.indexOf(book);
      library.removeChild(libraryBook);
      myLibrary.splice(indexNumber, 1);
    });
  }

  toggleStatus(book) {
    let indexNumber = myLibrary.indexOf(book);
    const bookReadState = document.querySelectorAll(".button__status")[indexNumber];
    bookReadState.dataset.book = indexNumber;

    bookReadState.addEventListener("click", function () {
      if (bookReadState.textContent === "Not Read") {
        bookReadState.textContent = "Read";
        bookReadState.style.background = "#83f084";
      } else if (bookReadState.textContent === "Read") {
        bookReadState.textContent = "Not Read";
        bookReadState.style.background = "#f95959";
      }
    });
  }
}

class Form {
  showForm() {
    const addButton = document.querySelector(".library__add");

    addButton.addEventListener("click", function () {
      const overlay = document.querySelector(".overlay");
      const form = document.querySelector(".form");

      overlay.style.visibility = "visible";
      form.style.visibility = "visible";
    });
    this.closeForm();
    this.data();
  }

  closeForm() {
    const overlay = document.querySelector(".overlay");
    const form = document.querySelector(".form");
    const inputs = document.querySelectorAll(".input");

    overlay.addEventListener("click", function () {
      overlay.style.visibility = "hidden";
      form.style.visibility = "hidden";
      inputs.forEach((input) => {
        input.value = "";
      });
    });
  }

  data() {
    const submitButton = document.querySelector(".form__submit");
    const inputs = document.querySelectorAll(".input");
    const overlay = document.querySelector(".overlay");
    const form = document.querySelector(".form");

    submitButton.addEventListener("click", function () {
      let values = [];
      inputs.forEach((input) => {
        values.push(input.value);
      });
      const book = new UI(values[0], values[1], values[2], inputs[3].checked);
      myLibrary.push(book);

      book.appendBook(book);

      overlay.style.visibility = "hidden";
      form.style.visibility = "hidden";
      inputs.forEach((input) => {
        input.value = "";
      });
    });
  }
}

// will add books into the array and then calling the appendBook method
function addBookToLibrary() {
  const showForm = new Form().showForm();
}
addBookToLibrary();
