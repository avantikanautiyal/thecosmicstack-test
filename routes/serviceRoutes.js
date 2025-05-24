const express = require("express");
const router = express.Router();
const Service = require("../models/serviceModel");

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ message: "Error fetching services", error: err });
  }
});

// POST a new service (for admin or seeding only)
router.post("/add", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: "Failed to add service", error: err });
  }
});

// DELETE a service
router.delete("/:_id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params._id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting service", error: err });
  }
});

module.exports = router;
