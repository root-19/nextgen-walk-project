const db = require("../config/database");

exports.getUserProfile = (req, res) => {
    const userId = req.user.id; 

    const sql = "SELECT id, username, email FROM users WHERE id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(results[0]);
    });
};

