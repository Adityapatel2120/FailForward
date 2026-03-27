import { useTheme } from "../context/ThemeContext";
import { Bell, BarChart2, Lightbulb, Target, TrendingUp, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Bell,
    title: "Track Deadlines",
    description: "Never miss an important date again. Set reminders for exams, internships, hackathons and more.",
    color: "blue",
  },
  {
    icon: BarChart2,
    title: "Analyze Misses",
    description: "Understand exactly why you missed out. Visual breakdowns of miss patterns help you improve.",
    color: "purple",
  },
  {
    icon: Lightbulb,
    title: "Improve Planning",
    description: "Get smart suggestions to plan better based on your personal miss history and habits.",
    color: "amber",
  },
  {
    icon: Target,
    title: "Opportunity Score",
    description: "A live score based on your completion rate. Watch it climb as you build better habits.",
    color: "green",
  },
  {
    icon: TrendingUp,
    title: "Progress Over Time",
    description: "Track success rates across months with charts. Spot trends and celebrate improvements.",
    color: "teal",
  },
  {
    icon: ShieldCheck,
    title: "Risk Detection",
    description: "Automatic alerts when upcoming tasks match your historical miss patterns.",
    color: "red",
  },
];

const colorMap = {
  blue:   { light: "bg-blue-50 border-blue-100 text-blue-600",     dark: "bg-blue-900/20 border-blue-800/40 text-blue-400"   },
  purple: { light: "bg-purple-50 border-purple-100 text-purple-600",dark: "bg-purple-900/20 border-purple-800/40 text-purple-400"},
  amber:  { light: "bg-amber-50 border-amber-100 text-amber-600",   dark: "bg-amber-900/20 border-amber-800/40 text-amber-400" },
  green:  { light: "bg-green-50 border-green-100 text-green-600",   dark: "bg-green-900/20 border-green-800/40 text-green-400" },
  teal:   { light: "bg-teal-50 border-teal-100 text-teal-600",      dark: "bg-teal-900/20 border-teal-800/40 text-teal-400"   },
  red:    { light: "bg-red-50 border-red-100 text-red-600",         dark: "bg-red-900/20 border-red-800/40 text-red-400"      },
};

const Features = () => {
  const { dark } = useTheme();

  return (
    <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {features.map(({ icon: Icon, title, description, color }) => {
        const c = colorMap[color];
        return (
          <div
            key={title}
            className={`p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
              dark
                ? "bg-slate-800/60 border-slate-700/60 hover:border-slate-500"
                : "bg-white border-slate-200 hover:border-slate-300"
            }`}
          >
            {/* Icon badge */}
            <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4 border ${dark ? c.dark : c.light}`}>
              <Icon className="w-5 h-5" />
            </div>

            <h3 className={`font-semibold text-base mb-1.5 ${dark ? "text-slate-100" : "text-slate-800"}`}>
              {title}
            </h3>
            <p className={`text-sm leading-relaxed ${dark ? "text-slate-400" : "text-slate-500"}`}>
              {description}
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default Features;