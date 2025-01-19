import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/endPoints";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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
    if (!formData.username) checkForm.username = "Name is required";
    if (!formData.email) checkForm.email = "Email is required";
    if (!formData.password) checkForm.password = "Password is required";
    return checkForm;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("HERE");

    try {
      const response = await registerUser(formData);
      alert(response);
      if (response === "User registered successfully") navigate("/login");
    } catch (err) {
      alert("Error: " + err.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.username && (
            <small className="error">{errors.username}</small>
          )}
        </div>

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

        <button type="submit" onClick={(e) => handleSubmit(e)}>
          Register
        </button>
        <div>
          <p>
            Already have account &nbsp;
            <span
              className="loginSpan"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
