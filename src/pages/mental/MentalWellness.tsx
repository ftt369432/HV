import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoodType, StressLevel, MentalWellnessPlan } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

const MentalWellness: React.FC = () => {
  const [currentMood, setCurrentMood] = useState<MoodType>('calm');
  const [stressLevel, setStressLevel] = useState<StressLevel>('low');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('start meditation')) {
      window.location.href = '/mental/meditation';
    } else if (command.includes('how am i feeling')) {
      voiceService.speak(`Your current mood is ${currentMood} and your stress level is ${stressLevel}`);
    } else if (command.includes('new journal')) {
      window.location.href = '/mental/journal';
    }
  };

  const toggleVoiceAssistant = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      voiceService.startListening(
        handleVoiceCommand,
        (error) => console.error('Voice recognition error:', error)
      );
      setIsListening(true);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mental Wellness</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/mental/meditation"
            className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Start Meditation</h3>
            <p className="text-gray-600">Find peace and clarity</p>
          </Link>
          <Link
            to="/mental/mood"
            className="p-6 bg-green-50 rounded-lg hover:bg-green-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Track Mood</h3>
            <p className="text-gray-600">Monitor your emotional well-being</p>
          </Link>
          <Link
            to="/mental/journal"
            className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Journal Entry</h3>
            <p className="text-gray-600">Express your thoughts</p>
          </Link>
        </div>
      </section>

      {/* Current Status */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Mood</h3>
            <select
              value={currentMood}
              onChange={(e) => setCurrentMood(e.target.value as MoodType)}
              className="w-full p-2 border rounded"
            >
              <option value="calm">Calm</option>
              <option value="anxious">Anxious</option>
              <option value="stressed">Stressed</option>
              <option value="tired">Tired</option>
              <option value="energetic">Energetic</option>
            </select>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Stress Level</h3>
            <select
              value={stressLevel}
              onChange={(e) => setStressLevel(e.target.value as StressLevel)}
              className="w-full p-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Start meditation session"</li>
          <li>"How am I feeling today?"</li>
          <li>"Create new journal entry"</li>
          <li>"Show me stress management tips"</li>
        </ul>
      </section>
    </div>
  );
};

export default MentalWellness; 