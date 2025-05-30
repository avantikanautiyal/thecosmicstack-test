import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiSave,
  FiEye,
  FiTrash2,
  FiPlus,
  FiImage,
  FiCalendar,
  FiTag,
  FiUser,
  FiFileText,
  FiSettings,
  FiUpload,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiSearch,
  FiFilter,
  FiBold,
  FiItalic,
  FiLink,
  FiCode,
  FiList,
} from "react-icons/fi";

const BlogAdmin = () => {
  // State management
  const [activeTab, setActiveTab] = useState("write");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [currentPost, setCurrentPost] = useState({
    id: null,
    title: "",
    content: "",
    category: "Web Development",
    tags: [],
    author: "Admin",
    imageUrl: "",
    status: "draft",
    publishDate: new Date().toISOString().split("T")[0],
  });

  // Form states
  const [tagInput, setTagInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [notification, setNotification] = useState(null);

  // Rich text editor ref
  const contentRef = useRef(null);

  // API base URL - you can move this to environment variables
  const API_BASE_URL = "http://localhost:3002";

  // Categories for dropdown
  const categories = [
    "Web Development",
    "Design",
    "Technology",
    "AI & Machine Learning",
    "DevOps",
    "Mobile Development",
    "UI/UX",
    "Backend",
    "Frontend",
  ];

  // Fetch posts from backend
  const fetchPosts = async () => {
    setIsLoadingPosts(true);
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        showNotification("Failed to fetch posts", "error");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      showNotification("Error fetching posts", "error");
    } finally {
      setIsLoadingPosts(false);
    }
  };

  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Notification handler
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setCurrentPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Rich text editor functions
  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current.focus();
  };

  const handleContentChange = () => {
    if (contentRef.current) {
      setCurrentPost((prev) => ({
        ...prev,
        content: contentRef.current.innerHTML,
      }));
    }
  };

  // Handle tag addition
  const addTag = () => {
    if (tagInput.trim() && !currentPost.tags.includes(tagInput.trim())) {
      setCurrentPost((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Handle tag removal
  const removeTag = (tagToRemove) => {
    setCurrentPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle save/publish with backend API
  const handleSave = async (status = "draft") => {
    const authToken = localStorage.getItem("authToken");
    if (!currentPost.title.trim()) {
      showNotification("Please enter a title", "error");
      return;
    }

    if (!currentPost.content.trim()) {
      showNotification("Please enter content", "error");
      return;
    }

    setIsLoading(true);

    try {
      const postData = {
        title: currentPost.title,
        content: currentPost.content,
        category: currentPost.category,
        tags: currentPost.tags,
        author: currentPost.author,
        imageUrl: currentPost.imageUrl,
        status,
        publishDate: currentPost.publishDate,
      };

      let response;
      if (currentPost.id) {
        // Update existing post
        response = await fetch(`${API_BASE_URL}/blogs/${currentPost.id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
      } else {
        // Create new post
        response = await fetch(`${API_BASE_URL}/blogs`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
      }

      if (response.ok) {
        const savedPost = await response.json();
        showNotification(
          `Post ${status === "published" ? "published" : "saved"} successfully!`
        );
        status == "published";

        // Refresh posts list
        fetchPosts();

        if (status === "published") {
          setActiveTab("posts");
        }

        // Update current post with saved data
        setCurrentPost((prev) => ({
          ...prev,
          id: savedPost.id || savedPost._id,
        }));
      } else {
        const errorData = await response.json();
        showNotification(errorData.message || "Failed to save post", "error");
      }
    } catch (error) {
      console.error("Error saving post:", error);
      showNotification("Error saving post", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle post selection for editing
  const editPost = (post) => {
    setCurrentPost({
      id: post.id || post._id,
      title: post.title,
      content: post.content,
      category: post.category,
      tags: post.tags || [],
      author: post.author,
      imageUrl: post.imageUrl || "",
      status: post.status,
      publishDate: post.publishDate || post.date,
    });

    // Set content in rich text editor
    if (contentRef.current) {
      contentRef.current.innerHTML = post.content;
    }

    setActiveTab("write");
  };

  // Handle post deletion
  const deletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showNotification("Post deleted successfully!");
          fetchPosts(); // Refresh posts list
        } else {
          showNotification("Failed to delete post", "error");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        showNotification("Error deleting post", "error");
      }
    }
  };

  // Clear form
  const clearForm = () => {
    setCurrentPost({
      id: null,
      title: "",
      content: "",
      category: "Web Development",
      tags: [],
      author: "Admin",
      imageUrl: "",
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
    });

    // Clear rich text editor
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.content &&
        post.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter =
      filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Cosmic particles background */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/3 rounded-full filter blur-3xl"></div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-sm ${
            notification.type === "success"
              ? "bg-green-500/20 border-green-500/40 text-green-400"
              : "bg-red-500/20 border-red-500/40 text-red-400"
          }`}
        >
          <div className="flex items-center">
            {notification.type === "success" ? (
              <FiCheck className="mr-2" />
            ) : (
              <FiAlertCircle className="mr-2" />
            )}
            {notification.message}
          </div>
        </motion.div>
      )}

      {/* Admin Header - Full Screen */}
      <header className="bg-slate-900/95 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-40 shadow-2xl">
        <div className="px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and title */}
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <FiEdit3 className="text-white text-lg" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="cosmic-text">Cosmic</span> Blog Admin
                  </h1>
                  <p className="text-sm text-slate-400">
                    Content Management System
                  </p>
                </div>
              </div>
            </div>

            {/* Tab navigation */}
            <nav className="flex items-center space-x-2">
              {[
                { id: "write", label: "Write", icon: FiEdit3 },
                { id: "posts", label: "Posts", icon: FiFileText },
                { id: "settings", label: "Settings", icon: FiSettings },
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent"
                  }`}
                >
                  <tab.icon className="mr-2 w-4 h-4" />
                  {tab.label}
                </motion.button>
              ))}
            </nav>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-400">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <FiUser className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content - Full screen layout */}
      <main className="px-6 lg:px-8 py-8 relative z-10 min-h-screen">
        {/* Write Tab */}
        {activeTab === "write" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main editor */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div className="cosmic-card">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Article Title
                    </label>
                    <input
                      type="text"
                      value={currentPost.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="Enter your article title..."
                    />
                  </div>
                </div>

                {/* Rich text content editor */}
                <div className="cosmic-card">
                  <label className="block text-sm font-medium text-slate-300 mb-4">
                    Content
                  </label>
                  <div className="border border-slate-700 rounded-lg overflow-hidden">
                    {/* Rich text toolbar */}
                    <div className="bg-slate-800/50 border-b border-slate-700 p-3">
                      <div className="flex items-center space-x-2 flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => formatText("bold")}
                          className="p-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Bold"
                        >
                          <FiBold />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("italic")}
                          className="p-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Italic"
                        >
                          <FiItalic />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("underline")}
                          className="px-3 py-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Underline"
                        >
                          U
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Enter URL:");
                            if (url) formatText("createLink", url);
                          }}
                          className="p-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Link"
                        >
                          <FiLink />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("insertOrderedList")}
                          className="px-3 py-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Numbered List"
                        >
                          1.
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("insertUnorderedList")}
                          className="p-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Bullet List"
                        >
                          <FiList />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("formatBlock", "h2")}
                          className="px-3 py-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Heading"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText("formatBlock", "p")}
                          className="px-3 py-2 text-sm bg-slate-700/50 text-slate-300 rounded hover:bg-slate-700 transition-colors"
                          title="Paragraph"
                        >
                          P
                        </button>
                      </div>
                    </div>

                    {/* Rich text editor */}
                    <div
                      ref={contentRef}
                      contentEditable
                      onInput={handleContentChange}
                      className="w-full bg-slate-800/30 text-white p-4 min-h-96 focus:outline-none rich-text-editor"
                      style={{ minHeight: "400px" }}
                      placeholder="Start writing your article..."
                      suppressContentEditableWarning={true}
                    />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish options */}
                <div className="cosmic-card">
                  <h3 className="text-lg font-bold mb-4">Publish Options</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSave("draft")}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Saving..." : "Save Draft"}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSave("published")}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                      >
                        {isLoading ? "Publishing..." : "Publish"}
                      </motion.button>
                    </div>

                    <button
                      onClick={clearForm}
                      className="w-full px-4 py-2 text-slate-400 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      Clear Form
                    </button>
                  </div>
                </div>

                {/* Post details */}
                <div className="cosmic-card">
                  <h3 className="text-lg font-bold mb-4">Post Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Category
                      </label>
                      <select
                        value={currentPost.category}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Author
                      </label>
                      <input
                        type="text"
                        value={currentPost.author}
                        onChange={(e) =>
                          handleInputChange("author", e.target.value)
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Publish Date
                      </label>
                      <input
                        type="date"
                        value={currentPost.publishDate}
                        onChange={(e) =>
                          handleInputChange("publishDate", e.target.value)
                        }
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>

                {/* Featured image */}
                <div className="cosmic-card">
                  <h3 className="text-lg font-bold mb-4">Featured Image</h3>
                  <div className="space-y-4">
                    <input
                      type="url"
                      value={currentPost.imageUrl}
                      onChange={(e) =>
                        handleInputChange("imageUrl", e.target.value)
                      }
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Image URL..."
                    />
                    <button className="w-full px-4 py-2 border border-slate-700 text-slate-400 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center">
                      <FiUpload className="mr-2" />
                      Upload Image
                    </button>
                    {currentPost.imageUrl && (
                      <div className="aspect-video bg-slate-800 rounded-lg overflow-hidden">
                        <img
                          src={currentPost.imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div className="cosmic-card">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addTag())
                        }
                        className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                        placeholder="Add tag..."
                      />
                      <button
                        onClick={addTag}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-slate-400 hover:text-red-400"
                          >
                            <FiX size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Tab */}
        {activeTab === "posts" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            {/* Header */}
            <div className="cosmic-card mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Manage Posts</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      placeholder="Search posts..."
                    />
                  </div>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>

                  <button
                    onClick={() => setActiveTab("write")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    New Post
                  </button>

                  <button
                    onClick={fetchPosts}
                    disabled={isLoadingPosts}
                    className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors disabled:opacity-50"
                  >
                    {isLoadingPosts ? "Loading..." : "Refresh"}
                  </button>
                </div>
              </div>
            </div>

            {/* Posts list */}
            {isLoadingPosts ? (
              <div className="cosmic-card text-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-slate-400">Loading posts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <motion.div
                    key={post.id || post._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="cosmic-card"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">{post.title}</h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === "published"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {post.status}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-slate-500 space-x-4">
                          <span className="flex items-center">
                            <FiCalendar className="mr-1" />
                            {post.date ||
                              post.publishDate ||
                              new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <FiUser className="mr-1" />
                            {post.author}
                          </span>
                          <span className="flex items-center">
                            <FiTag className="mr-1" />
                            {post.category}
                          </span>
                          {post.tags && post.tags.length > 0 && (
                            <span className="flex items-center">
                              <FiTag className="mr-1" />
                              {post.tags.slice(0, 2).join(", ")}
                              {post.tags.length > 2 && "..."}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => editPost(post)}
                          className="p-2 text-slate-400 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <FiEdit3 />
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-green-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Preview post"
                        >
                          <FiEye />
                        </button>
                        <button
                          onClick={() => deletePost(post.id || post._id)}
                          className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Delete post"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {filteredPosts.length === 0 && !isLoadingPosts && (
              <div className="cosmic-card text-center py-16">
                <h3 className="text-xl font-bold mb-4">No posts found</h3>
                <p className="text-slate-400 mb-6">
                  {searchQuery || filterStatus !== "all"
                    ? "No posts match your current filters."
                    : "You haven't created any posts yet."}
                </p>
                <button
                  onClick={() => setActiveTab("write")}
                  className="cosmic-button"
                >
                  Create Your First Post
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="cosmic-card">
              <h2 className="text-2xl font-bold mb-8">Blog Settings</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4">General Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Blog Title
                      </label>
                      <input
                        type="text"
                        defaultValue="The Cosmic Blog"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Default Author
                      </label>
                      <input
                        type="text"
                        defaultValue="TheCosmicStack Team"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4">API Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        API Endpoint
                      </label>
                      <input
                        type="url"
                        defaultValue="https://thecosmicstackk.onrender.com/blogs"
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="cosmic-button">Save Settings</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Custom styles */}
      <style jsx>{`
        .cosmic-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 24px;
        }

        .cosmic-button {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2) 0%,
            rgba(147, 51, 234, 0.2) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #60a5fa;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cosmic-button:hover {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.3) 0%,
            rgba(147, 51, 234, 0.3) 100%
          );
          transform: translateY(-2px);
        }

        .cosmic-text {
          background: linear-gradient(
            135deg,
            #60a5fa 0%,
            #a855f7 50%,
            #3b82f6 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .rich-text-editor {
          line-height: 1.6;
        }

        .rich-text-editor:empty:before {
          content: "Start writing your article...";
          color: #64748b;
          font-style: italic;
        }

        .rich-text-editor h1,
        .rich-text-editor h2,
        .rich-text-editor h3 {
          font-weight: bold;
          margin: 16px 0 8px 0;
        }

        .rich-text-editor h1 {
          font-size: 1.875rem;
        }

        .rich-text-editor h2 {
          font-size: 1.5rem;
        }

        .rich-text-editor h3 {
          font-size: 1.25rem;
        }

        .rich-text-editor p {
          margin: 8px 0;
        }

        .rich-text-editor ul,
        .rich-text-editor ol {
          margin: 8px 0;
          padding-left: 24px;
        }

        .rich-text-editor li {
          margin: 4px 0;
        }

        .rich-text-editor a {
          color: #60a5fa;
          text-decoration: underline;
        }

        .rich-text-editor strong {
          font-weight: bold;
        }

        .rich-text-editor em {
          font-style: italic;
        }

        .rich-text-editor u {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default BlogAdmin;
