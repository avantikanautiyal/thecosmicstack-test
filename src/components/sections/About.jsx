import React from "react";
import { motion } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import { FiCheck } from "react-icons/fi";

const About = () => {
  const stats = [
    { id: 1, value: "2+", label: "Years Experience" },
    { id: 2, value: "10+", label: "Projects Completed" },
    { id: 3, value: "5+", label: "Happy Clients" },
    { id: 4, value: "2+", label: "Team Members" },
  ];

  const values = [
    {
      id: 1,
      title: "Innovation",
      description:
        "We constantly push the boundaries of what is possible in digital technology.",
    },
    {
      id: 2,
      title: "Quality",
      description:
        "We maintain the highest standards in code, design, and user experience.",
    },
    {
      id: 3,
      title: "Collaboration",
      description:
        "We work closely with our clients, treating their goals as our own.",
    },
    {
      id: 4,
      title: "Growth",
      description: "We are committed to continuous learning and improvement.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 right-20 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* About content */}
          <FadeIn direction="right">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Young Innovators with <span className="cosmic-text">Cosmic</span>{" "}
              Vision
            </h2>
            <p className="text-slate-400 mb-6">
              Founded by a team of young tech enthusiasts with a passion for
              creating exceptional digital experiences, TheCosmicStack has
              quickly established itself as a formidable presence in the
              software development industry.
            </p>
            <p className="text-slate-400 mb-8">
              Our mission is to help businesses of all sizes harness the power
              of cutting-edge technology to achieve their goals. We blend
              technical expertise with creative thinking to deliver solutions
              that not only meet but exceed our clients' expectations.
            </p>

            {/* Values */}
            <h3 className="text-xl font-bold mb-4">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {values.map((value) => (
                <div key={value.id} className="flex">
                  <div className="shrink-0 mr-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <FiCheck className="text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{value.title}</h4>
                    <p className="text-slate-400 text-sm">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <motion.a
                href="/about"
                className="text-blue-400 font-medium flex items-center"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more about our team
                <svg
                  className="ml-2 w-4 h-4"
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
              </motion.a>
            </div>
          </FadeIn>

          {/* Stats and image */}
          <div>
            <FadeIn direction="left">
              {/* Company image/visualization */}
              <div className="relative mb-12">
                <div className="absolute -inset-4 bg-blue-500/10 rounded-2xl filter blur-xl"></div>
                <div className="cosmic-card aspect-video relative overflow-hidden">
                  {/* Cosmic-themed visualization */}
                  <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 200"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      <defs>
                        <linearGradient
                          id="aboutGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                      </defs>

                      {/* Background grid */}
                      <g stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5">
                        {[...Array(10)].map((_, i) => (
                          <React.Fragment key={`grid-${i}`}>
                            <line x1="0" y1={i * 20} x2="200" y2={i * 20} />
                            <line x1={i * 20} y1="0" x2={i * 20} y2="200" />
                          </React.Fragment>
                        ))}
                      </g>

                      {/* Company logo representation */}
                      <g transform="translate(70, 70)">
                        <motion.circle
                          cx="30"
                          cy="30"
                          r="30"
                          fill="url(#aboutGradient)"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1 }}
                        />
                        <motion.path
                          d="M15,30 L45,30 M30,15 L30,45"
                          stroke="white"
                          strokeWidth="4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          strokeLinecap="round"
                        />
                      </g>

                      {/* Decorative elements */}
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="5"
                        fill="#f472b6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 1 }}
                      />
                      <motion.circle
                        cx="160"
                        cy="160"
                        r="8"
                        fill="#818cf8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 1.2 }}
                      />
                      <motion.circle
                        cx="160"
                        cy="40"
                        r="3"
                        fill="#34d399"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 1, delay: 1.4 }}
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="cosmic-card text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold cosmic-text mb-1">
                      {stat.value}
                    </div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
