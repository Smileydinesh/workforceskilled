import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import LiveWebinars from "./pages/Webinars/LiveWebinars";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Contact from "./pages/Contact/Contact";
import RecordedWebinars from "./pages/Webinars/RecordedWebinars";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/live-webinars" element={<LiveWebinars />} />
        <Route path="/recorded-webinars" element={<RecordedWebinars />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* TEMP fallback to avoid blank screen */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-white bg-slate-950">
              Page Not Found
            </div>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}
