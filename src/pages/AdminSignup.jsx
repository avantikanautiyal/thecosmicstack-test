import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiLoader,
  FiArrowRight,
  FiMail,
  FiUserPlus,
  FiCheckCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  // State management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaQuestion, setCaptchaQuestion] = useState({
    num1: 0,
    num2: 0,
    answer: 0,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear errors when user starts typing
    if (error) setError("");
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Real-time validation
  const validateField = (field, value) => {
    const errors = {};

    switch (field) {
      case "email":
        if (!value) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value))
          errors.email = "Please enter a valid email address";
        break;
      case "password":
        if (!value) errors.password = "Password is required";
        else if (value.length < 8)
          errors.password = "Password must be at least 8 characters";
        break;
      case "confirmPassword":
        if (!value) errors.confirmPassword = "Please confirm your password";
        else if (value !== formData.password)
          errors.confirmPassword = "Passwords do not match";
        break;
      case "role":
        if (!value) errors.role = "Role is required";
        break;
      default:
        break;
    }

    return errors;
  };

  // Validate entire form
  const validateForm = () => {
    const errors = {};

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      if (field !== "agreeToTerms") {
        const fieldErrors = validateField(field, formData[field]);
        Object.assign(errors, fieldErrors);
      }
    });

    // Check terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("Please fix the errors below");
      return false;
    }

    return true;
  };

  // Handle signup submission
  const handleSignup = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3002/users/admin-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        setSuccess(
          "Account created successfully! Please check your email for verification."
        );
        setTimeout(() => {
          navigate("/adminLogin");
        }, 2000);
      } else {
        // Signup failed
        setError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Signup failed. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSignup();
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

      {/* Main signup container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Signup card */}
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
                  <FiUserPlus className="text-white text-2xl" />
                </div>

                <div>
                  <h1 className="text-4xl font-bold mb-4">
                    Join <span className="cosmic-text">Cosmic</span> Admin
                  </h1>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Create your admin account and get access to our powerful
                    content management system with enterprise-grade features.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right side - Signup form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                  Create your <span className="cosmic-text">account</span>
                </h2>
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
                    Secure Registration
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
                    className="p-4 rounded-lg border bg-red-500/10 border-red-500/30 text-red-400 flex items-center space-x-3"
                  >
                    <FiAlertCircle className="flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Success message */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-lg border bg-green-500/10 border-green-500/30 text-green-400 flex items-center space-x-3"
                  >
                    <FiCheckCircle className="flex-shrink-0" />
                    <span className="text-sm">{success}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Signup form */}
              <div className="space-y-5">
                {/* Email field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        validationErrors.email
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                  </div>
                  {validationErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {validationErrors.email}
                    </motion.p>
                  )}
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
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-14 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        validationErrors.password
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-300"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </motion.button>
                  </div>
                </div>

                {/* Confirm password field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiLock className="text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      onKeyDown={handleKeyDown}
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-14 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        validationErrors.confirmPassword
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-300 transition-colors duration-300"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </motion.button>
                  </div>
                  {validationErrors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {validationErrors.confirmPassword}
                    </motion.p>
                  )}
                </div>
                {/* Role field */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Role
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiUser className="text-slate-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                    </div>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        handleInputChange("role", e.target.value)
                      }
                      className={`w-full bg-slate-800/30 border rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        validationErrors.role
                          ? "border-red-500 focus:ring-red-500/50"
                          : "border-slate-700 focus:ring-blue-500/50 hover:border-slate-600"
                      }`}
                    >
                      <option value="">Select a role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="editor">Editor</option>
                      {/* Add more roles as needed */}
                    </select>
                  </div>
                </div>

                {/* Terms and conditions */}
                <div className="space-y-2">
                  <label className="flex items-start group cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) =>
                        handleInputChange("agreeToTerms", e.target.checked)
                      }
                      className="w-4 h-4 text-blue-500 bg-slate-800 border-slate-600 rounded focus:ring-blue-500/50 focus:ring-2 transition-all duration-300 mt-0.5"
                    />
                    <span className="ml-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                      I agree to the{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-400 hover:text-blue-300">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                  {validationErrors.agreeToTerms && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs"
                    >
                      {validationErrors.agreeToTerms}
                    </motion.p>
                  )}
                </div>

                {/* Signup button */}
                <motion.button
                  type="button"
                  onClick={handleSignup}
                  disabled={isLoading}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 ${
                    isLoading
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
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiArrowRight />
                      </motion.div>
                    </>
                  )}
                </motion.button>

                {/* Login link */}
                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    Already have an account?{" "}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      type="button"
                      onClick={() => navigate("/adminLogin")}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium"
                    >
                      Sign in here
                    </motion.button>
                  </p>
                </div>
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

export default AdminSignup;
