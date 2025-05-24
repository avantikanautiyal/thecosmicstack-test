import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import CosmoParticles from "../components/common/CosmoParticles";
import Button from "../components/common/Button";
import Contact from "../components/sections/Contact";
import {
  FiExternalLink,
  FiFilter,
  FiLayout,
  FiSmartphone,
  FiDatabase,
  FiCloud,
} from "react-icons/fi";

const Portfolio = () => {
  // Initialize state variables
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Scroll to top on component mount and fetch projects
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects();
  }, []);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3002/projects");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log("Error fetching projects: ", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Development", icon: <FiLayout /> },
    { id: "mobile", name: "Mobile Apps", icon: <FiSmartphone /> },
    { id: "ui/ux", name: "UI/UX Design", icon: <FiLayout /> },
    { id: "cloud", name: "Cloud Solutions", icon: <FiCloud /> },
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category.includes(activeCategory));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our <span className="cosmic-text">Portfolio</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              Explore our showcase of innovative digital solutions we've created
              for clients across various industries.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured projects */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Highlighted Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured <span className="cosmic-text">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              These are some of our most impactful projects that showcase our
              capabilities and expertise.
            </p>
          </FadeIn>

          {loading ? (
            <p className="text-center text-white">
              Loading featured projects...
            </p>
          ) : (
            <div className="space-y-24">
              {projects
                .filter((p) => p.featured)
                .map((project, index) => (
                  <FadeIn key={project.id} delay={index * 0.2}>
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Project image */}
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-blue-500/10 rounded-xl filter blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="cosmic-card p-0 overflow-hidden relative">
                          {/* We have actual images */}
                          <div className="aspect-video relative group-hover:scale-105 transition-transform duration-500">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-xl"
                              />
                            ) : (
                              <div className="bg-slate-800 w-full h-full flex items-center justify-center rounded-xl">
                                <h3 className="text-3xl font-bold text-white opacity-20">
                                  {project.title}
                                </h3>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50 rounded-xl"></div>
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                              <Button
                                href={project.link}
                                variant="primary"
                                className="flex items-center"
                              >
                                View Project <FiExternalLink className="ml-2" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Project details */}
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 text-lg mb-6">
                          {project.description}
                        </p>

                        <div className="space-y-4 mb-8">
                          {/* Client */}
                          <div className="flex items-start">
                            <span className="text-blue-400 font-medium w-32">
                              Client:
                            </span>
                            <span className="text-white">{project.client}</span>
                          </div>

                          {/* Categories */}
                          <div className="flex items-start">
                            <span className="text-blue-400 font-medium w-32">
                              Categories:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.category.map((cat, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                                >
                                  {categories.find((c) => c.id === cat)?.name}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="flex items-start">
                            <span className="text-blue-400 font-medium w-32">
                              Technologies:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Button
                          href={project.link}
                          variant="primary"
                          className="flex items-center"
                        >
                          View Case Study <FiExternalLink className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </FadeIn>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* All projects section */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All <span className="cosmic-text">Projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Browse our complete portfolio of work across different categories.
            </p>
          </FadeIn>

          {/* Mobile filter toggle */}
          <div className="md:hidden mb-8">
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="w-full flex items-center justify-between p-3 bg-slate-800 rounded-lg text-white"
            >
              <span className="flex items-center">
                <FiFilter className="mr-2" /> Filter Projects
              </span>
              <span>
                {filtersVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* Category filters */}
          <motion.div
            className={`flex flex-wrap justify-center gap-3 mb-12 ${
              filtersVisible ? "block" : "hidden md:flex"
            }`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: filtersVisible ? "auto" : "auto",
              opacity: filtersVisible ? 1 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center ${
                  activeCategory === category.id
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                    : "bg-slate-800/40 text-slate-400 border border-slate-700/40 hover:bg-slate-800/60 hover:text-slate-300"
                }`}
              >
                {category.icon && <span className="mr-2">{category.icon}</span>}
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            {loading ? (
              <p className="text-center text-white">Loading projects...</p>
            ) : (
              <motion.div
                key={activeCategory}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filteredProjects
                  .filter((p) => !p.featured)
                  .map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      className="group"
                    >
                      <div className="cosmic-card overflow-hidden h-full flex flex-col">
                        {/* Project image */}
                        <div className="relative h-48 overflow-hidden rounded-lg mb-5 group">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) =>
                                (e.currentTarget.style.display = "none")
                              }
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                              <div className="text-2xl font-bold text-white opacity-20">
                                {project.title}
                              </div>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:opacity-75 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/30 transition-colors duration-300"></div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              href={project.link}
                              variant="primary"
                              size="sm"
                              className="flex items-center"
                            >
                              View Project <FiExternalLink className="ml-2" />
                            </Button>
                          </div>
                        </div>

                        {/* Project info */}
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-slate-400 mb-4 flex-grow">
                          {project.description}
                        </p>

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span
                              key={`${project.id}-${i}`}
                              className="text-xs py-1 px-2 bg-slate-800/70 text-slate-300 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Link */}
                        <a
                          href={project.link}
                          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto"
                        >
                          Learn more
                          <svg
                            className="ml-1 w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </a>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Contact section */}
      <Contact />
    </>
  );
};

export default Portfolio;
