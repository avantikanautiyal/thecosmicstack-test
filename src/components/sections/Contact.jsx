import React, { useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import { FiMapPin, FiMail, FiPhone, FiSend, FiCheck } from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:3002/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message.");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Submission error:", error.message);
      alert("Failed to send message. Please try again later.");
    }
  };

  const contactInfo = [
    {
      id: 1,
      icon: <FiMapPin />,
      title: "Our Location",
      content: "Noida, Uttar Pradesh, 201305",
    },
    {
      id: 2,
      icon: <FiMail />,
      title: "Email Us",
      content: "thecosmicstack@gmail.com",
    },
    {
      id: 3,
      icon: <FiPhone />,
      title: "Call Us",
      content: "(+91)8126931789, (+91)7505672873",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to <span className="cosmic-text">Launch</span> Your Project?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Contact us today to discuss your project needs and discover how
            TheCosmicStack can bring your digital vision to life.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact information */}
          <FadeIn direction="right">
            <div className="cosmic-card h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-slate-400 mb-8">
                Have a question or want to start a project? Reach out to us
                using any of the channels below or fill out the form.
              </p>

              {/* Contact details */}
              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="mr-4 p-3 bg-slate-800/50 rounded-lg text-blue-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-slate-400">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map or illustration */}
              <div className="relative mt-10">
                <div className="absolute -inset-2 bg-blue-500/10 rounded-lg filter blur-md"></div>
                <div className="relative rounded-lg overflow-hidden h-64 cosmic-border">
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                    <svg
                      viewBox="0 0 200 100"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-full h-full"
                    >
                      {/* Simplified map illustration */}
                      <rect
                        x="0"
                        y="0"
                        width="200"
                        height="100"
                        fill="#1e293b"
                      />

                      {/* Grid lines */}
                      <g stroke="rgba(59, 130, 246, 0.1)" strokeWidth="0.5">
                        {[...Array(10)].map((_, i) => (
                          <React.Fragment key={`grid-${i}`}>
                            <line x1="0" y1={i * 10} x2="200" y2={i * 10} />
                            <line x1={i * 20} y1="0" x2={i * 20} y2="100" />
                          </React.Fragment>
                        ))}
                      </g>

                      {/* Roads */}
                      <path
                        d="M0,50 L200,50"
                        stroke="#334155"
                        strokeWidth="3"
                      />
                      <path
                        d="M100,0 L100,100"
                        stroke="#334155"
                        strokeWidth="3"
                      />
                      <path
                        d="M30,20 L180,80"
                        stroke="#334155"
                        strokeWidth="2"
                      />

                      {/* Location marker */}
                      <circle cx="100" cy="50" r="10" fill="#3b82f6" />
                      <circle cx="100" cy="50" r="5" fill="#1e40af" />

                      {/* Animated pulse around marker */}
                      <motion.circle
                        cx="100"
                        cy="50"
                        r="15"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                        initial={{ opacity: 1, scale: 0 }}
                        animate={{ opacity: 0, scale: 2 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop",
                        }}
                      />

                      {/* Buildings */}
                      <rect
                        x="40"
                        y="30"
                        width="10"
                        height="10"
                        fill="#475569"
                      />
                      <rect
                        x="150"
                        y="60"
                        width="10"
                        height="10"
                        fill="#475569"
                      />
                      <rect
                        x="70"
                        y="70"
                        width="12"
                        height="12"
                        fill="#475569"
                      />
                      <rect
                        x="130"
                        y="25"
                        width="15"
                        height="15"
                        fill="#475569"
                      />
                    </svg>

                    {/* Company name overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-slate-900/80 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
                        TheCosmicStack HQ
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Contact form */}
          <FadeIn direction="left">
            <div className="cosmic-card h-full">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

              {isSubmitted ? (
                <motion.div
                  className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 flex items-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FiCheck className="text-green-400 mt-1 mr-3" size={20} />
                  <div>
                    <h4 className="font-bold text-white mb-1">Message Sent!</h4>
                    <p className="text-slate-300">
                      Thank you for contacting us. We'll get back to you
                      shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-slate-300 mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                        placeholder=""
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-slate-300 mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                        placeholder=""
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-slate-300 mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                      placeholder="Project Inquiry"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-slate-300 mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      className="cosmic-button flex items-center justify-center w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <FiSend className="ml-2" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
