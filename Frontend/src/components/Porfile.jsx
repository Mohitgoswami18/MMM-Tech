import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import { toast } from "sonner";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
    navigate("/");
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFFFF]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#00796B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-['Poppins']">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  const completionLevel =
    completedModules.length === 0
      ? 0
      : Math.min(100, completedModules.length * 25);

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-['Quicksand']">
      <Navbar />

      <div className="max-w-6xl mx-auto py-12 px-6 space-y-12">
        {/* HERO PROFILE SECTION */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl bg-[#00796B] text-white p-10">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="bg-[#FFFFFF] p-4 rounded-2xl shadow-lg">
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="avatar"
                    className="w-28 h-28 rounded-xl object-cover"
                  />
                ) : (
                  <Avatar
                    name={profile.name || "Member"}
                    size="112"
                    round={true}
                    color="#00796B"
                  />
                )}
              </div>

              <div>
                <h1 className="text-4xl font-['Helvetica'] font-extrabold">
                  {profile.name || "Member"}
                </h1>
                <p className="opacity-90">{profile.email}</p>
                <p className="mt-3 text-lg font-['Poppins']">
                  🪙 {completedModules.length * 20} Coins
                </p>
                <p className="text-sm opacity-80 mt-1">
                  ⭐ Level {Math.floor(completedModules.length / 2) + 1}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider font-['Poppins']">
                Mission Progress
              </p>
              <div className="w-64 bg-[#FFFFFF]/20 h-4 rounded-full mt-3">
                <div
                  className="bg-[#FFC107] h-4 rounded-full transition-all duration-700"
                  style={{ width: `${completionLevel}%` }}
                ></div>
              </div>
              <p className="mt-2 font-semibold">{completionLevel}% Completed</p>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#FFFFFF] rounded-3xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-sm mb-2 font-['Poppins']">
              Completed Modules
            </p>
            <p className="text-5xl font-['Helvetica'] font-bold text-[#00796B]">
              {completedModules.length}
            </p>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-sm mb-2 font-['Poppins']">
              Remaining Modules
            </p>
            <p className="text-5xl font-['Helvetica'] font-bold text-[#8E44AD]">
              {2 - completedModules.length > 0
                ? 2 - completedModules.length
                : 0}
            </p>
          </div>

          <div className="bg-[#FFFFFF] rounded-3xl shadow-md p-8 text-center">
            <p className="text-gray-500 text-sm mb-2 font-['Poppins']">
              Status
            </p>
            <p className="text-xl font-semibold text-[#00796B]">
              Active & Growing
            </p>
          </div>
        </div>

        {/* COMPLETED MISSIONS */}
        <div className="bg-[#FFFFFF] rounded-3xl shadow-lg p-10">
          <h2 className="text-2xl font-['Helvetica'] font-bold mb-8 text-[#00796B]">
            Completed Missions
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
                  className="bg-[#8E44AD]/10 text-[#00796B] rounded-2xl p-6 shadow-sm flex justify-between items-center"
                >
                  <span className="capitalize font-semibold">
                    {m.module_id.replaceAll("-", " ")}
                  </span>
                  <span className="bg-[#FFC107] px-4 py-1 rounded-full text-sm font-['Poppins'] font-semibold">
                    ✔ Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
