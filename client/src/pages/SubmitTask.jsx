import React, { useState } from "react";
import { submitCompletion } from "../services/completionService";
import { useParams } from "react-router-dom";

function SubmitTask() {

  const { taskId } = useParams();

  const [submissionText, setSubmissionText] = useState("");
  const [submissionLink, setSubmissionLink] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("taskId", taskId);
    formData.append("submissionText", submissionText);
    formData.append("submissionLink", submissionLink);

    if (file) {
      formData.append("submissionFile", file);
    }

    try {

      const res = await submitCompletion(formData);

      alert(res.message);

    } catch (error) {

      console.error(error);
      alert("Submission failed");

    }

  };

  return (
    <div className="submit-page">
  
      <div className="submit-card">
  
        <h2>Submit Task Work</h2>
  
        <form onSubmit={handleSubmit} className="submit-form">
  
          <textarea
            placeholder="Describe what you completed"
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
          />
  
          <input
            type="text"
            placeholder="Submission link (optional)"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
          />
  
  <label className="file-label">
  {file ? "Change File" : "Upload File"}

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
  />
</label>

{file && <p className="file-name">{file.name}</p>}
  
          <button type="submit">Submit Work</button>
  
        </form>
  
      </div>
  
    </div>
  );

}

export default SubmitTask;
