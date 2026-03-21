// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();

const { getMyDashboard } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, getMyDashboard);

module.exports = router;