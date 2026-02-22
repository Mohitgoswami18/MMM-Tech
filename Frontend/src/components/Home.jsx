import { Link } from "react-router-dom";
import Footer from "./Footer.jsx"
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
    color: "#3B82F6",
    bg: "#3B82F6",
  },
  {
    icon: Brain,
    title: "Interactive Quizzes",
    description: "Test your knowledge with exciting quizzes after every module",
    color: "#8B5CF6",
    bg: "#8B5CF6",
  },
  {
    icon: Trophy,
    title: "Rewards & Scores",
    description: "Earn badges and track your scores as you master money skills",
    color: "#F97316",
    bg: "#F97316",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Watch your financial knowledge grow with every lesson completed",
    color: "#22C55E",
    bg: "#22C55E",
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
      color: "#8B5CF6",
      emoji: "\uD83C\uDFAF",
    },
    {
      title: "Budgeting Basics",
      description:
        "Become a budget boss! Learn how to plan your spending and make your money work for you!",
      image: budgetingbasics,
      href: user ? "/modules" : "/login",
      color: "#F97316",
      emoji: "\uD83D\uDCCA",
    },
  ];

  useEffect(() => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user);
      });
    },[]);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]">
        {/* Decorative dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#ffffff]/5" />
          <div className="absolute -right-10 bottom-20 h-60 w-60 rounded-full bg-[#ffffff]/5" />
          <div className="absolute left-1/4 top-1/3 h-20 w-20 rounded-full bg-[#ffffff]/5" />
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 lg:flex-row lg:gap-12 lg:px-8 lg:py-24">
          {/* Text */}
          <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-4 py-2 text-sm font-bold text-[#ffffff]">
              <span>{"\uD83C\uDF1F"}</span> For Kids Aged 10-18
            </div>
            <h1 className="text-balance text-4xl font-extrabold leading-tight text-[#ffffff] md:text-5xl lg:text-6xl">
              Learn Money Skills the{" "}
              <span className="bg-linear-to-r from-[#FDE047] to-[#F97316] bg-clip-text text-transparent">
                Fun Way!
              </span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-[#ffffff]/85">
              Join the adventure of a lifetime! Play games, take quizzes, and
              become a financial superhero. Your money journey starts here!
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/modules"
                className="rounded-full bg-[#FDE047] px-8 py-4 text-lg font-extrabold text-[#1e1b4b] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                {"\uD83D\uDE80"} Start Learning
              </Link>
              <a
                href="#about"
                className="rounded-full border-2 border-[#ffffff]/50 px-8 py-4 text-lg font-bold text-[#ffffff] transition-all duration-300 hover:border-[#ffffff] hover:bg-[#ffffff]/10"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex-1">
            <div className="float relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={herokid}
                alt="Happy kids learning about money and finance"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating badges */}
            <div className="absolute -left-4 top-8 float rounded-2xl bg-[#ffffff] px-4 py-2 shadow-lg">
              <span className="text-lg font-bold text-[#22C55E]">
                {"\uD83C\uDFC6"} +50 XP
              </span>
            </div>
            <div
              className="absolute -right-4 bottom-8 float rounded-2xl bg-[#ffffff] px-4 py-2 shadow-lg"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-lg font-bold text-[#8B5CF6]">
                {"\u2B50"} Level Up!
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-card px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
            Why Learn About Money? {"\uD83E\uDD14"}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Did you know that{" "}
            <span className="font-bold text-blue-600">
              learning about money early
            </span>{" "}
            can help you make better choices when you grow up? Understanding how
            to save, spend wisely, and budget is like having a{" "}
            <span className="font-bold text-green-600">
              financial superpower
            </span>
            !
          </p>
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-600/5 p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83C\uDF31"}</div>
              <h3 className="font-bold text-foreground">Start Young</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                The earlier you learn, the smarter your money decisions will be!
              </p>
            </div>
            <div className="rounded-2xl bg-green-600/5 p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83D\uDCAA"}</div>
              <h3 className="font-bold text-foreground">Build Confidence</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Knowing about money gives you the power to make smart choices!
              </p>
            </div>
            <div className="rounded-2xl bg-orange-600/5 p-6 transition-all hover:scale-105">
              <div className="mb-3 text-4xl">{"\uD83C\uDF1F"}</div>
              <h3 className="font-bold text-foreground">Be a Leader</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Financial literacy helps you become a responsible leader!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Section */}
      <section className="bg-linear-to-br from-[#EFF6FF] to-[#F5F3FF] px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-foreground md:text-4xl">
            What Makes Us{" "}
            <span className="text-orange-600">Awesome</span>?{" "}
            {"\uD83D\uDE0E"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col items-center gap-4 rounded-3xl bg-card p-8 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-2xl text-[#ffffff] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={{ backgroundColor: item.bg }}
                >
                  <item.icon size={32} />
                </div>
                <h3 className="text-lg font-extrabold text-card-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Summary Section */}
      <section className="bg-card px-4 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
              Pick Your Learning Adventure! {"\uD83D\uDDFA\uFE0F"}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Each module is a new chapter in your financial journey. Ready to
              level up?
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod) => (
              <ModuleCard key={mod.title} {...mod} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-[#F97316] via-[#EAB308] to-[#22C55E] px-4 py-16 text-center lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-3xl font-extrabold text-[#ffffff] md:text-4xl">
            Ready to Become a Money Hero? {"\uD83E\uDDB8"}
          </h2>
          <p className="mb-8 text-lg text-[#ffffff]/90">
            Start your adventure today and learn skills that will last a
            lifetime!
          </p>
          <Link
            to="/modules"
            className="inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-10 py-4 text-lg font-extrabold text-[#1e1b4b] shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {"\uD83C\uDF89"} Let{"'"}s Go!
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}