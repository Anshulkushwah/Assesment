const Book = require("../models/Book");

// Add a new book
const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = new Book({ title, author });
        await book.save();
        res.status(201).json({
            message : "Book add succesfully",
            book : book
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error });
    }
};

// Get all books with pagination
const getBooks = async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);

        const books = await Book.find()
            .limit(limit)
            .skip((page - 1) * limit);

        // Count total books for pagination reference
        const totalBooks = await Book.countDocuments();

        res.status(200).json({
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: page,
            books,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format to prevent database errors
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid book ID format" });
        }

        const book = await Book.findById(id).populate("reviews");

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book details retrieved successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error fetching book details", error: error.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { q } = req.query;

        // Validate query input
        if (!q || typeof q !== "string") {
            return res.status(400).json({ message: "Query parameter 'q' is required and must be a string" });
        }

        const regex = new RegExp(q.trim(), "i");
        const books = await Book.find({ $or: [{ title: regex }, { author: regex }] });

        res.status(200).json({
            message: `Found ${books.length} books matching '${q}'`,
            books
        });
    } catch (error) {
        res.status(500).json({ message: "Error searching books", error: error.message });
    }
};

module.exports = { addBook, getBooks, getBookById, searchBooks };