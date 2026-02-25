import React from "react";

const completedModules = [
  { id: 1, name: "Needs vs Wants", color: "from-purple-400 to-purple-600" },
  { id: 2, name: "Saving Money", color: "from-green-400 to-green-600" },
];

const availableModules = [
  { id: 3, name: "Budgeting Basics", color: "from-orange-400 to-orange-500" },
];

export default function Profile() {
  const user = {
    name: "MoneyMaster",
    email: "moneymaster@example.com",
    hero: "/heroes/penny.png",
    level: 3,
    coins: 120,
  };

  const completionPercentage =
    (completedModules.length /
      (completedModules.length + availableModules.length)) *
    100;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER CARD */}
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <img
                src={user.hero}
                alt="Hero Avatar"
                className="w-24 h-24 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-sm opacity-90">{user.email}</p>
              <p className="mt-2 text-sm">
                ⭐ Level {user.level} | 🪙 {user.coins} Coins
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-0 text-center">
            <p className="text-sm">Overall Progress</p>
            <div className="w-40 bg-white/30 h-3 rounded-full mt-2">
              <div
                className="bg-white h-3 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              {Math.round(completionPercentage)}% Completed
            </p>
          </div>
        </div>

        {/* MODULES SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* COMPLETED MODULES */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">🏆 Completed Modules</h2>

            {completedModules.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No modules completed yet. Start your journey!
              </p>
            ) : (
              <div className="space-y-4">
                {completedModules.map((module) => (
                  <div
                    key={module.id}
                    className={`bg-linear-to-r ${module.color} text-white p-4 rounded-xl shadow-md flex justify-between items-center`}
                  >
                    <span>{module.name}</span>
                    <span>✔</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AVAILABLE MODULES */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">🚀 Complete the remaining</h2>

            <div className="space-y-4">
              {availableModules.map((module) => (
                <div
                  key={module.id}
                  className={`bg-linear-to-r ${module.color} text-white p-4 rounded-xl shadow-md flex justify-between items-center`}
                >
                  <span>{module.name}</span>
                  <button className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-semibold hover:scale-105 transition">
                    Start →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
