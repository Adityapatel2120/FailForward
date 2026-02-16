import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserCheck, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getCurrentUser, logoutUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="w-full bg-white/70 backdrop-blur-xl border border-slate-200 rounded-2xl px-6 py-4 shadow-sm flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
            FF
          </div>
          <span className="font-semibold text-slate-800">
            Opportunity Miss Analyzer
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/features" className={linkClass}>
            Features
          </NavLink>

          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>

          {/* If NOT logged in */}
          {!user && (
            <>
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>

              {/* Sign Up appears ONLY if user came from login */}
              {showSignup && (
                <button
                  onClick={() =>
                    navigate("/signup", { state: { fromLogin: true } })
                  }
                  className="ml-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                >
                  Sign Up
                </button>
              )}
            </>
          )}

          {/* If logged in */}
          {user && (
            <>
              <button
                onClick={() => setLogoutModal(true)}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>

              <div
                title="Logged In"
                className="ml-1 h-10 w-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center"
              >
                <UserCheck className="w-5 h-5 text-green-600" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* LOGOUT CONFIRM MODAL */}
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
              className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-7"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-extrabold text-slate-900">
                Confirm Logout
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Are you sure you want to logout?
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setLogoutModal(false)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-50 transition"
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
