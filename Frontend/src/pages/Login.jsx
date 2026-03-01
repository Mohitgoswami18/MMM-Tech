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

    toast.success("🎉 Welcome back!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00796B] px-4 relative overflow-hidden font-['Quicksand']">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {" "}
          <div className="absolute float -left-10 top-10 h-40 w-40 rounded-full bg-[#ffffff]/5" />{" "}
          <div className="absolute float -right-10 bottom-20 h-60 w-60 rounded-full bg-[#ffffff]/5" />{" "}
          <div className="absolute float left-1/4 top-1/3 h-20 w-20 rounded-full bg-[#ffffff]/5" />{" "}
        </div>
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] shadow-2xl rounded-3xl p-8 text-center animate-fade-in">
        <h2 className="text-3xl font-['Helvetica'] font-extrabold text-[#00796B] mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-600 mb-6">Continue your financial journey.</p>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-[#00796B] text-[#FFFFFF] font-['Poppins'] font-semibold rounded-full py-3 mb-4 transition hover:scale-105 hover:bg-[#005f56]"
        >
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-[#00796B]/20 flex-1"></div>
          <span className="text-sm text-gray-500 font-['Poppins']">OR</span>
          <div className="h-px bg-[#00796B]/20 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-[#00796B]/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#FFC107] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-[#00796B]/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#FFC107] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC107] text-[#00796B] font-['Poppins'] font-semibold rounded-full py-3 transition hover:scale-105 hover:shadow-lg"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#00796B] font-['Poppins'] font-semibold hover:text-[#FFC107]"
          >
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
