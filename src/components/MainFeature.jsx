LineNumber:405:                            )} {/* Removed misplaced closing parenthesis and brace */}
LineNumber:406:                          </span> {/* Removed misplaced closing div */}
LineNumber:407:                          <span className="fun-text">{option}</span> {/* Removed misplaced closing div */}
 1252:              <motion.div
LineNumber:411:                        {selectedAnswer !== null && isCorrectOption && (
LineNumber:412:                          <span className={`text-sm font-semibold ${difficultyColors[getCurrentQuestion().difficulty || 'medium']}`}> {/* Removed misplaced closing div */}
LineNumber:413:                             {getCurrentQuestion().points && `+${currentRound.isDoublePoints ? getCurrentQuestion().points * 2 : getCurrentQuestion().points} pts`} {/* Removed misplaced closing div */}
LineNumber:414:                          </span> {/* Removed misplaced closing motion.div */}
LineNumber:415:                        )} {/* Removed misplaced closing parenthesis and brace */}
LineNumber:416:
LineNumber:417:                      </div> {/* Added closing div which was missing */}
LineNumber:418:                    </motion.button> {/* Removed misplaced closing motion.div */}
LineNumber:419:                   );
LineNumber:420:                  })} {/* Added closing parenthesis and brace */}
LineNumber:421:                </div> {/* Added closing div */} {/* Removed misplaced closing div */}
LineNumber:360:                      className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${highlightClass} ${selectedAnswer === option && isWrong ? "wrong-highlight" : ""}`}
LineNumber:361:                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}} // Only scale on hover if no answer is selected
LineNumber:362:                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}} // Only scale on tap if no answer is selected
LineNumber:363:                      disabled={selectedAnswer !== null} // Disable clicking after selection
LineNumber:364:                    > {/* Removed misplaced closing div */}
LineNumber:425:                  Score: <span className="font-bold">{score}</span> / {quizQuestions.length}
LineNumber:426:                </p>
LineNumber:427:                <p className="text-surface-600 dark:text-surface-300 fun-text">
LineNumber:428:                  Total Points: <span className="font-bold">{points}</span>
LineNumber:429:                </p>
LineNumber:430:              </div> {/* Added closing div */}
LineNumber:431:            </div> {/* Added closing div */}
LineNumber:432:            )} {/* Added closing parenthesis and brace */}
LineNumber:433:          </motion.div>
LineNumber:434:        ) : ( // Screen 4: End Game Results Screen
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

// Removed misplaced code snippets found at the end of the snapshot:
// difficulty: "medium",
// points: 20
// },
// {
//   id: 22,
//   name: "Friends",
//   question: "What was the name of Ross's monkey?",
//   options: ["Marcel", "Marvin", "Michael", "Monty"],
//   correctAnswer: "Marcel",
//   difficulty: "easy",
//   points: 10
// },
// {
//   id: 23,
//   name: "Friends",
//   question: "What subject does Ross teach?",
//   options: ["Archaeology", "Paleontology", "Geology", "Anthropology"],
//   correctAnswer: "Paleontology",
//   difficulty: "easy",
//   points: 10
// },
// {
//   id: 24,
//   name: "Friends",
//   question: "What is the name of the character Phoebe made up to dump a guy?",
//   options: ["Regina Falange", "Ursula Buffay", "Phoebe Abbott", "Princess Consuela"],
//   correctAnswer: "Regina Falange",
//   difficulty: "hard",
//   points: 30
// },
// {
//   id: 25,
//   name: "Friends",
//   question: "What's the name of the book written by Phoebe's mother that Phoebe and Joey try to rewrite?",
//   options: ["Be Your Own Person", "Be Your Own Windkeeper", "Finding Your Inner Self", "Knowing Your Worth"],
//   correctAnswer: "Be Your Own Windkeeper", // Corrected answer based on show
//   difficulty: "hard",
//   points: 30
// },
// {
//   id: 26,
//   name: "Friends",
//   question: "What is Monica's biggest strength according to her job interview?",
//   options: ["Cooking", "Competitiveness", "Attention to detail", "Leadership"],
//   correctAnswer: "Attention to detail",
//   difficulty: "medium",
//   points: 20
// },
// {
//   id: 27,
//   name: "Friends",
//   question: "On which soap opera did Joey get his big break?",
//   options: ["General Hospital", "Days of Our Lives", "As the World Turns", "The Bold and the Beautiful"],
//   correctAnswer: "Days of Our Lives",
//   difficulty: "easy",
//   points: 10
// },
// {
//   id: 28,
//   name: "Friends",
//   question: "What is the name of Rachel's embarrassing high school nickname?",
//   options: ["Big Nose", "Craney", "Spotty", "Big Teeth"],
//   correctAnswer: "Big Nose",
//   difficulty: "hard",
//   points: 30
// },
// {
//   id: 29,
//   name: "Friends",
//   question: "Who marries Monica and Chandler?",
//   options: ["Ross", "Joey", "A random priest", "The minister from the Bing wedding"],
//   correctAnswer: "Joey",
                            {selectedAnswer !== null ? (
                              option === getCurrentQuestion().correctAnswer ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : selectedAnswer === option ? (
                                <motion.div
                                  animate={isWrong ? { // Only animate X if the selected answer was wrong
// {
//   id: 30,
//   name: "Friends",
//   question: "What is Joey's acting catchphrase?",
//   options: ["How YOU doin'?", "Smell the fart acting", "It's all in the eyes", "The camera loves me"],
//   correctAnswer: "Smell the fart acting", // Corrected answer based on show
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