import React, { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css"; // reuse same styles

function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "volunteer",
  skills: ""
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
  
      const payload = {
        ...form,
        skills: form.skills
          ? form.skills.split(",").map((skill) => skill.trim())
          : []
      };
  
      const res = await registerUser(payload);
  
      alert(res.message);
      navigate("/login");
  
    } catch (error) {
  
      alert(error.response?.data?.message || "Registration failed");
  
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h2>Create Account</h2>
        <p className="subtitle">Join the platform</p>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

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

<select name="role" value={form.role} onChange={handleChange}>
  <option value="volunteer">Volunteer</option>
  <option value="organization">Organization</option>
</select>

{form.role === "volunteer" && (
  <input
    type="text"
    name="skills"
    placeholder="Skills (comma separated)"
    value={form.skills}
    onChange={handleChange}
  />
)}

          <button type="submit">Register</button>

        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>

    </div>
  );
}

export default Register;