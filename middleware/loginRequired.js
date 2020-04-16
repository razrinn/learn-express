const jwt = require("jsonwebtoken");
const loginRequired = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
    if (!token) res.status(401).json({ success: false, message: "Access Denied. Please provide token." });
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: "Token is not valid",
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: "Auth token is not supplied",
        });
    }
};

module.exports = loginRequired;
