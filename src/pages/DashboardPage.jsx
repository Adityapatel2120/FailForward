import { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
} from "recharts";
import {
  getReminders, addReminder, updateReminder, deleteReminder,
} from "../utils/api";
import { AlertTriangle, Plus, Brain, TrendingUp, X, Tag } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const TAG_META = {
  Exam:       { color: "#2563eb", bg: "rgba(37,99,235,0.08)",   border: "rgba(37,99,235,0.2)"  },
  Internship: { color: "#059669", bg: "rgba(5,150,105,0.08)",   border: "rgba(5,150,105,0.2)"  },
  Hackathon:  { color: "#d97706", bg: "rgba(217,119,6,0.08)",   border: "rgba(217,119,6,0.2)"  },
  Project:    { color: "#7c3aed", bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.2)" },
  Interview:  { color: "#db2777", bg: "rgba(219,39,119,0.08)",  border: "rgba(219,39,119,0.2)" },
  Other:      { color: "#64748b", bg: "rgba(100,116,139,0.08)", border: "rgba(100,116,139,0.2)"},
};
const TAGS = Object.keys(TAG_META);
const PIE_COLORS = ["#2563eb", "#059669", "#d97706", "#7c3aed", "#db2777", "#64748b"];

const getBiMonthLabel = (date) => {
  const labels = ["Jan–Feb", "Mar–Apr", "May–Jun", "Jul–Aug", "Sep–Oct", "Nov–Dec"];
  return labels[Math.floor(new Date(date).getMonth() / 2)];
};
const getDaysLeft = (date) =>
  Math.ceil((new Date(date) - new Date()) / 864e5);

