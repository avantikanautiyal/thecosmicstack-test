import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import CosmoParticles from "../components/common/CosmoParticles";
import {
  FiCalendar,
  FiUser,
  FiArrowLeft,
  FiShare2,
  FiHeart,
  FiMessageSquare,
  FiTag,
} from "react-icons/fi";

const BlogPostDetail = () => {
  const { id } = useParams();

  // State
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);

        // Debug: Log the ID
        console.log("Blog ID from useParams:", id);

        if (!id || id === "undefined") {
          setError("Invalid blog ID");
          return;
        }

        // Fetch post details
        const postResponse = await fetch(`http://localhost:3002/blogs/${id}`);

        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData = await postResponse.json();
        console.log("Fetched blog data:", postData);
        setPost(postData);

        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        if (err.response && err.response.status === 404) {
          setError("Blog post not found.");
        } else {
          setError("Failed to load blog post. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0);
    fetchBlogPost();
  }, [id]);

  // Handle share button click
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard"))
        .catch((err) => console.error("Could not copy text: ", err));
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="cosmic-card p-8 flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border-t-2 border-blue-500 animate-spin mb-4"></div>
          <p className="text-slate-400">Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="cosmic-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {error || "Article Not Found"}
          </h2>
          <p className="text-slate-400 mb-6">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="cosmic-button">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Background particles effect */}
      <CosmoParticles count={50} opacity={0.2} />

      {/* Hero section */}
      <section className="pt-32 pb-16 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <Link
              to="/blog"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
            >
              <FiArrowLeft className="mr-2" /> Back to all articles
            </Link>

            {/* Post metadata */}
            <div className="flex flex-wrap items-center text-sm text-slate-400 mb-6 gap-4 md:gap-8">
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                <span>
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <FiUser className="mr-1" />
                <span>{post.author}</span>
              </div>
              <div>
                <span className="bg-slate-800 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            {/* Generate excerpt from content if not available */}
            {post.excerpt ? (
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-8">
                {post.excerpt}
              </p>
            ) : (
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-8">
                {post.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
              </p>
            )}

            {/* Featured image */}
            <div className="relative rounded-lg overflow-hidden mb-12 cosmic-border">
              {post.imageUrl && post.imageUrl.trim() !== "" ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative">
                  {/* Placeholder for when no image is available */}
                  <svg
                    className="w-full h-full text-slate-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="24"
                      height="24"
                      fill="currentColor"
                      opacity="0.1"
                    />
                    <path d="M4 4h16v16H4z" opacity="0.1" />
                  </svg>

                  {/* Post title overlay for image placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-3xl font-bold text-white text-center max-w-2xl px-6">
                      {post.title}
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Article content */}
      <section className="py-12 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="cosmic-card overflow-hidden">
              {/* Social sharing */}
              <div className="flex justify-end mb-8">
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                    onClick={handleShare}
                  >
                    <FiShare2 />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 transition-colors"
                    onClick={async () => {
                      try {
                        await fetch(`http://localhost:3002/blogs/${id}/like`);
                        alert("Thanks for the love!");
                      } catch (err) {
                        console.error("Error liking post:", err);
                      }
                    }}
                  >
                    <FiHeart />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-green-400 transition-colors"
                    onClick={() => {
                      const commentSection =
                        document.getElementById("comments");
                      if (commentSection) {
                        commentSection.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    <FiMessageSquare />
                  </motion.button>
                </div>
              </div>

              {/* Post content */}
              <div
                className="prose prose-invert prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <FiTag className="mr-2" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1 text-sm bg-slate-800 text-slate-300 hover:text-blue-400 rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Author bio */}
              <div className="mt-12 pt-8 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {post.authorImageUrl ? (
                    <img
                      src={post.authorImageUrl}
                      alt={post.author}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/20 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 flex-shrink-0">
                      <FiUser size={24} />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-center sm:text-left">
                      {post.author}
                    </h3>
                    <p className="text-slate-400 mb-4 text-center sm:text-left">
                      {post.authorBio ||
                        `Content creator and writer specializing in ${post.category}.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostDetail;
