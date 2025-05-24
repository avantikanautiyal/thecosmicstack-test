const express = require("express");
const router = express.Router();
const Team = require("../models/teamModel");

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teams", error: err });
  }
});

router.post("/add", async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (err) {
    res.status(400).json({ message: "Failed to add team", error: err });
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params._id);
    if (!deletedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting team", error: err });
  }
});

module.exports = router;
