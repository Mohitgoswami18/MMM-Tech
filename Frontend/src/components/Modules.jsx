import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ModuleCard from "../components/ModuleCard";
import needvswant from "../assets/images/needs-vs-wants.jpg"
import savingmoney from "../assets/images/saving-money.jpg"
import budgettingbasics from "../assets/images/budgeting-basics.jpg"
import { supabase } from "../supabaseClient.js";
import { useState, useEffect } from "react";

export default function Modules() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const allModules = [
    {
      id:"Need-vs-Wants",
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
      id:"Saving-Money",
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
      id:"Budgeting-Basics",
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

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-linear-to-br from-[#8B5CF6] via-[#6366F1] to-[#3B82F6] px-4 py-16 text-center lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-4 py-2 text-sm font-bold text-[#ffffff]">
            🎮 Learning Modules
          </div>

          <h1 className="mb-4 text-4xl font-extrabold text-[#ffffff] md:text-5xl">
            Choose Your Adventure!
          </h1>

          <p className="text-lg text-[#ffffff]/85">
            Each module is a new level in your financial journey. Complete
            modules to earn badges and level up your money skills!
          </p>
        </div>
      </section>

      {/* Progress Section */}
      <section className="bg-card px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-2xl bg-linear-to-r from-[#EFF6FF] to-[#F5F3FF] p-6">
            <div>
              <p className="text-sm font-bold text-muted-foreground">
                Your Progress
              </p>
              <p className="text-2xl font-extrabold text-foreground">
                0 / {allModules.length} Modules Complete
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl">🌟</span>
              <div>
                <p className="text-sm font-bold text-muted-foreground">
                  XP Points
                </p>
                <p className="text-xl font-extrabold text-orange-600">
                  0
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="bg-card px-4 pb-16 pt-4 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allModules.map((mod) => (
              <div key={mod.title} className="relative">
                {mod.status === "Coming Soon" && (
                  <div className="absolute -right-2 -top-2 z-10 rounded-full bg-yellow-600 px-3 py-1 text-xs font-bold text-[#1e1b4b] shadow-md">
                    Coming Soon
                  </div>
                )}

                <div
                  className={
                    mod.status === "Coming Soon"
                      ? "opacity-70"
                      : ""
                  }
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
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
