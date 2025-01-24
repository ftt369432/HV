import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  CalendarDays, 
  PieChart, 
  ChefHat,
  Settings2 
} from 'lucide-react';
import { 
  NutritionDashboard, 
  MealPlanner, 
  MacroTracker, 
  AIChef,
  PreferencesWizard 
} from '../components';
import { usePreferencesStore } from '../stores';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPageBackground } from '../../../utils/themeUtils';

const pageVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

const tabs = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard, color: 'text-blue-500' },
  { id: 'planner', label: 'Meal Planner', icon: CalendarDays, color: 'text-green-500' },
  { id: 'macros', label: 'Macro Tracker', icon: PieChart, color: 'text-purple-500' },
  { id: 'ai-chef', label: 'AI Chef', icon: ChefHat, color: 'text-orange-500' }
];

export default function NutritionPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isInitialized } = usePreferencesStore();
  const { isCyberpunk } = useTheme();

  if (!isInitialized) {
    return (
      <div className={`min-h-screen ${getPageBackground(isCyberpunk)} flex items-center justify-center p-4`}>
        <PreferencesWizard onComplete={() => {
          usePreferencesStore.setState({ isInitialized: true });
        }} />
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      {/* Header */}
      <div className={`p-6 rounded-2xl ${
        isCyberpunk 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
          : 'bg-primary-50 dark:bg-gray-800'
      }`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nutrition Dashboard
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Track your meals, plan your diet, and get AI-powered recipe suggestions
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg ${
              isCyberpunk
                ? 'bg-white/10 backdrop-blur-sm hover:bg-white/20'
                : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
            }`}
            onClick={() => setActiveTab('preferences')}
          >
            <Settings2 className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                ${activeTab === tab.id 
                  ? isCyberpunk
                    ? `bg-gradient-to-r from-${tab.color.split('-')[1]}-500 to-${tab.color.split('-')[1]}-600 text-white`
                    : `bg-${tab.color.split('-')[1]}-100 dark:bg-${tab.color.split('-')[1]}-900/30 ${tab.color}`
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={`rounded-xl shadow-sm ${getCardBackground(isCyberpunk)}`}
        >
          <div className="p-6">
            {activeTab === 'dashboard' && <NutritionDashboard />}
            {activeTab === 'planner' && <MealPlanner />}
            {activeTab === 'macros' && <MacroTracker />}
            {activeTab === 'ai-chef' && <AIChef />}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}