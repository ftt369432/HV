import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Brain, Moon, Sun } from 'lucide-react';

interface BreathingGuideProps {
  onSelectExercise: (type: 'box' | '478' | 'calm' | 'energizing') => void;
}

const exercises = [
  {
    type: 'box',
    name: 'Box Breathing',
    description: 'Equal duration breathing for focus and calm',
    icon: Brain,
    color: 'bg-blue-500'
  },
  {
    type: '478',
    name: '4-7-8 Breathing',
    description: 'Natural tranquilizer for the nervous system',
    icon: Moon,
    color: 'bg-purple-500'
  },
  {
    type: 'calm',
    name: 'Calming Breath',
    description: 'Reduce anxiety and promote relaxation',
    icon: Wind,
    color: 'bg-green-500'
  },
  {
    type: 'energizing',
    name: 'Energizing Breath',
    description: 'Increase alertness and energy',
    icon: Sun,
    color: 'bg-orange-500'
  }
] as const;

export default function BreathingGuide({ onSelectExercise }: BreathingGuideProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {exercises.map((exercise) => (
        <motion.button
          key={exercise.type}
          onClick={() => onSelectExercise(exercise.type)}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${exercise.color}`}>
              <exercise.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {exercise.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {exercise.description}
              </p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}