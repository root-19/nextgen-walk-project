const express = require("express");
const { register, login } = require("../controllers/authController");
const { getUserProfile } = require("../controllers/userController");
const { verifyToken } = require("../middleware/guard"); 
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
