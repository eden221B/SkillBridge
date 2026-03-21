// server/controllers/userController.js
const User = require("../models/User");
const Completion = require("../models/Completion");

exports.getMyDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    const submissions = await Completion.find({ userId: req.user.userId })
      .populate("taskId", "title");

    res.json({
      points: user.points,
      badges: user.badges,
      submissions
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};