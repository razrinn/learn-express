const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 255,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Users", userSchema);
