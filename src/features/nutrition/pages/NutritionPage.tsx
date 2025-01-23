import React from 'react';
import { motion } from 'framer-motion';
import NutritionDashboard from '../components/NutritionDashboard';
import PreferencesWizard from '../components/PreferencesWizard';
import { usePreferencesStore } from '../stores/preferencesStore';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function NutritionPage() {
  const { isInitialized } = usePreferencesStore();

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <PreferencesWizard />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <NutritionDashboard />
    </motion.div>
  );
}