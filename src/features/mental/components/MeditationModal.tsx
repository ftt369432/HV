import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Play, Pause, Brain } from 'lucide-react';
import { MeditationType } from '../../../components/AIAssistant/types';

interface MeditationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (duration: number, type: MeditationType) => void;
}

export default function MeditationModal({ isOpen, onClose, onComplete }: MeditationModalProps) {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [selectedType, setSelectedType] = useState<MeditationType>('focus');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleComplete = () => {
    onComplete(Math.floor(time / 60), selectedType);
    setTime(0);
    setIsActive(false);
    onClose();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

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
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Meditation Session
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <div className="text-6xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(time)}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Meditation Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as MeditationType)}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white"
            disabled={isActive}
          >
            <option value="focus">Focus</option>
            <option value="relaxation">Relaxation</option>
            <option value="sleep">Sleep</option>
            <option value="stress">Stress Relief</option>
          </select>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2"
          >
            {isActive ? (
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
          {time > 0 && (
            <button
              onClick={handleComplete}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Complete
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}