const Review = require("../models/Review");
const Book = require("../models/Book");

// Submit a review
const submitReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const review = new Review({
            user: req.user.id,
            book: req.params.bookId,
            rating,
            comment,
        });

        await review.save();
        await Book.findByIdAndUpdate(req.params.bookId, {
            $push: { reviews: review._id },
        });

        res.status(201).json({
            message: "Review submitted successfully",
            review,
        });
    } catch (error) {
        res.status(500).json({ message: "Error submitting review", error: error.message });
    }
};

// Update a review
const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to update this review" });
        }

        review.rating = req.body.rating;
        review.comment = req.body.comment;
        await review.save();

        res.status(200).json({
            message: "Review updated successfully",
            review,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error: error.message });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this review" });
        }

        await review.deleteOne();
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error: error.message });
    }
};

module.exports = { submitReview, updateReview, deleteReview };