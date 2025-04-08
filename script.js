const myLibrary = []; //array to store all book objects

//constructor func to create new book objs
function Book(title, author, pages, hasRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

Book.prototype.toggleRead = function () {
  this.hasRead = !this.hasRead;
};
//adds new book to my library array
function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);//adding book to lib
  displayBooks();
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function displayBooks() {
  const container = document.getElementById('book-container');
  container.innerHTML = '';

  myLibrary.forEach(book => {
    const card = document.createElement('div');
    card.classList.add('book-card'); // added class for styling
    card.setAttribute('data-id', book.id);
//book details and action buttons
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.hasRead ? 'Yes' : 'No'}</p>
      <button class="toggle-read">Toggle Read</button>
      <button class="remove-book">Remove</button>
    `;
// added event listner to toggle read status
    card.querySelector('.toggle-read').addEventListener('click', () => {
      book.toggleRead();
      displayBooks();
    });
// added event listner to remove book
    card.querySelector('.remove-book').addEventListener('click', () => {
      removeBook(book.id);
    });

    container.appendChild(card);
  });
}

// Form & Dialog Handling
const dialog = document.getElementById('book-dialog');
const form = document.getElementById('book-form');
const newBookBtn = document.getElementById('new-book-btn');
const cancelBtn = document.getElementById('cancel');

// dilouge when new book  button clicked
newBookBtn.addEventListener('click', () => dialog.showModal());
// close when cancel clicked
cancelBtn.addEventListener('click', () => dialog.close());


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const pages = parseInt(document.getElementById('pages').value);
  const hasRead = document.getElementById('hasRead').checked;


// vlidating input fields
  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, hasRead);
    form.reset();
    dialog.close();
  } else {
    alert("Please fill in all fields correctly.");
  }
});
