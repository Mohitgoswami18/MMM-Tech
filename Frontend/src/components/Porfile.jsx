import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { toast } from "sonner";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) return;

      const userId = authData.user.id;

      const { data: profileData } = await supabase
        .from("profiles")
        .select("name, email, avatar_url")
        .eq("id", userId)
        .single();

      const { data: progressData } = await supabase
        .from("module_progress")
        .select("module_id")
        .eq("user_id", userId)
        .eq("completed", true);

      setProfile(profileData);
      setCompletedModules(progressData || []);
    };

    loadProfile();
  }, []);

  console.log(completedModules);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    setUser(null);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const completionLevel =
    completedModules.length === 0
      ? 0
      : Math.min(100, completedModules.length * 25);

      return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50">
          {/* 🔷 MMM NAVBAR */}
          <div className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-indigo-600">LOGO</h1>

              <div className="flex gap-6 items-center">
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Home
                </button>
                <button
                  onClick={() => navigate("/modules")}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition"
                >
                  Modules
                </button>
                <button
                  onClick={() => handleLogout()}
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
            {/* 🟣 HERO PROFILE SECTION */}
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10">
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white p-4 rounded-2xl shadow-xl">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="avatar"
                        className="w-28 h-28 rounded-xl object-cover"
                      />
                    ) : (
                      <Avatar
                        name={profile.name || "Young FinHero"}
                        size="112"
                        round={true}
                      />
                    )}
                  </div>

                  <div>
                    <h1 className="text-4xl font-bold">
                      {profile.name || "Young FinHero"}
                    </h1>
                    <p className="opacity-90">{profile.email}</p>
                    <p className="mt-3 text-lg">
                      🪙 {completedModules.length * 20} Coins
                    </p>
                    <p className="text-sm opacity-80 mt-1">
                      ⭐ Level {Math.floor(completedModules.length / 2) + 1}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="text-center">
                  <p className="text-sm uppercase tracking-wider">
                    Mission Progress
                  </p>
                  <div className="w-64 bg-white/30 h-4 rounded-full mt-3">
                    <div
                      className="bg-white h-4 rounded-full transition-all duration-700"
                      style={{ width: `${completionLevel}%` }}
                    ></div>
                  </div>
                  <p className="mt-2 font-semibold">
                    {completionLevel}% Completed
                  </p>
                </div>
              </div>
            </div>

            {/* 📊 STATS SECTION */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">
                <p className="text-gray-500 text-sm mb-2">
                  🎓 Completed Modules
                </p>
                <p className="text-5xl font-bold text-indigo-600">
                  {completedModules.length}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">
                <p className="text-gray-500 text-sm mb-2">
                  🚀 Remaining Modules
                </p>
                <p className="text-5xl font-bold text-purple-600">
                  {2 - completedModules.length > 0
                    ? 2 - completedModules.length
                    : 0}
                </p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition">
                <p className="text-gray-500 text-sm mb-2">🔥 Status</p>
                <p className="text-xl font-semibold text-green-600">
                  Active & Growing
                </p>
              </div>
            </div>

            {/* 🏆 COMPLETED MISSIONS */}
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <h2 className="text-2xl font-bold mb-8 text-gray-800">
                🏆 Completed Missions
              </h2>

              {completedModules.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-500">
                    You haven't completed any missions yet.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {completedModules.map((m) => (
                    <div
                      key={m.module_id}
                      className="bg-linear-to-r from-green-400 to-emerald-500 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center"
                    >
                      <span className="capitalize font-semibold">
                        {m.module_id.replaceAll("-", " ")}
                      </span>
                      <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
                        ✔ Completed
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
}
