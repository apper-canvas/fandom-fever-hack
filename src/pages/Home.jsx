import { useState, useEffect } from 'react';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence

const Home = ({ darkMode, toggleDarkMode }) => { // Added props
  const [showWelcome, setShowWelcome] = useState(true); // State to control showing the initial welcome screen
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>
      </div>
      
      {/* Header */}
      <header className="relative z-10 pt-6 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="mr-3"
            >
              <span className="text-3xl">🎬</span>
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              FandomFever
            </h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-200 dark:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5 text-yellow-400" />
            ) : (
              <MoonIcon className="h-5 w-5 text-surface-600" />
            )}
          </button>
        </div>
      </header>
{/* Main content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {showWelcome ? (
          // --- Initial Welcome Screen ---
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-comic font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Welcome to FandomFever!
            </h2>
            <p className="text-lg sm:text-xl mb-6 text-surface-600 dark:text-surface-300 font-handwritten">
              Challenge yourself with trivia about Friends, Modern Family, and Harry Potter
            </p>
            
            <motion.div
              className="max-w-md mx-auto bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 mb-10 flex justify-center items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-4xl mr-3">🎯</span>
              <div className="text-left">
                <h3 className="font-bold text-surface-800 dark:text-surface-200">Test Your Knowledge</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">Multiple difficulty levels</p>
              </div>
            </motion.div>

            {/* Button to start the quiz flow (which now begins with category selection in MainFeature) */}
            <motion.button
              onClick={() => setShowWelcome(false)}
              className="btn btn-primary text-lg md:text-xl py-4 px-8 rounded-xl font-comic tracking-wide"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Quiz!
            </motion.button>
          </motion.div>
        ) : (
          // --- Main Quiz Flow (handles Category, Level, Quiz, Results) ---
          <MainFeature onBackToWelcome={() => setShowWelcome(true)} /> {/* Pass a function to go back to welcome */}
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-surface-600 dark:text-surface-300 text-sm">
        <div className="container mx-auto px-4">
          Made with ❤️ by your Fandom Friends
        </div>
      </footer>
    </div>
  );
};

export default Home;