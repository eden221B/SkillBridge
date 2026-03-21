/* src/pages/VolunteerDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

function VolunteerDashboard() {
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

  const [submissions, setSubmissions] = useState([]);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    if (!token || !user) return;

    const fetchDashboard = async () => {
      try {
        // Fetch user info (points, badges)
        const userRes = await axios.get(`http://localhost:5009/api/users/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(userRes.data.points);
        setBadges(userRes.data.badges);

        // Fetch submissions
        const subRes = await axios.get(`http://localhost:5009/api/completions/my-submissions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubmissions(subRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [token, user]);

  if (!user) return <p>Please log in</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Volunteer Dashboard</h1>
      <p><strong>Points:</strong> {points}</p>
      <p><strong>Badges:</strong> {badges.join(", ") || "No badges yet"}</p>

      <h2>My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet</p>
      ) : (
        <ul>
          {submissions.map((s) => (
            <li key={s._id}>
              Task: {s.taskTitle} | Status: {s.status} | Submitted on: {new Date(s.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default VolunteerDashboard;
*/

import React from "react";

function VolunteerDashboard() {

  const storedUser = localStorage.getItem("user");
  let user = storedUser ? JSON.parse(storedUser) : null;

  const points = 40;
  const badges = ["Rising Star", "Quick Helper"];

  const submissions = [
    {
      id: 1,
      taskTitle: "Design Instagram Poster",
      status: "Approved",
      date: "2026-03-20"
    },
    {
      id: 2,
      taskTitle: "Write Blog Content",
      status: "Pending",
      date: "2026-03-21"
    }
  ];

  return (
    <div className="voldash-page">
  
      <h1 className="voldash-title">Volunteer Dashboard</h1>
  
      {/* TOP STATS */}
      <div className="voldash-top">
  
        <div className="points-card">
          <h3>Points</h3>
          <p>{points}</p>
        </div>
  
        <div className="badges-card">
          <h3>Badges</h3>
          <div className="badges">
            {badges.map((b, i) => (
              <span key={i}>{b}</span>
            ))}
          </div>
        </div>
  
      </div>
  
      {/* SUBMISSIONS */}
      <h2 className="section-title">My Submissions</h2>
  
      <div className="submissions-list">
        {submissions.map((s) => (
          <div key={s.id} className="submission-item">
  
            <h4>{s.taskTitle}</h4>
  
            <div className="submission-meta">
              <span className={`status ${s.status.toLowerCase()}`}>
                {s.status}
              </span>
              <span className="date">{s.date}</span>
            </div>
  
          </div>
        ))}
      </div>
  
    </div>
  );
}

export default VolunteerDashboard;