const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const { errorCatcher, requestNotFound } = require("./middleware/errorHandler");
require("dotenv/config");

const app = express();

// Database
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
        if (err) console.log("Unable to connect to database...", err);
        else console.log("Connected to database...");
    }
);

// App middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// App routes
const baseApiUrl = "/api/v1";
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
app.use(baseApiUrl + "/auth", authRoute);
app.use(baseApiUrl + "/posts", postsRoute);

// Error middleware
app.use(requestNotFound);
app.use(errorCatcher);

// Listen port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
