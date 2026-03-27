import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogOut, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getCurrentUser, logoutUser } from "../utils/auth";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, setDark } = useTheme();

  const [user, setUser] = useState(getCurrentUser());
  const [logoutModal, setLogoutModal] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location.pathname]);

  const showSignup =
    location.pathname === "/signup" && location.state?.fromLogin === true;

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-xl text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white shadow"
        : dark
        ? "text-slate-300 hover:bg-slate-700/60"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  function confirmLogout() {
    logoutUser();
    setUser(null);
    setLogoutModal(false);
    navigate("/login");
  }

  return (
    <>
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
            FF
          </div>
          <span className={`font-semibold ${dark ? "text-slate-100" : "text-blue-400"}`}>
            Opportunity Miss Analyzer
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/features" className={linkClass}>Features</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>

          {/* Not logged in */}
          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>Login</NavLink>
              {showSignup && (
                <button
                  onClick={() => navigate("/signup", { state: { fromLogin: true } })}
                  className="ml-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              )}
            </>
          )}

          {/* Logged in */}
          {user && (
            <button
              onClick={() => setLogoutModal(true)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition flex items-center gap-2 ${
                dark
                  ? "bg-red-900/20 border-red-800/40 text-red-400 hover:bg-red-900/30"
                  : "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          )}

          {/* Dark mode toggle — sits where user icon was */}
          <button
            onClick={() => setDark((d) => !d)}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={`ml-1 h-10 w-10 rounded-xl flex items-center justify-center transition border ${
              dark
                ? "bg-slate-700 border-slate-600 text-yellow-400 hover:bg-slate-600"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Logout modal */}
      <AnimatePresence>
        {logoutModal && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLogoutModal(false)}
          >
            <motion.div
              className={`w-full max-w-md rounded-3xl border shadow-xl p-7 ${
                dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
              }`}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className={`text-xl font-extrabold ${dark ? "text-slate-100" : "text-slate-900"}`}>
                Confirm Logout
              </h2>
              <p className={`mt-2 text-sm ${dark ? "text-slate-400" : "text-slate-600"}`}>
                Are you sure you want to logout?
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setLogoutModal(false)}
                  className={`w-full px-4 py-3 rounded-xl border font-semibold transition ${
                    dark
                      ? "border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
                      : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="w-full px-4 py-3 rounded-xl bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}