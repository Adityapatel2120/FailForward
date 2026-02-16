import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { isLoggedIn } from "../utils/auth";

export default function DashboardPage() {
  const navigate = useNavigate();

  // ✅ Protect dashboard
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, [navigate]);

  const stats = [
    { label: "Total Opportunities", value: "120", color: "text-slate-900" },
    { label: "Missed", value: "37", color: "text-red-500" },
    { label: "Completed", value: "68", color: "text-blue-600" },
    { label: "Success Rate", value: "56%", color: "text-green-600" },
  ];

  // --- Chart Data ---
  const reasonsData = [
    { name: "Forgot Deadline", value: 14 },
    { name: "Not Prepared", value: 9 },
    { name: "No Time", value: 7 },
    { name: "Low Priority", value: 4 },
    { name: "Other", value: 3 },
  ];

  const monthlyData = [
    { month: "Jan", missed: 6 },
    { month: "Feb", missed: 9 },
    { month: "Mar", missed: 5 },
    { month: "Apr", missed: 11 },
    { month: "May", missed: 3 },
  ];

  const pieColors = ["#2563eb", "#60a5fa", "#f59e0b", "#f97316", "#94a3b8"];

  // --- Modal ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Reminder Form ---
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  // --- Reminders (localStorage persistent) ---
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("oma_reminders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("oma_reminders", JSON.stringify(reminders));
  }, [reminders]);

  function addReminder() {
    if (!title.trim() || !date) return;

    const newReminder = {
      id: Date.now(),
      title: title.trim(),
      date,
    };

    setReminders((prev) => [newReminder, ...prev]);
    setTitle("");
    setDate("");
    setIsModalOpen(false);
  }

  function deleteReminder(id) {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  }

  // --- Animations ---
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const cardHover =
    "hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-100 transition duration-300";

  return (
    <motion.div
      className="mt-10"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* Heading */}
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-slate-600">
          This is a demo dashboard. Later you can connect it with backend data.
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        className="mt-8 grid grid-cols-4 gap-6"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className={`rounded-2xl bg-white border border-slate-200 shadow-sm p-6 ${cardHover}`}
          >
            <p className="text-sm text-slate-500">{s.label}</p>

            <motion.p
              className={`text-3xl font-extrabold mt-2 ${s.color}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.12 + i * 0.08, duration: 0.35 }}
            >
              {s.value}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={container}
        className="mt-8 grid grid-cols-3 gap-6"
      >
        {/* Pie Chart */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className={`rounded-3xl bg-white border border-slate-200 shadow-sm p-7 ${cardHover}`}
        >
          <h3 className="font-bold text-slate-900">Reasons for Missed</h3>

          <div className="mt-6 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reasonsData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {reasonsData.map((_, index) => (
                    <Cell key={index} fill={pieColors[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-2">
            {reasonsData.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: pieColors[i] }}
                  />
                  <span className="text-slate-700">{r.name}</span>
                </div>
                <span className="font-semibold text-slate-900">{r.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className={`rounded-3xl bg-white border border-slate-200 shadow-sm p-7 ${cardHover}`}
        >
          <h3 className="font-bold text-slate-900">Monthly Analysis</h3>

          <div className="mt-6 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="missed" radius={[12, 12, 12, 12]} fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Reason + Reminders */}
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className={`rounded-3xl bg-white border border-slate-200 shadow-sm p-7 ${cardHover}`}
        >
          <h3 className="font-bold text-slate-900">Top Reason</h3>

          <p className="mt-4 font-semibold text-slate-800 text-lg">
            Forget Deadline
          </p>

          <div className="mt-4 rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-slate-700 flex gap-2 items-start">
            <span>⚠️</span>
            <span>Set reminders to avoid missing opportunities.</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
          >
            Add Reminder
          </motion.button>

          {/* Reminders List */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-900">
              Your Reminders
            </p>

            {reminders.length === 0 ? (
              <p className="mt-2 text-sm text-slate-500">
                No reminders added yet.
              </p>
            ) : (
              <div className="mt-3 space-y-3 max-h-44 overflow-auto pr-1">
                {reminders.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{r.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{r.date}</p>
                    </div>

                    <button
                      onClick={() => deleteReminder(r.id)}
                      className="text-red-500 font-semibold text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-7"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-extrabold text-slate-900">
                Add Reminder
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Add a reminder so you don’t miss the next opportunity.
              </p>

              <div className="mt-6 space-y-4">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Reminder title (e.g. Apply for Internship)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={addReminder}
                    className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
