const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "Failed to add project", error: err });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params._id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err });
  }
});

module.exports = router;
