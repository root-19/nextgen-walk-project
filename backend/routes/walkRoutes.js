const express = require("express");
const db = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware"); // ✅ Import auth middleware

const router = express.Router(); 

//  Save Walk Data
router.post("/save", async (req, res) => {
    try {
        console.log("📥 Received data:", req.body);

        const { user_id, elapsedTime, caloriesBurned, steps, distance } = req.body;

        if (!user_id || elapsedTime === undefined || caloriesBurned === undefined || steps === undefined || distance === undefined) {
            console.log("❌ Missing fields:", { user_id, elapsedTime, caloriesBurned, steps, distance });
            return res.status(400).json({ error: "Missing required fields" });
        }

        console.log("✅ All required fields are present. Inserting into database...");

        // Insert into database
        await db.query(
            "INSERT INTO walk_records (user_id, elapsed_time, calories_burned, steps, distance) VALUES (?, ?, ?, ?, ?)",
            [user_id, elapsedTime, caloriesBurned, steps, distance]
        );

        console.log("✅ Walk session saved to DB!");
        return res.status(201).json({ message: "Walk session saved successfully!" });

    } catch (error) {
        console.error("❌ Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Fetch walk history based on user_id
router.get("/history/:userId", authMiddleware, async (req, res) => { // ✅ Middleware added
    const { userId } = req.params;

    try {
        const query = `
            SELECT elapsed_time AS elapsedTime, calories_burned AS caloriesBurned, steps, distance
            FROM walk_records 
            WHERE user_id = ? 
            ORDER BY id DESC
        `;
        db.query(query, [userId], (err, results) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ message: "Database error" });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "No walk history found" });
            }

            res.json(results);
        });
    } catch (error) {
        console.error("Error fetching walk history:", error);
        res.status(500).json({ message: "Server error" });
    }
});

//  Get Walk Data for a User
router.get("/:user_id", async (req, res) => {
    try {
        const { user_id } = req.params;
        const query = `SELECT * FROM walk_records WHERE user_id = ? ORDER BY created_at DESC`;
        const [rows] = await db.execute(query, [user_id]);

        res.json(rows);
    } catch (error) {
        console.error("❌ Error fetching walk data:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router; 
