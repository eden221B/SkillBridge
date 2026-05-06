const express = require("express");
const router = express.Router();

const { submitCompletion,reviewSubmission } = require("../controllers/completionController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
router.post("/review", authMiddleware, reviewSubmission);

router.post(
  "/submit",
  authMiddleware,
  upload.single("submissionFile"),
  submitCompletion
);

module.exports = router;