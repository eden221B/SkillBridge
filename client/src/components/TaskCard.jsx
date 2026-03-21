import React from "react";
import { Link } from "react-router-dom";

function TaskCard({ task }) {

    return (
      <div className="taskcard">
  
        <h3>{task.title}</h3>
  
        <p className="desc">{task.description}</p>
  
        <div className="skills">
          {task.skillsRequired?.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
  
        <p className="meta">
          ⏱ {task.estimatedTime}
        </p>
  
        <p className="meta">
          👤 {task.postedBy?.name}
        </p>
  
        <Link to={`/submit/${task._id}`}>
          <button className="task-btn">Submit Work</button>
        </Link>
  
      </div>
    );
  
  }
export default TaskCard;