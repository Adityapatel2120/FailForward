import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import FeaturesPage from "./pages/FeaturesPage";
import DashboardPage from "./pages/DashboardPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      {/* Root wrapper: light = soft indigo gradient, dark = slate-900 */}
      <div className="min-h-screen bg-gradient-to-b from-[#eef2ff] via-[#f5f7ff] to-[#eef2ff] dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300">

        {/* Full-width sticky navbar bar */}
        <div className="w-full sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700/60 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl">
          <div className="max-w-[1400px] mx-auto px-6 py-3">
            <Navbar />
          </div>
        </div>

        {/* Page content */}
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <Routes>
            <Route path="/"          element={<Home />}         />
            <Route path="/features"  element={<FeaturesPage />} />
            <Route path="/dashboard" element={<DashboardPage />}/>
            <Route path="/login"     element={<Login />}        />
            <Route path="/signup"    element={<Signup />}       />
          </Routes>
          <Footer />
        </div>

      </div>
    </BrowserRouter>
  );
}