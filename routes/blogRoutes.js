const express = require("express");
const Blog = require("../models/blogModel");
const { protect, adminOnly } = require("../middleware/auth_middleware");

const router = express.Router();

// 📤 Public: Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📄 Public: Get single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// 📥 Admin: Create blog
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

    res.status(201).json(newBlog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// ✏️ Admin: Update blog
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
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Failed to update blog" });
  }
});

// ❌ Admin: Delete blog
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

module.exports = router;
