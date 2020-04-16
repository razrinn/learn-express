const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../utils/validation");
const { generatePassword, checkPassword } = require("../utils/hash");

const router = express.Router();

/**
 * CREATE an User
 */
router.post("/signup", async (req, res) => {
    // Validate body
    const { error } = registerValidation(req.body);
    if (error) res.status(400).json({ message: error });

    const { name, email, password } = req.body;

    // Validate user exist
    const user = await User.findOne({ email });
    if (user) res.status(400).json({ message: "Email already used" });

    try {
        const hashedPassword = await generatePassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post("/signin", async (req, res) => {
    // Validate body
    const { error } = loginValidation(req.body);
    if (error) res.status(400).json({ message: error });

    const { email, password } = req.body;

    // Validate user exist
    const user = await User.findOne({ email });
    if (!user) res.status(400).json({ message: "Incorrect email/password" });

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid)
        res.status(400).json({ message: "Incorrect email/password" });

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "7d",
    });
    res.json({ message: "Login successful", token: token });
});

module.exports = router;
