const jwt = require("jsonwebtoken");
const loginRequired = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (!token) res.status(401).json({ success: false, message: "Please provide valid token" });
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Invalid token",
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: "Please provide valid token",
        });
    }
};

module.exports = loginRequired;
