import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Circle, Play, Pause } from 'lucide-react';
import { breathingExercises } from '../../utils/breathingUtils';

interface BreathingGuideProps {
  onComplete: () => void;
  onSpeech: (text: string) => void;
}

export default function BreathingGuide({ onComplete, onSpeech }: BreathingGuideProps) {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycleCount, setCycleCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to next phase
            if (currentPhase === 'inhale') {
              onSpeech('Hold your breath');
              setCurrentPhase('hold');
              return 7;
            } else if (currentPhase === 'hold') {
              onSpeech('Exhale slowly');
              setCurrentPhase('exhale');
              return 8;
            } else {
              // Complete cycle
              if (cycleCount >= 3) {
                setIsActive(false);
                onComplete();
                return 0;
              }
              setCycleCount(prev => prev + 1);
              onSpeech('Inhale deeply');
              setCurrentPhase('inhale');
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, currentPhase, cycleCount, onComplete, onSpeech]);

  const handleStart = () => {
    setIsActive(true);
    onSpeech('Let\'s begin. Inhale deeply through your nose.');
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'text-blue-500';
      case 'hold': return 'text-purple-500';
      case 'exhale': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="text-center space-y-8">
      <div className="relative">
        <motion.div
          animate={{
            scale: currentPhase === 'inhale' ? 1.5 : currentPhase === 'exhale' ? 0.8 : 1,
            opacity: currentPhase === 'hold' ? 0.7 : 1
          }}
          transition={{ duration: 2 }}
          className="w-32 h-32 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
        >
          <div className={`text-4xl font-bold ${getPhaseColor()}`}>
            {timeLeft}
          </div>
        </motion.div>
        <AnimatePresence>
          {currentPhase === 'inhale' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute inset-0 border-2 border-blue-500 rounded-full"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          4-7-8 Breathing
        </h3>
        <p className={`text-lg font-medium ${getPhaseColor()}`}>
          {currentPhase === 'inhale' && 'Inhale through your nose'}
          {currentPhase === 'hold' && 'Hold your breath'}
          {currentPhase === 'exhale' && 'Exhale through your mouth'}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Cycle {cycleCount + 1} of 4
        </p>
      </div>

      {!isActive && (
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <Play className="h-5 w-5" />
          <span>Begin Exercise</span>
        </button>
      )}

      {isActive && (
        <button
          onClick={() => setIsActive(false)}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <Pause className="h-5 w-5" />
          <span>Pause</span>
        </button>
      )}
    </div>
  );
}