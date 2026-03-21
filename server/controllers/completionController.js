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