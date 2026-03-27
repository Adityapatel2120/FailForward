import { useTheme } from "../context/ThemeContext";
import {
  Bell,
  BarChart2,
  Lightbulb,
  Target,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Track Deadlines",
    description:
      "Never miss an important date again. Set reminders for exams, internships, hackathons and more — all in one place.",
    color: "blue",
  },
  {
    icon: BarChart2,
    title: "Analyze Misses",
    description:
      "Understand exactly why you missed out. Visual breakdowns of miss patterns help you pinpoint what went wrong.",
    color: "purple",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description:
      "Get AI-powered planning tips based on your personal history. Improve your habits with actionable weekly insights.",
    color: "amber",
  },
  {
    icon: Target,
    title: "Opportunity Score",
    description:
      "A live score based on your completion rate and discipline. Watch it climb as you build better habits over time.",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Progress Over Time",
    description:
      "Track success rates across months with beautiful area charts. Spot trends and celebrate your improvements.",
    color: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Risk Detection",
    description:
      "Automatic alerts when upcoming tasks match your historical miss patterns — before it's too late to act.",
    color: "red",
  },
];

// Two separate sets: one for light, one for dark
const colorMap = {
  blue:   { light: { bg: "bg-blue-50",   icon: "text-blue-600",   border: "border-blue-100"   }, dark: { bg: "bg-blue-900/20",   icon: "text-blue-400",   border: "border-blue-800/40"   } },
  purple: { light: { bg: "bg-purple-50", icon: "text-purple-600", border: "border-purple-100" }, dark: { bg: "bg-purple-900/20", icon: "text-purple-400", border: "border-purple-800/40" } },
  amber:  { light: { bg: "bg-amber-50",  icon: "text-amber-600",  border: "border-amber-100"  }, dark: { bg: "bg-amber-900/20",  icon: "text-amber-400",  border: "border-amber-800/40"  } },
  green:  { light: { bg: "bg-green-50",  icon: "text-green-600",  border: "border-green-100"  }, dark: { bg: "bg-green-900/20",  icon: "text-green-400",  border: "border-green-800/40"  } },
  teal:   { light: { bg: "bg-teal-50",   icon: "text-teal-600",   border: "border-teal-100"   }, dark: { bg: "bg-teal-900/20",   icon: "text-teal-400",   border: "border-teal-800/40"   } },
  red:    { light: { bg: "bg-red-50",    icon: "text-red-600",    border: "border-red-100"    }, dark: { bg: "bg-red-900/20",    icon: "text-red-400",    border: "border-red-800/40"    } },
};

export default function Features() {
  const { dark } = useTheme();

  return (
    <section className="mt-16">
      {/* Section header */}
      <div className="text-center mb-10">
        <span
          className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-3 ${
            dark ? "bg-blue-900/40 text-blue-400" : "bg-blue-50 text-blue-600"
          }`}
        >
          Everything you need
        </span>
        <h2
          className={`text-3xl font-extrabold tracking-tight ${
            dark ? "text-slate-100" : "text-slate-100"
          }`}
        >
          Built for students who mean business
        </h2>
        <p
          className={`mt-3 text-sm max-w-xl mx-auto leading-relaxed ${
            dark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Opportunity Miss Analyzer gives you the clarity, discipline, and insights to stop
          missing the opportunities that matter most.
        </p>
      </div>

      {/* Feature cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map(({ icon: Icon, title, description, color }) => {
          const c = dark ? colorMap[color].dark : colorMap[color].light;
          return (
            <div
              key={title}
              className={`group relative p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                dark
                  ? "bg-slate-800/60 border-slate-700/60 hover:border-slate-600"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Icon badge */}
              <div
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 border ${c.bg} ${c.border}`}
              >
                <Icon className={`w-5 h-5 ${c.icon}`} />
              </div>

              <h3
                className={`font-semibold text-base mb-1.5 ${
                  dark ? "text-slate-100" : "text-slate-800"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {description}
              </p>

              {/* Subtle corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                <div
                  className={`absolute -top-8 -right-8 w-16 h-16 rounded-full blur-2xl ${
                    dark ? "bg-blue-500/10" : "bg-blue-400/10"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA strip */}
      <div
        className={`mt-10 rounded-2xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${
          dark
            ? "bg-slate-800/60 border-slate-700"
            : "bg-blue-50 border-blue-100"
        }`}
      >
        <div>
          <p className={`font-semibold text-base ${dark ? "text-slate-100" : "text-slate-800"}`}>
            Ready to stop missing out?
          </p>
          <p className={`text-sm mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            Start tracking your opportunities today — it takes 30 seconds.
          </p>
        </div>
        <a
          href="/dashboard"
          className="shrink-0 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard →
        </a>
      </div>
    </section>
  );
}