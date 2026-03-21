import React, { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskCard from "../components/TaskCard";

function TaskMarketplace() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };

    fetchTasks();

  }, []);

  return (
    <div className="marketplace-page">
  
      <h2 className="marketplace-title">Task Marketplace</h2>
  
      <div className="marketplace-grid">
  
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
  
      </div>
  
    </div>
  );

}

export default TaskMarketplace;