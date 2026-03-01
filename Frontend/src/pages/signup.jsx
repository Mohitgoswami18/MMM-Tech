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
      console.log(error);
      return;
    }

    setMessage("Almost there! Check your email to activate your account.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00796B] px-4 relative overflow-hidden font-['Quicksand']">
      {/* Subtle background accents */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute float -left-10 top-10 h-40 w-40 rounded-full bg-[#ffffff]/5" />{" "}
        <div className="absolute float -right-10 bottom-20 h-60 w-60 rounded-full bg-[#ffffff]/5" />{" "}
        <div className="absolute float left-1/4 top-1/3 h-20 w-20 rounded-full bg-[#ffffff]/5" />{" "}
      </div>

      <div className="w-full max-w-md bg-[#FFFFFF] shadow-2xl rounded-3xl p-8 text-center">
        <h2 className="text-3xl font-['Helvetica'] font-extrabold text-[#00796B] mb-2">
          Create Your Account
        </h2>

        <p className="text-gray-600 mb-6">
          Begin your financial journey today.
        </p>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full bg-[#00796B] text-[#FFFFFF] font-['Poppins'] font-semibold rounded-full py-3 mb-4 transition hover:scale-105 hover:bg-[#005f56]"
        >
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px bg-[#00796B]/20 flex-1"></div>
          <span className="text-sm text-gray-500 font-['Poppins']">OR</span>
          <div className="h-px bg-[#00796B]/20 flex-1"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4 text-left">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-[#00796B]/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#FFC107] outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-[#00796B]/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#FFC107] outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Create Password"
            className="w-full border border-[#00796B]/20 rounded-2xl px-4 py-3 focus:ring-2 focus:ring-[#FFC107] outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC107] text-[#00796B] font-['Poppins'] font-semibold rounded-full py-3 transition hover:scale-105 hover:shadow-lg"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-sm mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#00796B] font-['Poppins'] font-semibold hover:text-[#FFC107]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
