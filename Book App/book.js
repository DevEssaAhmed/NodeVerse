const express = require("express");

const app = express();

app.use(express.json()); // needed to parse JSON request bodies

let books = [
	{ id: 1, title: "Book 1", author: "Author 1" },
	{ id: 2, title: "Book 2", author: "Author 2" },
	{ id: 3, title: "Book 3", author: "Author 3" },
];
// * This sets up an array called books to store book objects. For the purposes of this example, we've hardcoded some initial books into the array.

// Route to get all books
app.get("/books", (req, res) => {
	// TODO: return a status of ok as well
	res.send(books);
});
// * This sets up a route that handles GET requests to the /books URL path. When a GET request is received, the server responds with the 'books' array, which is sent as a JSON response using the 'res.send()' method.

// app.get("/books/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const book = books.find((b) => b.id === id);
//   if (book) {
//     res.send(book);
//   } else {
//     res.status(404).send("Book not found");
//   }
// });

app.get("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const book = books.find((e) => e.id === id);
	// RECOMMENDATION: don't use ternary instead use guard clause if statement:
	// https://medium.com/@scadge/if-statements-design-guard-clauses-might-be-all-you-need-67219a1a981a

	// book ? res.send(book) : res.status(404).send("Book not found");

	// modified version
	// RECOMMENDATION: try to make a responsee object something like:
	// { data, message: "", staus, error: true | false }
	// It will help in better responses and faster integration can be done by the client
	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}
	res
		.status(200)
		.json({ data: book, messag: "Book with id " + id, status: 200 });
});
// * This sets up a route that handles GET requests to the /books/:id URL path, where :id is a parameter that specifies the ID of the book to retrieve. When a GET request is received, we extract the id parameter from the request using req.params.id. We then use the Array.find() method to search the books array for a book object with an id that matches the requested id. If a matching book is found, we send it as a JSON response using res.send(). If no matching book is found, we respond with a 404 status code and a message using res.status().send().

// RECOMMENDATION: add body validation to validate the req.body
// Like we do form object validation
app.post("/books", (req, res) => {
	const book = req.body;
	book.id = books.length + 1;
	books.push(book);
	// add a status code as a response
	// res.send(book);
	// use status of 201 when creating resources on server
	res
		.status(201)
		.json({ message: "Book created succesfully", data: book, status: 201 });
});
// * This sets up a route that handles POST requests to the /books URL path. When a POST request is received, we extract the book object from the request body using req.body. We then assign the book a new id value that is one greater than the current number of books in the array. We add the new book object to the books array using Array.push(). Finally, we send the new book object as a JSON response using res.send().

// app.put("books/id:", (req, res) => {
//   const id = pareseInt(req.params.id);
//   const bookIndex = books.findIndex((b) => b.id === id);
//     if (bookIndex !== -1) {
//     const updatedBook = req.body;
//     updatedBook.id = id;
//     books[bookIndex] = updatedBook;
//     res.send(updatedBook);
//   } else {
//     res.status(404).send('Book not found');
//   }
// });
// ? Refactoringz
app.put("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const bookIndex = books.findIndex((b) => b.id === id);
	// again logic is not clear avoid using ternary when working with apis
	// use guard clauses if you can
	// bookIndex !== -1
	//   ? ((updatedBook = req.body),
	//     (updatedBook.id = id),
	//     (books[bookIndex] = updatedBook),
	//     res.send(updatedBook))
	//   : res.status(400).send("Book not found");

	if (bookIndex === -1) {
		return res
			.status(404)
			.json({ message: "Book not found", error: true, status: 404 });
	}

	const updatedBook = req.body;
	updatedBook.id = id;
	books[bookIndex] = updatedBook;

	res
		.status(200)
		.json({
			message: `Book with id ${id} updated successfully`,
			data: updatedBook,
			status: 200,
		});
});

// ! findIndex() returns the index of the first element that passes a test (provided by a function) otherwise it will give value of -1
// *

// Route to delete a book by id
app.delete("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const bookIndex = books.findIndex((b) => b.id === id);
	// adding a proper response ewould b better
	// use guard clause again

	// if (bookIndex !== -1) {
	//   books.splice(bookIndex,1);
	//   res.send("Book deleted");
	// } else {
	//   res.status(404).send("Book not found");
	// }

	if (bookIndex === -1) {
		return res.status(404).json({ message: "Book not found" });
	}
	books.splice(bookIndex, 1);
	res
		.status(200)
		.json({
			message: `Book with id ${id} deleted successfully`,
			status: 200,
			data: null,
		});
});

app.listen(3000, () => {
	console.log("Server has been started on Port 3000");
});
