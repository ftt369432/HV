import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Book, Wind, Activity } from 'lucide-react';
import MoodTracker from '../components/MoodTracker';
import Journal from '../components/Journal';
import Meditation from '../components/Meditation';
import Breathing from '../components/Breathing';

const tabs = [
  { id: 'mood', label: 'Mood Tracker', icon: Activity },
  { id: 'journal', label: 'Journal', icon: Book },
  { id: 'meditation', label: 'Meditation', icon: Brain },
  { id: 'breathing', label: 'Breathing', icon: Wind }
];

export default function MentalWellnessPage() {
  const [activeTab, setActiveTab] = useState('mood');

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Mental Wellness
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Track your mood, journal your thoughts, and practice mindfulness
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveTab(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg
              ${activeTab === id 
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' 
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }
            `}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-[600px]"
          >
            {activeTab === 'mood' && <MoodTracker />}
            {activeTab === 'journal' && <Journal />}
            {activeTab === 'meditation' && <Meditation />}
            {activeTab === 'breathing' && <Breathing />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}