import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX, Moon } from 'lucide-react';
import { MeditationType } from '../../../components/AIAssistant/types';

interface MeditationTimerProps {
  type: MeditationType;
  duration: number;
  onComplete: () => void;
  onClose: () => void;
}

const guidedMeditations = {
  focus: [
    "Find a comfortable position and close your eyes",
    "Take a deep breath in through your nose",
    "Exhale slowly through your mouth",
    "Focus your attention on your breath",
    "Notice the sensation of air moving in and out",
    "If your mind wanders, gently bring it back to your breath"
  ],
  relaxation: [
    "Release any tension in your body",
    "Let your shoulders drop",
    "Relax your jaw",
    "Feel a wave of relaxation flowing through you",
    "Each breath brings deeper relaxation",
    "You are becoming more and more relaxed"
  ],
  sleep: [
    "Let your body sink into the surface beneath you",
    "Release any thoughts about the day",
    "Your body is becoming heavy and relaxed",
    "Each breath brings you closer to sleep",
    "Let go of any remaining tension",
    "Allow yourself to drift peacefully"
  ],
  stress: [
    "Acknowledge any stress you're holding",
    "Take a deep cleansing breath",
    "Release tension with each exhale",
    "Your worries are melting away",
    "You are safe and supported",
    "Feel a sense of peace washing over you"
  ]
};

export default function MeditationTimer({ type, duration, onComplete, onClose }: MeditationTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const speak = useCallback((text: string) => {
    if (!isMuted && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            speak("Your meditation is complete. Take a moment to slowly return to awareness.");
            onComplete();
            return 0;
          }
          return prev - 1;
        });

        // Provide guided prompts
        if (timeLeft % 30 === 0) { // Every 30 seconds
          const prompts = guidedMeditations[type];
          speak(prompts[currentPrompt % prompts.length]);
          setCurrentPrompt(prev => prev + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, speak, type, currentPrompt, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning && timeLeft === duration * 60) {
      speak(`Beginning ${type} meditation. Find a comfortable position and take a deep breath.`);
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
          <div className="flex items-center space-x-3">
            <Moon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {type.charAt(0).toUpperCase() + type.slice(1)} Meditation
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">
            {formatTime(timeLeft)}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {isRunning ? guidedMeditations[type][currentPrompt % guidedMeditations[type].length] : 'Ready to begin?'}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={toggleTimer}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                <span>{timeLeft === duration * 60 ? 'Start' : 'Resume'}</span>
              </>
            )}
          </button>

          {isRunning && (
            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Press Space to pause/resume
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}