import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
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

  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true);
        if (!id || id === "undefined") {
          setError("Invalid blog ID");
          return;
        }

        const postResponse = await fetch(`http://localhost:3002/blogs/${id}`);
        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }

        const postData = await postResponse.json();
        setPost(postData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo(0, 0);
    fetchBlogPost();
  }, [id]);

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
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard"))
        .catch((err) => console.error("Could not copy text: ", err));
    }
  };

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
      <CosmoParticles count={50} opacity={0.2} />

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

            {post.excerpt ? (
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-8">
                {post.excerpt}
              </p>
            ) : (
              <p className="text-slate-400 text-lg md:text-xl max-w-3xl mb-8">
                {post.content.replace(/<[^>]*>/g, "").substring(0, 200)}...
              </p>
            )}

            <div className="relative rounded-lg overflow-hidden mb-12 cosmic-border max-w-4xl mx-auto">
              {post.imageUrl && post.imageUrl.trim() !== "" ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-[300px] object-cover object-center"
                />
              ) : (
                <div className="h-[300px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center relative">
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

      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl bg-slate-800 p-10 shadow-xl border border-slate-700"
            >
              <div className="flex justify-end mb-8 space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:text-blue-400 flex items-center justify-center"
                  onClick={handleShare}
                >
                  <FiShare2 />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:text-pink-400 flex items-center justify-center"
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
                  className="w-10 h-10 rounded-full bg-slate-700 text-slate-300 hover:text-green-400 flex items-center justify-center"
                  onClick={() => {
                    const commentSection = document.getElementById("comments");
                    if (commentSection) {
                      commentSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  <FiMessageSquare />
                </motion.button>
              </div>

              <div
                className="prose prose-invert prose-blue max-w-none text-slate-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-700">
                  <h3 className="text-lg font-bold mb-4 flex items-center">
                    <FiTag className="mr-2" /> Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/blog?tag=${tag}`}
                        className="px-3 py-1 text-sm bg-slate-700 text-slate-300 hover:text-blue-400 rounded-full transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-slate-700">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {post.authorImageUrl ? (
                    <img
                      src={post.authorImageUrl}
                      alt={post.author}
                      className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/20 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center text-blue-400 flex-shrink-0">
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
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPostDetail;
