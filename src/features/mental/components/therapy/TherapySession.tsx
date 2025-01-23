import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodType } from '../../../../components/AIAssistant/types';
import { useMentalWellnessStore } from '../../stores/mentalWellnessStore';
import { generateMoodInsights } from '../../utils/moodUtils';
import TherapyChat from './TherapyChat';
import BreathingGuide from './BreathingGuide';
import MoodAnalysis from './MoodAnalysis';

interface TherapySessionProps {
  initialMood: MoodType;
  onComplete: (notes: string) => void;
  onClose: () => void;
}

export default function TherapySession({ initialMood, onComplete, onClose }: TherapySessionProps) {
  const [currentStep, setCurrentStep] = useState<'chat' | 'breathing' | 'analysis'>('chat');
  const [sessionNotes, setSessionNotes] = useState('');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [startTime] = useState(Date.now());
  const { addTherapySession } = useMentalWellnessStore();

  const handleSpeech = (text: string) => {
    if (isSpeechEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleComplete = () => {
    const duration = Math.round((Date.now() - startTime) / 1000 / 60); // Duration in minutes
    addTherapySession({
      mood: initialMood,
      notes: sessionNotes,
      date: new Date(),
      duration,
      techniques: ['breathing', 'conversation'],
      recommendations: generateMoodInsights(initialMood, sessionNotes, [])
    });
    onComplete(sessionNotes);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'chat':
        return (
          <TherapyChat
            mood={initialMood}
            onSpeech={handleSpeech}
            onNext={() => setCurrentStep('breathing')}
            onUpdateNotes={setSessionNotes}
          />
        );
      case 'breathing':
        return (
          <BreathingGuide
            onComplete={() => setCurrentStep('analysis')}
            onSpeech={handleSpeech}
          />
        );
      case 'analysis':
        return (
          <MoodAnalysis
            initialMood={initialMood}
            sessionNotes={sessionNotes}
            onComplete={handleComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Therapy Session
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Step {currentStep === 'chat' ? '1' : currentStep === 'breathing' ? '2' : '3'} of 3
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isSpeechEnabled ? '🔊' : '🔇'}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}