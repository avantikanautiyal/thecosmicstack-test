import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../components/animations/FadeIn";
import CosmoParticles from "../components/common/CosmoParticles";
import Process from "../components/sections/Process";
import Contact from "../components/sections/Contact";
import {
  FiCode,
  FiSmartphone,
  FiLayout,
  FiTrello,
  FiCloud,
  FiServer,
  FiDatabase,
  FiShield,
  FiPlusCircle,
  FiMinusCircle,
} from "react-icons/fi";

const iconMap = {
  FiCode,
  FiSmartphone,
  FiLayout,
  FiTrello,
  FiCloud,
  FiServer,
  FiDatabase,
  FiShield,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:3002/services");
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.log("Error fetching services: ", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "What is your approach to project development?",
      answer:
        "We follow an agile methodology that emphasizes collaboration, flexibility, and iterative development. This allows us to adapt to changing requirements while maintaining transparency throughout the process. We typically work in 2-week sprints with regular check-ins and demos to ensure the project stays on track.",
    },
    {
      id: 2,
      question: "How do you ensure the quality of your deliverables?",
      answer:
        "Quality is at the core of our development process. We implement strict code reviews, automated testing, and continuous integration practices. Our QA team performs thorough manual testing, and we follow industry best practices for security, performance, and accessibility.",
    },
    {
      id: 3,
      question: "Do you provide support after project completion?",
      answer:
        "Yes, we offer post-launch support and maintenance packages tailored to your needs. This can include bug fixes, security updates, performance optimization, and feature enhancements. We are committed to the long-term success of your project.",
    },
    {
      id: 4,
      question: "What is your typical project timeline?",
      answer:
        "Project timelines vary depending on scope and complexity. A small website might take 4-6 weeks, while a complex web application could take 3-6 months. During our initial consultation, we provide a detailed timeline based on your specific requirements.",
    },
    {
      id: 5,
      question: "How do you handle project changes and new requirements?",
      answer:
        "Our agile approach allows us to accommodate changes throughout the development process. We document new requirements, assess their impact on the timeline and budget, and work with you to prioritize them within the project scope.",
    },
    {
      id: 6,
      question: "What technologies do you specialize in?",
      answer:
        "We specialize in modern web and mobile technologies including React, Vue.js, Next.js, React Native, Node.js, and more. We are always evolving our tech stack to incorporate the latest advancements that benefit our clients.",
    },
  ];

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
              Our Expertise
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="cosmic-text">Services</span> We Offer
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto">
              From web and mobile development to cloud solutions and DevOps, we
              provide a full spectrum of services to bring your digital vision
              to life.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services section */}
      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {loading ? (
            <p className="text-center text-white">Loading services...</p>
          ) : (
            <div className="grid grid-cols-1 gap-16">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon] || FiCode;
                return (
                  <FadeIn key={service.id} delay={index * 0.1}>
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                      }`}
                    >
                      {/* Service details */}
                      <div>
                        <div className="mb-4 p-3 bg-slate-800/50 inline-block rounded-lg">
                          <Icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4">
                          {service.title}
                        </h2>
                        <p className="text-slate-400 text-lg mb-6">
                          {service.description}
                        </p>

                        {/* Service features */}
                        <ul className="space-y-3 mb-6">
                          {service.details.map((detail, i) => (
                            <li key={i} className="flex items-start">
                              <svg
                                className="h-6 w-6 text-blue-400 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span className="text-white">{detail}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Technologies used */}
                        <div>
                          <h3 className="text-lg font-medium mb-3">
                            Technologies We Use
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {service.technologies.map((tech, i) => (
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

                      {/* Service illustration */}
                      <div>
                        <div className="cosmic-card aspect-square max-w-md mx-auto overflow-hidden">
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center p-8">
                            <svg
                              viewBox="0 0 200 200"
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full h-full"
                            >
                              {/* Service-specific illustration */}
                              <defs>
                                <linearGradient
                                  id={`serviceGradient${service.id}`}
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

                              {/* Common background elements */}
                              <rect
                                x="0"
                                y="0"
                                width="200"
                                height="200"
                                fill="transparent"
                              />

                              {/* Grid lines */}
                              <g
                                stroke="rgba(59, 130, 246, 0.1)"
                                strokeWidth="0.5"
                              >
                                {[...Array(10)].map((_, i) => (
                                  <React.Fragment key={`grid-${i}`}>
                                    <line
                                      x1="0"
                                      y1={i * 20}
                                      x2="200"
                                      y2={i * 20}
                                    />
                                    <line
                                      x1={i * 20}
                                      y1="0"
                                      x2={i * 20}
                                      y2="200"
                                    />
                                  </React.Fragment>
                                ))}
                              </g>

                              {/* Service icon representation */}
                              <g transform="translate(60, 60)">
                                <circle
                                  cx="40"
                                  cy="40"
                                  r="40"
                                  fill={`url(#serviceGradient${service.id})`}
                                />
                                <foreignObject
                                  x="15"
                                  y="15"
                                  width="50"
                                  height="50"
                                >
                                  <div
                                    xmlns="http://www.w3.org/1999/xhtml"
                                    className="text-white flex items-center justify-center h-full w-full"
                                  >
                                    <Icon className="w-10 h-10 text-white" />
                                  </div>
                                </foreignObject>
                              </g>

                              {/* Decorative elements */}
                              <circle cx="40" cy="40" r="5" fill="#f472b6" />
                              <circle cx="160" cy="160" r="8" fill="#818cf8" />
                              <circle cx="160" cy="40" r="3" fill="#34d399" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Divider (except for last item) */}
                    {index < services.length - 1 && (
                      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent my-16"></div>
                    )}
                  </FadeIn>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Process section */}
      <Process />

      {/* FAQs section */}
      <section className="py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
              Common Questions
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="cosmic-text">Questions</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Here are some common questions about our services. If you don't
              find what you're looking for, don't hesitate to reach out.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.id} delay={index * 0.1}>
                <div className="cosmic-card mb-4 overflow-hidden">
                  {/* Question */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex justify-between items-center w-full p-4 text-left focus:outline-none"
                  >
                    <h3 className="text-lg font-bold">{faq.question}</h3>
                    <span className="text-blue-400">
                      {activeIndex === index ? (
                        <FiMinusCircle />
                      ) : (
                        <FiPlusCircle />
                      )}
                    </span>
                  </button>

                  {/* Answer */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeIndex === index ? "auto" : 0,
                      opacity: activeIndex === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-slate-400">{faq.answer}</div>
                  </motion.div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact section */}
      <Contact />
    </>
  );
};

export default Services;
