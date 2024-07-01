# Lesson: Understanding CRUD Operations in JavaScript

## Introduction
CRUD is an acronym that stands for Create, Read, Update, and Delete, which are the four basic functions of persistent storage in web development. In this lesson, we’ll go through each operation using JavaScript and interact with a simple data structure.

## Sample Data
For our example, we'll use an array of books, where each book is an object with `id`, `title`, and `author`.

```javascript
let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];
```

## CRUD Operations in JavaScript
Create (Adding Data)
The "Create" operation can be performed in JavaScript by adding an object to our books array.

```javascript
function createBook(id, title, author) {
  const newBook = { id, title, author };
  books.push(newBook);
}

let book = {
  id: 3,
  title: "Things Fall Apart",
  author: "Chinua Achebe"
}
createBook(book.id, book.title, book.author)
```
In the above example, you can call createBook with the properties of the book object as separate arguments to create a new book. 
Alternatively, you can modify the createBook function to accept a single object instead of three separate arguments. This way, you can pass the book object directly to the function. This approach reads better.

```javascript
function createBook(book) {
 books.push(book);
}

let book = {
 id: 3,
 title: "Things Fall Apart",
 author: "Chinua Achebe"
}
createBook(book);
```

## Read (Retrieving Data)
The "Read" operation is used to retrieve data from the array. We can either get all the books or a single book by its id.

```javascript
function getBooks() {
  return books;
}

function getBookById(bookId) {
  return books.find(book => book.id === bookId);
}
```

## Update (Modifying Data)
To "Update" a book, we first find it by its id, and then modify its properties.

```javascript
function updateBook(bookId, newTitle, newAuthor) {
  const book = books.find(book => book.id === bookId);
  book.title = newTitle;
  book.author = newAuthor;
}
```

## Delete (Removing Data)
Finally, the "Delete" operation is used to remove a book from the array.

```javascript
function deleteBook(bookId) {
  books = books.filter(book => book.id !== bookId);
}
```

# Performing with Data Obtained from HTML on Input Field
To demonstrate CRUD operations using JavaScript with data obtained from HTML input fields, let's build upon the provided lesson and examples. We'll create a simple application that allows users to manage a list of books, where each book is represented by an object with `id`, `title`, and `author`. The operations will be performed through a form in HTML, and JavaScript will handle the CRUD logic.

#### HTML Setup
First, let's set up the HTML form for adding a new book:
```html
<form id="bookForm">
 <input type="text" id="title" placeholder="Title">
 <input type="text" id="author" placeholder="Author">
 <button type="submit">Add Book</button>
</form>
<div id="bookList"></div>
```
<form id="bookForm">
 <input type="text" id="title" placeholder="Title">
 <input type="text" id="author" placeholder="Author">
 <button type="submit">Add Book</button>
</form>
<div id="bookList"></div>

#### JavaScript Setup
We'll start by defining the books array and the functions for CRUD operations:
```javascript
let books = [
 { id: 1, title: "1984", author: "George Orwell" },
 { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" }
];

function createBook(title, author) {
 const newBook = { id: books.length + 1, title, author };
 books.push(newBook);
 displayBooks();
}

function displayBooks() {
 const bookList = document.getElementById('bookList');
 bookList.innerHTML = '';
 books.forEach(book => {
    bookList.innerHTML += `
      <div>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
      </div>
    `;
 });
}

document.getElementById('bookForm').addEventListener('submit', function(e) {
 e.preventDefault();
 const title = document.getElementById('title').value;
 const author = document.getElementById('author').value;
 createBook(title, author);
});
```

#### Explanation
- Create Book: The `createBook` function takes the title and author from the input fields, creates a new book object, and adds it to the `books` array. It then calls `displayBooks` to update the display.
- Display Books: The `displayBooks` function clears the current list of books in the HTML and repopulates it with the updated `books` array.
- Form Submission: An event listener is added to the form to handle the submission. It prevents the default form submission behavior, retrieves the values from the input fields, and calls `createBook` with these values.

To extend this example to include Read, Update, and Delete operations, you would:
- Read: Implement a function to display the list of books, which is already done by displayBooks.
- Update: Add a way to select a book for editing, provide input fields to edit the book's details, and a button to save the changes.
- Delete: Add a delete button next to each book that, when clicked, removes the book from the books array and updates the display.
- At this point, you may want to try it yourself using the guide we provided above before moving on to see the solution below. Just remember that the Read, Update, and Delete operations, you would follow a similar pattern as in create above: capture user input, perform the operation on the books array, and update the display accordingly.


To demonstrate Update and Delete operations using JavaScript with data obtained from HTML input fields, let's build upon the provided examples and lessons. We'll continue with the simple application that allows users to manage a list of books, where each book is represented by an object with id, title, and author. The operations will be performed through a form in HTML, and JavaScript will handle the CRUD logic.


## Update Operation
To update a book, we first need to select the book for editing, provide input fields to edit the book's details, and a button to save the changes. Here's how you can implement the update functionality:

#### HTML for Editing
Add a form for editing a book:
<form id="editBookForm" style="display: none;">
 <input type="text" id="editTitle" placeholder="Title">
 <input type="text" id="editAuthor" placeholder="Author">
 <button type="submit">Save Changes</button>
</form>

JavaScript for Update
Implement the `updateBook` function and a way to trigger it:

```javascript
function updateBook(bookId, newTitle, newAuthor) {
 const book = books.find(book => book.id === bookId);
 if (book) {
    book.title = newTitle;
    book.author = newAuthor;
    displayBooks(); // Update the display
 }
}

// Function to show the edit form for a specific book
function showEditForm(bookId) {
 const book = books.find(book => book.id === bookId);
 if (book) {
    document.getElementById('editTitle').value = book.title;
    document.getElementById('editAuthor').value = book.author;
    document.getElementById('editBookForm').style.display = 'block';
 }
}

// Event listener for the edit form submission
document.getElementById('editBookForm').addEventListener('submit', function(e) {
 e.preventDefault();
 const bookId = /* the ID of the book being edited */;
 const newTitle = document.getElementById('editTitle').value;
 const newAuthor = document.getElementById('editAuthor').value;
 updateBook(bookId, newTitle, newAuthor);
 document.getElementById('editBookForm').style.display = 'none'; // Hide the form after updating
});
```

## Delete Operation
To delete a book, you can add a delete button next to each book that, when clicked, removes the book from the books array and updates the display.

#### HTML for Deleting
Add a delete button for each book:
<div id="bookList"></div>

JavaScript for Delete
Implement the `deleteBook` function and update the display accordingly:
```javascript
function deleteBook(bookId) {
 books = books.filter(book => book.id !== bookId);
 displayBooks(); // Update the display
}

// Update the displayBooks function to include delete buttons
function displayBooks() {
 const bookList = document.getElementById('bookList');
 bookList.innerHTML = '';
 books.forEach(book => {
    bookList.innerHTML += `
      <div>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <button onclick="deleteBook(${book.id})">Delete</button>
      </div>
    `;
 });
}
```
## Conclusion
CRUD operations are essential in web development, as they allow us to manage data effectively. By mastering these operations, you will be able to handle most of the server-side logic required for web applications.

## Next Steps
Try implementing these functions yourself and test them to see how they manipulate the books array.


