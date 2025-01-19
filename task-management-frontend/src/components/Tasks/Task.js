import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getAllTask,
  createNewTask,
  editExistingTask,
  deleteExistingTask,
} from "../api/endPoints";
import "./Task.css";

const TaskManagement = () => {
  const { projectId } = useParams();
  const [groupedTasks, setGroupedTasks] = useState({
    "To Do": [],
    "In Progress": [],
    Completed: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("create");
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    status: "To Do",
    deadline: "",
    assignedTo: "",
  });
  const [editTaskId, setEditTaskId] = useState(null);

  // Fetch tasks for the project
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getAllTask(projectId); // Assume this API call returns grouped tasks
        setGroupedTasks(response); // Directly update groupedTasks
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
    fetchTasks();
  }, [projectId]);

  const handleInputChange = (e) => {
    setCurrentTask({ ...currentTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "create") {
        const response = await createNewTask({
          ...currentTask,
          project: projectId,
        });
        setGroupedTasks((prev) => ({
          ...prev,
          [response.status]: [...prev[response.status], response],
        }));
      } else if (modalType === "edit") {
        const response = await editExistingTask(editTaskId, currentTask);
        setGroupedTasks((prev) => {
          const updatedStatusTasks = prev[currentTask.status].map((task) =>
            task._id === editTaskId ? response : task
          );
          return {
            ...prev,
            [currentTask.status]: updatedStatusTasks,
          };
        });
      }
      setIsModalOpen(false);
      setCurrentTask({
        title: "",
        description: "",
        status: "To Do",
        deadline: "",
        assignedTo: "",
      });
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  const handleDelete = async (taskId, status) => {
    try {
      await deleteExistingTask(taskId);
      setGroupedTasks((prev) => ({
        ...prev,
        [status]: prev[status].filter((task) => task._id !== taskId),
      }));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const openEditModal = (task) => {
    setModalType("edit");
    setEditTaskId(task._id);
    setCurrentTask({
      title: task.title,
      description: task.description,
      status: task.status,
      deadline: task.deadline,
      assignedTo: task.assignedTo,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="task-management">
      <header className="header">
        <h1>Task Management</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setModalType("create");
            setCurrentTask({
              title: "",
              description: "",
              status: "To Do",
              deadline: "",
              assignedTo: "",
            });
            setIsModalOpen(true);
          }}
        >
          Create New Task
        </button>
      </header>

      <div className="task-groups">
        {Object.keys(groupedTasks).map((status) => (
          <div key={status} className="task-group">
            <h2>{status}</h2>
            {groupedTasks[status].map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p>
                  <strong>Assigned To:</strong> {task.assignedTo}
                </p>
                <div className="actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => openEditModal(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(task._id, task.status)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{modalType === "create" ? "Create Task" : "Edit Task"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentTask.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={currentTask.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={currentTask.status}
                  onChange={handleInputChange}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={currentTask.deadline}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Assigned User</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={currentTask.assignedTo}
                  onChange={handleInputChange}
                  required
                />
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

export default TaskManagement;
