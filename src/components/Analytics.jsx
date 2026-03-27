import { useTheme } from "../context/ThemeContext";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";

export default function Analytics() {
  const { dark } = useTheme();

  const total = 120, missed = 37, completed = 68, successRate = 56;

  const reasonsData = [
    { name: "Forgot Deadline",    value: 14 },
    { name: "Exams",              value: 9  },
    { name: "Lack of Preparation",value: 7  },
    { name: "Low Priority",       value: 4  },
    { name: "Other",              value: 3  },
  ];

  const monthlyData = [
    { month: "Jan-Feb", missed: 6  },
    { month: "Mar-Apr", missed: 9  },
    { month: "May-Jun", missed: 5  },
    { month: "Jul-Aug", missed: 11 },
    { month: "Sep-Oct", missed: 3  },
    { month: "Nov-Dec", missed: 4  },
  ];

  const pieColors = ["#2563eb", "#60a5fa", "#f59e0b", "#f97316", "#94a3b8"];

  const card = `rounded-2xl border shadow-sm p-6 transition-colors duration-300 ${
    dark ? "bg-slate-800/60 border-slate-700/60" : "bg-white border-slate-200"
  }`;
  const heading = `font-semibold mb-4 ${dark ? "text-slate-200" : "text-slate-700"}`;
  const subText = `text-sm ${dark ? "text-slate-400" : "text-gray-500"}`;
  const axisColor = dark ? "#64748b" : "#94a3b8";
  const gridColor = dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";
  const tooltipStyle = dark
    ? { background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 11, color: "#e2e8f0" }
    : { background: "#fff",    border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 11, color: "#1e293b" };

  const stats = [
    { label: "Total Opportunities", value: total,         color: dark ? "text-slate-100" : "text-slate-900" },
    { label: "Missed",              value: missed,        color: "text-red-500"   },
    { label: "Completed",           value: completed,     color: "text-blue-500"  },
    { label: "Success Rate",        value: `${successRate}%`, color: "text-green-500" },
  ];

  return (
    <div className="mt-16">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ label, value, color }) => (
          <div key={label} className={card}>
            <p className={subText}>{label}</p>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Pie */}
        <div className={card}>
          <h3 className={heading}>Reasons for Missed</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={reasonsData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                  {reasonsData.map((_, i) => <Cell key={i} fill={pieColors[i % pieColors.length]}/>)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar */}
        <div className={card}>
          <h3 className={heading}>Monthly Analysis</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor}/>
                <XAxis dataKey="month" tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill: axisColor, fontSize: 10 }} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={tooltipStyle}/>
                <Bar dataKey="missed" fill="#2563eb" barSize={36} radius={[6, 6, 0, 0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight */}
        <div className={card}>
          <h3 className={heading}>Top Reason</h3>
          <p className={`text-xl font-bold mt-3 ${dark ? "text-slate-100" : "text-slate-800"}`}>
            Forgot Deadline
          </p>
          <div className={`mt-4 p-4 rounded-xl border text-sm ${
            dark
              ? "bg-amber-900/20 border-amber-800/40 text-amber-300"
              : "bg-yellow-50 border-yellow-200 text-yellow-800"
          }`}>
            ⚠️ Set reminders to avoid missing opportunities.
          </div>
        </div>
      </div>
    </div>
  );
}