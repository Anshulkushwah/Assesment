const mongoose = require("mongoose");
require("dotenv").config();

const DBconnect = () => {
        mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Connected to MongoDB Successfully!');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        });
};

module.exports = DBconnect;