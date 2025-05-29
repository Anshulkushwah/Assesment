const express = require("express");
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const { getBooks, getBookById, searchBooks, addBook } = require("../controller/bookController");
const router = express.Router();

// Add a new book
router.post("/add_books", auth,addBook);

// Get all books with pagination
router.get("/getAll",getBooks);

// Get book details by ID
router.get("/getBook/:id", getBookById);

// Search books by title or author
router.get("/search",searchBooks);

module.exports = router;
