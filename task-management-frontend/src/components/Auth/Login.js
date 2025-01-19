import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/endPoints";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const checkForm = {};
    if (!formData.email) checkForm.email = "Email ie required";
    if (!formData.password) checkForm.password = "Password is required";
    return checkForm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const response = await loginUser(formData);
      alert(response.token);
      if (response !== undefined) {
        localStorage.setItem("token", response.token);
        navigate("/dashboard");
      }
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
