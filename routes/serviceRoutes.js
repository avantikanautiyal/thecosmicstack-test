const express = require("express");
const router = express.Router();
const Service = require("../models/serviceModel");
const { redisClient } = require("../utils/redisClient");
const { checkCache, cacheResponse } = require("../middleware/cache_middleware");

// GET all services with Redis cache
router.get(
  "/",
  checkCache("services_all"),
  cacheResponse("services_all"),
  async (req, res) => {
    try {
      const services = await Service.find();
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ message: "Error fetching services", error: err });
    }
  }
);

// POST a new service (invalidate cache)
router.post("/add", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();

    // Invalidate cache
    await redisClient.del("services_all");
    console.log("[CACHE DELETE] Key: services_all");

    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: "Failed to add service", error: err });
  }
});

// DELETE a service (invalidate cache)
router.delete("/:_id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params._id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Invalidate cache
    await redisClient.del("services_all");
    console.log("[CACHE DELETE] Key: services_all");

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting service", error: err });
  }
});

module.exports = router;
