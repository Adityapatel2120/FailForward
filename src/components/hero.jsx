import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Hero() {
  const navigate = useNavigate();
  const { dark } = useTheme();

  return (
    <div className={`rounded-3xl border shadow-sm px-10 py-12 flex items-center justify-between gap-10 transition-colors duration-300 ${
      dark
        ? "bg-gradient-to-br from-slate-800 via-slate-800 to-slate-700 border-slate-700"
        : "bg-gradient-to-br from-indigo-50 via-white to-blue-50 border-slate-200"
    }`}>
      {/* LEFT */}
      <div className="max-w-xl">
        <h1 className={`text-5xl font-extrabold leading-tight ${dark ? "text-slate-100" : "text-slate-900"}`}>
          Stop Missing <br /> Important <br /> Opportunities
        </h1>

        <p className={`mt-6 text-lg leading-relaxed ${dark ? "text-slate-400" : "text-slate-600"}`}>
          Track, analyze, and learn from missed job applications, exams, and
          events — so you don't repeat the same mistakes.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-6 py-3 rounded-xl border font-semibold shadow-sm transition ${
              dark
                ? "border-slate-600 bg-slate-700 text-slate-200 hover:bg-slate-600"
                : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
            }`}
          >
            View Demo
          </button>
        </div>
      </div>

      {/* RIGHT — mock dashboard card */}
      <div className="w-[520px] max-w-full">
        <div className={`rounded-3xl border shadow-lg p-6 transition-colors duration-300 ${
          dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-semibold ${dark ? "text-slate-100" : "text-slate-800"}`}>
              Opportunity Miss Analyzer
            </h3>
            <div className="flex gap-2">
              <div className={`h-3 w-3 rounded-full ${dark ? "bg-slate-600" : "bg-slate-300"}`} />
              <div className={`h-3 w-3 rounded-full ${dark ? "bg-slate-600" : "bg-slate-300"}`} />
              <div className="h-3 w-3 rounded-full bg-red-400" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { label: "Total Opportunities", value: "120", color: dark ? "text-slate-100" : "text-slate-900" },
              { label: "Missed",              value: "37",  color: "text-red-500"  },
              { label: "Success Rate",        value: "56%", color: "text-green-500" },
            ].map(({ label, value, color }) => (
              <div key={label} className={`rounded-2xl border p-4 ${
                dark ? "bg-slate-700/60 border-slate-600" : "bg-slate-50 border-slate-200"
              }`}>
                <p className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}>{label}</p>
                <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}