import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { getIcon } from '../utils/iconUtils';

// Quiz data by category
const quizData = {
  friends: {
    name: "Friends",
    icon: "coffee",
    themeClass: "friends-theme",
    color: "bg-friends-primary",
    textColor: "text-friends-primary",
    borderColor: "border-friends-primary",
    questions: [
      {
        id: 1,
        question: "What is the name of Ross's second wife?",
        options: ["Emily", "Carol", "Susan", "Janice"],
        correctAnswer: "Emily"
      },
      {
        id: 2,
        question: "What is Joey's catchphrase?",
        options: ["We were on a break!", "How you doin'?", "Could I BE any more...", "Oh my God!"],
        correctAnswer: "How you doin'?"
      },
      {
        id: 3,
        question: "What is Chandler's job?",
        options: ["Paleontologist", "Chef", "IT Procurement Manager", "Statistical Analysis and Data Reconfiguration"],
        correctAnswer: "Statistical Analysis and Data Reconfiguration"
      },
      {
        id: 4,
        question: "Which character says the last line in the series finale?",
        options: ["Ross", "Rachel", "Chandler", "Monica"],
        correctAnswer: "Chandler"
      },
      {
        id: 5,
        question: "What is the name of Phoebe's twin sister?",
        options: ["Ursula", "Regina", "Valerie", "Cheryl"],
        correctAnswer: "Ursula"
      },
      {
        id: 6,
        question: "What is the name of Ross and Monica's dog when they were growing up?",
        options: ["Rover", "Chi-Chi", "Marcel", "LaPooh"],
        correctAnswer: "Chi-Chi"
      },
      {
        id: 7,
        question: "What's the name of the coffee shop where the friends always hang out?",
        options: ["Central Brew", "Coffee Town", "Central Perk", "Daily Grind"],
        correctAnswer: "Central Perk"
      },
      {
        id: 8,
        question: "What instrument does Phoebe play?",
        options: ["Guitar", "Drums", "Keyboard", "Tambourine"],
        correctAnswer: "Guitar"
      },
      {
        id: 9,
        question: "How many times did Ross get divorced?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3"
      },
      {
        id: 10,
        question: "What's the name of Joey's penguin?",
        options: ["Hugsy", "Waddles", "Snowflake", "Chilly"],
        correctAnswer: "Hugsy"
      },
      {
        id: 11,
        question: "What is Monica's biggest pet peeve?",
        options: ["Dirty dishes", "Animals", "People touching her hair", "Messy rooms"],
        correctAnswer: "Animals"
      },
      {
        id: 12,
        question: "What does Rachel make for dessert on Thanksgiving that gets mixed up with a traditional English trifle?",
        options: ["Shepherd's Pie", "Cottage Pie", "Beef Wellington", "Custard Pie"],
        correctAnswer: "Shepherd's Pie"
      }
    ]
  },
  modernfamily: {
    name: "Modern Family",
    icon: "home",
    themeClass: "modernfamily-theme",
    color: "bg-modernfamily-primary",
    textColor: "text-modernfamily-primary",
    borderColor: "border-modernfamily-primary",
    questions: [
      {
        id: 1,
        question: "What is the profession of Phil Dunphy?",
        options: ["Lawyer", "Real Estate Agent", "Engineer", "Teacher"],
        correctAnswer: "Real Estate Agent"
      },
      {
        id: 2,
        question: "In which country was Gloria born?",
        options: ["Mexico", "Brazil", "Colombia", "Venezuela"],
        correctAnswer: "Colombia"
      },
      {
        id: 3,
        question: "What is Jay's business?",
        options: ["Restaurants", "Car Dealerships", "Closets", "Real Estate"],
        correctAnswer: "Closets"
      },
      {
        id: 4,
        question: "What is the name of Cam and Mitchell's daughter?",
        options: ["Lily", "Lucy", "Daisy", "Rose"],
        correctAnswer: "Lily"
      },
      {
        id: 5,
        question: "What is Manny's full first name?",
        options: ["Manuel", "Manfred", "Manuelo", "Manolo"],
        correctAnswer: "Manuel"
      },
      {
        id: 6,
        question: "Which university did Haley get accepted to, but then got kicked out of?",
        options: ["UCLA", "USC", "Stanford", "Berkeley"],
        correctAnswer: "UCLA"
      },
      {
        id: 7,
        question: "What is the name of the family dog?",
        options: ["Stella", "Bruno", "Rex", "Lola"],
        correctAnswer: "Stella"
      },
      {
        id: 8,
        question: "What instrument does Luke play?",
        options: ["Guitar", "Piano", "Drums", "Trumpet"],
        correctAnswer: "Trumpet"
      },
      {
        id: 9,
        question: "What is Claire's maiden name?",
        options: ["Pritchett", "Tucker", "Johnson", "Delgado"],
        correctAnswer: "Pritchett"
      },
      {
        id: 10,
        question: "What was Cameron's job before becoming a teacher?",
        options: ["Clown", "Football Coach", "Chef", "Music Teacher"],
        correctAnswer: "Music Teacher"
      },
      {
        id: 11,
        question: "What is the name of Phil's real estate rival?",
        options: ["Gil Thorpe", "Bill Harper", "Ted Johnson", "Rick Stevens"],
        correctAnswer: "Gil Thorpe"
      },
      {
        id: 12,
        question: "What is the name of the Dunphy's next-door neighbor?",
        options: ["Walt", "Jerry", "Larry", "Gary"],
        correctAnswer: "Walt"
      }
    ]
  },
  harrypotter: {
    name: "Harry Potter",
    icon: "zap",
    themeClass: "harrypotter-theme",
    color: "bg-harrypotter-primary",
    textColor: "text-harrypotter-primary",
    borderColor: "border-harrypotter-primary",
    questions: [
      {
        id: 1,
        question: "What is Harry Potter's Patronus?",
        options: ["Stag", "Doe", "Wolf", "Otter"],
        correctAnswer: "Stag"
      },
      {
        id: 2,
        question: "Which Hogwarts house does Hermione Granger belong to?",
        options: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
        correctAnswer: "Gryffindor"
      },
      {
        id: 3,
        question: "What is the core of Harry Potter's wand?",
        options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
        correctAnswer: "Phoenix Feather"
      },
      {
        id: 4,
        question: "Who killed Dobby the house-elf?",
        options: ["Bellatrix Lestrange", "Lucius Malfoy", "Voldemort", "Peter Pettigrew"],
        correctAnswer: "Bellatrix Lestrange"
      },
      {
        id: 5,
        question: "What position does Harry Potter play in Quidditch?",
        options: ["Keeper", "Chaser", "Beater", "Seeker"],
        correctAnswer: "Seeker"
      },
      {
        id: 6,
        question: "Which of these is NOT a Deathly Hallow?",
        options: ["Elder Wand", "Invisibility Cloak", "Resurrection Stone", "Time-Turner"],
        correctAnswer: "Time-Turner"
      },
      {
        id: 7,
        question: "What is the name of Harry Potter's owl?",
        options: ["Errol", "Hedwig", "Hermes", "Pigwidgeon"],
        correctAnswer: "Hedwig"
      },
      {
        id: 8,
        question: "What is the full name of Professor Dumbledore?",
        options: [
          "Albus Percival Wulfric Brian Dumbledore",
          "Albus Wulfric Percival Brian Dumbledore",
          "Albus Brian Wulfric Percival Dumbledore",
          "Albus Percival Brian Wulfric Dumbledore"
        ],
        correctAnswer: "Albus Percival Wulfric Brian Dumbledore"
      },
      {
        id: 9,
        question: "What is the name of Hagrid's pet spider?",
        options: ["Aragog", "Mosag", "Norbert", "Fluffy"],
        correctAnswer: "Aragog"
      },
      {
        id: 10,
        question: "What memory does Harry use to conjure his Patronus during his O.W.L. exams?",
        options: [
          "Winning the Quidditch Cup",
          "It wasn't specified in the book",
          "When Gryffindor won the House Cup",
          "When he first rode a broom"
        ],
        correctAnswer: "It wasn't specified in the book"
      },
      {
        id: 11,
        question: "What is the name of the wizard prison?",
        options: ["Nurmengard", "Azkaban", "Gringotts", "Durmstrang"],
        correctAnswer: "Azkaban"
      },
      {
        id: 12,
        question: "Which is NOT one of the Unforgivable Curses?",
        options: ["Imperius Curse", "Cruciatus Curse", "Killing Curse", "Sectumsempra"],
        correctAnswer: "Sectumsempra"
      }
    ]
  }
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Confetti Component for correct answers
const Confetti = ({ isActive }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (!isActive) return;
    
    // Create particles for the confetti effect
    const colors = ['#FFC700', '#FF0058', '#2E7DAF', '#43A047', '#8E24AA'];
    const newParticles = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40 - 50,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
      });
    }
    
    setParticles(newParticles);
    
    // Clean up particles after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [isActive]);
  
  if (!isActive || particles.length === 0) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            top: '40%',
            left: `${particle.x}%`,
          }}
          initial={{ y: particle.y, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight,
            opacity: 0,
            rotate: particle.rotation,
          }}
          transition={{ duration: 2, delay: particle.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const MainFeature = ({ onBackToWelcome }) => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  
  // Get icons
  const BackIcon = getIcon('arrow-left');
  const CheckIcon = getIcon('check-circle');
  const XIcon = getIcon('x-circle');
  const TrophyIcon = getIcon('trophy');
  const CoffeeIcon = getIcon('coffee');
  const HomeIcon = getIcon('home');
  const ZapIcon = getIcon('zap');
  
  // New state for tracking animation states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const resetAnimationStates = useCallback(() => {
    setIsCorrect(false);
    setIsWrong(false);
    setShowConfetti(false);
  }, []);
  
  // Set up category icons mapping
  const categoryIcons = {
    friends: CoffeeIcon,
    modernfamily: HomeIcon,
    harrypotter: ZapIcon
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    const allQuestions = quizData[category].questions;
    const selectedQuestions = shuffleArray(allQuestions).slice(0, 10);
    
    setSelectedCategory(category);
    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    resetAnimationStates();
    setGameEnded(false);
  };
  
  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return; // Prevent changing answer after selection
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    if (answer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      toast.success('Correct answer!');
      setIsCorrect(true);
      setShowConfetti(true);
    } else {
      setIsWrong(true);
      toast.error(`Incorrect! Correct answer: ${currentQuestion.correctAnswer}`);
    }
    
    // Schedule animation reset
    setTimeout(() => {
      setIsCorrect(false);
      setIsWrong(false);
      setShowConfetti(false);
    }, 2000);
    
    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setGameEnded(true);
      }
    }, 2000);
  };
  
  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    resetAnimationStates();
    setGameEnded(false);
    
    // Shuffle questions
    const allQuestions = quizData[selectedCategory].questions;
    const newQuestions = shuffleArray(allQuestions).slice(0, 10);
    setQuizQuestions(newQuestions);
  };
  
  // Go back to category selection
  const goBackToCategories = () => {
    setSelectedCategory(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameEnded(false);
  };
  
  // Get current question data
  const getCurrentQuestion = () => {
    return quizQuestions[currentQuestionIndex];
  };
  
  // Get category data
  const getCategoryData = () => {
    return quizData[selectedCategory];
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Confetti effect for correct answers */}
      <Confetti isActive={showConfetti} />
      
      <button
        onClick={onBackToWelcome}
        className="mb-6 flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        <BackIcon className="h-5 w-5 mr-1" />
        <span>Back to Welcome</span>
      </button>
      
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // Category Selection Screen
          <motion.div
            key="category-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Choose a Category</h2>
              <p className="text-surface-600 dark:text-surface-300">
                Select your favorite show or movie to begin the quiz!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(quizData).map((category) => {
                const CategoryIcon = categoryIcons[category];
                
                return (
                  <motion.div
                    key={category}
                    className={`${quizData[category].themeClass} rounded-2xl p-6 shadow-neu-light dark:shadow-neu-dark cursor-pointer hover:scale-105 transition-transform duration-200`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className={`w-20 h-20 rounded-full ${quizData[category].color} flex items-center justify-center mb-4`}>
                        <CategoryIcon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${quizData[category].textColor}`}>
                        {quizData[category].name}
                      </h3>
                      <p className="text-sm text-surface-600 dark:text-surface-300 text-center">
                        Test your knowledge of {quizData[category].name}!
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : !gameEnded ? (
          // Quiz Screen
          <motion.div
            key="quiz-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/90 dark:bg-surface-800/90 rounded-2xl p-6 md:p-8 shadow-card ${getCategoryData().themeClass}`}
          >
            {/* Quiz Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${getCategoryData().color} flex items-center justify-center mr-3`}>
                  {categoryIcons[selectedCategory] && 
                    React.createElement(categoryIcons[selectedCategory], { className: "h-5 w-5 text-white" })}
                </div>
                <h3 className="text-xl font-bold">{getCategoryData().name}</h3>
              </div>
              <div className="bg-surface-100 dark:bg-surface-700 rounded-full px-4 py-1 text-sm font-medium">
                Question {currentQuestionIndex + 1}/{quizQuestions.length}
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-6">
              <motion.div
                className={`h-2 rounded-full ${getCategoryData().color}`}
                initial={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>
            
            {/* Question */}
            {getCurrentQuestion() && (
              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-6">
                  {getCurrentQuestion().question}
                </h4>
                
                {/* Answer Options */}
                <div className="space-y-3">
                  {getCurrentQuestion().options.map((option, index) => (
                    <motion.div
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAnswer === option
                          ? option === getCurrentQuestion().correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30 correct-answer"
                            : "border-red-500 bg-red-50 dark:bg-red-900/30 wrong-answer"
                          : selectedAnswer && option === getCurrentQuestion().correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30 pulse-correct"
                            : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 hover:bg-surface-100 dark:hover:bg-surface-600`
                      } ${
                        (isCorrect && selectedAnswer === option && option === getCurrentQuestion().correctAnswer)
                          ? "correct-highlight"
                          : (isWrong && selectedAnswer === option)
                            ? "wrong-highlight"
                            : "border-red-500 bg-red-50 dark:bg-red-900/30"
                          : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 hover:bg-surface-100 dark:hover:bg-surface-600`
                      }`}
                      whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                      whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                            selectedAnswer === option
                              ? option === getCurrentQuestion().correctAnswer
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                              : "bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300"
                          }`}>
                            {selectedAnswer === option ? (
                              option === getCurrentQuestion().correctAnswer ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <motion.div
                                  animate={isWrong ? {
                                    rotate: [-5, 5, -5, 5, -5, 5, -5, 5, 0],
                                    transition: {
                                      duration: 0.5,
                                      ease: "easeInOut"
                                    }
                                  } : {}}
                                  ><XIcon className="h-5 w-5" />
                                </motion.div>
                              )
                            ) : (
                              String.fromCharCode(65 + index) // A, B, C, D
                            )}
                          </span>
                          <span>{option}</span>
                        </div>
                        
                        {/* Check/X icon for selected answer */}
                        {selectedAnswer === option && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            {option === getCurrentQuestion().correctAnswer ? (
                              <CheckIcon className="h-6 w-6 text-green-500" />
                            ) : (
                              <XIcon className="h-6 w-6 text-red-500" />
                            )}
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                   ))}
                </div>
                
                {/* Score Display */}
                <div className="mt-6 text-center">
                  <p className="text-surface-600 dark:text-surface-300">
                    Current Score: <span className="font-bold">{score}</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          // End Game Results Screen
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
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              className={`w-20 h-20 mx-auto rounded-full ${getCategoryData().color} flex items-center justify-center mb-6`}
            >
              <TrophyIcon className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Quiz Completed!</h2>
            
            <div className="mb-8">
              <p className="text-xl">
                Your Score: <span className="font-bold">{score}</span> out of {quizQuestions.length}
              </p>
              <p className="text-surface-600 dark:text-surface-300 mt-2">
                {score === quizQuestions.length
                  ? "Perfect! You're a true fan!"
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
                Play Again
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