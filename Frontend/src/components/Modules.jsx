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
      try {
        setLoading(true);

        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          setUser(null);
          setCompletedModules([]);
          setLoading(false);
          return;
        }

        const userId = data.user.id;
        setUser(data.user);

        const { data: progressData, error: progressError } = await supabase
          .from("module_progress")
          .select("module_id")
          .eq("user_id", userId)
          .eq("completed", true);

        if (progressError) {
          setCompletedModules([]);
        } else {
          const moduleIds = progressData?.map((item) => item.module_id) || [];
          setCompletedModules(moduleIds);
        }

        setLoading(false);
      } catch (err) {
        console.log(err);
        setCompletedModules([]);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const isCompleted = (moduleId) => completedModules.includes(moduleId);

  const allModules = [
    {
      id: "needs-vs-wants",
      title: "Needs vs Wants",
      description:
        "Can you tell the difference between what you NEED and what you WANT?",
      image: needvswant,
      href: user ? "/modules/needs-vs-wants" : "/login",
      emoji: "🎯",
      status: "Available",
      color: "#00796B",
    },
    {
      id: "saving-money",
      title: "Saving Money",
      description: "Discover the magic of saving and grow your money wisely.",
      image: savingmoney,
      href: user ? "/modules" : "/login",
      emoji: "💰",
      status: "Coming Soon",
      color: "#00796B",
    },
    {
      id: "budgeting-basics",
      title: "Budgeting Basics",
      description:
        "Learn how to plan your spending and track your money smartly.",
      image: budgettingbasics,
      href: user ? "/modules" : "/login",
      emoji: "📊",
      status: "Coming Soon",
      color: "#00796B",
    },
  ];

  const availableModules = allModules.filter(
    (mod) => mod.status === "Available",
  );

  const completedCount = availableModules.filter((mod) =>
    completedModules.includes(mod.id),
  ).length;

  const totalModules = availableModules.length;

  const progressPercentage =
    totalModules === 0 ? 0 : (completedCount / totalModules) * 100;

  return (
    <main className="min-h-screen bg-[#FFFFFF] font-['Quicksand']">
      <Navbar />

      {/* Progress Section */}
      <section className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-[#00796B] p-6 shadow-sm">
            {loading ? (
              <p className="text-center font-['Poppins'] font-semibold text-white">
                Loading your progress...
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-['Poppins'] text-[#FFC107]">
                      Your Progress
                    </p>
                    <p className="text-2xl font-['Helvetica'] font-extrabold text-white">
                      {completedCount} / {totalModules} Modules Complete
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-4 w-full rounded-full bg-black/10 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-700 ease-in-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>

                <p className="mt-2 text-sm font-['Poppins'] text-right text-white">
                  {Math.round(progressPercentage)}%
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="px-4 pb-16 pt-4 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allModules.map((mod) => {
              const completed = isCompleted(mod.id);

              return (
                <div key={mod.id} className="relative">
                  {mod.status === "Coming Soon" && (
                    <div className="absolute -right-2 -top-2 z-10 rounded-full bg-[#FFC107] px-3 py-1 text-xs font-['Poppins'] font-semibold text-[#00796B] shadow-md">
                      Coming Soon
                    </div>
                  )}

                  {completed && (
                    <div className="absolute -right-2 -top-2 z-10 rounded-full bg-[#00796B] px-3 py-1 text-xs font-['Poppins'] font-semibold text-[#FFFFFF] shadow-md">
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
                      emoji={mod.emoji}
                      color={mod.color}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </main>
  );
}
