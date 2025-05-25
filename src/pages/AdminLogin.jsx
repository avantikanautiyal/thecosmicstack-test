import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiShield,
  FiAlertCircle,
  FiLoader,
  FiArrowRight,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // State management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState({
    num1: 0,
    num2: 0,
    answer: 0,
  });
  const navigate = useNavigate();

  // Generate captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptchaQuestion({ num1, num2, answer: num1 + num2 });
    setCaptchaAnswer("");
  };

  // Initialize captcha on mount
  useEffect(() => {
    generateCaptcha();
  }, []);

  // Handle lockout timer
  useEffect(() => {
    let interval;
    if (isLocked && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setLoginAttempts(0);
            setError("");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockoutTimer]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  // Validate form
  const validateForm = () => {
    if (!formData.email) {
      setError("Email is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (captchaRequired && parseInt(captchaAnswer) !== captchaQuestion.answer) {
      setError("Incorrect captcha answer");
      return false;
    }
    return true;
  };

  // Handle login submission
  const handleLogin = async () => {
    if (isLocked) {
      setError(`Account locked. Try again in ${formatTime(lockoutTimer)}.`);
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3002/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        if (formData.rememberMe) {
          localStorage.setItem("adminRememberMe", "true");
        }

        localStorage.setItem("authToken", data.token); // Store auth token
        setError("");
        navigate("BlogAdmin"); // Redirect to admin blog
      } else {
        // Login failed
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);

        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockoutTimer(300);
          setError("Too many failed attempts. Account locked for 5 minutes.");
        } else if (newAttempts >= 2) {
          setCaptchaRequired(true);
          generateCaptcha();
          setError(
            `${data.message || "Invalid credentials"}. ${
              3 - newAttempts
            } attempts remaining. Captcha required.`
          );
        } else {
          setError(
            `${data.message || "Invalid credentials"}. ${
              3 - newAttempts
            } attempts remaining.`
          );
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    alert("Password reset link sent to your email (demo)");
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading && !isLocked) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated cosmic background */}
      <div className="fixed inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/8 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/8 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-3xl"></div>

      {/* Main login container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Login card */}
        <div className="cosmic-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Branding (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex flex-col justify-center space-y-8"
            >
              {/* Logo and title */}
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                  <FiShield className="text-white text-2xl" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-4">
                    <span className="cosmic-text">Cosmic</span> Admin
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Secure content management system with enterprise-grade
                    security and real-time monitoring capabilities.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                {[
                  {
                    text: "Multi-layer security authentication",
                    color: "bg-blue-400",
                  },
                  {
                    text: "Real-time threat monitoring",
                    color: "bg-purple-400",
                  },
                  { text: "End-to-end encryption", color: "bg-indigo-400" },
                  { text: "Advanced access controls", color: "bg-cyan-400" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div
                      className={`w-2 h-2 ${feature.color} rounded-full`}
                    ></div>
                    <span className="text-slate-300 text-sm">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Security badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 rounded-full"
              >
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-xs text-slate-400">
                  Secure SSL Connection
                </span>
              </motion.div>
            </motion.div>

            {/* Right side - Login form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Welcome <span className="cosmic-text">back</span>
                </h2>
                <p className="text-slate-400">
                  Please sign in to your admin account
                </p>
              </div>

              {/* Security status - Mobile */}
              <div className="lg:hidden flex justify-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800/30 border border-slate-700/30 rounded-full">
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-green-400 rounded-full"
                  />
                  <span className="text-xs text-slate-400">
                    Secure Connection
                  </span>
                </div>
              </div>

              {/* Error messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg border flex items-center space-x-3 ${
                      isLocked
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                    }`}
                  >
                    <FiAlertCircle className="flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login attempts indicator */}
              <AnimatePresence>
                {loginAttempts > 0 && !isLocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm">
                        Attempts: {loginAttempts}/3
                      </span>
                      <div className="flex space-x-1">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                              i <= loginAttempts
                                ? "bg-yellow-400"
                                : "bg-slate-700"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Lockout timer */}
              <AnimatePresence>
                {isLocked && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-center"
                  >
                    <motion.div
                      className="text-red-400 font-mono text-xl mb-2"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {formatTime(lockoutTimer)}
                    </motion.div>
                    <div className="text-red-300 text-sm">
                      Account temporarily locked
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Login form */}
              <div className="space-y-6">
                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      disabled={isLocked}
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        isLocked
                          ? "border-slate-700 opacity-50 cursor-not-allowed"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                      placeholder="Enter your email address"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className="text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      disabled={isLocked}
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-14 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        isLocked
                          ? "border-slate-700 opacity-50 cursor-not-allowed"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLocked}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-300"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </motion.button>
                  </div>
                </div>

                {/* Captcha */}
                <AnimatePresence>
                  {captchaRequired && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-slate-300">
                        Security Verification
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1 p-4 bg-slate-800/30 border border-slate-700 rounded-xl text-center">
                          <span className="text-lg font-mono text-blue-400">
                            {captchaQuestion.num1} + {captchaQuestion.num2} = ?
                          </span>
                        </div>
                        <input
                          type="number"
                          value={captchaAnswer}
                          onChange={(e) => setCaptchaAnswer(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="w-24 bg-slate-800/30 border border-slate-700 rounded-xl px-4 py-4 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                          placeholder="?"
                        />
                        <motion.button
                          whileHover={{ rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          type="button"
                          onClick={generateCaptcha}
                          className="p-4 text-slate-400 hover:text-blue-400 transition-colors duration-300"
                        >
                          <FiRefreshCw />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Remember me and forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.rememberMe}
                      onChange={(e) =>
                        handleInputChange("rememberMe", e.target.checked)
                      }
                      disabled={isLocked}
                      className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500/50 focus:ring-2 transition-all duration-300"
                    />
                    <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                      Remember me
                    </span>
                  </label>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isLocked}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 disabled:opacity-50"
                  >
                    Forgot password?
                  </motion.button>
                </div>

                {/* Login button */}
                <motion.button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoading || isLocked}
                  whileHover={!isLoading && !isLocked ? { scale: 1.02 } : {}}
                  whileTap={!isLoading && !isLocked ? { scale: 0.98 } : {}}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isLoading || isLocked
                      ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                      : "cosmic-button hover:shadow-lg hover:shadow-blue-500/25"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <FiLoader />
                      </motion.div>
                      <span>Authenticating...</span>
                    </>
                  ) : isLocked ? (
                    <>
                      <FiLock />
                      <span>Account Locked</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-xs text-slate-600">
            © 2025 TheCosmicStack. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      {/* Custom styles */}
      <style jsx>{`
        .cosmic-card {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(59, 130, 246, 0.03),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .cosmic-button {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.2) 0%,
            rgba(147, 51, 234, 0.2) 100%
          );
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #60a5fa;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .cosmic-button:hover:not(:disabled) {
          background: linear-gradient(
            135deg,
            rgba(59, 130, 246, 0.3) 0%,
            rgba(147, 51, 234, 0.3) 100%
          );
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
        }

        .cosmic-text {
          background: linear-gradient(
            135deg,
            #60a5fa 0%,
            #a855f7 50%,
            #3b82f6 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @media (max-width: 1024px) {
          .cosmic-card {
            padding: 32px;
          }
        }

        @media (max-width: 640px) {
          .cosmic-card {
            padding: 24px;
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;
