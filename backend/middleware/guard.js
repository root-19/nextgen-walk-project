const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session Expired: Please Refresh Token" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token: Unauthorized" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied: Admins Only" });
    }
    next();
};

exports.refreshToken = (req, res) => {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Access Denied: No Refresh Token Provided" });
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
        const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
        res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({ message: "Invalid Refresh Token" });
    }
};
