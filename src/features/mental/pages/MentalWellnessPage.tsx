import React from 'react';
import { motion } from 'framer-motion';
import MentalWellnessHeader from '../components/MentalWellnessHeader';
import QuickActions from '../components/dashboard/QuickActions';
import MoodTracker from '../components/dashboard/MoodTracker';
import MeditationStats from '../components/dashboard/MeditationStats';
import JournalPreview from '../components/dashboard/JournalPreview';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function MentalWellnessPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <MentalWellnessHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <QuickActions />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MoodTracker />
          <MeditationStats />
        </div>
        
        <JournalPreview />
      </div>
    </motion.div>
  );
}