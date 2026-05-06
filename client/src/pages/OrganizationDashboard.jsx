import React, { useEffect, useState } from "react";
import axios from "axios";

function OrganizationDashboard() {

  const storedUser = localStorage.getItem("user");
  let user = storedUser ? JSON.parse(storedUser) : null;

  const [tasks, setTasks] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5009/api/tasks/my-tasks",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        // format backend → match your UI
        const formatted = res.data.map((task) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          submissions: task.submissions.map((s) => ({
            id: s._id,
            userName: s.userId?.name || "Unknown",
            status: s.status,
            text: s.submissionText,
            link: s.submissionLink,
            file: s.submissionFile
          }))
        }));

        setTasks(formatted);

      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const handleReview = async (id, status) => {
    try {
      await axios.post(
        "http://localhost:5009/api/completions/review",
        {
          completionId: id,
          status
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      // update UI without reload
      setTasks((prev) =>
        prev.map((task) => ({
          ...task,
          submissions: task.submissions.map((s) =>
            s.id === id ? { ...s, status } : s
          )
        }))
      );

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="orgdash-page">
  
      <h1 className="orgdash-title">Organization Dashboard</h1>
  
      <div className="tasks-container">
  
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="task-card">
  
              <h3>{task.title}</h3>
              <p className="task-desc">{task.description}</p>
  
              <h4>Submissions</h4>
  
              <div className="submissions">
  
                {task.submissions.length === 0 ? (
                  <p>No submissions yet</p>
                ) : (
                  task.submissions.map((s) => (
                    <div key={s.id} className="submission-card">
  
                      <p>
                        <strong>{s.userName}</strong>
                        <span className={`status ${s.status.toLowerCase()}`}>
                          {s.status}
                        </span>
                      </p>
  
                      {s.status === "pending" && (
                        <div className="action-buttons">
                            <button
                            onClick={() => setSelectedSubmission(s)}
                            className="view-btn"
                            >
                              View
                            </button>
                          <button
                            className="approve"
                            onClick={() => handleReview(s.id, "approved")}
                          >
                            Approve
                          </button>
  
                          <button
                            className="reject"
                            onClick={() => handleReview(s.id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      )}
  
                    </div>
                  ))
                )}
  
              </div>
  
            </div>
          ))
        )}
        {selectedSubmission && (
  <div className="modal-overlay">

    <div className="modal">

      <h2>Submission Details</h2>

      <p><strong>Volunteer:</strong> {selectedSubmission.userName}</p>

      {selectedSubmission.text && (
        <p><strong>Text:</strong> {selectedSubmission.text}</p>
      )}

      {selectedSubmission.link && (
        <p>
          <strong>Link:</strong>{" "}
          <a href={selectedSubmission.link} target="_blank" rel="noreferrer">
            Open Link
          </a>
        </p>
      )}

      {selectedSubmission.file && (
        <p>
          <strong>File:</strong>{" "}
          <a
            href={`http://localhost:5009/${selectedSubmission.file}`}
            target="_blank"
            rel="noreferrer"
          >
            Download File
          </a>
        </p>
      )}

      <p>
        <strong>Status:</strong>{" "}
        {selectedSubmission.status}
      </p>

      {selectedSubmission.status === "pending" && (
        <div className="modal-actions">

          <button
            className="approve"
            onClick={() => {
              handleReview(selectedSubmission.id, "approved");
              setSelectedSubmission(null);
            }}
          >
            Approve
          </button>

          <button
            className="reject"
            onClick={() => {
              handleReview(selectedSubmission.id, "rejected");
              setSelectedSubmission(null);
            }}
          >
            Reject
          </button>

        </div>
      )}

      <button
        className="close-btn"
        onClick={() => setSelectedSubmission(null)}
      >
        Close
      </button>

    </div>

  </div>
)}
  
      </div>
  
    </div>
  );
}

export default OrganizationDashboard;