const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
require('dotenv').config(); 

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password){
            return res.status(404).json({
                message : "User and Password not found",
                success : false
            })
        }

        const user = await User.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send("Invalid credentials");
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        // Send the token in the response
        res.status(200).json({
             token : token,
             message : "User login succesfully "
            });

    } catch (error) {
        console.error("Login error:", error); 
        res.status(500).send("Server error");
    }
};

module.exports = login; 