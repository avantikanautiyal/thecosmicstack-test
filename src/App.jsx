import React, { useEffect, useState, Suspense, lazy } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import CosmicStackLoader from "./components/common/Loader";

// Pages (lazy-loaded to reduce initial bundle size)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogDetails"));
const BlogAdmin = lazy(() => import("./pages/BlogAdmin"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminSignup = lazy(() => import("./pages/AdminSignup"));

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
        <Suspense fallback={<CosmicStackLoader />}>
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
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
