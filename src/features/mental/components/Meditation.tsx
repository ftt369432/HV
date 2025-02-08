import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface MeditationSession {
  id: string;
  name: string;
  duration: number;
  description: string;
  audioUrl: string;
  thumbnail: string;
}

export default function Meditation() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedSession, setSelectedSession] = useState<MeditationSession | null>(null);
  
  const sessions: MeditationSession[] = [
    {
      id: '1',
      name: 'Morning Mindfulness',
      duration: 600, // 10 minutes in seconds
      description: 'Start your day with a calm and focused mind',
      audioUrl: '/meditations/morning-mindfulness.mp3',
      thumbnail: '/thumbnails/morning.jpg'
    },
    {
      id: '2',
      name: 'Stress Relief',
      duration: 300, // 5 minutes in seconds
      description: 'Quick meditation to reduce stress and anxiety',
      audioUrl: '/meditations/stress-relief.mp3',
      thumbnail: '/thumbnails/stress.jpg'
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSessionSelect = (session: MeditationSession) => {
    setSelectedSession(session);
    setTimeLeft(session.duration);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!selectedSession) return;
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    if (!selectedSession) return;
    setTimeLeft(selectedSession.duration);
    setIsPlaying(false);
  };

  return (
    <div className="p-6">
      {/* Session Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {sessions.map((session) => (
          <motion.button
            key={session.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSessionSelect(session)}
            className={`
              p-4 rounded-lg text-left flex items-center space-x-4
              ${selectedSession?.id === session.id
                ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <img
              src={session.thumbnail}
              alt={session.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {session.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {session.description}
              </p>
              <span className="text-sm text-purple-600 dark:text-purple-400">
                {formatTime(session.duration)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Player */}
      {selectedSession && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedSession.name}
            </h2>
            <div className="text-4xl font-mono text-purple-600 dark:text-purple-400">
              {formatTime(timeLeft)}
            </div>
          </div>

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
              onClick={handlePlayPause}
              className="p-4 bg-purple-600 rounded-full text-white hover:bg-purple-700"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMuted ? (
                <VolumeX className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              ) : (
                <Volume2 className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
} 