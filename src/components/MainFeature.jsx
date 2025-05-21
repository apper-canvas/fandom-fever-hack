import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import { toast } from 'react-toastify';
import Confetti from 'react-confetti';
import useWindowSize from '../hooks/useWindowSize';

// --- Quiz Data ---
// Difficulty levels and points:
// Easy: 10 points
// Medium: 20 points
// Hard: 30 points
// Double points rounds: multiply by 2

const quizData = [
  {
    id: 1,
    name: "Friends",
    question: "What is the name of the coffee shop the friends hang out at?",
    options: ["Central Perk", "The Daily Grind", "Mona Lisa", "The Bean Scene"],
    correctAnswer: "Central Perk",
    difficulty: "easy",
    points: 10
  },
  {
    id: 2,
    name: "Friends",
    question: "What does Joey Tribbiani famously say?",
    options: ["How you doin'?", "Could I BE any more tired?", "We were on a break!", "Smelly Cat"],
    correctAnswer: "How you doin'?",
    difficulty: "easy",
    points: 10
  },
  {
    id: 3,
    name: "Friends",
    question: "What is Chandler Bing's job?",
    options: ["Transponster", "Statistical Analysis and Data Reconfiguration", "IT Procurement Manager", "Advertising Executive"],
    correctAnswer: "Statistical Analysis and Data Reconfiguration", // Transponster is the joke answer
    difficulty: "medium",
    points: 20
  },
  {
    id: 4,
    name: "Friends",
    question: "What is Phoebe Buffay's alter ego?",
    options: ["Regina Falange", "Monica Geller", "Smelly Cat", "Ursula Buffay"],
    correctAnswer: "Regina Falange",
    difficulty: "hard",
    points: 30
  },
  {
    id: 5,
    name: "Friends",
    question: "What is the name of Monica Geller's brother?",
    options: ["Joey", "Chandler", "Ross", "Mike"],
    correctAnswer: "Ross",
    difficulty: "easy",
    points: 10
  },
  {
    id: 6,
    name: "Friends",
    question: "What type of pet does Ross have in Season 1?",
    options: ["A cat named Smelly Cat", "A monkey named Marcel", "A duck", "A chick"],
    correctAnswer: "A monkey named Marcel",
    difficulty: "easy",
    points: 10
  },
  {
    id: 7,
    name: "Friends",
    question: "What is the name of Chandler and Monica's adopted children?",
    options: ["Jack and Erica", "Emma and Ben", "Phoebe and Joey", "Frankie and Alice"],
    correctAnswer: "Jack and Erica",
    difficulty: "medium",
    points: 20
  },
  {
    id: 8,
    name: "Friends",
    question: "Which character dated Janice the longest?",
    options: ["Ross", "Joey", "Chandler", "Monica"],
    correctAnswer: "Chandler",
    difficulty: "medium",
    points: 20
  },
  {
    id: 9,
    name: "Friends",
    question: "What phrase does Ross yell when he's angry?",
    options: ["WE WERE ON A BREAK!", "Pivot!", "How you doin'?", "Oh. My. God."],
    correctAnswer: "WE WERE ON A BREAK!",
    difficulty: "easy",
    points: 10
  },
  {
    id: 10,
    name: "Friends",
    question: "What is the name of Joey's agent?",
    options: ["Estelle", "Ursula", "Gunther", "Janice"],
    correctAnswer: "Estelle",
    difficulty: "hard",
    points: 30
  },
  {
    id: 11,
    name: "Modern Family",
    question: "What is the name of Phil and Claire Dunphy's eldest daughter?",
    options: ["Alex", "Haley", "Luke", "Manny"],
    correctAnswer: "Haley",
    difficulty: "easy",
    points: 10
  },
  {
    id: 12,
    name: "Modern Family",
    question: "What is Phil Dunphy's profession?",
    options: ["Realtor", "Stay-at-home Dad", "Magician", "Gym Teacher"],
    correctAnswer: "Realtor",
    difficulty: "easy",
    points: 10
  },
  {
    id: 13,
    name: "Modern Family",
    question: "What country is Gloria Pritchett originally from?",
    options: ["Mexico", "Colombia", "Spain", "Cuba"],
    correctAnswer: "Colombia",
    difficulty: "medium",
    points: 20
  },
  {
    id: 14,
    name: "Modern Family",
    question: "What is the name of Cameron and Mitchell's adopted daughter?",
    options: ["Lily", "Stella", "Alex", "Manny"],
    correctAnswer: "Lily",
    difficulty: "easy",
    points: 10
  },
  {
    id: 15,
    name: "Modern Family",
    question: "What is Jay Pritchett's profession?",
    options: ["Closet Magnate", "Furniture Salesman", "Car Dealer", "Restaurant Owner"],
    correctAnswer: "Closet Magnate",
    difficulty: "medium",
    points: 20
  },
  {
    id: 16,
    name: "Modern Family",
    question: "What is the name of the dog owned by Jay Pritchett?",
    options: ["Stella", "Lily", "Larry", "Butch"],
    correctAnswer: "Stella",
    difficulty: "medium",
    points: 20
  },
  {
    id: 17,
    name: "Modern Family",
    question: "What is the name of the high school rival Phil constantly tries to one-up?",
    options: ["Gil Thorpe", "Tad", "Kenneth", "Earl"],
    correctAnswer: "Gil Thorpe",
    difficulty: "hard",
    points: 30
  },
  {
    id: 18,
    name: "Modern Family",
    question: "What instrument does Luke Dunphy learn to play?",
    options: ["Guitar", "Drums", "Trombone", "Saxophone"],
    correctAnswer: "Trombone",
    difficulty: "hard",
    points: 30
  },
  {
    id: 19,
    name: "Modern Family",
    question: "What nickname does Phil often use for Claire?",
    options: ["Honey", "Claire-bear", "Sweetheart", "Pookey"],
    correctAnswer: "Claire-bear",
    difficulty: "easy",
    points: 10
  },
  {
    id: 20,
    name: "Modern Family",
    question: "What holiday is Cameron obsessed with?",
    options: ["Christmas", "Halloween", "Thanksgiving", "Easter"],
    correctAnswer: "Halloween",
    difficulty: "medium",
    points: 20
  },
  {
    id: 21,
    name: "Harry Potter",
    question: "What is the name of the street where the Dursleys live?",
    options: ["Privet Drive", "Diagon Alley", "Knockturn Alley", "Grimmauld Place"],
    correctAnswer: "Privet Drive",
    difficulty: "easy",
    points: 10
  },
  {
    id: 22,
    name: "Harry Potter",
    question: "What is the core of Harry Potter's wand?",
    options: ["Unicorn Hair", "Phoenix Feather", "Dragon Heartstring", "Veela Hair"],
    correctAnswer: "Phoenix Feather",
    difficulty: "easy",
    points: 10
  },
  {
    id: 23,
    name: "Harry Potter",
    question: "What is the name of the Hogwarts headmaster?",
    options: ["Severus Snape", "Minerva McGonagall", "Albus Dumbledore", "Lord Voldemort"],
    correctAnswer: "Albus Dumbledore",
    difficulty: "easy",
    points: 10
  },
  {
    id: 24,
    name: "Harry Potter",
    question: "What is the name of the house elf that served the Malfoy family?",
    options: ["Kreacher", "Winky", "Dobby", "Hokey"],
    correctAnswer: "Dobby",
    difficulty: "medium",
    points: 20
  },
  {
    id: 25,
    name: "Harry Potter",
    question: "What is the name of Hagrid's half-brother giant?",
    options: ["Grawp", "Fang", "Norbert", "Aragog"],
    correctAnswer: "Grawp",
    difficulty: "hard",
    points: 30
  },
  {
    id: 26,
    name: "Harry Potter",
    question: "What creature guards the entrance to the Common Room of Gryffindor?",
    options: ["The Fat Lady", "The Grey Lady", "The Bloody Baron", "Nearly Headless Nick"],
    correctAnswer: "The Fat Lady",
    difficulty: "easy",
    points: 10
  },
  {
    id: 27,
    name: "Harry Potter",
    question: "What is the charm used to produce light from the tip of a wand?",
    options: ["Alohomora", "Lumos", "Nox", "Wingardium Leviosa"],
    correctAnswer: "Lumos",
    difficulty: "easy",
    points: 10
  },
  {
    id: 28,
    name: "Harry Potter",
    question: "What object serves as a Portkey to the Quidditch World Cup?",
    options: ["An old boot", "A rusty key", "A deflated football", "A newspaper"],
    correctAnswer: "An old boot",
    difficulty: "medium",
    points: 20
  },
  {
    id: 29,
    name: "Harry Potter",
    question: "What is the name of the potion that allows the drinker to change their appearance?",
    options: ["Polyjuice Potion", "Felix Felicis", "Amortentia", "Veritaserum"],
    correctAnswer: "Polyjuice Potion",
    difficulty: "medium",
    points: 20
  },
  {
    id: 30,
    name: "Harry Potter",
    question: "What magical object does Alastor 'Mad-Eye' Moody use to detect things?",
    options: ["A Sneakoscope", "A Foe-Glass", "A Deluminator", "His magical eye"],
    correctAnswer: "His magical eye", // While he has others, his magical eye is the primary means he uses
    difficulty: "hard",
    points: 30
  }
];

