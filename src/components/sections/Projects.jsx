import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import Button from "../common/Button";
import { FiExternalLink, FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web" },
    { id: "mobile", name: "Mobile" },
    { id: "ui", name: "UI/UX" },
    { id: "cloud", name: "Cloud" },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3002/projects");
        const data = await res.json();
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) =>
          project.category?.includes(activeCategory)
        );

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

  if (loading) {
    return (
      <section className="py-20 bg-slate-900 text-center text-white">
        Loading projects...
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-40 left-20 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="cosmic-text">Stellar</span> Projects
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Explore our portfolio of innovative digital solutions designed and
            developed for clients across various industries.
          </p>
        </FadeIn>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                  : "bg-slate-800/40 text-slate-400 border border-slate-700/40 hover:bg-slate-800/60 hover:text-slate-300"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id || index}
                variants={itemVariants}
                className="group"
              >
                <div className="cosmic-card overflow-hidden h-full flex flex-col">
                  {/* Project image */}
                  <div className="relative h-48 overflow-hidden rounded-lg mb-5">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                        <div className="text-2xl font-bold text-white opacity-20">
                          {project.title}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project info */}
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-400 mb-4 flex-grow">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies?.map((tech, i) => (
                      <span
                        key={`${project._id || index}-${i}`}
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
                    Learn more <FiArrowRight className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View all projects button */}
        <div className="text-center mt-14">
          <Button to="/portfolio" variant="outline">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
