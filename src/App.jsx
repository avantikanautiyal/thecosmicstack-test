import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CosmicStackLoader from "./components/common/Loader";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogDetails";
import BlogAdmin from "./pages/BlogAdmin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("admin");

  const isAuthenticated = !!localStorage.getItem("authToken");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <CosmicStackLoader />;
  }
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />

          {/* Admin Routes */}
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="/adminLogin/blogadmin"
            element={
              isAuthenticated ? (
                <BlogAdmin />
              ) : (
                <Navigate to="/adminLogin" replace />
              )
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
