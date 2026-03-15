import { useState } from "react";
import StoryIntro from "./StoryIntro.jsx";
import TradingGame from "./TradingGame.jsx";

export default function StockSimulator() {
  const [currentSection, setCurrentSection] = useState("story");
  const [storyComplete, setStoryComplete] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Stock Market Simulator
          </h1>

          <p className="text-gray-500 text-lg">Learn by Investing</p>
        </div>

        {/* Section Navigation */}
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <button
            onClick={() => setCurrentSection("story")}
            className={`px-6 py-2 rounded-full font-medium transition
            ${
              currentSection === "story"
                ? "bg-blue-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }`}
          >
            📖 Story
          </button>

          <button
            onClick={() => setCurrentSection("game")}
            disabled={!storyComplete}
            className={`px-6 py-2 rounded-full font-medium transition
            ${
              currentSection === "game"
                ? "bg-purple-600 text-white"
                : "border border-gray-300 hover:bg-gray-100"
            }
            ${!storyComplete && "opacity-40 cursor-not-allowed"}
            `}
          >
            🎮 Trading Game
          </button>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {currentSection === "story" ? (
            <StoryIntro
              onComplete={() => {
                setStoryComplete(true);
                setCurrentSection("game");
              }}
            />
          ) : (
            <TradingGame />
          )}
        </div>
      </div>
    </main>
  );
}
