const express = require("express");
const { getUserProfile } = require("../controllers/userController");
const { verifyToken } = require("../middleware/guard");

const router = express.Router();

router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
