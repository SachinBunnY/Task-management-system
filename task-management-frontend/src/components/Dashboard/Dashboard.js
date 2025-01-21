import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import "./Dashboard.css";
import { getAllProjects, getAllTask } from "../api/endPoints";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [groupedTasks, setGroupedTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Completed: [],
  });
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
          setSelectedProjectId(projectResponse[0]._id);
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
        setGroupedTasks(taskResponse);
        const total =
          taskResponse["To Do"].length +
          taskResponse["In Progress"].length +
          taskResponse["Completed"].length;

        const completed = taskResponse["Completed"].length;
        const pending = taskResponse["To Do"].length;
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
        <h2>Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <section className="projects">
          <p className="project_summary">Project summary</p>
          <div className="dashboard-project-div">
            <div className="project-list">
              {projects.length > 0 &&
                projects.map((project) => (
                  <div
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
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Task Summary */}
        <section className="task-summary">
          <p className="project_summary">Task summary</p>
          <div className="summary-cards">
            <div className="card">
              <p className="task-summary-text">Total Tasks</p>
              <p>{taskSummary.total}</p>
            </div>
            <div className="card">
              <p className="task-summary-text">Completed Tasks</p>
              <p>{taskSummary.completed}</p>
            </div>
            <div className="card">
              <p className="task-summary-text">Pending Tasks</p>
              <p>{taskSummary.pending}</p>
            </div>
          </div>
        </section>

        {/* Tasks for Selected Project */}
        <section className="tasks">
          <p className="project_summary">Tasks for Projecty</p>
          <div className="task-groups">
            {Object.keys(groupedTasks).map((status) => (
              <div key={status} className="task-group">
                <p className="project_summary">{status}</p>
                <div className="card-main-div-dashboard">
                  {groupedTasks[status].map((task) => (
                    <div key={task._id} className="task-card">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <p>
                        <strong>Deadline:</strong>{" "}
                        {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
