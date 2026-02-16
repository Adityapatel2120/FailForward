import { useNavigate } from "react-router-dom";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl bg-blue-600 shadow-lg px-10 py-12 text-center text-white">
      <h2 className="text-2xl font-bold">
        Start Learning From Your Missed Opportunities Today
      </h2>

      <button
        onClick={() => navigate("/signup")}
        className="mt-6 px-8 py-3 rounded-xl bg-white text-blue-700 font-bold shadow hover:bg-slate-100 transition"
      >
        Sign Up Now
      </button>
    </div>
  );
}
