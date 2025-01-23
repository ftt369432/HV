import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FitnessHeader from '../components/FitnessHeader';
import FitnessDashboard from '../components/FitnessDashboard';
import QuickActions from '../components/QuickActions';
import ActiveWorkout from '../components/ActiveWorkout';
import WorkoutSummary from '../components/WorkoutSummary';
import { useFitnessStore } from '../stores/fitnessStore';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3
    }
  }
};

export default function FitnessPage() {
  const { currentWorkout, completeWorkout } = useFitnessStore();
  const [showSummary, setShowSummary] = useState(false);
  const [completedWorkout, setCompletedWorkout] = useState(null);

  const handleWorkoutComplete = (notes?: string) => {
    const workout = completeWorkout(notes);
    setCompletedWorkout(workout);
    setShowSummary(true);
  };

  const handleWorkoutCancel = () => {
    // TODO: Implement workout cancellation
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <FitnessHeader />
      <QuickActions />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <FitnessDashboard />
      </div>

      {currentWorkout && (
        <ActiveWorkout
          exercises={currentWorkout.exercises.map(e => e.exercise)}
          onComplete={handleWorkoutComplete}
          onCancel={handleWorkoutCancel}
        />
      )}

      {showSummary && completedWorkout && (
        <WorkoutSummary
          workout={completedWorkout}
          onClose={() => setShowSummary(false)}
        />
      )}
    </motion.div>
  );
}