const express = require("express");
const router = express.Router();

const { createTask, getTasks } = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getMyTasks } = require("../controllers/taskController");

router.post(
    "/create",
    authMiddleware,
    roleMiddleware("organization"),
    createTask
  );

router.get("/", getTasks);
router.get("/my-tasks", authMiddleware, getMyTasks);

module.exports = router;