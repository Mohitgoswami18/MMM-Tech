import TradingGame from "./TradingGame.jsx";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import budgetingbasics from "../assets/images/budgeting-basics.jpg";
import Navbar from "./Navbar.jsx";
import badge from "../assets/images/badge-star.jpg";
import { useState ,useEffect, use} from "react";
import { supabase } from "../supabaseClient";
import hi from "../assets/mascot/hi.png";
import thinking from "../assets/mascot/thinking.png";
import otherwise from "../assets/mascot/otherwise.png";

const slides = [
  {
    id: 1,
    title: "Welcome to the Stock Market!",
    explanation:
      "Companies grow by getting investments from people like you. When you invest, you become a part-owner!",
    emoji: "🏢",
    ninoMessage: "Hi! I'm Nino! Ready to learn about investing?",
    type: "start",
  },
  {
    id: 2,
    title: "What is a Stock?",
    explanation:
      "When you buy a stock, you own a small piece of a company. If the company does well, your piece becomes more valuable!",
    emoji: "📈",
    ninoMessage: "A stock is like owning a tiny slice of a company pizza! 🍕",
    type: "content",
  },
  {
    id: 3,
    title: "Profit and Loss",
    explanation:
      "If the company grows and the stock price goes up, you can sell it for more money and make a profit! But prices can also go down.",
    emoji: "💰",
    ninoMessage: "Buy low, sell high! That's the goal!",
    type: "content",
  },
  {
    id: 4,
    title: "Let's Start Trading!",
    explanation:
      "You're about to start with $1,000 in virtual money. Trade 3 companies and see if you can make a profit. Good luck!",
    emoji: "🎯",
    ninoMessage: "You've got this! Let's go to the trading game!",
    type: "end",
  },
];

