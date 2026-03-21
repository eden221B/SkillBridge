import React, { useState } from "react";
import { createTask } from "../services/taskService";

function PostTask() {

  const [form, setForm] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    estimatedTime: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const taskData = {
        title: form.title,
        description: form.description,
        skillsRequired: form.skillsRequired.split(","),
        estimatedTime: form.estimatedTime
      };

      const res = await createTask(taskData);

      alert(res.message);

      setForm({
        title: "",
        description: "",
        skillsRequired: "",
        estimatedTime: ""
      });

    } catch (error) {

      alert("Failed to create task");

    }

  };

  return (
    <div className="posttask-page">
  
      <div className="posttask-card">
  
        <h2>Create New Task</h2>
  
        <form onSubmit={handleSubmit} className="posttask-form">
  
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={form.title}
            onChange={handleChange}
          />
  
          <textarea
            name="description"
            placeholder="Task Description"
            value={form.description}
            onChange={handleChange}
          />
  
          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills (comma separated)"
            value={form.skillsRequired}
            onChange={handleChange}
          />
  
          <input
            type="text"
            name="estimatedTime"
            placeholder="Estimated Time"
            value={form.estimatedTime}
            onChange={handleChange}
          />
  
          <button type="submit">Create Task</button>
  
        </form>
  
      </div>
  
    </div>
  );

}

export default PostTask;