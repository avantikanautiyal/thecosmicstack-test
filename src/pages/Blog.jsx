import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import CosmoParticles from "../components/common/CosmoParticles";
import {
  FiCalendar,
  FiUser,
  FiTag,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";

const Blog = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for blog posts and loading status
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3002/blogs");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // parse the JSON from response
        setBlogPosts(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Derive categories from fetched posts
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Background particles effect */}
      <CosmoParticles count={70} opacity={0.3} />

      {/* Hero section */}
      <section className="pt-32 pb-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Our Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              The <span className="cosmic-text">Cosmic</span> Blog
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              Explore our latest thoughts, insights, and expertise on web
              development, design, and technology.
            </p>
          </FadeIn>

          {/* Search and filter section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="cosmic-card">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Search input */}
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Category filter - desktop */}
                <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                          : "text-slate-400 hover:text-white border border-slate-700/40 hover:border-slate-600"
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category filter - mobile */}
              <div className="md:hidden flex space-x-2 overflow-x-auto py-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                      activeCategory === category
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                        : "text-slate-400 hover:text-white border border-slate-700/40 hover:border-slate-600"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isLoading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin"></div>
              <span className="ml-4 text-slate-400">Loading articles...</span>
            </div>
          ) : error ? (
            // Error state
            <div className="cosmic-card text-center py-16">
              <h3 className="text-2xl font-bold mb-4 text-red-400">Oops!</h3>
              <p className="text-slate-400 mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            // Blog posts grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.1}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            // No posts found message
            <div className="cosmic-card text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No posts found</h3>
              <p className="text-slate-400 mb-6">
                We couldn't find any posts matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// Blog card component
const BlogCard = ({ post }) => {
  // Helper function to render image properly - handle both URLs and placeholder images
  const renderImage = () => {
    if (post.imageUrl) {
      return (
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    } else {
      return (
        <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            {/* Placeholder for when no image is available */}
            <svg
              className="w-full h-full text-slate-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="currentColor" opacity="0.2" />
              <path d="M4 4h16v16H4z" opacity="0.2" />
              <circle cx="12" cy="12" r="5" opacity="0.2" />
            </svg>

            {/* Post title overlay for image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <h3 className="text-lg font-bold text-white text-center">
                {post.title}
              </h3>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      className="cosmic-card h-full flex flex-col overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Featured image */}
      {renderImage()}

      {/* Post metadata */}
      <div className="flex items-center text-sm text-slate-400 mb-3 space-x-4">
        <div className="flex items-center">
          <FiCalendar className="mr-1" />
          <span>{post.date}</span>
        </div>
        <div className="flex items-center">
          <FiUser className="mr-1" />
          <span>{post.author}</span>
        </div>
      </div>

      {/* Post category */}
      <div className="mb-4">
        <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
          {post.category}
        </span>
      </div>

      {/* Post title */}
      <h3 className="text-xl font-bold mb-3">{post.title}</h3>

      {/* Post excerpt */}
      <p className="text-slate-400 mb-6 flex-grow">{post.excerpt}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags &&
          post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-slate-400 border border-slate-700 rounded-full px-2 py-1"
            >
              #{tag}
            </span>
          ))}
      </div>

      {/* Read more link */}
      <Link
        to={`/blog/${post.id}`}
        className="flex items-center text-blue-400 font-medium mt-auto"
      >
        Read more <FiArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
};

export default Blog;
