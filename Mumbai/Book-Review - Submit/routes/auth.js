const express = require("express");
const router = express.Router();

const register = require("../controller/LoginRegister/register");
const login = require("../controller/LoginRegister/login");

// Define authentication routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;