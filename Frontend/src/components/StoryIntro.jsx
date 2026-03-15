import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    title: "Welcome to the Stock Market!",
    description:
      "Companies grow by getting investments from people like you. When you invest, you become a part-owner!",
    emoji: "🏢",
    mascotText: "Hi! I'm Nino! Ready to learn about investing?",
  },
  {
    title: "What is a Stock?",
    description:
      "When you buy a stock, you own a small piece of a company. If the company does well, your piece becomes more valuable!",
    emoji: "📈",
    mascotText: "A stock is like owning a tiny slice of a company pizza! 🍕",
  },
  {
    title: "Profit and Loss",
    description:
      "If the company grows and the stock price goes up, you can sell it for more money and make a profit! But prices can also go down.",
    emoji: "💰",
    mascotText: "Buy low, sell high! That's the goal!",
  },
  {
    title: "Let's Start Trading!",
    description:
      "You're about to start with $1,000 in virtual money. Trade 3 companies and see if you can make a profit. Good luck!",
    emoji: "🎯",
    mascotText: "You've got this! Let's go to the trading game!",
  },
];

export default function StoryIntro({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = SLIDES[currentSlide];
  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
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
      {/* Progress Bar */}
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between mb-3 text-sm text-gray-500">
          <span>
            Step {currentSlide + 1} of {SLIDES.length}
          </span>
          <span>{progress.toFixed(0)}%</span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Mascot */}
        <div className="flex flex-col items-center justify-center">
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 relative">
            <div className="animate-bounce flex justify-center mb-6">
              <svg viewBox="0 0 200 200" className="w-40 h-40">
                <circle cx="100" cy="100" r="60" fill="#D4A574" />
                <circle cx="70" cy="50" r="20" fill="#D4A574" />
                <circle cx="130" cy="50" r="20" fill="#D4A574" />
                <circle cx="70" cy="50" r="12" fill="#A0826D" />
                <circle cx="130" cy="50" r="12" fill="#A0826D" />
                <circle cx="80" cy="90" r="8" fill="#1F2937" />
                <circle cx="120" cy="90" r="8" fill="#1F2937" />
                <circle cx="82" cy="88" r="3" fill="white" />
                <circle cx="122" cy="88" r="3" fill="white" />
                <circle cx="100" cy="110" r="6" fill="#1F2937" />
                <ellipse cx="100" cy="125" rx="30" ry="25" fill="#E8D4B8" />
              </svg>
            </div>

            {/* Speech Bubble */}
            <div className="mt-6 bg-white rounded-xl shadow p-4 text-center border">
              {slide.mascotText}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-center">
          <div className="bg-white shadow-lg p-8 rounded-2xl border">
            <div className="text-6xl mb-6">{slide.emoji}</div>

            <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>

            <p className="text-gray-600 mb-8">{slide.description}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-2xl mx-auto items-center">
        <button
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          className="flex items-center px-6 py-2 border rounded-full disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-3 rounded-full transition-all ${
                i === currentSlide ? "bg-blue-500 w-8" : "bg-gray-300 w-3"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center px-6 py-2 rounded-full text-white bg-gradient-to-r from-blue-500 to-purple-500"
        >
          {currentSlide === SLIDES.length - 1 ? "Start Trading" : "Next"}

          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}
