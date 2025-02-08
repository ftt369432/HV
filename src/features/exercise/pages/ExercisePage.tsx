import React from 'react';
import { motion } from 'framer-motion';
import WorkoutTracker from '../components/WorkoutTracker';
import { useTheme } from '../../../contexts/ThemeContext';

export default function ExercisePage() {
  const { isCyberpunk } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <WorkoutTracker />
      </motion.div>
    </div>
  );
} 