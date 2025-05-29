const express = require("express");
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");
require("dotenv").config();
const app = express();

app.use(express.json());

const connectDB = require("./config/db"); 

connectDB();

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/books", reviewRoutes);


const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// A simple test route to confirm the server is working
app.get("/", (req, res) => {
    console.log("You test page !!");
    res.send("This is your test page!");
});