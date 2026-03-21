import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  let role = null;

  if (storedUser) {
    try {
      role = JSON.parse(storedUser).role;
    } catch {
      role = null;
    }
  }

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">

  <h2 className="logo">SkillBridge</h2>

  <div className="nav-links">

    <Link to="/">Home</Link>

    {token && role === "volunteer" && (
      <Link to="/tasks">Marketplace</Link>
    )}

    {token && role === "organization" && (
      <Link to="/post-task">Post Task</Link>
    )}

    {!token && <Link to="/login">Login</Link>}
    {!token && <Link to="/register">Register</Link>}

    {token && <Link to="/dashboard">Dashboard</Link>}

    {token && (
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    )}

  </div>

</nav>

  );
}

export default Navbar;