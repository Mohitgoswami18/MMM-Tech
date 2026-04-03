import { Link } from "react-router-dom";
import hi from "../assets/mascot/hi.png";
import thinking from "../assets/mascot/thinking.png";
import otherwise from "../assets/mascot/otherwise.png";
import Navbar from "../components/Navbar";
import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowLeft, RotateCcw } from "lucide-react";
import badge from "../assets/images/badge-star.jpg";
import needsvswants from "../assets/images/needs-vs-wants.jpg";
import saveModuleProgress from "../utils/progress";

const DRAG_ITEMS = [
  { id: "food", emoji: "\uD83C\uDF4E", label: "Food", answer: "need" },
  { id: "medicine", emoji: "\uD83D\uDC8A", label: "Medicine", answer: "need" },
  {
    id: "schoolbook",
    emoji: "\uD83D\uDCDA",
    label: "School Book",
    answer: "need",
  },
  { id: "toy", emoji: "\uD83E\uDDF8", label: "Toy", answer: "want" },
  { id: "icecream", emoji: "\uD83C\uDF66", label: "Ice Cream", answer: "want" },
  {
    id: "videogame",
    emoji: "\uD83C\uDFAE",
    label: "Video Game",
    answer: "want",
  },
];

const QUIZ_QUESTIONS = [
  {
    question: "Which of these is a NEED?",
    options: ["Video Game", "Candy", "Water", "Skateboard"],
    correctIndex: 2,
  },
  {
    question: "Which of these is a WANT?",
    options: ["Medicine", "Toy Robot", "Warm Clothes", "Healthy Food"],
    correctIndex: 1,
  },
  {
    question:
      "Why is it important to know the difference between needs and wants?",
    options: [
      "So you can buy everything",
      "To help spend money wisely",
      "To never buy anything fun",
      "Because adults said so",
    ],
    correctIndex: 1,
  },
  {
    question: "Which is an example of a need for school?",
    options: ["Stickers", "Notebook", "Trading Cards", "Comic Book"],
    correctIndex: 1,
  },
  {
    question: "If you only have $10, what should you buy first?",
    options: ["A toy", "Lunch for school", "A video game", "Candy"],
    correctIndex: 1,
  },
];

