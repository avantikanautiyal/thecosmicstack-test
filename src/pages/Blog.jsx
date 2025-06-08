import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import CosmoParticles from "../components/common/CosmoParticles";
import { FiCalendar, FiUser, FiTag, FiArrowRight } from "react-icons/fi";

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:3002/blogs");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
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

  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  const filteredPosts = blogPosts.filter((post) =>
    activeCategory === "All" ? true : post.category === activeCategory
  );

  return (
    <>
      <CosmoParticles count={70} opacity={0.3} />

      <section className="pt-32 pb-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-10">
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

          {/* Category filter section at the top */}
          <div className="max-w-4xl mx-auto mt-10">
            {/* Desktop floating category filter */}
            <div className="hidden md:flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  animate={{
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 3 + (index % 3), // slight randomness
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md shadow-md transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-blue-500/30 text-blue-200 border border-blue-400"
                        : "bg-slate-800/40 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Mobile floating category filter */}
            <div className="md:hidden flex space-x-3 overflow-x-auto py-4 px-2">
              {categories.map((category, index) => (
                <motion.div
                  key={category}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2.5 + (index % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium flex-shrink-0 backdrop-blur-md shadow-md transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-blue-500/30 text-blue-200 border border-blue-400"
                        : "bg-slate-800/40 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-400"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin"></div>
              <span className="ml-4 text-slate-400">Loading articles...</span>
            </div>
          ) : error ? (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <FadeIn key={post.id} delay={index * 0.1}>
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="cosmic-card text-center py-16">
              <h3 className="text-2xl font-bold mb-4">No posts found</h3>
              <p className="text-slate-400 mb-6">
                There are no blog posts in this category yet.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/40 hover:bg-blue-500/30 transition-colors"
              >
                Reset to All
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const BlogCard = ({ post }) => {
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
            <svg
              className="w-full h-full text-slate-700"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <rect width="24" height="24" fill="currentColor" opacity="0.2" />
              <path d="M4 4h16v16H4z" opacity="0.2" />
              <circle cx="12" cy="12" r="5" opacity="0.2" />
            </svg>
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
      {renderImage()}
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
      <div className="mb-4">
        <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
          {post.category}
        </span>
      </div>
      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
      <p className="text-slate-400 mb-6 flex-grow">{post.excerpt}</p>
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
      <Link
        to={`/blog/${post._id}`}
        className="flex items-center text-blue-400 font-medium mt-auto"
      >
        Read more <FiArrowRight className="ml-2" />
      </Link>
    </motion.div>
  );
};

export default Blog;
