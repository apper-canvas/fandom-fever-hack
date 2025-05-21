import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';
import { toast } from 'react-toastify';

const Home = ({ darkMode, toggleDarkMode }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    setShowWelcome(false);
    toast.success(`Starting ${categoryName} quiz!`, { theme: darkMode ? 'dark' : 'light' });
  };
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-comic font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Test Your Fandom Knowledge!
            </h2>
            <p className="text-lg sm:text-xl mb-6 text-surface-600 dark:text-surface-300 font-handwritten">
              Challenge yourself with trivia about Friends, Modern Family, and Harry Potter
            </p>
            
            <motion.div
              className="max-w-md mx-auto bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 mb-10 flex justify-center items-center"
            >
              <span className="text-4xl">🎯</span>
            </motion.div>
            
              <h3 className="text-xl font-semibold mb-2">How to Play</h3>
 <ul className="text-left space-y-2 mb-4 text-surface-700 dark:text-surface-300 font-handwritten">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Choose a category: Friends, Modern Family, or Harry Potter</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Get instant feedback on your answers</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>See your final score and try to beat it!</span>
                </li>
              </ul>

 <p className="text-center text-surface-700 dark:text-surface-300 font-handwritten text-lg mt-6 mb-4">
 Choose your fandom to begin:
 </p>
            {/* Moved the category buttons here from below */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { name: "Friends", emoji: "☕" },
                { name: "Modern Family", emoji: "🏠" },
                { name: "Harry Potter", emoji: "⚡" }
              ].map((category) => (
                <motion.div
                  key={category.name}
                  className="bg-white/70 dark:bg-surface-800/70 rounded-xl p-4 text-center shadow-md cursor-pointer transition-colors hover:bg-white/90 dark:hover:bg-surface-700/90"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  <div className="text-3xl mb-2">{category.emoji}</div>
                  <div className="font-medium">{category.name}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> {/* Correct closing tag for the main welcome motion.div */}
        ) : (
          <MainFeature onBackToWelcome={() => setShowWelcome(true)} />
        )}
      </main> {/* Closing tag for main */}
      <footer className="relative z-10 py-6 text-center text-surface-500 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} FandomFever Quiz Game</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;