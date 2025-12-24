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
import LiveWebinarDetails from "./pages/Webinars/LiveWebinarDetails";
import TermsConditions from "./pages/Legal/TermsConditions";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import RefundCancellationPolicy from "./pages/Legal/RefundCancellationPolicy";
import ShippingReturnPolicy from "./pages/Legal/ShippingReturnPolicy";
import ScrollToTop from "./components/common/ScrollToTop";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";






export default function App() {
  return (
    <Router>
    <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/live-webinars" element={<LiveWebinars />} />
        <Route path="/live-webinars/:webinar_id" element={<LiveWebinarDetails />}/>

        {/* <Route path="/live-webinars/details" element={<LiveWebinarDetails />} /> */}

        <Route path="/recorded-webinars" element={<RecordedWebinars />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />



        <Route path="/terms-and-conditions" element={<TermsConditions />}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}/>
        <Route path="/refund-cancellation-policy" element={<RefundCancellationPolicy />}/>
        <Route path="/shipping-return-policy" element={<ShippingReturnPolicy />}/>


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
