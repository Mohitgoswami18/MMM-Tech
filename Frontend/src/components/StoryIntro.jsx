import { useState } from "react";
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
    type: "content"
  },
  {
    id: 4,
    title: "Let's Start Trading!",
    explanation:
      "You're about to start with $1,000 in virtual money. Trade 3 companies and see if you can make a profit. Good luck!",
    emoji: "🎯",
    ninoMessage: "You've got this! Let's go to the trading game!",
    type: "end"
  },
];

export default function StoryIntro({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;
  const isFirst = currentSlide === 0;

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
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
  );
}