function DragDropGame({ onGameComplete }) {
  const [remaining, setRemaining] = useState([...DRAG_ITEMS]);
  const [needBox, setNeedBox] = useState([]);
  const [wantBox, setWantBox] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [gameComplete, setGameComplete] = useState(false);

  const handleDrop = useCallback(
    (box) => {
      if (!draggedItem) return;
      const item = remaining.find((i) => i.id === draggedItem);
      if (!item) return;

      const isCorrect = item.answer === box;

      if (isCorrect) {
        setScore((s) => s + 1);
        setFeedback({ message: "Awesome! You got it right!", correct: true });
        const newRemaining = remaining.filter((i) => i.id !== item.id);
        setRemaining(newRemaining);
        if (box === "need") {
          setNeedBox((prev) => [...prev, item]);
        } else {
          setWantBox((prev) => [...prev, item]);
        }
        if (newRemaining.length === 0) {
          setTimeout(() => {
            setGameComplete(true);
            onGameComplete(); // 🔥 notify parent
          }, 800);
        }
      } else {
        setFeedback({ message: "Oops! Try again!", correct: false });
      }

      setDraggedItem(null);
      setTimeout(() => setFeedback(null), 1500);
    },
    [draggedItem, remaining],
  );

  const resetGame = () => {
    setRemaining([...DRAG_ITEMS]);
    setNeedBox([]);
    setWantBox([]);
    setScore(0);
    setFeedback(null);
    setGameComplete(false);
  };

  // Touch drag state
  const [touchItem, setTouchItem] = useState(null);

  const handleTouchDrop = useCallback(
    (box) => {
      if (!touchItem) return;
      const item = remaining.find((i) => i.id === touchItem);
      if (!item) return;

      const isCorrect = item.answer === box;

      if (isCorrect) {
        setScore((s) => s + 1);
        setFeedback({ message: "Awesome! You got it right!", correct: true });
        const newRemaining = remaining.filter((i) => i.id !== item.id);
        setRemaining(newRemaining);
        if (box === "need") {
          setNeedBox((prev) => [...prev, item]);
        } else {
          setWantBox((prev) => [...prev, item]);
        }
        if (newRemaining.length === 0) {
          setTimeout(() => setGameComplete(true), 800);
        }
      } else {
        setFeedback({ message: "Oops! Try again!", correct: false });
      }

      setTouchItem(null);
      setTimeout(() => setFeedback(null), 1500);
    },
    [touchItem, remaining],
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Score Bar */}
      <div className="flex items-center justify-between rounded-2xl bg-linear-to-r from-[#EFF6FF] to-[#F5F3FF] p-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{"\u2B50"}</span>
          <span className="text-lg font-extrabold text-foreground">
            Score: {score} / {DRAG_ITEMS.length}
          </span>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-[#ffffff] transition-all hover:scale-105"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div
          className={`animate-pop rounded-2xl p-4 text-center text-lg font-extrabold ${
            feedback.correct
              ? "bg-green-600/10 text-green-600"
              : "bg-orange-600/10 orange-600"
          }`}
        >
          {feedback.correct ? "\uD83C\uDF89" : "\uD83D\uDE05"}{" "}
          {feedback.message}
        </div>
      )}

      {gameComplete ? (
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-linear-to-br from-[#FDE047]/20 to-[#22C55E]/20 p-8 text-center">
          <div className="text-6xl">{"\uD83C\uDF89"}</div>
          <h3 className="text-2xl font-extrabold text-foreground">
            Game Complete!
          </h3>
          <p className="text-lg text-muted-foreground">
            You scored {score} out of {DRAG_ITEMS.length}! You really know your
            needs and wants!
          </p>
          <button
            onClick={resetGame}
            className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 font-bold text-[#ffffff] transition-all hover:scale-105"
          >
            Play Again
          </button>
        </div>
      ) : (
        <>
          {/* Draggable Items */}
          <div className="flex flex-col gap-2">
            <h3 className="text-center text-lg font-bold text-foreground">
              {"\uD83D\uDC47"} Drag each item to the correct box!
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {remaining.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => setDraggedItem(item.id)}
                  onTouchStart={() => setTouchItem(item.id)}
                  onClick={() => setTouchItem(item.id)}
                  className={`flex cursor-grab items-center gap-2 rounded-2xl px-5 py-3 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:cursor-grabbing active:scale-95 ${
                    touchItem === item.id
                      ? "ring-4 ring-blue-600 bg-blue-600/10 scale-105"
                      : "bg-card"
                  }`}
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <span className="text-base font-bold text-card-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* NEED box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop("need")}
              onClick={() => handleTouchDrop("need")}
              className="flex min-h-45 flex-col items-center gap-3 rounded-3xl border-4 border-dashed border-[#00796B] bg-[#00796B]/5 p-6 transition-all hover:bg-[#00796B]/10"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">{"\uD83D\uDC9A"}</span>
                <span className="text-2xl font-extrabold text-[#00796B]">
                  NEED
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Things you must have to live and stay healthy
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {needBox.map((item) => (
                  <span
                    key={item.id}
                    className="animate-pop rounded-xl bg-green-600/20 px-3 py-2 text-sm font-bold text-green-600"
                  >
                    {item.emoji} {item.label}
                  </span>
                ))}
              </div>
            </div>

            {/* WANT box */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop("want")}
              onClick={() => handleTouchDrop("want")}
              className="flex min-h-45 flex-col items-center gap-3 rounded-3xl border-4 border-dashed border-[#FFC107] bg-[#FFC107]/5 p-6 transition-all hover:bg-[#FFC107]/10"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl">{"\uD83D\uDC9C"}</span>
                <span className="text-2xl font-extrabold text-[#FFC107]">
                  WANT
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Things that are nice to have but not essential
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {wantBox.map((item) => (
                  <span
                    key={item.id}
                    className="animate-pop rounded-xl bg-[#FFC107]/20 px-3 py-2 text-sm font-bold text-[#FFC107]"
                  >
                    {item.emoji} {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile helper text */}
          <p className="text-center text-sm text-muted-foreground md:hidden">
            {"\uD83D\uDCA1"} Tip: Tap an item, then tap the NEED or WANT box to
            sort it!
          </p>
        </>
      )}
    </div>
  );
}

function NeedsVsWantsQuiz({ onQuizPass }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const [passed, setPassed] = useState(false);

  const quizPassCalled = useRef(false);

  // 🔧 Call `onQuizPass` once when the user has finished and achieved a passing score
  useEffect(() => {
    if (quizDone && score >= 3 && !quizPassCalled.current) {
      quizPassCalled.current = true;
      onQuizPass();
    }
  }, [quizDone, score, onQuizPass]);

  const handleAnswer = (index) => {
    if (selected !== null) return;

    setSelected(index);
    if (index === QUIZ_QUESTIONS[currentQ].correctIndex) {
      setScore((s) => s + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      if (currentQ < QUIZ_QUESTIONS.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setQuizDone(true);
      }
    }, 1200);
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setQuizDone(false);
    setPassed(false);
    quizPassCalled.current = false; // 🔧 allow user to re-earn pass after reset
  };

  // 🔧 Show final result screen when quiz is done, otherwise keep showing questions
  if (quizDone) {
    const didPass = score >= 3;

    return (
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-linear-to-br from-[#FDE047]/20 to-[#8B5CF6]/20 p-8 text-center">
        <div className="text-6xl">
          {didPass ? "\uD83C\uDF89" : "\uD83D\uDCAA"}
        </div>
        <h3 className="text-2xl font-extrabold text-foreground">
          {didPass
            ? "Great Job! You're a Smart Saver!"
            : "Try Again to Become a Money Hero!"}
        </h3>
        <p className="text-lg text-muted-foreground">
          You scored {score} out of {QUIZ_QUESTIONS.length}
        </p>
        <div className="flex items-center gap-3">
          {Array.from({ length: QUIZ_QUESTIONS.length }).map((_, i) => (
            <div
              key={i}
              className={`h-4 w-4 rounded-full ${
                i < score ? "bg-green-600" : "bg-orange-600/30"
              }`}
            />
          ))}
        </div>
        <button
          onClick={resetQuiz}
          className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 font-bold text-[#ffffff] transition-all hover:scale-105"
        >
          {didPass ? "Play Again" : "Try Again"}
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentQ];

  return (
    <div className="flex flex-col gap-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground">
          Question {currentQ + 1} of {QUIZ_QUESTIONS.length}
        </span>
        <span className="text-sm font-bold text-green-600">
          {"\u2B50"} Score: {score}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-[#00796B] transition-all duration-500"
          style={{
            width: `${((currentQ + 1) / QUIZ_QUESTIONS.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <h3 className="text-xl font-extrabold text-foreground">{q.question}</h3>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => {
          let btnClass =
            "w-full rounded-2xl border-2 px-6 py-4 text-left text-base font-bold transition-all duration-200";

          if (showResult) {
            if (i === q.correctIndex) {
              btnClass +=
                " border-[var(--kid-green)] bg-[var(--kid-green)]/10 text-[var(--kid-green)]";
            } else if (i === selected && i !== q.correctIndex) {
              btnClass +=
                " border-[var(--kid-orange)] bg-[var(--kid-orange)]/10 text-[var(--kid-orange)]";
            } else {
              btnClass +=
                " border-border bg-card text-muted-foreground opacity-50";
            }
          } else {
            btnClass +=
              " border-border bg-card text-card-foreground hover:border-[var(--kid-blue)] hover:bg-[var(--kid-blue)]/5 hover:scale-[1.02]";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={btnClass}
            >
              <span className="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-bold">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showResult && (
        <div
          className={`animate-pop rounded-2xl p-4 text-center text-lg font-extrabold ${
            selected === q.correctIndex
              ? "bg-green-600/10 text-green-600"
              : "bg-orange-600/10 text-orange-600"
          }`}
        >
          {selected === q.correctIndex
            ? "\uD83C\uDF89 Correct! Amazing!"
            : `\uD83D\uDE05 Not quite! The answer is: ${q.options[q.correctIndex]}`}
        </div>
      )}
    </div>
  );
}

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

export default function NeedsVsWants() {
  const [activeTab, setActiveTab] = useState("intro");
  const [gameCompleted, setGameCompleted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [progressSaved, setProgressSaved] = useState(false);

  useEffect(() => {
    if (gameCompleted && quizPassed && !progressSaved) {
      saveModuleProgress("needs-vs-wants");
      setProgressSaved(true);
    }
  }, [gameCompleted, quizPassed, progressSaved]);

  const tabs = [
    { id: "intro", label: "Learn", emoji: "\uD83D\uDCDA" },
    { id: "game", label: "Play", emoji: "\uD83C\uDFAE" },
    { id: "quiz", label: "Quiz", emoji: "\uD83E\uDDE0" },
    { id: "badge", label: "Badge", emoji: "\uD83C\uDFC6" },
  ];

  const slides = [
    {
      id: 1,
      title: "Introduction",
      emoji: "🎯",
      explanation:
        "Today, we're going on a small adventure to the market with MIMO! Along the way, we'll discover which things are NEEDS and which are WANTS. Knowing the difference helps you make smart money choices.",
      ninoMessage: "Hi there! I'm MIMO 🐻 Ready to become a money-smart hero?",
      type: "intro",
    },

    {
      id: 2,
      title: "The Hungry Morning",
      emoji: "🍳",
      explanation:
        "One morning, Aarav wakes up feeling very hungry. He needs breakfast to have energy for school. Without food, he would feel tired and weak. Food gives our body strength and keeps us healthy.",
      ninoMessage:
        "Food keeps us strong and ready to learn! That sounds important, right?",
      type: "need",
    },

    {
      id: 3,
      title: "New Video Game",
      emoji: "🎮",
      explanation:
        "After school, Aarav sees a brand new video game in the store. It looks super fun and exciting! But even if he doesn't buy it, he can still live, study, and stay healthy without it.",
      ninoMessage:
        "Games are fun, but we can live without them. That makes it a WANT!",
      type: "want",
    },

    {
      id: 4,
      title: "Rainy Day Surprise",
      emoji: "☔",
      explanation:
        "Suddenly, it starts raining heavily! Aarav needs an umbrella or raincoat to stay dry and avoid getting sick. Staying protected from weather keeps us safe and healthy.",
      ninoMessage: "Staying safe and healthy is always a NEED!",
      type: "need",
    },

    {
      id: 5,
      title: "Colorful Sneakers",
      emoji: "👟",
      explanation:
        "Aarav already has good shoes at home. But he sees colorful sneakers with flashing lights and really wants them! They look cool, but his old shoes still work perfectly fine.",
      ninoMessage:
        "If you already have something that works, the new one might just be a WANT!",
      type: "want",
    },

    {
      id: 6,
      title: "Medicine Time",
      emoji: "💊",
      explanation:
        "One evening, Aarav gets a fever. The doctor gives him medicine to help him feel better. Without medicine, he might stay sick longer.",
      ninoMessage:
        "Medicine helps us recover and stay healthy. That's definitely a NEED!",
      type: "need",
    },

    {
      id: 7,
      title: "Ice Cream Treat",
      emoji: "🍦",
      explanation:
        "On the way home, Aarav asks for ice cream. It tastes delicious and makes him happy, but skipping it won't harm his health or survival.",
      ninoMessage: "Ice cream is yummy, but it's not essential. That's a WANT!",
      type: "want",
    },

    {
      id: 8,
      title: "Final Challenge",
      emoji: "🧠",
      explanation:
        "Before we finish, remember: NEEDS help us survive and stay healthy. WANTS make life fun and exciting, but we can live without them. Now it's your turn to decide wisely!",
      ninoMessage:
        "You're doing amazing! Ready to test your smart money skills?",
      type: "end",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const slide = slides[currentSlide];
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === slides.length - 1;
  const goToNext = () => {
    if (!isLast) {
      setCurrentSlide((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const goToPrev = () => {
    if (!isFirst) {
      setCurrentSlide((prev) => prev - 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
  };

  const isCorrect = selectedAnswer === "Need";

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
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
                src={needsvswants}
                alt="Needs vs Wants cartoon illustration"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#ffffff]/20 px-3 py-1 text-sm font-bold text-[#ffffff]">
                {"\uD83C\uDFAF"} Module 1
              </div>
              <h1 className="mb-2 text-3xl font-extrabold text-[#ffffff] md:text-4xl">
                Needs vs Wants
              </h1>
              <p className="text-[#ffffff]/80">
                Learn the difference between things you NEED and things you
                WANT, then test your skills!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
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

      {/* Content Area */}
      <section className="bg-background px-4 py-6 lg:px-8 lg:py-4">
        <div className="mx-auto max-w-4xl">
          {/* INTRO TAB */}
          {activeTab === "intro" && (
            <div className="min-h-screen bg-linear-to-br from-sky-50 via-green-50 to-purple-50 p-3 md:p-4">
              <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Needs vs Wants
                  </h1>
                  <p className="text-lg text-slate-600">Learn with MIMO</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
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
                            {Math.round(
                              ((currentSlide + 1) / slides.length) * 100,
                            )}
                            %
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
                          onClick={goToPrev}
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
                            onClick={goToNext}
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
          )}

          {/* GAME TAB */}
          {activeTab === "game" && (
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl bg-card p-8 shadow-md">
                <h2 className="mb-2 text-center text-2xl font-extrabold text-foreground">
                  {"\uD83C\uDFAE"} Drag & Drop Challenge!
                </h2>
                <p className="mb-6 text-center text-muted-foreground">
                  Sort each item into the correct category. Is it a NEED or a
                  WANT?
                </p>
                <DragDropGame onGameComplete={() => setGameCompleted(true)} />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setActiveTab("quiz")}
                  className="rounded-full bg-[#00796B] px-10 py-4 text-lg font-extrabold text-[#ffffff] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  {"\uD83E\uDDE0"} Take the Quiz Next!
                </button>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {activeTab === "quiz" && (
            <div className="flex flex-col gap-8">
              <div className="rounded-3xl bg-card p-8 shadow-md">
                <h2 className="mb-2 text-center text-2xl font-extrabold text-foreground">
                  {"\uD83E\uDDE0"} Knowledge Quiz!
                </h2>
                <p className="mb-6 text-center text-muted-foreground">
                  Answer 5 questions to test what you{"'"}ve learned. Score 3 or
                  more to pass!
                </p>
                {/* 🔧 Fix prop name so quiz can notify parent when passed */}
                <NeedsVsWantsQuiz onQuizPass={() => setQuizPassed(true)} />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => setActiveTab("badge")}
                  className="rounded-full bg-[#00796B] px-10 py-4 text-lg font-extrabold text-[#FFC107] shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  {"\uD83C\uDFC6"} See Your Badge!
                </button>
              </div>
            </div>
          )}

          {/* BADGE TAB */}
          {activeTab === "badge" && (
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
      </section>
    </main>
  );
}
