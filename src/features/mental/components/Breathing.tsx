import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold: number;
  exhale: number;
  holdAfterExhale: number;
  cycles: number;
}

const patterns: BreathingPattern[] = [
  {
    id: '1',
    name: '4-7-8 Breathing',
    description: 'Inhale for 4, hold for 7, exhale for 8',
    inhale: 4,
    hold: 7,
    exhale: 8,
    holdAfterExhale: 0,
    cycles: 4
  },
  {
    id: '2',
    name: 'Box Breathing',
    description: 'Equal duration for inhale, hold, exhale, and hold',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
    cycles: 4
  }
];

export default function Breathing() {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdAfterExhale'>('inhale');
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && selectedPattern) {
      if (timeLeft > 0) {
        timer = setInterval(() => {
          setTimeLeft(t => t - 1);
        }, 1000);
      } else {
        // Move to next phase
        switch (phase) {
          case 'inhale':
            setPhase('hold');
            setTimeLeft(selectedPattern.hold);
            break;
          case 'hold':
            setPhase('exhale');
            setTimeLeft(selectedPattern.exhale);
            break;
          case 'exhale':
            if (selectedPattern.holdAfterExhale > 0) {
              setPhase('holdAfterExhale');
              setTimeLeft(selectedPattern.holdAfterExhale);
            } else {
              setPhase('inhale');
              setTimeLeft(selectedPattern.inhale);
              if (currentCycle < selectedPattern.cycles) {
                setCurrentCycle(c => c + 1);
              } else {
                setIsActive(false);
                setCurrentCycle(1);
              }
            }
            break;
          case 'holdAfterExhale':
            setPhase('inhale');
            setTimeLeft(selectedPattern.inhale);
            if (currentCycle < selectedPattern.cycles) {
              setCurrentCycle(c => c + 1);
            } else {
              setIsActive(false);
              setCurrentCycle(1);
            }
            break;
        }
      }
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, phase, selectedPattern, currentCycle]);

  const handlePatternSelect = (pattern: BreathingPattern) => {
    setSelectedPattern(pattern);
    setPhase('inhale');
    setTimeLeft(pattern.inhale);
    setCurrentCycle(1);
    setIsActive(false);
  };

  const handleReset = () => {
    if (!selectedPattern) return;
    setPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setCurrentCycle(1);
    setIsActive(false);
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'holdAfterExhale': return 'Hold';
    }
  };

  return (
    <div className="p-6">
      {/* Pattern Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {patterns.map((pattern) => (
          <motion.button
            key={pattern.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handlePatternSelect(pattern)}
            className={`
              p-4 rounded-lg text-left
              ${selectedPattern?.id === pattern.id
                ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <h3 className="font-medium text-gray-900 dark:text-white">
              {pattern.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {pattern.description}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Breathing Exercise */}
      {selectedPattern && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedPattern.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Cycle {currentCycle} of {selectedPattern.cycles}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-8"
            >
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {timeLeft}
              </div>
              <div className="text-xl text-gray-900 dark:text-white">
                {getPhaseInstruction()}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RotateCcw className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsActive(!isActive)}
              className="p-4 bg-purple-600 rounded-full text-white hover:bg-purple-700"
            >
              {isActive ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
} 