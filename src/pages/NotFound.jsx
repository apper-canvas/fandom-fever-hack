import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = ({ darkMode, toggleDarkMode }) => {
  const MoonIcon = getIcon('moon');
  const SunIcon = getIcon('sun');
  const HomeIcon = getIcon('home');
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
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
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex items-center justify-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full text-center"
        >
          <div className="mb-6">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="inline-block text-7xl"
            >
              🤔
            </motion.div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h2>
          
          <p className="text-lg mb-8 text-surface-600 dark:text-surface-300">
            Oops! The page you're looking for seems to have vanished like magic.
          </p>
          
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md flex items-center justify-center mx-auto"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Back to Home
            </motion.button>
          </Link>
          
          <div className="mt-12">
            <div className="flex justify-center space-x-4">
              {["⚡", "☕", "🏠"].map((emoji, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5, y: 10 }}
                  animate={{ opacity: 1, y: [0, -10, 0] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    delay: index * 0.3
                  }}
                  className="text-2xl sm:text-3xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-surface-500 text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} FandomFever Quiz Game</p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;