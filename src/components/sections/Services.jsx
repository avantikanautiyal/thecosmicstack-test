import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../common/Card";
import FadeIn from "../animations/FadeIn";
import { FiCode, FiLayout, FiTrello, FiCloud, FiServer } from "react-icons/fi";

const iconMap = {
  FiCode,
  FiLayout,
  FiTrello,
  FiCloud,
  FiServer,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3002/services");
        const data = await res.json();
        console.log("Fetched services:", data);
        setServices(data || []);
      } catch (error) {
        console.log("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-950 text-center text-white">
        Loading services...
      </section>
    );
  }

  return (
    <section
      id="services"
      className="py-20 bg-slate-950 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn className="text-center mb-16">
          <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cosmic <span className="cosmic-text">Services</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            From web and mobile development to cloud solutions and DevOps, we
            provide a full spectrum of services to elevate your digital
            presence.
          </p>
        </FadeIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || FiCode;

            return (
              <motion.div key={service._id || index} variants={cardVariants}>
                <Card
                  className="h-full flex flex-col"
                  hoverEffect={true}
                  delay={index * 0.1}
                >
                  <div className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/70 rounded-lg mb-4 inline-block text-blue-400 text-2xl">
                    <IconComponent />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 mb-4 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {Array.isArray(service.technologies) &&
                      service.technologies.map((tech, i) => (
                        <span
                          key={`${service._id || index}-${i}`}
                          className="text-xs py-1 px-2 bg-slate-800/70 text-slate-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
