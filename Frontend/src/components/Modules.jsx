import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModuleCard from "../components/ModuleCard";
import needvswant from "../assets/images/needs-vs-wants.jpg";
import savingmoney from "../assets/images/saving-money.jpg";
import budgettingbasics from "../assets/images/budgeting-basics.jpg";
import { supabase } from "../supabaseClient.js";
import { useState, useEffect } from "react";

export default function Modules() {
  const [completedModules, setCompletedModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      if (!authData?.user) {
        setLoading(false);
        return;
      }

      const userId = authData.user.id;
      setUser(authData.user);

      const { data: progressData } = await supabase
        .from("module_progress")
        .select("module_id")
        .eq("user_id", userId)
        .eq("completed", true);

      // ✅ IMPORTANT FIX — convert objects to array of strings
      const moduleIds = progressData?.map((item) => item.module_id) || [];

      setCompletedModules(moduleIds);
      setLoading(false);
    };

    loadData();
  }, []);

  console.log("Completed from DB:", completedModules);
  const isCompleted = (moduleId) => completedModules.includes(moduleId);

  const allModules = [
    {
      id: "needs-vs-wants",
      title: "Needs vs Wants",
      description:
        "Can you tell the difference between what you NEED and what you WANT? Play our drag-and-drop game and test your knowledge with a fun quiz!",
      image: needvswant,
      href: user ? "/modules/needs-vs-wants" : "/login",
      color: "#8B5CF6",
      emoji: "🎯",
      status: "Available",
    },
    {
      id: "saving-money",
      title: "Saving Money",
      description:
        "Discover the magic of saving! Learn awesome strategies to grow your money and reach your goals faster than you ever imagined!",
      image: savingmoney,
      href: user ? "/modules" : "/login",
      color: "#22C55E",
      emoji: "💰",
      status: "Coming Soon",
    },
    {
      id: "budgeting-basics",
      title: "Budgeting Basics",
      description:
        "Become a budget boss! Learn how to plan your spending, track your money, and make every dollar count!",
      image: budgettingbasics,
      href: user ? "/modules" : "/login",
      color: "#F97316",
      emoji: "📊",
      status: "Coming Soon",
    },
  ];

  // Only count available modules
  const availableModules = allModules.filter(
    (mod) => mod.status === "Available",
  );

  // ✅ Now this works correctly
  const completedCount = availableModules.filter((mod) =>
    completedModules.includes(mod.id),
  ).length;

  const totalModules = availableModules.length;

  const progressPercentage =
    totalModules === 0 ? 0 : (completedCount / totalModules) * 100;

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Progress Section */}
      <section className="bg-card px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-linear-to-r from-[#EFF6FF] to-[#F5F3FF] p-6">
            {loading ? (
              <p className="text-center font-bold">
                Loading your progress... ⏳
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-muted-foreground">
                      Your Progress
                    </p>
                    <p className="text-2xl font-extrabold text-foreground">
                      {completedCount} / {totalModules} Modules Complete
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-4 w-full rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-purple-600 transition-all duration-700 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <p className="mt-2 text-sm font-semibold text-right">
                  {Math.round(progressPercentage)}%
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="bg-card px-4 pb-16 pt-4 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allModules.map((mod) => {
              const completed = isCompleted(mod.id);

              return (
                <div key={mod.id} className="relative">
                  {/* 🟡 Coming Soon Badge */}
                  {mod.status === "Coming Soon" && (
                    <div className="absolute -right-2 -top-2 z-10 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-[#1e1b4b] shadow-md">
                      Coming Soon
                    </div>
                  )}

                  {/* 🟢 Completed Badge */}
                  {completed && (
                    <div className="absolute -right-2 -top-2 z-10 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-md">
                      ✔ Completed
                    </div>
                  )}

                  <div
                    className={mod.status === "Coming Soon" ? "opacity-70" : ""}
                  >
                    <ModuleCard
                      title={mod.title}
                      description={mod.description}
                      image={mod.image}
                      href={mod.href}
                      color={mod.color}
                      emoji={mod.emoji}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
