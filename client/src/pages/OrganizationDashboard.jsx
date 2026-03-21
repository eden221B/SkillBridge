/* src/pages/OrganizationDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function OrganizationDashboard() {
  const storedUser = localStorage.getItem("user");
  let user = null;
  let token = localStorage.getItem("token");

  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch {
      user = null;
    }
  }

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!token || !user) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`http://localhost:5009/api/tasks/my-tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [token, user]);

  const handleApproval = async (submissionId, approve = true) => {
    try {
      await axios.post(
        `http://localhost:5009/api/completions/${submissionId}/review`,
        { approve },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update tasks to reflect change
      setTasks((prev) =>
        prev.map((t) => ({
          ...t,
          submissions: t.submissions.map((s) =>
            s._id === submissionId ? { ...s, status: approve ? "Approved" : "Rejected" } : s
          ),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p>Please log in</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Organization Dashboard</h1>

      {tasks.length === 0 ? (
        <p>No tasks posted yet</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <h4>Submissions:</h4>
            {task.submissions.length === 0 ? (
              <p>No submissions yet</p>
            ) : (
              <ul>
                {task.submissions.map((s) => (
                  <li key={s._id}>
                    Volunteer: {s.userName} | Status: {s.status}
                    {s.status === "Pending" && (
                      <>
                        <button onClick={() => handleApproval(s._id, true)}>Approve</button>
                        <button onClick={() => handleApproval(s._id, false)}>Reject</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default OrganizationDashboard;
*/
import React from "react";

function OrganizationDashboard() {

  const storedUser = localStorage.getItem("user");
  let user = storedUser ? JSON.parse(storedUser) : null;

  // 🔥 Fake Data
  const tasks = [
    {
      id: 1,
      title: "Design Logo",
      description: "Need a modern logo",
      submissions: [
        {
          id: "s1",
          userName: "Eden",
          status: "Pending"
        },
        {
          id: "s2",
          userName: "Alex",
          status: "Approved"
        }
      ]
    },
    {
      id: 2,
      title: "Write Blog",
      description: "Need a tech blog article regarding the usage of AI in warfare",
      submissions: [
        {
          id: "s3",
          userName: "Sam",
          status: "Pending"
        }
      ]
    }
  ];

  return (
    <div className="orgdash-page">
  
      <h1 className="orgdash-title">Organization Dashboard</h1>
  
      <div className="tasks-container">
  
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
  
            <h3>{task.title}</h3>
            <p className="task-desc">{task.description}</p>
  
            <h4>Submissions</h4>
  
            <div className="submissions">
  
              {task.submissions.map((s) => (
                <div key={s.id} className="submission-card">
  
                  <p>
                    <strong>{s.userName}</strong>
                    <span className={`status ${s.status.toLowerCase()}`}>
                      {s.status}
                    </span>
                  </p>
  
                  {s.status === "Pending" && (
                    <div className="action-buttons">
                      <button className="approve">Approve</button>
                      <button className="reject">Reject</button>
                    </div>
                  )}
  
                </div>
              ))}
  
            </div>
  
          </div>
        ))}
  
      </div>
  
    </div>
  );
}

export default OrganizationDashboard;