import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  function handleLogin() {
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    const res = loginUser({
      email: email.trim(),
      password: password.trim(),
    });

    if (!res.ok) {
      setError(res.message);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="mt-12 flex justify-center">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-sm rounded-3xl p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Login</h1>
        <p className="mt-2 text-slate-600 text-sm">
          Welcome back. Login to continue.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login
          </button>

          <p className="text-sm text-slate-600 text-center">
            Don’t have an account?{" "}
            <button
              onClick={() =>
                navigate("/signup", { state: { fromLogin: true } })
              }
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
