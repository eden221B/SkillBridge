const express = require("express");
const router = express.Router();

const { submitCompletion } = require("../controllers/completionController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post(
  "/submit",
  authMiddleware,
  upload.single("submissionFile"),
  submitCompletion
);

module.exports = router;