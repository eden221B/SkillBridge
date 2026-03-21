const Task = require("../models/Task");

// create task
exports.createTask = async (req, res) => {
  try {

    const { title, description, skillsRequired, estimatedTime } = req.body;

    const task = new Task({
      title,
      description,
      skillsRequired,
      estimatedTime,
      postedBy: req.user.userId
    });

    await task.save();

    res.status(201).json({
      message: "Task created",
      task
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all tasks
exports.getTasks = async (req, res) => {
  try {

    const tasks = await Task.find({ status: "open" }).populate("postedBy", "name email");

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get tasks created by logged-in organization
const Completion = require("../models/Completion");

exports.getMyTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      postedBy: req.user.userId
    });

    const tasksWithSubmissions = await Promise.all(
      tasks.map(async (task) => {

        const submissions = await Completion.find({
          taskId: task._id
        }).populate("userId", "name email");

        return {
          ...task._doc,
          submissions
        };
      })
    );

    res.json(tasksWithSubmissions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};