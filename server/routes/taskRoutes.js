const express = require("express");
const router = express.Router();

const { createTask, getTasks, getMyTasks } = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/", authMiddleware, roleMiddleware("organization"), createTask);

router.get("/", getTasks);
router.get("/my-tasks", authMiddleware, getMyTasks);

module.exports = router;