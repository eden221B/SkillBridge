const Completion = require("../models/Completion");

exports.submitCompletion = async (req, res) => {

  try {

    const { taskId, submissionText, submissionLink } = req.body;

    const completion = new Completion({
      userId: req.user.userId,
      taskId,
      submissionText,
      submissionLink,
      submissionFile: req.file ? req.file.path : null
    });

    await completion.save();

    res.status(201).json({
      message: "Submission sent for review",
      completion
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};

const User = require("../models/User");

exports.reviewSubmission = async (req, res) => {
  try {

    const { completionId, status } = req.body;

    const completion = await Completion.findById(completionId);

    if (!completion) {
      return res.status(404).json({ message: "Submission not found" });
    }

    completion.status = status;
    await completion.save();

    // give points if approved
    if (status === "approved") {
      const user = await User.findById(completion.userId);

      user.points += 10;

      // badge logic
      if (user.points >= 50 && !user.badges.includes("Rising Star")) {
        user.badges.push("Rising Star");
      }

      await user.save();
    }

    res.json({ message: "Submission reviewed" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};