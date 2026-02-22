import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    toast.success("🎉 Welcome back, Money Hero!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-indigo-600 to-purple-600 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#ffffff]/5" />
        <div className="absolute -right-10 bottom-20 h-60 w-60 rounded-full bg-[#ffffff]/5" />
        <div className="absolute left-1/4 top-1/3 h-20 w-20 rounded-full bg-[#ffffff]/5" />
      </div>

      <div className="w-full max-w-md bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8 text-white text-center animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-2">🚀 Welcome Back, Hero!</h2>

        <p className="text-white/80 mb-6">
          Ready to level up your money skills today?
        </p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-black font-bold rounded-full py-3 mb-4 hover:scale-105 hover:shadow-xl transition transform"
        >
          🌟 Continue with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-white/40 flex-1"></div>
          <span className="text-sm text-white/70">OR</span>
          <div className="h-px bg-white/40 flex-1"></div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="📧 Your Email"
            className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="🔒 Secret Password"
            className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-red-300 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-extrabold rounded-full py-3 hover:scale-105 hover:shadow-2xl transition transform"
          >
            {loading ? "Loading..." : "🎮 Enter Adventure"}
          </button>
        </form>

        <p className="text-sm mt-6 text-white/80">
          New hero?{" "}
          <Link
            to="/signup"
            className="text-yellow-300 font-bold hover:underline"
          >
            Create Your Account ⭐
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
