const db = require("../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register a new user
exports.register = (req, res) => {
    const { username, gender, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: "Error hashing password" });

        // Insert user with default role = 'user'
        const sql = "INSERT INTO users (username, gender, email, password, role) VALUES (?, ?, ?, ?, 'user')";
        db.query(sql, [username, gender, email, hash], (err, result) => {
            if (err) return res.status(500).json({ message: "Registration failed", error: err });
            res.status(201).json({ message: "User registered successfully" });
        });
    });
};



// User Login
exports.login = (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = results[0];

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) return res.status(401).json({ message: "Invalid email or password" });

            // Generate JWT token
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.json({ message: "Login successful", token, role: user.role });
        });
    });
};
