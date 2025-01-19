import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Dashboard.css";
import { getAllProjects, getAllTask } from "../api/endPoints";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskSummary, setTaskSummary] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectResponse = await getAllProjects();
        setProjects(projectResponse);
        if (projectResponse.length > 0) {
          setSelectedProjectId(projectResponse._id);
        }
      } catch (err) {
        console.log("Error fetching projects", err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (!selectedProjectId) return;
    const fetchTask = async () => {
      try {
        const taskResponse = await getAllTask(selectedProjectId);
        setTasks(taskResponse);
        const total = taskResponse.length;
        const completed = taskResponse.filter(
          (task) => task.status === "Completed"
        ).length;
        const pending = taskResponse.filter(
          (task) => task.status !== "Completed"
        ).length;
        setTaskSummary({ total, completed, pending });
      } catch (err) {
        console.log("Error fetch task:", err);
      }
    };
    fetchTask();
  }, [selectedProjectId]);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Your Dashboard</h1>
        <p>Manage your projects and tasks efficiently.</p>
      </header>

      <div className="dashboard-content">
        {/* Project Selector */}
        <section className="projects">
          <h2>Your Projects</h2>
          <ul className="project-list">
            {projects.length > 0 &&
              projects.map((project) => (
                <li
                  key={project._id}
                  className={`project-item ${
                    project._id === selectedProjectId ? "active" : ""
                  }`}
                  onClick={() => setSelectedProjectId(project._id)}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <small>
                    Created on:{" "}
                    {new Date(project.creationDate).toLocaleDateString()}
                  </small>
                </li>
              ))}
          </ul>
        </section>

        {/* Task Summary */}
        <section className="task-summary">
          <h2>Task Summary</h2>
          <div className="summary-cards">
            <div className="card">
              <h3>Total Tasks</h3>
              <p>{taskSummary.total}</p>
            </div>
            <div className="card">
              <h3>Completed Tasks</h3>
              <p>{taskSummary.completed}</p>
            </div>
            <div className="card">
              <h3>Pending Tasks</h3>
              <p>{taskSummary.pending}</p>
            </div>
          </div>
        </section>

        {/* Tasks for Selected Project */}
        <section className="tasks">
          <h2>Tasks for Project</h2>
          {tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task._id} className="task-item">
                  <h4>{task.title}</h4>
                  <p>{task.description}</p>
                  <small>
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                  </small>
                  <small>Status: {task.status}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks found for this project.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
