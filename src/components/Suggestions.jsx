import { useTheme } from "../context/ThemeContext";

const suggestions = [
  {
    icon: "⚠",
    iconColor: "text-amber-500",
    title: "Frequently missing deadlines?",
    body: "Set early reminders to stay on track.",
    bg: {
      light: "bg-amber-50 border-amber-100",
      dark:  "bg-amber-900/20 border-amber-800/40",
    },
  },
  {
    icon: "💡",
    iconColor: "text-blue-500",
    title: "Not prepared enough?",
    body: "Plan study sessions in advance.",
    bg: {
      light: "bg-blue-50 border-blue-100",
      dark:  "bg-blue-900/20 border-blue-800/40",
    },
  },
];

export default function Suggestions() {
  const { dark } = useTheme();

  return (
    <section className={`mt-16 rounded-2xl border shadow-sm p-8 transition-colors duration-300 ${
      dark ? "bg-slate-800/60 border-slate-700/60" : "bg-white border-slate-200"
    }`}>
      <h2 className={`text-center text-xl font-semibold mb-8 ${dark ? "text-slate-200" : "text-slate-800"}`}>
        Smart Suggestions
      </h2>

      <div className="flex justify-center gap-5 flex-wrap">
        {suggestions.map(({ icon, iconColor, title, body, bg }) => (
          <div
            key={title}
            className={`rounded-xl border p-6 w-96 flex gap-3 transition-colors duration-300 ${
              dark ? bg.dark : bg.light
            }`}
          >
            <span className={`text-xl flex-shrink-0 ${iconColor}`}>{icon}</span>
            <div>
              <p className={`font-semibold text-sm ${dark ? "text-slate-200" : "text-slate-700"}`}>{title}</p>
              <p className={`text-sm mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>{body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}