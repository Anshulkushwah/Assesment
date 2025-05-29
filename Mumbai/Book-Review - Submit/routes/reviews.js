const express = require("express");
const Review = require("../models/Review");
const Book = require("../models/Book");
const auth = require("../middleware/auth");
const { submitReview, updateReview, deleteReview } = require("../controller/reviewController");
const router = express.Router();

// Submit a review
router.post("/:bookId/reviews", auth,submitReview);

// Update a review
router.put("/reviews/:id", auth, updateReview);

// Delete a review
router.delete("/:id", auth, deleteReview);

module.exports = router;