// ─── Opportunity Score ─────────────────────────────────────────────────────
const calcScore = (reminders) => {
  const total = reminders.length;
  if (total === 0) return 72;
  const comp   = reminders.filter(r => r.status === "completed").length;
  const missed = reminders.filter(r => r.status === "missed").length;
  return Math.min(100, Math.max(0, 50 + Math.round(((comp - missed * 0.7) / total) * 100)));
};
const scoreLabel = (s) =>
  s >= 85 ? ["Exceptional", "#059669"] :
  s >= 70 ? ["On Track",    "#2563eb"] :
  s >= 50 ? ["Needs Focus", "#d97706"] :
             ["At Risk",    "#dc2626"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { dark } = useTheme();

  const [reminders,   setReminders]   = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [activeTab,   setActiveTab]   = useState("active");
  const [scoreAnim,   setScoreAnim]   = useState(0);
  const [modal,       setModal]       = useState(false);
  const [title,       setTitle]       = useState("");
  const [date,        setDate]        = useState("");
  const [tag,         setTag]         = useState("Other");
  const [reasonModal, setReasonModal] = useState(false);
  const [selectedId,  setSelectedId]  = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId,    setDeleteId]    = useState(null);
  const [deleting,    setDeleting]    = useState(false);
  const [toast,       setToast]       = useState(null);
  const [lastDeleted, setLastDeleted] = useState(null);

  const reasons = ["Forgot Deadline", "Not Prepared", "No Time", "Low Priority", "Technical Issue", "Other"];

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getReminders();
      const updated = await Promise.all(
        (data || []).map(async (r) => {
          if (r.status === "pending" && new Date(r.date) < new Date())
            return await updateReminder(r._id, { status: "missed" });
          return r;
        })
      );
      setReminders(updated);
    } catch (err) {
      console.error("Failed to load reminders:", err);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  const score = calcScore(reminders);
  useEffect(() => {
    let frame, cur = 0;
    const step = () => {
      cur = Math.min(cur + 2, score);
      setScoreAnim(cur);
      if (cur < score) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const handleAdd = async () => {
    if (!title || !date) return;
    await addReminder({ title, date, tag });
    setTitle(""); setDate(""); setTag("Other"); setModal(false); loadData();
  };
  const markComplete  = async (id) => { await updateReminder(id, { status: "completed" }); loadData(); };
  const openMissed    = (id) => { setSelectedId(id); setReasonModal(true); };
  const selectReason  = async (reason) => { await updateReminder(selectedId, { status: "missed", reason }); setReasonModal(false); setSelectedId(null); loadData(); };
  const confirmDelete = async () => {
    setDeleting(true);
    const item = reminders.find(r => r._id === deleteId);
    await deleteReminder(deleteId);
    setDeleting(false); setDeleteModal(false); setDeleteId(null);
    setLastDeleted(item); showToast("Reminder deleted"); loadData();
  };
  const undoDelete = async () => {
    if (!lastDeleted) return;
    await addReminder({ title: lastDeleted.title, date: lastDeleted.date, tag: lastDeleted.tag });
    setLastDeleted(null); showToast("Restored ✓"); loadData();
  };
  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 5000); };

  const active      = reminders.filter(r => r.status === "pending");
  const missed      = reminders.filter(r => r.status === "missed");
  const completed   = reminders.filter(r => r.status === "completed");
  const displayData = activeTab === "missed" ? missed : activeTab === "completed" ? completed : active;
  const missRate    = reminders.length ? missed.length / reminders.length : 0;

  const getRiskLevel = (task) => {
    const d = getDaysLeft(task.date);
    if (d < 2 && missRate > 0.4) return "high";
    if (d < 3 && missRate > 0.25) return "medium";
    return "low";
  };

  const getMissPattern = () => {
    if (!missed.length) return null;
    const counts = {};
    missed.forEach(r => r.reason && (counts[r.reason] = (counts[r.reason] || 0) + 1));
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (!top) return null;
    const tips = {
      "Forgot Deadline": "Set calendar alerts 48h before every deadline.",
      "Not Prepared":    "Break tasks into daily micro-steps.",
      "No Time":         "Time-block 1h each morning for opportunities.",
      "Low Priority":    "Review your goals list every Sunday.",
      "Technical Issue": "Keep offline backups of key documents.",
      "Other":           "Reflect weekly on what's blocking you.",
    };
    return { reason: top[0], pct: Math.round(top[1] / missed.length * 100), tip: tips[top[0]] };
  };

  const futureRisk  = missRate >= 0.25 ? active.filter(r => getDaysLeft(r.date) <= 5).length : 0;
  const missPattern = getMissPattern();
  const [scoreTxt, scoreColor] = scoreLabel(score);

  const reasonCounts = {};
  missed.forEach(r => r.reason && (reasonCounts[r.reason] = (reasonCounts[r.reason] || 0) + 1));
  const reasonsData = Object.entries(reasonCounts).map(([name, value]) => ({ name, value }));

  const monthlyMap = {};
  ["Jan–Feb", "Mar–Apr", "May–Jun", "Jul–Aug", "Sep–Oct", "Nov–Dec"].forEach(l => {
    monthlyMap[l] = { month: l, completed: 0, missed: 0, score: null };
  });
  reminders.forEach(r => {
    const l = getBiMonthLabel(r.date);
    if (!monthlyMap[l]) return;
    if (r.status === "completed") monthlyMap[l].completed++;
    if (r.status === "missed")    monthlyMap[l].missed++;
  });
  Object.values(monthlyMap).forEach(m => {
    const t = m.completed + m.missed;
    if (t > 0) m.score = Math.round((m.completed / t) * 100);
  });
  const monthlyData = Object.values(monthlyMap);

  // ─── Theme helpers ──────────────────────────────────────────────────────────
  const card   = dark ? "bg-slate-800/60 border border-slate-700/60" : "bg-white border border-slate-200 shadow-sm";
  const cardHov= dark ? "hover:border-slate-600 hover:shadow-lg"      : "hover:border-slate-300 hover:shadow-md";
  const txt    = dark ? "text-slate-100"  : "text-slate-900";
  const txtSub = dark ? "text-slate-400"  : "text-slate-600";
  const txtHint= dark ? "text-slate-500"  : "text-slate-500";
  const inputCls = `w-full px-3 py-2.5 rounded-xl text-sm outline-none transition border ${
    dark
      ? "bg-slate-700/60 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-blue-500"
      : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400 focus:border-blue-500"
  }`;

  const tooltipStyle = dark
    ? { background: "#1e293b", border: "1px solid #334155", borderRadius: 10, fontSize: 11, color: "#e2e8f0" }
    : { background: "#fff",    border: "1px solid #e2e8f0", borderRadius: 10, fontSize: 11, color: "#1e293b" };

  return (
    <div className="pb-24">
      <div className="max-w-4xl mx-auto pt-8 space-y-5">

        {/* Page header */}
        <div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${txt}`}>Dashboard</h1>
          <p className={`text-sm mt-0.5 ${txtSub}`}>Your personal academic opportunity command center</p>
        </div>

        {/* Score Hero */}
        <div className={`${card} ${cardHov} rounded-2xl p-6 flex flex-wrap items-center gap-6 transition-all duration-300`}>
          {/* Ring */}
          <div className="relative w-36 h-36 flex-shrink-0">
            <svg width="144" height="144" viewBox="0 0 144 144" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="72" cy="72" r="60" fill="none" stroke={dark ? "rgba(255,255,255,0.07)" : "#e2e8f0"} strokeWidth="9"/>
              <circle cx="72" cy="72" r="60" fill="none" stroke={scoreColor} strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 60}`}
                strokeDashoffset={`${2 * Math.PI * 60 * (1 - scoreAnim / 100)}`}
                style={{ transition: "stroke-dashoffset 0.04s linear" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold leading-none" style={{ color: scoreColor }}>{scoreAnim}</span>
              <span className={`text-xs tracking-widest uppercase mt-1 ${txtHint}`}>score</span>
            </div>
          </div>

          {/* Score info */}
          <div className="flex-1 min-w-0">
            <p className={`text-xs uppercase tracking-widest font-semibold mb-1 ${txtHint}`}>Opportunity Score</p>
            <p className="text-xl font-extrabold leading-tight" style={{ color: scoreColor }}>{scoreTxt}</p>
            <p className={`text-sm mt-1.5 leading-relaxed max-w-xs ${txtSub}`}>
              Based on your completion rate and deadline discipline. Complete tasks on time to raise it.
            </p>
            <div className={`h-1.5 rounded-full mt-3 ${dark ? "bg-slate-700" : "bg-slate-200"}`}>
              <div className="h-1.5 rounded-full transition-all duration-1000" style={{ width: `${scoreAnim}%`, background: scoreColor }}/>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3 text-right">
            {[["Completed", completed.length, "#059669"], ["Missed", missed.length, "#dc2626"], ["Active", active.length, "#2563eb"]].map(([l, v, c]) => (
              <div key={l}>
                <p className={`text-xs uppercase tracking-widest ${txtHint}`}>{l}</p>
                <p className="text-2xl font-extrabold leading-tight" style={{ color: c }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Banners */}
        {futureRisk > 0 && (
          <div className={`flex items-start gap-3 p-4 rounded-2xl border ${dark ? "bg-red-900/20 border-red-800/40" : "bg-red-50 border-red-100"}`}>
            <AlertTriangle size={15} className="text-red-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">Future Risk Detected</p>
              <p className={`text-sm mt-0.5 ${txtSub}`}>
                Based on your miss history, you're likely to miss <b className="text-red-500">{futureRisk} upcoming task{futureRisk > 1 ? "s" : ""}</b> within 5 days.
              </p>
            </div>
          </div>
        )}
        {missPattern && (
          <div className={`flex items-start gap-3 p-4 rounded-2xl border ${dark ? "bg-purple-900/20 border-purple-800/40" : "bg-purple-50 border-purple-100"}`}>
            <Brain size={15} className="text-purple-500 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">Miss Pattern Detected</p>
              <p className={`text-sm mt-0.5 ${txtSub}`}>
                <b className="text-purple-500">{missPattern.pct}%</b> of missed tasks are due to "{missPattern.reason}"
              </p>
              <p className="text-xs mt-1 text-purple-500">💡 {missPattern.tip}</p>
            </div>
          </div>
        )}
        <div className={`flex items-start gap-3 p-4 rounded-2xl border ${dark ? "bg-blue-900/20 border-blue-800/40" : "bg-blue-50 border-blue-100"}`}>
          <TrendingUp size={15} className="text-blue-500 mt-0.5 flex-shrink-0"/>
          <div>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">Smart Insight</p>
            <p className={`text-sm mt-0.5 ${txtSub}`}>
              {reminders.length === 0 ? "Start adding reminders to unlock insights." :
               missRate > 0.5  ? "You're missing over 50% of tasks — try planning 3 days in advance." :
               missRate > 0.3  ? "You tend to miss tasks close to deadlines. Starting earlier will help." :
               "Solid discipline. Your completion rate is healthy — keep the momentum going."}
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className={`${card} ${cardHov} rounded-2xl p-5 transition-all duration-300`}>
            <p className={`text-xs uppercase tracking-widest font-semibold mb-4 ${txtHint}`}>Missed Reasons</p>
            {reasonsData.length === 0 ? (
              <div className={`h-48 flex items-center justify-center text-sm ${txtHint}`}>No missed tasks yet 🎉</div>
            ) : (
              <div style={{ height: 192 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={reasonsData} dataKey="value" innerRadius={52} outerRadius={78} paddingAngle={3}>
                      {reasonsData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]}/>)}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
          <div className={`${card} ${cardHov} rounded-2xl p-5 transition-all duration-300`}>
            <p className={`text-xs uppercase tracking-widest font-semibold mb-4 ${txtHint}`}>Success Rate Over Time</p>
            <div style={{ height: 192 }}>
              <ResponsiveContainer>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}/>
                  <XAxis dataKey="month" tick={{ fill: dark ? "#64748b" : "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false}/>
                  <YAxis domain={[0, 100]} tick={{ fill: dark ? "#64748b" : "#94a3b8", fontSize: 9 }} axisLine={false} tickLine={false}/>
                  <Tooltip contentStyle={tooltipStyle} formatter={v => v === null ? "No data" : `${v}%`}/>
                  <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={2} fill="url(#sg)" name="Success %" dot={{ fill: "#2563eb", r: 3, strokeWidth: 0 }} connectNulls={false}/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          {[["active", "Active", active.length], ["missed", "Missed", missed.length], ["completed", "Completed", completed.length]].map(([k, l, n]) => (
            <button
              key={k}
              onClick={() => setActiveTab(k)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition border ${
                activeTab === k
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : dark
                  ? "bg-transparent text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
                  : "bg-white text-slate-600 border-slate-300 hover:border-blue-400 hover:text-slate-800"
              }`}
            >
              {l} <span className="opacity-50 ml-1">{n}</span>
            </button>
          ))}
        </div>

        {/* List */}
        <div className={`${card} rounded-2xl p-4 space-y-2`}>
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className={`flex justify-between p-4 rounded-xl border ${dark ? "border-slate-700/50" : "border-slate-200"}`}>
                <div className="space-y-2">
                  <div className={`w-48 h-3 rounded-full animate-pulse ${dark ? "bg-slate-700" : "bg-slate-200"}`}/>
                  <div className={`w-28 h-2.5 rounded-full animate-pulse ${dark ? "bg-slate-700" : "bg-slate-100"}`}/>
                </div>
                <div className={`w-20 h-8 rounded-xl animate-pulse ${dark ? "bg-slate-700" : "bg-slate-100"}`}/>
              </div>
            ))
          ) : displayData.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-4xl mb-2">{activeTab === "active" ? "🚀" : activeTab === "missed" ? "🎉" : "📭"}</p>
              <p className={`font-bold text-base ${txt}`}>
                {activeTab === "active" ? "No active reminders" : activeTab === "missed" ? "Zero missed tasks!" : "Nothing completed yet"}
              </p>
              <p className={`text-sm mt-1 ${txtSub}`}>
                {activeTab === "active" ? "Add your first opportunity below" : activeTab === "missed" ? "Incredible — keep this streak going" : "Complete a task to see it here"}
              </p>
              {activeTab === "active" && (
                <button onClick={() => setModal(true)} className="mt-4 px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow hover:bg-blue-700 transition">
                  + Add Reminder
                </button>
              )}
            </div>
          ) : (
            displayData.map(r => {
              const risk = getRiskLevel(r);
              const dl   = getDaysLeft(r.date);
              const tm   = TAG_META[r.tag] || TAG_META.Other;
              return (
                <div
                  key={r._id}
                  className={`flex justify-between items-center p-4 rounded-xl border transition-all duration-200 hover:translate-x-0.5 ${
                    dark
                      ? "border-slate-700/50 bg-slate-800/30 hover:border-slate-600 hover:bg-slate-700/30"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-medium text-sm ${txt}`}>{r.title}</span>

                      {/* Status badge */}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        r.status === "pending"
                          ? dark ? "bg-blue-900/40 text-blue-400"   : "bg-blue-50 text-blue-600"
                          : r.status === "completed"
                          ? dark ? "bg-green-900/40 text-green-400" : "bg-green-50 text-green-600"
                          : dark ? "bg-red-900/40 text-red-400"     : "bg-red-50 text-red-600"
                      }`}>
                        {r.status}
                      </span>

                      {/* Tag */}
                      {r.tag && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full border" style={{ background: tm.bg, color: tm.color, borderColor: tm.border }}>
                          {r.tag}
                        </span>
                      )}
                    </div>

                    <span className={`text-xs ${txtHint}`}>
                      📅 {new Date(r.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>

                    {r.status === "pending" && (
                      <span className={`text-xs font-semibold ${dl < 2 ? "text-red-500" : dl < 5 ? "text-amber-500" : "text-green-500"}`}>
                        ⏱ {dl <= 0 ? "Due today!" : `${dl} day${dl !== 1 ? "s" : ""} left`}
                      </span>
                    )}
                    {r.status === "pending" && (
                      <span className={`text-xs font-semibold ${risk === "high" ? "text-red-500" : risk === "medium" ? "text-amber-500" : "text-green-500"}`}>
                        {risk === "high" ? "⚠ High Risk" : risk === "medium" ? "⚠ Medium Risk" : "✓ Safe"}
                      </span>
                    )}
                    {r.reason && <span className="text-xs text-red-400">Reason: {r.reason}</span>}
                  </div>

                  <div className="flex gap-1.5 flex-shrink-0">
                    {/* ✅ CHANGE 1: Only Complete button for pending — Missed button removed */}
                    {r.status === "pending" && (
                      <button onClick={() => markComplete(r._id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dark ? "bg-green-900/40 text-green-400 hover:bg-green-900/60" : "bg-green-50 text-green-600 hover:bg-green-100"}`}>Complete</button>
                    )}
                    {/* ✅ CHANGE 2: "Edit" renamed to "Reason" in missed section */}
                    {r.status === "missed" && (
                      <button onClick={() => openMissed(r._id)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dark ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Reason</button>
                    )}
                    <button onClick={() => { setDeleteId(r._id); setDeleteModal(true); }} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dark ? "bg-red-900/30 text-red-400 hover:bg-red-900/50" : "bg-red-50 text-red-500 hover:bg-red-100"}`}>Delete</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* FAB */}
        <button
          onClick={() => setModal(true)}
          className="fixed bottom-8 right-8 w-13 h-13 p-3.5 rounded-2xl bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
          style={{ width: 52, height: 52 }}
        >
          <Plus size={22}/>
        </button>

        {/* ── Modals ─────────────────────────────────────────────────────────── */}
        {/* Add Modal */}
        {modal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4" onClick={e => e.target === e.currentTarget && setModal(false)}>
            <div className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className="flex justify-between items-center mb-5">
                <h2 className={`font-extrabold text-lg ${txt}`}>Add Reminder</h2>
                <button onClick={() => setModal(false)} className={`p-1 rounded-lg transition ${dark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}><X size={16}/></button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${txtSub}`}>Title</label>
                  <input className={inputCls} placeholder="e.g. Google Internship Deadline" value={title} onChange={e => setTitle(e.target.value)}/>
                </div>
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${txtSub}`}>Deadline</label>
                  <input className={inputCls} type="date" value={date} onChange={e => setDate(e.target.value)}/>
                </div>
                <div>
                  <label className={`flex items-center gap-1.5 text-xs font-medium mb-2 ${txtSub}`}><Tag size={10}/> Category</label>
                  <div className="flex flex-wrap gap-1.5">
                    {TAGS.map(t => {
                      const tm = TAG_META[t];
                      return (
                        <button key={t} onClick={() => setTag(t)} className="text-xs font-medium px-2.5 py-1 rounded-full border transition-all" style={{
                          background:   tag === t ? tm.bg    : "transparent",
                          color:        tag === t ? tm.color : dark ? "#64748b" : "#94a3b8",
                          borderColor:  tag === t ? tm.border: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                        }}>
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button onClick={() => setModal(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${dark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Cancel</button>
                <button onClick={handleAdd} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm">Add Reminder</button>
              </div>
            </div>
          </div>
        )}

        {/* Reason Modal */}
        {reasonModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <div className="flex justify-between items-center mb-5">
                <h2 className={`font-extrabold text-lg ${txt}`}>Why was this missed?</h2>
                <button onClick={() => setReasonModal(false)} className={`p-1 rounded-lg transition ${dark ? "text-slate-500 hover:text-slate-300 hover:bg-slate-700" : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"}`}><X size={16}/></button>
              </div>
              <div className="space-y-2">
                {reasons.map((r, i) => (
                  <button key={i} onClick={() => selectReason(r)} className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition flex justify-between items-center ${
                    dark
                      ? "border-slate-700 text-slate-300 hover:border-blue-600 hover:bg-blue-900/20 hover:text-blue-400"
                      : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  }`}>
                    <span>{r}</span><span className="opacity-30">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
            <div className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
              <h2 className={`font-extrabold text-lg ${txt}`}>Delete Reminder</h2>
              <p className={`text-sm mt-2 mb-6 ${txtSub}`}>You can undo this action from the toast notification.</p>
              <div className="flex gap-2">
                <button onClick={() => setDeleteModal(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition ${dark ? "border-slate-600 text-slate-300 hover:bg-slate-700" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>Cancel</button>
                <button onClick={confirmDelete} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition">
                  {deleting ? "Deleting…" : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`fixed bottom-6 left-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl text-sm font-medium transition ${dark ? "bg-slate-800 border-slate-700 text-slate-200" : "bg-white border-slate-200 text-slate-700"}`}>
            <span>{toast}</span>
            {lastDeleted && (
              <button onClick={undoDelete} className="text-blue-500 hover:underline text-xs font-semibold">Undo</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}