const express = require("express");
const router = express.Router();
const Project = require("../models/projectModel");
const { redisClient } = require("../utils/redisClient");

// GET all projects (with Redis cache)
router.get("/", async (req, res) => {
  const cacheKey = "projects_all";

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("📦 Redis Cache Hit");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const projects = await Project.find();

    await redisClient.set(cacheKey, JSON.stringify(projects), {
      EX: 60 * 5, // expire in 5 minutes
    });

    console.log("📦 Redis Cache Miss — Data Cached");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching projects", error: err });
  }
});

// POST: Add a new project (invalidate cache)
router.post("/add", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();

    // Invalidate cache
    await redisClient.del("projects_all");

    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: "Failed to add project", error: err });
  }
});

// DELETE a project (invalidate cache)
router.delete("/:_id", async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params._id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Invalidate cache
    await redisClient.del("projects_all");

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting project", error: err });
  }
});

module.exports = router;
