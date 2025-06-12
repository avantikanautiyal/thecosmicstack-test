const express = require("express");
const Blog = require("../models/blogModel");
const { protect, adminOnly } = require("../middleware/auth_middleware");
const { redisClient } = require("../utils/redisClient");

const router = express.Router();

// 📤 Public: Get all blogs (with Redis caching)
router.get("/", async (req, res) => {
  const cacheKey = "blogs_all";

  try {
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log("📦 Redis Cache Hit: blogs_all");
      return res.json(JSON.parse(cachedData));
    }

    const blogs = await Blog.find().sort({ createdAt: -1 });

    await redisClient.set(cacheKey, JSON.stringify(blogs), {
      EX: 60 * 5, // cache for 5 minutes
    });

    console.log("📦 Redis Cache Miss — Data Cached: blogs_all");
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📄 Public: Get single blog by ID (with Redis caching)
router.get("/:_id", async (req, res) => {
  const id = req.params._id;
  const cacheKey = `blog_${id}`;

  try {
    if (
      !id ||
      id === "undefined" ||
      id === "null" ||
      !id.match(/^[0-9a-fA-F]{24}$/)
    ) {
      return res.status(400).json({ message: "Invalid blog ID" });
    }

    const cachedBlog = await redisClient.get(cacheKey);
    if (cachedBlog) {
      console.log(`📦 Redis Cache Hit: ${cacheKey}`);
      return res.json(JSON.parse(cachedBlog));
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    await redisClient.set(cacheKey, JSON.stringify(blog), { EX: 60 * 5 });

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📥 Admin: Create blog (invalidate Redis cache)
router.post("/", protect, adminOnly, async (req, res) => {
  const { title, content, imageUrl, author, publishDate, tags, category } =
    req.body;

  try {
    const newBlog = await Blog.create({
      title,
      content,
      imageUrl,
      author,
      publishDate,
      tags,
      category,
    });

    // Invalidate all blog-related caches
    await redisClient.del("blogs_all");

    res.status(201).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// ✏️ Admin: Update blog (invalidate cache for specific blog + all)
router.put("/:id", protect, adminOnly, async (req, res) => {
  const { title, content, coverImage } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.coverImage = coverImage || blog.coverImage;
    blog.updatedAt = Date.now();

    const updatedBlog = await blog.save();

    // Invalidate related cache
    await redisClient.del("blogs_all");
    await redisClient.del(`blog_${req.params.id}`);

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog" });
  }
});

// ❌ Admin: Delete blog (invalidate cache for specific blog + all)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Invalidate related cache
    await redisClient.del("blogs_all");
    await redisClient.del(`blog_${req.params.id}`);

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

module.exports = router;
