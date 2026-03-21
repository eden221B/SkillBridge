import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskMarketplace from "./pages/TaskMarketplace";
import PostTask from "./pages/PostTask";
import SubmitTask from "./pages/SubmitTask";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";

function App() {

  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/tasks" element={<TaskMarketplace />} />

        <Route path="/post-task" element={<PostTask />} />

        <Route path="/submit/:taskId" element={<SubmitTask />} />
        <Route path="/submit/test" element={<h1>Submit Test</h1>} />

        <Route path="/dashboard" element={
    JSON.parse(localStorage.getItem("user"))?.role === "organization"
      ? <OrganizationDashboard />
      : <VolunteerDashboard />
  } />

      </Routes>

    </div>
  );

}

export default App;