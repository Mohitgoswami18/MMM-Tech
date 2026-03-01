import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";
import { useState, useEffect } from "react";
import ModuleCard from "./ModuleCard";
import { supabase } from "../supabaseClient.js";
import needsvswants from "../assets/images/needs-vs-wants.jpg";
import budgetingbasics from "../assets/images/budgeting-basics.jpg";
import herokid from "../assets/images/hero-kids.jpg";
import { Gamepad2, Brain, Trophy, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description:
      "Learn through fun drag-and-drop games and interactive challenges",
    bg: "#00796B",
  },
  {
    icon: Brain,
    title: "Interactive Quizzes",
    description: "Test your knowledge with exciting quizzes after every module",
    bg: "#8E44AD",
  },
  {
    icon: Trophy,
    title: "Rewards & Scores",
    description: "Earn badges and track your scores as you master money skills",
    bg: "#FFC107",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Watch your financial knowledge grow with every lesson completed",
    bg: "#00796B",
  },
];

export default function Home() {
  const [user, setUser] = useState(null);

  const modules = [
    {
      title: "Needs vs Wants",
      description:
        "Can you tell the difference between what you NEED and what you WANT? Play the drag-and-drop game and find out!",
      image: needsvswants,
      href: user ? "/modules/needs-vs-wants" : "/login",
      emoji: "\uD83C\uDFAF",
      color: "#00796B",
    },
    {
      title: "Budgeting Basics",
      description:
        "Become a budget boss! Learn how to plan your spending and make your money work for you!",
      image: budgetingbasics,
      href: user ? "/modules" : "/login",
      emoji: "📊",
      color: "#00796B",
    },
  ];

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFFFFF] font-['Quicksand']">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#00796B]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 lg:flex-row lg:px-8">
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-4 py-2 text-sm font-bold text-[#ffffff]">
              <span>{"\uD83C\uDF1F"}</span> For Kids Aged 10-18 //{" "}
            </div>

            <h1 className="text-4xl font-['Helvetica'] font-extrabold text-[#FFFFFF] md:text-5xl lg:text-6xl">
              Learn Money Skills the{" "}
              <span className="text-[#FFC107]">Fun Way!</span>
            </h1>

            <p className="max-w-lg text-lg text-[#FFFFFF]/90">
              Play games, take quizzes, and become a financial superhero. Your
              money journey starts here!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/modules"
                className="rounded-full bg-[#FFC107] px-8 py-4 text-lg font-['Poppins'] font-semibold text-[#00796B] shadow-md transition-all hover:scale-105"
              >
                🚀 Start Learning
              </Link>

              <a
                href="#about"
                className="rounded-full border-2 border-[#FFFFFF] px-8 py-4 text-lg font-['Poppins'] font-semibold text-[#FFFFFF] transition-all hover:bg-[#FFFFFF] hover:text-[#00796B]"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="mx-auto float aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-xl">
              <img
                src={herokid}
                alt="Happy kids learning about money"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              style={{ animationDelay: "1s" }}
              className="absolute -left-4 top-8 float rounded-2xl bg-[#ffffff] px-4 py-2 shadow-lg"
            >
              <span className="text-lg font-bold text-[#22C55E]">
                {"\uD83C\uDFC6"} +50 XP
              </span>
            </div>
            <div
              className="absolute -right-4 bottom-8 float rounded-2xl bg-[#ffffff] px-4 py-2 shadow-lg"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-lg font-bold text-[#FFC107]">
                {"\u2B50"} Level Up!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
            Why Learn About Money? {"\uD83E\uDD14"}{" "}
          </h2>{" "}
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Did you know that{" "}
            <span className="font-bold text-[#22C55E]">
              learning about money early{" "}
            </span>{" "}
            can help you make better choices when you grow up? Understanding how
            to save, spend wisely, and budget is like having a{" "}
            <span className="font-bold text-[#FFC107]">
              financial superpower{" "}
            </span>
            !{" "}
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-[#00796B] p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83C\uDF31"}</div>
              <h3 className="font-bold text-[#FFC107]">Start Young</h3>
              <p className="mt-1 text-sm text-white">
                The earlier you learn, the smarter your money decisions will be!
              </p>
            </div>
            <div className="rounded-2xl bg-[#00796B] p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83D\uDCAA"}</div>
              <h3 className="font-bold text-[#FFC107]">Build Confidence</h3>
              <p className="mt-1 text-sm text-white">
                Knowing about money gives you the power to make smart choices!
              </p>
            </div>
            <div className="rounded-2xl bg-[#00796B] p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83C\uDF1F"}</div>
              <h3 className="font-bold text-[#FFC107]">Be a Leader</h3>
              <p className="mt-1 text-sm text-white">
                Financial literacy helps you become a responsible leader!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#8E44AD]/5 px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-['Helvetica'] font-extrabold text-[#00796B] md:text-4xl">
            What Makes Us <span className="text-[#FFC107]">Awesome</span>? 😎
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center gap-4 rounded-3xl bg-[#FFFFFF] p-8 text-center shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-[#FFFFFF]"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon size={30} />
                </div>

                <h3 className="font-['Helvetica'] font-bold text-[#00796B]">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="px-4 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="mb-6 text-3xl font-['Helvetica'] font-extrabold text-[#00796B] md:text-4xl">
            Pick Your Learning Adventure! 🗺️
          </h2>

          <p className="mb-12 text-lg text-gray-600">
            Each module is a new chapter in your financial journey.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <ModuleCard key={mod.title} {...mod} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#00796B] px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-['Helvetica'] font-extrabold text-[#FFFFFF] md:text-4xl">
            Ready to Become a Money Hero? 🦸
          </h2>

          <p className="mb-8 text-lg text-[#FFFFFF]/90">
            Start your adventure today and build skills that last a lifetime!
          </p>

          <Link
            to="/modules"
            className="inline-flex items-center gap-2 rounded-full bg-[#FFC107] px-10 py-4 text-lg font-['Poppins'] font-semibold text-[#00796B] shadow-md transition hover:scale-105"
          >
            🎉 Let's Go!
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}