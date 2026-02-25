""

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

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

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-6">
          <img
            src={profile.avatar_url || "/default-avatar.png"}
            alt="avatar"
            className="w-20 h-20 rounded-full border object-cover"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-gray-900">
              {profile.name}
            </h1>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Completed Modules</p>
            <p className="text-3xl font-bold text-gray-900">
              {completedModules.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">Account Status</p>
            <p className="text-lg font-medium text-green-600">
              Active
            </p>
          </div>
        </div>

        {/* COMPLETED MODULES LIST */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Completed Modules
          </h2>

          {completedModules.length === 0 ? (
            <p className="text-gray-500 text-sm">
              You haven’t completed any modules yet.
            </p>
          ) : (
            <ul className="space-y-3">
              {completedModules.map((m) => (
                <li
                  key={m.module_id}
                  className="flex items-center justify-between border rounded-lg px-4 py-3"
                >
                  <span className="text-gray-800 capitalize">
                    {m.module_id.replaceAll("-", " ")}
                  </span>
                  <span className="text-sm text-green-600 font-medium">
                    Completed
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
