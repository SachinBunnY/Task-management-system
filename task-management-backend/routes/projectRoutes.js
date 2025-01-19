const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Project = require("../models/Project");

const router = express.Router();

//CREATE NEW PROJECT
router.post("/", authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const newProject = new Project({
      title,
      description,
      owner: req.user.id,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//UPDATE THE EXISTING PROJECT
router.put("/:id", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (project.owner.toString() != req.user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    project.title = title || project.title;
    project.description = description || project.description;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//DELETE THE EXISTING PROJECT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this project" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


//GET ALL PROJECTS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id });
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
