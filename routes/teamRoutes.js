const express = require("express");
const router = express.Router();
const Team = require("../models/teamModel");
const { redisClient } = require("../utils/redisClient");

// GET all teams (with Redis cache)
router.get("/", async (req, res) => {
  const cacheKey = "teams_all";

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("📦 Redis Cache Hit: teams_all");
      return res.status(200).json(JSON.parse(cachedData));
    }

    const teams = await Team.find();

    await redisClient.set(cacheKey, JSON.stringify(teams), {
      EX: 60 * 5, // expires in 5 minutes
    });

    console.log("📦 Redis Cache Miss — Data Cached: teams_all");
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teams", error: err });
  }
});

// POST: Add new team (invalidate Redis cache)
router.post("/add", async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();

    // Invalidate cache
    await redisClient.del("teams_all");

    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: "Failed to add team", error: err });
  }
});

// DELETE: Remove team by ID (invalidate Redis cache)
router.delete("/:_id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params._id);

    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Invalidate cache
    await redisClient.del("teams_all");

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting team", error: err });
  }
});

module.exports = router;
