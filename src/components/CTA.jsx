import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CTA() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  return (
    <div className={`rounded-3xl shadow-sm border px-10 py-12 text-center transition-colors duration-300 ${
      dark
        ? "bg-blue-900/40 border-blue-800/40 text-blue-100"
        : "bg-blue-600 border-blue-600 text-white"
    }`}>
      <h2 className="text-2xl font-bold">
        Start Learning From Your Missed Opportunities Today
      </h2>
      <p className={`mt-3 text-sm ${dark ? "text-blue-300" : "text-blue-100"}`}>
        Join thousands of students building better habits.
      </p>
      <button
        onClick={() => navigate("/signup")}
        className={`mt-6 px-8 py-3 rounded-xl font-bold shadow transition ${
          dark
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-white text-blue-700 hover:bg-slate-100"
        }`}
      >
        Sign Up Now
      </button>
    </div>
  );
}