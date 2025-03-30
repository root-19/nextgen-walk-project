const express = require("express");
const { getAdminProfile } = require("../controllers/adminController"); // ✅ Dapat kasama ito
const { verifyToken } = require("../middleware/guard");

const router = express.Router();

router.get("/profile", verifyToken, getAdminProfile);

module.exports = router;
