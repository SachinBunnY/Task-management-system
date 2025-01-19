import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Project from "./components/Projects/Project";
import TaskManagement from "./components/Tasks/Task";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/tasks/:projectId" element={<TaskManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
