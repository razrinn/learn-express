const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

// Database
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) console.log("Unable to connect to database...", err);
        else console.log("Connected to database...");
    }
);
const app = express();

// App middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// App routes
const baseApiUrl = "/api/v1";
app.use(baseApiUrl + "/posts", require("./routes/posts"));

// Listen port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
