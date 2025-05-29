const User = require("../../models/User");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if(!username || !password){
            return res.status(404).json({
                message : "User and Password not found",
                success : false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send("User registered successfully!");
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Error registering user");
    }
};

module.exports = register;