export default function StockSimulator() {
  console.log("🎮 StockSimulator component rendered"); // Debugging line to check when component renders
  const [activeTab, setActiveTab] = useState("intro");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authLoading, setAuthLoading] = useState(true);
  const slide = slides[currentSlide];
  const [userId ,setUserId] = useState(null);
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const isFirst = currentSlide === 0;
  

  useEffect(() => {
    console.log("📍 StockSimulator useEffect triggered - checking authentication");
    
    supabase.auth.getSession().then(({ data: sessionData, error: sessionError }) => {
      console.log("📌 Session check result:", { hasSession: !!sessionData.session, error: sessionError });
      
      if (sessionError) {
        console.error("❌ Session error:", sessionError);
        setAuthLoading(false);
        return;
      }

      if (!sessionData.session) {
        console.warn("⚠️  No active session - user not logged in");
        setAuthLoading(false);
        return;
      }

      console.log("✅ User has active session");
      
      supabase.auth.getUser().then(({ data, error }) => {
        console.log("📌 Auth data on StockSimulator load:", data); // Debugging line to check auth data    
        if (error) {
          console.error("❌ Error getting user:", error);
        }
        if (data?.user) {
          console.log("✅ Current user ID:", data.user.id); // Debugging line to check user ID
          setUserId(data.user.id);
        } else {
          console.log("⚠️  No user found in auth data");
        }
        setAuthLoading(false);
      }).catch((err) => {
        console.error("❌ Error getting user (catch):", err);
        setAuthLoading(false);
      });
    }).catch((err) => {
      console.error("❌ Error getting session (catch):", err);
      setAuthLoading(false);
    });
  }, [])
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // On last slide, switch to game tab
      setActiveTab("game");
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };


  const tabs = [
    { id: "intro", label: "Learn", emoji: "\uD83D\uDCDA" },
    { id: "game", label: "Play", emoji: "\uD83C\uDFAE" },
    { id: "badge", label: "Badge", emoji: "\uD83C\uDFC6" },
  ];
 
  function CompletionBadge() {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-linear-to-br from-[#FDE047]/30 via-[#F97316]/20 to-[#22C55E]/30 p-8 text-center">
        <div className="relative">
          <img
            src={badge}
            alt="Achievement badge for completing the Needs vs Wants module"
            width={150}
            height={150}
            className="animate-bounce-slow rounded-full shadow-xl"
          />
        </div>
        <h3 className="text-2xl font-extrabold text-foreground">
          {"\uD83C\uDFC6"} Module Badge Unlocked!
        </h3>
        <p className="text-muted-foreground">
          Complete both the game and quiz to earn the{" "}
          <span className="font-bold text-orange-600">
            Needs vs Wants Champion
          </span>{" "}
          badge!
        </p>
      </div>
    );
  }
  

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-purple-50">
      <Navbar />
      <div className="py-8">
        <section className="px-4 py-12 lg:px-8 lg:py-16 bg-[#00796B]">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/modules"
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-4 py-2 text-sm font-bold text-[#ffffff] transition-all hover:bg-[#ffffff]/30"
            >
              <ArrowLeft size={16} />
              Back to Modules
            </Link>
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={budgetingbasics}
                  alt="stock market basics cartoon illustration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-3 py-1 text-sm font-bold text-[#ffffff]">
                  {"\uD83C\uDFAF"} Module 2
                </div>
                <h1 className="mb-2 text-3xl font-extrabold text-[#ffffff] md:text-4xl">
                  Stock Market Simulator
                </h1>
                <p className="text-[#ffffff]/80">
                  Turn curiosity into smart investing habits. “Explore the stock
                  market in a safe, fun way.”
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation section */}

        <section className=" shadow-sm">
          <div className="mx-auto flex max-w-4xl overflow-x-auto px-4 lg:px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 border-b-4 px-6 py-4 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "border-[#00796B] text-[#00796B]"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === "intro" ? (
            // <StoryIntro
            //   onComplete={() => {
            //     setStoryComplete(true);
            //     setCurrentSection("game");
            //   }}
            // />

            <div className="space-y-8">
                  <div className="min-h-screen bg-linear-to-br from-sky-50 via-green-50 to-purple-50 p-3 md:p-4">
                    <div className="max-w-4xl mx-auto">
                      {/* Header */}
                      <div className="mb-2 pt-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                          Stock Simulator
                        </h1>
                        <p className="text-lg text-slate-600">Learn with MIMO</p>
                      </div>
            
                      <div className="grid md:grid-cols-2 gap-8 items-start px-12 min-h-screen mx-auto">
                        {/* LEFT COLUMN - Mascot (pushed down slightly) */}
                        <div className="flex flex-col items-center mt-10 md:mt-16">
                          <div className="relative mb-6 animate-float">
                            <div className="w-48 h-48 bg-amber-300 rounded-full shadow-xl flex items-center justify-center text-6xl">
                              {currentSlide === 0 ? (
                                <img src={hi} alt="Hi" className="" />
                              ) : currentSlide === slides.length - 1 ? (
                                <img src={otherwise} alt="otherwise" />
                              ) : (
                                <img src={thinking} alt="thinking" />
                              )}
                            </div>
                          </div>
            
                          <div className="relative w-full max-w-xs">
                            <div className="bg-white rounded-2xl shadow-lg p-6 border">
                              <p className="text-lg font-semibold text-slate-900 text-center">
                                {slide.ninoMessage}
                              </p>
                            </div>
                          </div>
                        </div>
            
                        {/* RIGHT COLUMN - Content (starts from top) */}
                        <div className="flex flex-col">
                          <div className="bg-white rounded-3xl shadow-xl p-8">
                            {/* Progress */}
                            <div className="mb-6">
                              <div className="flex justify-between text-sm mb-2">
                                <span>
                                  Step {currentSlide + 1} of {slides.length}
                                </span>
                                <span>
                                  {Math.round(((currentSlide + 1) / slides.length) * 100)}%
                                </span>
                              </div>
            
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                                  style={{
                                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
            
                            {/* Slide Content */}
                            <div className="mb-6 text-6xl">{slide.emoji}</div>
            
                            <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
            
                            <p className="text-lg text-slate-700 mb-6">
                              {slide.explanation}
                            </p>
            
                            {/* Navigation */}
                            <div className="flex justify-between mt-8">
                              <button
                                onClick={() => handlePrevious()}
                                disabled={isFirst}
                                className="px-6 py-3 rounded-xl bg-[#FFC107] text-white disabled:bg-slate-300 transition hover:scale-105"
                              >
                                ⬅ Previous
                              </button>
                              {slide.type === "end" ? (
                                <button
                                  onClick={() => setActiveTab("game")}
                                  className="px-6 py-3 rounded-xl bg-[#00796B] text-white disabled:bg-slate-300 transition hover:scale-105"
                                >
                                  Start Game
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleNext()}
                                  className="px-6 py-3 rounded-xl bg-[#00796B] text-white disabled:bg-slate-300 transition hover:scale-105"
                                >
                                  Next ➡
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
          ) : activeTab === "game" ? (
            <TradingGame userId={userId} />
          ) : (
            <div className="flex flex-col gap-8">
              <CompletionBadge />

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/modules"
                  className="rounded-full bg-[#00796B] px-8 py-3 font-bold text-[#ffffff] transition-all hover:scale-105"
                >
                  {"\uD83D\uDDFA\uFE0F"} More Modules
                </Link>
                <button
                  onClick={() => setActiveTab("game")}
                  className="rounded-full border-2 border-[#00796B] px-8 py-3 font-bold text-[#00796B] transition-all hover:bg-[#00796B]/5 hover:scale-105"
                >
                  {"\uD83D\uDD04"} Replay Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
