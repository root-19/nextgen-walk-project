const jwt = require("jsonwebtoken"); // Import jsonwebtoken

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("🔍 Authorization Header:", authHeader); 

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded); // Debugging
        req.user = decoded;
        next();
    } catch (err) {
        console.error("❌ Token Error:", err); // Debugging
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session Expired: Please Refresh Token" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid Token: Unauthorized" });
        }
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
