import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutGrid, 
  Apple, 
  Dumbbell, 
  Brain, 
  Users, 
  Settings,
  Bot,
  Sun,
  LogOut,
  Heart,
  ChevronUp,
  ChevronDown,
  Mic,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getCardBackground } from '../utils/themeUtils';
import AIChat from './AIAssistant/AIChat';
import ThemeToggle from './ThemeToggle';

const menuItems = [
  { 
    path: '/dashboard', 
    label: 'Dashboard', 
    icon: LayoutGrid,
    color: 'from-blue-500 to-cyan-500',
    neonColor: 'cyan' 
  },
  { 
    path: '/nutrition', 
    label: 'Nutrition', 
    icon: Apple,
    color: 'from-green-500 to-emerald-500',
    neonColor: 'green'
  },
  { 
    path: '/exercise', 
    label: 'Exercise', 
    icon: Dumbbell,
    color: 'from-purple-500 to-pink-500',
    neonColor: 'purple'
  },
  { 
    path: '/mental-wellness', 
    label: 'Mental Wellness', 
    icon: Brain,
    color: 'from-yellow-500 to-orange-500',
    neonColor: 'yellow'
  },
  { 
    path: '/social', 
    label: 'Social', 
    icon: Users,
    color: 'from-red-500 to-rose-500',
    neonColor: 'rose'
  },
  { 
    path: '/settings', 
    label: 'Settings', 
    icon: Settings,
    color: 'from-indigo-500 to-violet-500',
    neonColor: 'violet'
  }
];

// Add TypeScript interfaces for components
interface AIAssistantButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isThinking?: boolean;
}

interface AIChatPopoutProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

// Enhanced animations
const sidebarAnimations = {
  logo: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  },
  menuItem: {
    hover: { x: 4, scale: 1.02 },
    tap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  aiPopout: {
    initial: { x: -300, opacity: 0, scale: 0.9 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -300, opacity: 0, scale: 0.9 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
};

export default function Sidebar() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { theme, toggleTheme, isCyberpunk } = useTheme();
  const [isAIOpen, setIsAIOpen] = useState(false);

  // Enhanced Logo Section with 3D effect
  const LogoSection = () => (
    <div className="p-6">
      <motion.div
        {...sidebarAnimations.logo}
        className={`flex items-center space-x-2 group ${
          isCyberpunk ? 'neon-text' : ''
        }`}
      >
        <div className={`relative transform transition-all duration-300 
                      group-hover:scale-110 ${isCyberpunk ? 'neon-glow' : ''}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                        ${isCyberpunk 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25'
                          : 'bg-primary-500'}`}>
            <Heart className="h-6 w-6 text-white" />
          </div>
        </div>
        <span className={`text-xl font-bold ${
          isCyberpunk 
            ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'
            : 'text-gray-900 dark:text-white'
        }`}>
          HealthVibes
        </span>
      </motion.div>
    </div>
  );

  // Enhanced AI Assistant Button with advanced effects
  const AIAssistantButton: React.FC<AIAssistantButtonProps> = ({ isOpen, onClick, isThinking = false }) => (
  <motion.button
    onClick={onClick}
    className="w-full p-4 flex items-center justify-between text-gray-900 
             dark:text-white hover:bg-gray-100/50 dark:hover:bg-gray-700/50
             relative group transition-all duration-300"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full 
                     blur opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="relative transform transition-transform duration-300 group-hover:rotate-12">
          <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
      </div>
      <span className="font-medium">AI Assistant</span>
      {isThinking && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 flex space-x-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="w-1.5 h-1.5 rounded-full bg-purple-500"
          />
        </div>
      )}
    </div>
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <ChevronUp className="h-5 w-5" />
    </motion.div>
  </motion.button>
);

// Enhanced AI Chat Popout with more features
const AIChatPopout: React.FC<AIChatPopoutProps> = ({ onClose, onMinimize, onMaximize }) => (
  <motion.div
    {...sidebarAnimations.aiPopout}
    className="fixed left-64 bottom-0 w-96 h-[500px] bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded-tr-xl shadow-xl
              flex flex-col overflow-hidden backdrop-blur-lg bg-opacity-95"
    style={{ 
      zIndex: 50,
      boxShadow: '0 0 20px rgba(0,0,0,0.1), 0 0 40px rgba(99,102,241,0.1)'
    }}
  >
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 
                  flex justify-between items-center bg-gradient-to-r 
                  from-purple-500/10 to-pink-500/10">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 
                       rounded-full blur opacity-75 animate-pulse" />
          <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400 relative" />
        </div>
        <span className="font-medium text-gray-900 dark:text-white">AI Assistant</span>
      </div>
      <div className="flex items-center space-x-2">
        <FeatureButtons onMinimize={onMinimize} onMaximize={onMaximize} onClose={onClose} />
      </div>
    </div>
    <div className="flex-1 overflow-hidden">
      <AIChat />
    </div>
  </motion.div>
);

// New Feature Buttons component
const FeatureButtons = ({ onMinimize, onMaximize, onClose }) => (
  <>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
               group relative"
      title="Voice Input"
    >
      <Mic className="h-4 w-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onMinimize}
      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
               group relative"
      title="Minimize"
    >
      <Minimize2 className="h-4 w-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onMaximize}
      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
               group relative"
      title="Maximize"
    >
      <Maximize2 className="h-4 w-4 text-gray-500 group-hover:text-purple-500 transition-colors" />
    </motion.button>
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClose}
      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full
               group relative"
      title="Close"
    >
      <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-red-500 transition-colors" />
    </motion.button>
  </>
);

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`h-screen w-64 fixed left-0 top-0 z-50 flex flex-col
                ${isCyberpunk 
                  ? 'bg-gray-900/95 backdrop-blur-xl border-r border-gray-800/50'
                  : 'bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700'}`}
    >
      {/* Logo */}
      <LogoSection />

      {/* User Profile */}
      <div className="px-4 py-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-3 rounded-xl bg-gray-800/50 border border-gray-700/50
                   backdrop-blur-xl flex items-center space-x-3"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 
                       flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-white font-medium">
              {user?.email?.[0].toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-200 truncate">
              {user?.email}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl 
                         transition-all duration-200 group relative ${
                  isActive
                    ? isCyberpunk
                      ? `bg-gradient-to-r ${item.color} shadow-lg hover-neon`
                      : `bg-primary-50 dark:bg-primary-900/10`
                    : isCyberpunk
                    ? 'hover:bg-gray-800/50'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? isCyberpunk
                      ? 'text-white'
                      : 'text-primary-500'
                    : 'text-gray-500 dark:text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  isActive
                    ? isCyberpunk
                      ? 'text-white'
                      : 'text-primary-900 dark:text-primary-100'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {item.label}
                </span>
                {isActive && isCyberpunk && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white neon-glow"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* AI Assistant Button */}
      <div className="border-t border-gray-200 dark:border-gray-700">
        <AIAssistantButton isOpen={isAIOpen} onClick={() => setIsAIOpen(!isAIOpen)} />
      </div>

      {/* AI Chat */}
      <AnimatePresence>
        {isAIOpen && (
          <AIChatPopout onClose={() => setIsAIOpen(false)} />
        )}
      </AnimatePresence>

      {/* Theme Toggle */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
        <ThemeToggle />
      </div>

      {/* User Profile & Logout */}
      <div className="p-4 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={signOut}
          className={`w-full px-4 py-3 rounded-xl flex items-center space-x-3 
                   ${isCyberpunk
                     ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                     : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                   } transition-all duration-200`}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
} 