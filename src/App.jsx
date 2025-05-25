import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import BlogAdmin from "./pages/BlogAdmin";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/adminLogin") ||
    location.pathname.startsWith("/blogadmin");

  const isAuthenticated = !!localStorage.getItem("authToken"); // Check token presence

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
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Admin Routes */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="adminLogin/blogadmin"
            element={
              isAuthenticated ? (
                <BlogAdmin />
              ) : (
                <Navigate to="/adminLogin" replace />
              )
            }
          />

          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
