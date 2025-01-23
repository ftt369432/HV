import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Bot, Volume2, VolumeX, Brain } from 'lucide-react';
import { MoodType } from '../../../components/AIAssistant/types';

interface AITherapistProps {
  mood: MoodType | null;
  onClose: () => void;
  onSaveMood: (notes: string) => void;
}

const moodPrompts = {
  anxious: [
    "Let's practice some deep breathing exercises together. Breathe in for 4 counts, hold for 4, and exhale for 4.",
    "What specific situations are triggering your anxiety right now?",
    "Would you like to try a quick grounding exercise? Name 5 things you can see around you."
  ],
  stressed: [
    "I notice you're feeling stressed. On a scale of 1-10, how intense is this feeling?",
    "Let's identify what aspects are within your control and what aren't.",
    "Would you like to try a progressive muscle relaxation exercise?"
  ],
  tired: [
    "How has your sleep quality been over the past few days?",
    "Let's explore what activities might be draining your energy the most.",
    "Would you like some science-backed tips for natural energy boosting?"
  ],
  calm: [
    "What practices or activities helped you achieve this peaceful state?",
    "Let's explore how we can maintain this calmness in challenging situations.",
    "Would you like to enhance this tranquility with a short meditation?"
  ],
  energetic: [
    "That's great! How can we channel this energy into something meaningful?",
    "What sparked this positive energy today?",
    "Let's create an action plan to make the most of this state!"
  ]
};

const breathingExercises = {
  anxious: {
    name: "4-7-8 Breathing",
    instructions: [
      "Inhale quietly through the nose for 4 seconds",
      "Hold the breath for 7 seconds",
      "Exhale completely through mouth for 8 seconds",
      "Repeat this cycle 4 times"
    ]
  },
  stressed: {
    name: "Box Breathing",
    instructions: [
      "Inhale for 4 seconds",
      "Hold for 4 seconds",
      "Exhale for 4 seconds",
      "Hold for 4 seconds",
      "Repeat pattern"
    ]
  }
};

export default function AITherapist({ mood, onClose, onSaveMood }: AITherapistProps) {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'ai' }>>([]);
  const [input, setInput] = useState('');
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingStep, setBreathingStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mood) {
      const initialPrompt = moodPrompts[mood][0];
      setMessages([{ text: initialPrompt, sender: 'ai' }]);
      if (isSpeechEnabled) {
        speak(initialPrompt);
      }
    }
  }, [mood]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const speak = (text: string) => {
    if (isSpeechEnabled && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startBreathingExercise = () => {
    setIsBreathing(true);
    const exercise = mood && (mood === 'anxious' || mood === 'stressed') 
      ? breathingExercises[mood]
      : breathingExercises.anxious;

    let step = 0;
    const interval = setInterval(() => {
      if (step < exercise.instructions.length) {
        speak(exercise.instructions[step]);
        setBreathingStep(step);
        step++;
      } else {
        clearInterval(interval);
        setIsBreathing(false);
        setBreathingStep(0);
        speak("Great job! How do you feel now?");
      }
    }, 5000);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Check for breathing exercise request
    if (input.toLowerCase().includes('breathing') || input.toLowerCase().includes('anxious')) {
      setTimeout(() => {
        const response = "Would you like to try a breathing exercise? I can guide you through it.";
        setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
        if (isSpeechEnabled) {
          speak(response);
        }
      }, 1000);
      return;
    }

    // Simulate AI response
    setTimeout(() => {
      let response: string;
      if (mood && moodPrompts[mood].length > messages.length) {
        response = moodPrompts[mood][messages.length % moodPrompts[mood].length];
      } else {
        response = "I understand. Would you like to try some mindfulness exercises?";
      }

      setMessages(prev => [...prev, { text: response, sender: 'ai' }]);
      if (isSpeechEnabled) {
        speak(response);
      }
    }, 1000);
  };

  const handleComplete = () => {
    const notes = messages
      .filter(m => m.sender === 'user')
      .map(m => m.text)
      .join('\n');
    onSaveMood(notes);
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
            <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              AI Therapist
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isSpeechEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
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

        <div className="h-96 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {isBreathing && (
          <div className="mb-4 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="text-center">
              <Brain className="h-8 w-8 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                {breathingExercises[mood === 'anxious' || mood === 'stressed' ? mood : 'anxious'].instructions[breathingStep]}
              </p>
            </div>
          </div>
        )}

        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>

        <div className="flex space-x-4 mt-4">
          <button
            onClick={startBreathingExercise}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Brain className="h-5 w-5" />
            <span>Breathing Exercise</span>
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Session
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}