import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme, isCyberpunk, toggleCyberpunk } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isCyberpunk
            ? 'bg-gray-800/50 text-gray-400 hover:text-purple-400'
            : theme === 'light'
            ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            : 'bg-gray-800 text-gray-400 hover:text-gray-200'
        }`}
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleCyberpunk}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isCyberpunk
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
            : 'bg-gray-800/50 text-gray-400 hover:text-purple-400'
        }`}
      >
        <Zap className="w-5 h-5" />
      </motion.button>
    </div>
  );
}