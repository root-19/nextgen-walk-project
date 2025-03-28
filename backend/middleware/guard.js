const jwt = require("jsonwebtoken");
require("dotenv").config();

// Middleware to verify JWT token
exports.verifyToken = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Middleware to allow only admins
exports.adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access Denied: Admins Only" });
    next();
};
