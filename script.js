let myLibrary = [
    {title: 'Game of Thrones', author: 'J.R.R. Tolkien', pages: 234, read: true},
    {title: 'Harry Potter', author: 'J.K. Rowling', pages: 564, read: false}
];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const booksGrid = document.querySelector('.books-grid');
const addBookForm = document.querySelector('#addBookForm');
const modal = document.getElementById('modal');
const addBookBtn = document.querySelector('.add-book-btn');
const closeModalBtn = document.querySelector('.close-button');
const overlay = document.getElementById('overlay');

function addBookToLibrary(e) {
    e.preventDefault();
    const newBook = getBookFromInput();
    myLibrary.push(newBook);
    updateBooksGrid();
    closeModal();
}

function getBookFromInput() {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const read = document.querySelector('#read').checked;
    return new Book(title, author, pages, read);
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    const title = document.createElement('h3');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card');
    buttonGroup.classList.add('button-group');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');
    readBtn.addEventListener('click', toggleRead);
    removeBtn.addEventListener('click', removeBook);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages + ' pages';
    removeBtn.textContent = 'Remove';

    if (book.read) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('btn-green');
    } else {
        readBtn.textContent = 'Not Read';
        readBtn.classList.add('btn-red');
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);
}

function updateBooksGrid() {
    booksGrid.innerHTML = '';
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

function removeBook(e) {
    const title = e.target.parentNode.parentNode.firstChild.textContent;
    const newLibrary = myLibrary.filter(book => book.title !== title);
    myLibrary = newLibrary;
    updateBooksGrid();
}

function toggleRead(e) {
    const title = e.target.parentNode.parentNode.firstChild.textContent;
    const book = myLibrary.find(book => book.title === title);
    book.read = !book.read;
    updateBooksGrid();
}

function openModal() {
    addBookForm.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

addBookForm.addEventListener('submit', addBookToLibrary);
addBookBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
updateBooksGrid();