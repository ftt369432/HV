import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Circle } from 'lucide-react';

interface BreathingExerciseProps {
  type: 'box' | '478' | 'calm' | 'energizing';
  onComplete: () => void;
  onCancel: () => void;
  onSpeak?: (text: string) => void;
}

const breathingPatterns = {
  box: {
    name: 'Box Breathing',
    description: 'Equal duration for inhale, hold, exhale, and hold',
    steps: [
      { phase: 'inhale', duration: 4, instruction: 'Inhale slowly through your nose' },
      { phase: 'hold', duration: 4, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 4, instruction: 'Exhale completely through your mouth' },
      { phase: 'hold', duration: 4, instruction: 'Hold your breath' }
    ],
    totalCycles: 4
  },
  '478': {
    name: '4-7-8 Breathing',
    description: 'Calming breath for relaxation and sleep',
    steps: [
      { phase: 'inhale', duration: 4, instruction: 'Inhale quietly through your nose' },
      { phase: 'hold', duration: 7, instruction: 'Hold your breath' },
      { phase: 'exhale', duration: 8, instruction: 'Exhale completely through your mouth' }
    ],
    totalCycles: 4
  },
  calm: {
    name: 'Calming Breath',
    description: 'Long exhales for relaxation',
    steps: [
      { phase: 'inhale', duration: 4, instruction: 'Inhale slowly through your nose' },
      { phase: 'hold', duration: 2, instruction: 'Brief pause' },
      { phase: 'exhale', duration: 6, instruction: 'Long, slow exhale through your mouth' }
    ],
    totalCycles: 5
  },
  energizing: {
    name: 'Energizing Breath',
    description: 'Quick, energizing breaths',
    steps: [
      { phase: 'inhale', duration: 2, instruction: 'Quick inhale through your nose' },
      { phase: 'hold', duration: 1, instruction: 'Brief hold' },
      { phase: 'exhale', duration: 2, instruction: 'Sharp exhale through your mouth' }
    ],
    totalCycles: 6
  }
};

export default function BreathingExercise({ type, onComplete, onCancel, onSpeak }: BreathingExerciseProps) {
  const [currentCycle, setCurrentCycle] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(breathingPatterns[type].steps[0].duration);
  const [isActive, setIsActive] = useState(false);

  const pattern = breathingPatterns[type];
  const currentStep = pattern.steps[currentStepIndex];

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next step or cycle
          if (currentStepIndex === pattern.steps.length - 1) {
            if (currentCycle === pattern.totalCycles) {
              setIsActive(false);
              onComplete();
              return 0;
            }
            setCurrentCycle(prev => prev + 1);
            setCurrentStepIndex(0);
          } else {
            setCurrentStepIndex(prev => prev + 1);
          }
          const nextStep = currentStepIndex === pattern.steps.length - 1 
            ? pattern.steps[0] 
            : pattern.steps[currentStepIndex + 1];
          if (onSpeak) {
            onSpeak(nextStep.instruction);
          }
          return nextStep.duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentStepIndex, currentCycle, pattern, onComplete, onSpeak]);

  const handleStart = () => {
    setIsActive(true);
    if (onSpeak) {
      onSpeak(`Starting ${pattern.name}. ${currentStep.instruction}`);
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'inhale': return 'text-blue-500';
      case 'hold': return 'text-purple-500';
      case 'exhale': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {pattern.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {pattern.description}
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <motion.div
            animate={{
              scale: currentStep.phase === 'inhale' ? 1.5 : 1,
              opacity: currentStep.phase === 'hold' ? 0.7 : 1
            }}
            transition={{ duration: 1 }}
            className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
          >
            <div className={`text-4xl font-bold ${getPhaseColor(currentStep.phase)}`}>
              {timeLeft}
            </div>
          </motion.div>
          <AnimatePresence>
            {currentStep.phase === 'inhale' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute inset-0 border-2 border-blue-500 rounded-full"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className={`text-lg font-medium ${getPhaseColor(currentStep.phase)}`}>
          {currentStep.instruction}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Cycle {currentCycle} of {pattern.totalCycles}
        </p>
      </div>

      <div className="flex justify-center space-x-4">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Start
          </button>
        ) : (
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}