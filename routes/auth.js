const express = require("express");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { registerValidation, loginValidation } = require("../utils/validation");
const { generatePassword, checkPassword } = require("../utils/hash");
const { generateResponse } = require("../utils/response");

const router = express.Router();

/**
 * CREATE an User
 */
router.post("/signup", async (req, res, next) => {
    // Validate body
    const { error } = registerValidation(req.body);
    if (error) return next({
        message: error,
        status: 400,
    });

    const { name, email, password } = req.body;

    // Validate user exist
    const user = await User.findOne({ email });
    if (user) {
        return next({
            message: "Email is already used",
            status: 400,
        });
    }

    try {
        const hashedPassword = await generatePassword(password);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json(generateResponse(true, "New user is created", user));
    } catch (err) {
        return next({
            message: err,
            status: 400,
        })
    }
});

router.post("/signin", async (req, res, next) => {
    // Validate body
    const { error } = loginValidation(req.body);
    if (error) {
        return next({
            message: error.details[0].message,
            status: 400,
        });
    }

    const { email, password } = req.body;

    // Validate user exist
    const user = await User.findOne({ email });
    if (!user) {
        return next({
            message: "Incorrect email/password",
            status: 400,
        });
    }

    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
        return next({
            message: "Incorrect email/password",
            status: 400,
        });
    }

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "3d",
    });
    res.json(generateResponse(true, "Login successfull", {token}));
});

module.exports = router;
