const db = require("../config/database");

exports.getAdminProfile = (req, res) => {
    const adminId = req.user.id; 

    const sql = "SELECT id, username, email, role FROM users WHERE id = ? AND role = 'admin'";
    db.query(sql, [adminId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (results.length === 0) return res.status(404).json({ message: "Admin not found" });

        res.json(results[0]);
    });
};
