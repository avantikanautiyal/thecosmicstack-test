import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "../animations/FadeIn";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

// We'll assume each team member has an 'image' field in the API response
// that contains the filename/path relative to the assets directory

const Team = () => {
  // Initialize state variables
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch team data on component mount
  useEffect(() => {
    fetchTeam();
  }, []);

  // Fetch team members from backend
  const fetchTeam = async () => {
    try {
      const res = await fetch("http://localhost:3002/teams");
      const data = await res.json();
      setTeam(data);
    } catch (error) {
      console.log("Error fetching team data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="team" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-16">
          <span className="bg-slate-800/70 text-blue-400 px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-500/20 inline-block mb-4">
            The Crew
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="cosmic-text">Stellar</span> Team
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We're a diverse group of passionate technologists, designers, and
            problem-solvers dedicated to creating exceptional digital
            experiences.
          </p>
        </FadeIn>

        {/* Team grid */}
        {loading ? (
          <div className="text-center text-white">Loading team members...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <FadeIn key={member.id} delay={index * 0.1}>
                <motion.div
                  className="cosmic-card h-full bg-slate-900 p-8"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Member avatar - styled like the example with circular rings */}
                  <div className="mb-8 relative flex justify-center">
                    <div className="relative">
                      {/* Main circular image container */}
                      <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-700 z-10 relative bg-slate-800">
                        {member.image ? (
                          <img
                            src={`${member.image}`}
                            alt={member.name.charAt(0)}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl font-bold text-white">
                            {member.name.charAt(0)}
                          </div>
                        )}
                      </div>

                      {/* Decorative rings - multiple nested rings like in the screenshot */}
                      <div className="absolute -top-3 -left-3 w-34 h-34 border border-blue-500/30 rounded-full"></div>
                      <div className="absolute -top-2 -left-2 w-32 h-32 border border-blue-500/20 rounded-full"></div>
                      <div className="absolute -top-1 -left-1 w-30 h-30 border border-blue-400/10 rounded-full"></div>
                    </div>
                  </div>

                  {/* Member info */}
                  <h3 className="text-2xl font-bold mb-2 text-center">
                    {member.name}
                  </h3>
                  <p className="text-slate-400 mb-8 text-center">
                    {member.bio}
                  </p>

                  {/* Social links */}
                  <div className="flex justify-center space-x-6 mt-auto">
                    <a
                      href={member.social.Linkedin}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <FiLinkedin size={20} />
                    </a>
                    <a
                      href={member.social.Github}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <FiGithub size={20} />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                    >
                      <FiTwitter size={20} />
                    </a>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Team;
