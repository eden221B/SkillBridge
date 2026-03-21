import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css";

function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
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
      const res = await loginUser(form); // call your API
  
      // Save both token and user in localStorage
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user)); // <-- important
  
      alert("Login successful");
      navigate("/tasks"); // or redirect based on role
  
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>

        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;