import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { startSpeechRecognition } from './utils/speechUtils';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function VoiceInput({ onTranscript, disabled = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
      setRecognition(null);
    } else {
      const newRecognition = startSpeechRecognition(
        (transcript) => {
          onTranscript(transcript);
        },
        () => {
          setIsListening(false);
          setRecognition(null);
        }
      );
      
      if (newRecognition) {
        setRecognition(newRecognition);
        setIsListening(true);
      }
    }
  };

  return (
    <motion.button
      onClick={toggleListening}
      disabled={disabled}
      className={`relative p-2 rounded-lg transition-colors ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      title={isListening ? 'Stop listening (Ctrl/Cmd + M)' : 'Start voice input (Ctrl/Cmd + M)'}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {isListening ? (
        <MicOff className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
      {isListening && (
        <motion.div
          className="absolute -inset-1 rounded-lg border-2 border-red-500"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
}