const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" },
  book: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book" },
  rating: { 
    type: Number, 
    required: true },
  comment: { 
    type: String, 
    required: true },
});

module.exports = mongoose.model("Review", ReviewSchema);
