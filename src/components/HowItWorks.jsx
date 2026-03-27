import { useTheme } from "../context/ThemeContext";

const steps = [
  { id: 1, label: "Add Opportunity", color: "bg-blue-500"  },
  { id: 2, label: "Miss Deadline",   color: "bg-red-500"   },
  { id: 3, label: "Select Reason",   color: "bg-blue-500"  },
  { id: 4, label: "Analyze Patterns",color: "bg-blue-500"  },
  { id: 5, label: "Improve Planning",color: "bg-green-500" },
];

const Arrow = ({ dark }) => (
  <svg className="mx-4 mt-3 flex-shrink-0" width="24" height="12" viewBox="0 0 24 12" fill="none">
    <path
      d="M0 6h20M20 6l-4-4M20 6l-4 4"
      stroke={dark ? "#475569" : "#CBD5E1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function HowItWorks() {
  const { dark } = useTheme();

  return (
    <section className={`mt-16 rounded-2xl shadow-sm border px-10 py-8 transition-colors duration-300 ${
      dark ? "bg-slate-800/60 border-slate-700/60" : "bg-white border-slate-200"
    }`}>
      <h2 className={`text-center text-xl font-semibold mb-8 ${dark ? "text-slate-200" : "text-slate-700"}`}>
        How It Works
      </h2>

      {/* Progress line */}
      <div className="relative">
        <div className={`absolute top-5 left-0 right-0 h-[5px] rounded-full ${dark ? "bg-slate-700" : "bg-slate-200"}`}/>
      </div>

      <div className="relative z-10 flex items-start justify-between mt-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center min-w-[100px]">
              <div className={`w-10 h-10 rounded-full ${step.color} text-white flex items-center justify-center font-semibold shadow-sm`}>
                {step.id}
              </div>
              <p className={`mt-3 text-sm text-center ${dark ? "text-slate-400" : "text-slate-600"}`}>
                {step.label}
              </p>
            </div>
            {index !== steps.length - 1 && <Arrow dark={dark}/>}
          </div>
        ))}
      </div>
    </section>
  );
}