// --- Helper Functions ---
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

// --- Component ---
const MainFeature = ({ onBackToWelcome }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); // State to manage which category is chosen first
  const [selectedLevel, setSelectedLevel] = useState(null); // New state for level
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // null: not answered, true: correct, false: wrong
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentRound, setCurrentRound] = useState({
    round: 1,
    isDoublePoints: false
  });

  const { width, height } = useWindowSize();

  // Category data mapping for dynamic styling and icons
  const categoryData = useMemo(() => ({
    Friends: {
      icon: "Sparkles",
      color: "bg-friends-primary",
      themeClass: "friends-theme",
      points: { easy: 10, medium: 20, hard: 30 }
    },
    "Modern Family": {
      icon: "Home",
      color: "bg-modernfamily-primary",
      themeClass: "modernfamily-theme",
      points: { easy: 10, medium: 20, hard: 30 }
    },
    "Harry Potter": {
      icon: "Star",
      color: "bg-harrypotter-primary",
      themeClass: "harrypotter-theme",
      points: { easy: 10, medium: 20, hard: 30 }
    },
  }), []);

  const difficultyColors = {
    easy: "text-green-600 dark:text-green-400",
    medium: "text-yellow-600 dark:text-yellow-400",
    hard: "text-red-600 dark:text-red-400",
  };

  const getCategoryData = () => categoryData[selectedCategory] || {};

  const getCurrentQuestion = () => quizQuestions[currentQuestionIndex];

  // Effect to determine double point rounds (e.g., every 5th question)
  useEffect(() => {
    if (quizQuestions.length > 0 && currentQuestionIndex < quizQuestions.length) {
      const isDouble = (currentQuestionIndex + 1) % 5 === 0; // Example: every 5th question
      setCurrentRound({
        round: currentQuestionIndex + 1,
        isDoublePoints: isDouble
      });
      if (isDouble) {
        toast.info(`Round ${currentRound.round}: Double Points!`, { autoClose: 2000 });
      }
    }
  }, [currentQuestionIndex, quizQuestions.length]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedLevel(null); // Reset level when category changes
    // Reset quiz state when category changes
    setQuizQuestions([]); // Clear previous questions
    setCurrentQuestionIndex(0);
    setScore(0);
    setPoints(0);
    setGameEnded(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCurrentRound({ round: 1, isDoublePoints: false });
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    const filteredQuestions = quizData.filter(q =>
      q.name === selectedCategory && q.difficulty === level.toLowerCase()
    );
    if (filteredQuestions.length > 0) {
      setQuizQuestions(shuffleArray(filteredQuestions));
      setCurrentQuestionIndex(0);
      setScore(0);
      setPoints(0);
      setQuizQuestions(shuffleArray(filteredQuestions).slice(0, 10)); // Take first 10, adjust as needed
      setCurrentQuestionIndex(0);
      setScore(0);
      setPoints(0);
      setGameEnded(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
      setCurrentRound({ round: 1, isDoublePoints: false }); // Reset round logic
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return; // Prevent selecting again

    setSelectedAnswer(answer);
    const question = getCurrentQuestion();
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(prevScore => prevScore + 1);
      const basePoints = categoryData[selectedCategory]?.points[question.difficulty] || 10;
      setPoints(prevPoints => prevPoints + (currentRound.isDoublePoints ? basePoints * 2 : basePoints));
      toast.success('Correct!', { autoClose: 1000, hideProgressBar: true });
    } else {
      toast.error('Wrong!', { autoClose: 1000, hideProgressBar: true });
    }

    // Move to the next question after a delay
    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);
      setIsCorrect(null);

      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setGameEnded(true);
        toast.info('Quiz Finished!', { autoClose: 3000 });
      }
    }, 1500); // Delay before moving to next question/end
  };

  const restartQuiz = () => {
    const filteredQuestions = quizData.filter(q =>
      q.name === selectedCategory && q.difficulty === selectedLevel.toLowerCase()
    );
    setQuizQuestions(shuffleArray(filteredQuestions));
    setCurrentQuestionIndex(0); // Ensure index starts at 0
    setScore(0);
    setPoints(0);
    setGameEnded(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCurrentRound({ round: 1, isDoublePoints: false });
    toast.info('Quiz restarted!', { autoClose: 2000 });
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedLevel(null); // Reset level
    setQuizQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setPoints(0);
    setGameEnded(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setCurrentRound({ round: 1, isDoublePoints: false });
  };

  const handleBack = () => {
    if (gameEnded) {
      // From Results screen, go back to Category Select
      goBackToCategories();
    } else if (selectedLevel) {
      // From Quiz screen, go back to Level Select
      setSelectedLevel(null);
      setQuizQuestions([]); // Clear questions
      setCurrentQuestionIndex(0);
      setScore(0);
      setPoints(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowFeedback(false);
      setCurrentRound({ round: 1, isDoublePoints: false });
    } else if (selectedCategory) {
      // From Level Select screen, go back to Category Select
      setSelectedCategory(null);
      setSelectedLevel(null);
    } else {
      // From Category Select screen, go back to Welcome
      onBackToWelcome();
    }
  };

  const categories = useMemo(() => [...new Set(quizData.map(q => q.name))], []);

  const currentQuestion = getCurrentQuestion();
  const isWrong = selectedAnswer !== null && selectedAnswer !== currentQuestion?.correctAnswer;

  // Category data mapping for dynamic styling and icons
  const categoryData = useMemo(() => ({
    Friends: { icon: "Sparkles", color: "bg-friends-primary", themeClass: "friends-theme", points: { easy: 10, medium: 20, hard: 30 } },
    "Modern Family": { icon: "Home", color: "bg-modernfamily-primary", themeClass: "modernfamily-theme", points: { easy: 10, medium: 20, hard: 30 } },
    "Harry Potter": { icon: "Star", color: "bg-harrypotter-primary", themeClass: "harrypotter-theme", points: { easy: 10, medium: 20, hard: 30 } },
  }), []);

  const getCategoryData = () => categoryData[selectedCategory] || {};

  const CheckIcon = getIcon('CheckCircle');
  const XIcon = getIcon('XCircle');
  const TrophyIcon = getIcon('Trophy');
  const ArrowLeftIcon = getIcon('ArrowLeft');

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4 relative">
      {gameEnded && score === quizQuestions.length && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />
      )}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-10 p-2 rounded-full bg-surface-200/80 dark:bg-surface-700/80 backdrop-blur-sm text-surface-800 dark:text-surface-100 hover:bg-surface-300 dark:hover:bg-surface-600 transition-colors"
        aria-label="Go Back"
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>

      <AnimatePresence mode="wait">
        {!selectedCategory ? ( // State 1: Category Selection
          <motion.div
            key="category-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 fun-title">Choose a Fandom</h2>
            <div className="grid grid-cols-1 gap-4">
              {categories.map((category) => {
                const catData = categoryData[category] || {};
                const IconComponent = getIcon(catData.icon);
                return (
                  <motion.button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`btn p-4 text-left rounded-xl border-2 border-transparent bg-white dark:bg-surface-800 shadow-card hover:border-${catData.color.replace('bg-', '').replace('-primary', '')}-primary hover:shadow-lg transition-all duration-200 flex items-center gap-4`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {IconComponent && (
                      <div className={`w-10 h-10 rounded-full ${catData.color} flex items-center justify-center text-white flex-shrink-0`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                    )}
                    <span className="text-lg font-semibold flex-grow fun-text">{category}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ) : !selectedLevel ? ( // State 2: Level Selection (After Category)
          <motion.div
            key="level-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-md text-center ${getCategoryData().themeClass} rounded-2xl p-6 md:p-8 shadow-card`}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6 fun-title">Choose Your Level</h2>
            <div className="flex flex-col gap-4">
              {["Easy", "Medium", "Hard"].map(level => (
                <motion.button
                  key={level}
                  onClick={() => handleLevelSelect(level)}
                  className={`btn py-3 px-6 rounded-xl border-2 border-transparent bg-white dark:bg-surface-800 shadow-card hover:border-${getCategoryData().color.replace('bg-', '').replace('-primary', '')}-primary hover:shadow-lg transition-all duration-200 font-semibold`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {level}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : !gameEnded && currentQuestion ? ( // Screen 3: Quiz Game
          <motion.div
            key="quiz-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          </motion.div> // Corrected closing tag
            transition={{ duration: 0.3 }}
            className={`w-full max-w-2xl card ${getCategoryData().themeClass}`}
          >
            <div className="flex justify-between items-center mb-4 text-surface-600 dark:text-surface-300 font-semibold">
              <span>Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
              <span className={difficultyColors[currentQuestion.difficulty || 'medium']}>
                {currentQuestion.difficulty?.toUpperCase()} ({currentQuestion.points && `${currentRound.isDoublePoints ? currentQuestion.points * 2 : currentQuestion.points} pts`})
              </span>
            </div>

            {/* progress bar */}
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-6">
              <motion.div
                className={`h-2 rounded-full ${getCategoryData().color}`}
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + (selectedAnswer !== null ? 0.5 : 0)) / quizQuestions.length) * 100}%` }}
                transition={{ duration: selectedAnswer !== null ? 0.5 : 0.3 }}
              ></motion.div>
            </div>

            <h3 className="text-xl font-semibold mb-6 question-text">{currentQuestion.question}</h3>

            <div className="flex flex-col gap-4">
              {shuffleArray([...currentQuestion.options]).map((option, index) => {
                const isCorrectOption = option === currentQuestion.correctAnswer;
                const isSelected = selectedAnswer === option;
                const highlightClass = selectedAnswer !== null
                  ? (isCorrectOption ? "border-green-500 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 correct-answer"
                    : (isSelected ? "border-red-500 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 wrong-answer"
                      : "opacity-50 pointer-events-none border-surface-300 dark:border-surface-600"))
                  : "border-surface-300 dark:border-surface-600 hover:border-primary-light dark:hover:border-primary-dark hover:bg-surface-100 dark:hover:bg-surface-700";

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${highlightClass} ${selectedAnswer === option && isWrong ? "wrong-highlight" : ""}`}
                    whileHover={selectedAnswer === null ? { scale: 1.02 } : {}} // Only scale on hover if no answer is selected
                    whileTap={selectedAnswer === null ? { scale: 0.98 } : {}} // Only scale on tap if no answer is selected
                    disabled={selectedAnswer !== null} // Disable clicking after selection
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-grow fun-text">{option}</span>
                      {selectedAnswer !== null ? (
                        option === currentQuestion.correctAnswer ? (
                          <CheckIcon className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                        ) : selectedAnswer === option ? (
                          <motion.div
                            animate={isWrong ? { // Only animate X if the selected answer was wrong
                              x: [-5, 5, -5, 5, 0], // Shake animation
                              transition: { duration: 0.4 }
                            } : {}}
                            className="ml-2 flex-shrink-0"
                          >
                            <XIcon className="h-5 w-5 text-red-500" />
                          </motion.div>
                        ) : null // No icon for unselected wrong answers
                      ) : null} {/* No icon if no answer is selected yet */}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="mt-6 text-center text-surface-800 dark:text-surface-100"
              >
                {isCorrect ? (
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">Correct!</p>
                ) : (
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    Wrong! The correct answer was: <span className="font-bold">{currentQuestion.correctAnswer}</span>
                  </p>
                )}
                {selectedAnswer !== null && isCorrect && (
                  <span className={`text-sm font-semibold ${difficultyColors[getCurrentQuestion().difficulty || 'medium']}`}>
                    {getCurrentQuestion().points && `+${currentRound.isDoublePoints ? getCurrentQuestion().points * 2 : getCurrentQuestion().points} pts`}
                  </span>
                )}
              </motion.div>
            )}

            <div className="mt-6 flex justify-between items-center">
              <div className="text-surface-600 dark:text-surface-300 text-sm">
                <p>
                  Score: <span className="font-bold">{score}</span> / {quizQuestions.length}
                </p>
                <p>
                  Total Points: <span className="font-bold">{points}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ) : ( // Screen 4: End Game Results Screen
          <motion.div
            key="results-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/90 dark:bg-surface-800/90 rounded-2xl p-6 md:p-8 shadow-card text-center ${getCategoryData().themeClass}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              className={`w-20 h-20 mx-auto rounded-full ${getCategoryData().color} flex items-center justify-center mb-6`}
            >
              <TrophyIcon className="h-10 w-10 text-white" />
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 fun-title">Quiz Completed!</h2>

            <div className="mb-8 fun-text">
              <p className="text-xl">
                Your Score: <span className="font-bold">{score}</span> out of {quizQuestions.length}
              </p>
              <p className="text-xl mt-2">
                Total Points: <span className="font-bold">{points}</span>
              </p>
              <p className="text-surface-600 dark:text-surface-300 mt-2">
                {score === quizQuestions.length
                  ? "Perfect! You're a true fan!"
                  : score >= quizQuestions.length * 0.9
                    ? "Outstanding! A real expert!"
                    : score >= quizQuestions.length * 0.7
                      ? "Great job! You really know your stuff!"
                      : score >= quizQuestions.length * 0.5
                        ? "Good effort! You know quite a bit!"
                        : "Keep practicing to improve your score!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={restartQuiz}
                className={`btn py-3 px-6 rounded-xl ${getCategoryData().color} text-white font-semibold`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again ({getCategoryData().name} - {selectedLevel ? selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1) : 'Selected Level'}) {/* Show level name */}
              </motion.button>

              <motion.button
                onClick={goBackToCategories}
                className="btn py-3 px-6 rounded-xl bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-100 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Another Category
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;