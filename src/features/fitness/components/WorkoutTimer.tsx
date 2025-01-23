import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, Save, Volume2, VolumeX } from 'lucide-react';
import { Exercise } from '../types';

interface WorkoutTimerProps {
  workout: Exercise;
  onComplete: (duration: number) => void;
  onClose: () => void;
}

export default function WorkoutTimer({ workout, onComplete, onClose }: WorkoutTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isResting, setIsResting] = useState(false);
  const [restSeconds, setRestSeconds] = useState(30);
  const [currentSet, setCurrentSet] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentRep, setCurrentRep] = useState(0);

  const REST_DURATION = 30; // 30 seconds rest between sets

  const speak = useCallback((text: string) => {
    if (!isMuted && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      if (isResting) {
        interval = setInterval(() => {
          setRestSeconds(prev => {
            if (prev === 1) {
              setIsResting(false);
              speak("Rest complete. Get ready for the next set!");
              return REST_DURATION;
            }
            if (prev === 10) {
              speak("10 seconds of rest remaining");
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        interval = setInterval(() => {
          setSeconds(s => s + 1);
          setCurrentRep(r => {
            if (r < (workout.reps || 1)) {
              return r + 1;
            }
            return r;
          });
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, isResting, speak, workout.reps]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (!seconds) {
        speak(`Starting ${workout.name}. ${workout.sets} sets of ${workout.reps} repetitions`);
      } else {
        speak("Resuming workout");
      }
    } else {
      setIsRunning(false);
      speak("Workout paused");
    }
  };

  const handleComplete = () => {
    onComplete(Math.round(seconds / 60));
    speak("Workout complete! Great job!");
  };

  const handleSetComplete = () => {
    if (currentSet < (workout.sets || 1)) {
      setIsResting(true);
      setCurrentSet(prev => prev + 1);
      setCurrentRep(0);
      speak(`Set ${currentSet} complete. Starting ${REST_DURATION} seconds rest`);
    } else {
      handleComplete();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-sm mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {workout.name}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            {isResting ? formatTime(restSeconds) : formatTime(seconds)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isResting ? (
              "Rest Period"
            ) : (
              <>
                Set {currentSet} of {workout.sets} • Rep {currentRep} of {workout.reps}
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          {!isResting && workout.instructions && (
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructions:
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                {workout.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={handleStartPause}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {isRunning ? (
                <>
                  <Pause className="h-5 w-5" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span>Start</span>
                </>
              )}
            </button>
            {!isResting && seconds > 0 && (
              <button
                onClick={handleSetComplete}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Save className="h-5 w-5" />
                <span>
                  {currentSet === workout.sets ? 'Complete' : 'Next Set'}
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}