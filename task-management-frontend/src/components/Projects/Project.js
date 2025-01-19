import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Project.css";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  createNewProject,
  editExistingProject,
  deleteExistingProject,
} from "../api/endPoints";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
  });
  const [editProjectId, setEditProjectId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response);
      } catch (err) {
        console.error("error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    setCurrentProject({ ...currentProject, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "create") {
        const response = await createNewProject(currentProject);
        setProjects([...projects, response]);
      } else if (modalType === "edit") {
        const response = await editExistingProject(
          editProjectId,
          currentProject
        );
        setProjects(
          projects.map((project) =>
            project._id === editProjectId ? response : project
          )
        );
      }
      setIsModalOpen(false);
      setCurrentProject({ title: "", description: "" });
    } catch (err) {
      console.error("Error saving projects:", err);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await deleteExistingProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const openEditModal = (project) => {
    setModalType("edit");
    setEditProjectId(project._id);
    setCurrentProject({
      title: project.title,
      description: project.description,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="project-management">
      <header className="header">
        <h1 className="title">Project Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalType("create");
            setCurrentProject({ title: "", description: "" });
            setIsModalOpen(true);
          }}
        >
          Create New Project
        </button>
      </header>

      <div className="project-list">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p>
              <strong>Owner:</strong> {project.owner}
            </p>
            <p>
              <strong>Created On:</strong>{" "}
              {new Date(project.creationDate).toLocaleDateString()}
            </p>
            <div className="actions">
              <button
                className="btn btn-edit"
                onClick={() => openEditModal(project)}
              >
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(project._id)}
              >
                Delete
              </button>
            </div>
            <div>
              <button
                className="btn btn-edit"
                style={{ marginTop: "1rem" }}
                onClick={() => navigate(`/tasks/${project._id}`)}
              >
                Related tasks
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {modalType === "create" ? "Create Project" : "Edit Project"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentProject.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={currentProject.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-save">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
