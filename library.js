let myLibrary = [
    new Book("Pride and Prejudice", "Austen", 432, true),
    new Book("Lord of the Rings", "Tolkein", "too many", false)
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const readMessage = this.read ? "already read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readMessage}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    const bookShelf = document.querySelector(".book-shelf");
    for (let i = 0; i < myLibrary.length; i++) {
        const bookCard = document.createElement("section");
        const book = myLibrary[i];
        const title = document.createElement("h3");
        title.textContent = `${book.title}`;
        bookCard.appendChild(title);
        const author = document.createElement("h4");
        author.textContent = `by: ${book.author}`;
        bookCard.appendChild(author);
        const pages = document.createElement("p");
        pages.textContent = `Number of Pages: ${book.pages}`;
        bookCard.appendChild(pages);
        const read = document.createElement("p");
        read.textContent = book.read ? `Read \u2705` : "Unread \uD83D\uDC4E";
        bookCard.appendChild(read);
        bookShelf.appendChild(bookCard);
    }
}

function displayAddBookForm() { // Displays the form to add a new book.
    const newBookForm = document.createElement("form");
    createInputs(["title", "author", "pages", "read"], ["text", "text", "number", "checkbox"], newBookForm);
    const addBook = document.createElement("button");
    addBook.textContent = "ADD BOOK"
    addBook.addEventListener("click", handleSubmit);
    newBookForm.appendChild(addBook);
    const main = document.querySelector("main");
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    main.appendChild(newBookForm);
}

function handleSubmit(event) { // Adds new book to the library and displays library.
    event.preventDefault();

    // Add the new book to the library.
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").checked;
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(new Book(title, author, pages, read));

    // Clear the form UI and return index page's HTML to original state.
    const main = document.querySelector("main");
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    const div = document.createElement("div");
    div.classList.add("book-shelf");
    main.appendChild(div);
    const buttonDiv = document.createElement("div");
    div.classList.add("button-container");
    const button = document.createElement("button");
    button.textContent = "NEW BOOK";
    button.addEventListener("click", displayAddBookForm);
    buttonDiv.appendChild(button);
    main.appendChild(buttonDiv);

    // Display Books!
    displayBooks();
}

function createInputs(inputFields, inputTypes, form) {
    for (let i = 0; i < inputFields.length; i++) {
        const inputField = inputFields[i];
        const inputType = inputTypes[i];

        // Make the input's label and append it to its container div.
        const inputContainer = document.createElement("div");
        const label = document.createElement("label");
        if (inputField === "read") {
            label.textContent = "I have read this book"
        } else {
            label.textContent = inputField.toUpperCase() + ":";
        }
        label.for = inputField;
        inputContainer.appendChild(label);

        // Make the input field and append it to its container.
        const input = document.createElement("input");
        input.type = inputType;
        input.name = inputField;
        input.id = inputField;
        input.required = true;
        inputContainer.appendChild(input);

        // Append both the div containing the input and label to the form.
        form.appendChild(inputContainer);
    }
}


displayBooks();
const button = document.querySelector("button");
button.addEventListener("click", displayAddBookForm);
