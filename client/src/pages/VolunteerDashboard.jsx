import React, { useEffect, useState } from "react";
import axios from "axios";

function VolunteerDashboard() {

  const storedUser = localStorage.getItem("user");
  let user = storedUser ? JSON.parse(storedUser) : null;

  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5009/api/users/me",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );

        setPoints(res.data.points);
        setBadges(res.data.badges);

        // transform backend data → match your UI format
        const formatted = res.data.submissions.map((s) => ({
          id: s._id,
          taskTitle: s.taskId?.title || "Untitled Task",
          status: s.status,
          date: new Date(s.createdAt).toLocaleDateString()
        }));

        setSubmissions(formatted);

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

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
            {badges.length === 0 ? (
              <span>No badges yet</span>
            ) : (
              badges.map((b, i) => (
                <span key={i}>{b}</span>
              ))
            )}
          </div>
        </div>
  
      </div>
  
      {/* SUBMISSIONS */}
      <h2 className="section-title">My Submissions</h2>
  
      <div className="submissions-list">
        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((s) => (
            <div key={s.id} className="submission-item">
  
              <h4>{s.taskTitle}</h4>
  
              <div className="submission-meta">
                <span className={`status ${s.status.toLowerCase()}`}>
                  {s.status}
                </span>
                <span className="date">{s.date}</span>
              </div>
  
            </div>
          ))
        )}
      </div>
  
    </div>
  );
}

export default VolunteerDashboard;