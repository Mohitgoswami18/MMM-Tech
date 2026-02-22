import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError("Oops! Something went wrong.");
      return;
    }

    setMessage(
      "🎉 Almost there! Check your email to unlock your hero account!",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-500 via-indigo-600 to-purple-600 px-4 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#ffffff]/5" />
          <div className="absolute -right-10 bottom-20 h-60 w-60 rounded-full bg-[#ffffff]/5" />
          <div className="absolute left-1/4 top-1/3 h-20 w-20 rounded-full bg-[#ffffff]/5" />
        </div>
      <div className="w-full max-w-md bg-white/15 backdrop-blur-2xl border border-white/30 shadow-2xl rounded-3xl p-8 text-white text-center">
        <h2 className="text-3xl font-extrabold mb-2">
          🏆 Become a Money Hero!
        </h2>

        <p className="text-white/80 mb-6">Start your adventure and earn XP!</p>

        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full bg-white text-black font-bold rounded-full py-3 mb-4 hover:scale-105 hover:shadow-xl transition transform"
        >
          🌟 Sign up with Google
        </button>

        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-white/40 flex-1"></div>
          <span className="text-sm text-white/70">OR</span>
          <div className="h-px bg-white/40 flex-1"></div>
        </div>

        <form onSubmit={handleSignup} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="👤 Your Hero Name"
            className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="🔒 Create Secret Password"
            className="w-full bg-white/20 border border-white/30 rounded-2xl px-4 py-3 placeholder-white/70 focus:ring-2 focus:ring-yellow-400 outline-none text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-300 text-sm">{error}</p>}
          {message && <p className="text-green-300 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-black font-extrabold rounded-full py-3 hover:scale-105 hover:shadow-2xl transition transform"
          >
            {loading ? "Creating..." : "🚀 Start My Adventure"}
          </button>
        </form>

        <p className="text-sm mt-6 text-white/80">
          Already a hero?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-bold hover:underline"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
