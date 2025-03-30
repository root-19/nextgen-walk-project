require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const walkRoutes = require("./routes/walkRoutes");  
const app = express();
app.use(express.json());
app.use(cors());

// Test API
app.get("/", (req, res) => {
  res.send("Welcome to the Walk Counter API");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/walk", walkRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
