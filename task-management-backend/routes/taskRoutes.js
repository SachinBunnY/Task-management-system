const express = require("express");
const Task = require("../models/task");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { title, description, status, deadline, assignedTo, project } =
    req.body;

  try {
    if (!title || !description || !deadline || !project) {
      return res.status(400).json({
        message: "Title, description, deadline, and project are required",
      });
    }

    const existingProject = await Project.findById(project);
    if (!existingProject || existingProject.owner.toString() != req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized or project not found" });
    }
    const newTask = new Task({
      title,
      description,
      status: status || "To Do",
      deadline,
      assignedTo: req.user.id,
      project,
    });
    const savedTask = await newTask.save();

    res.status(200).json(savedTask);
  } catch (err) {
    console.log("err:", err);

    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description, status, deadline, assignedTo } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const project = await Project.findById(task.project);
    if (!project || project.owner.toString() != req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.deadline = deadline || task.deadline;
    task.assignedTo = assignedTo || task.assignedTo;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    const project = await Project.findById(task.project);
    if (!project || project.owner.toString() != req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/grouped/:projectId", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project || project.owner.toString() != req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    console.log("project:", project);

    const task = await Task.find({ project: project._id });
    console.log("task:", task);

    const groupedTasks = {
      "To Do": task.filter((task) => task.status === "To Do"),
      "In Progress": task.filter((task) => task.status === "In progress"),
      Completed: task.filter((task) => task.status === "Completed"),
    };
    res.status(200).json(groupedTasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
