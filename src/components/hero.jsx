import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 border border-slate-200 shadow-sm px-10 py-12 flex items-center justify-between gap-10">
      {/* LEFT */}
      <div className="max-w-xl">
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight">
          Stop Missing <br /> Important <br /> Opportunities
        </h1>

        <p className="mt-6 text-slate-600 text-lg leading-relaxed">
          Track, analyze, and learn from missed job applications, exams, and
          events — so you don’t repeat the same mistakes.
        </p>

        <div className="mt-8 flex gap-4">
          {/* Get Started */}
          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Get Started Free
          </button>

          {/* View Demo */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold shadow-sm hover:bg-slate-50 transition"
          >
            View Demo
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-[520px] max-w-full">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-lg p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">
              Opportunity Miss Analyzer
            </h3>
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-slate-300" />
              <div className="h-3 w-3 rounded-full bg-red-400" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Total Opportunities</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">120</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Missed</p>
              <p className="text-2xl font-bold text-red-500 mt-1">37</p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Success Rate</p>
              <p className="text-2xl font-bold text-green-600 mt-1">56%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
