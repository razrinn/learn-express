const { generateResponse } = require("../utils/response");

const requestNotFound = (req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
};

const errorCatcher = (err, req, res, next) => {
    console.log("Catching error...");
    const { status, message } = err;
    res.status(status).json(generateResponse(false, { error: message }));
};

module.exports = {
    requestNotFound,
    errorCatcher,
};
