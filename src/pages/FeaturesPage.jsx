import { useNavigate } from "react-router-dom";

export default function FeaturesPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Track Deadlines",
      desc: "Never forget important dates with reminders and tracking.",
      icon: "📅",
    },
    {
      title: "Analyze Misses",
      desc: "Understand why you missed and how to avoid it next time.",
      icon: "🔍",
    },
    {
      title: "Improve Planning",
      desc: "Get suggestions to plan better and stay consistent.",
      icon: "💡",
    },
    {
      title: "Dashboard Analytics",
      desc: "Track progress and patterns using a clean dashboard.",
      icon: "📊",
    },
    {
      title: "Smart Suggestions",
      desc: "Automatically suggests better habits based on your misses.",
      icon: "🧠",
    },
    {
      title: "Simple UI",
      desc: "Designed for students and job seekers with minimal confusion.",
      icon: "✨",
    },
  ];

  return (
    <div className="mt-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Features</h1>
      <p className="mt-2 text-slate-600">
        Everything you need to track and reduce missed opportunities.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7 hover:shadow-md transition"
          >
            <div className="text-3xl">{f.icon}</div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-slate-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/signup")}
          className="px-8 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        >
          Get Started Free
        </button>
      </div>
    </div>
  );
}
