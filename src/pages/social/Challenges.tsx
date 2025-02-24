import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'mental' | 'physical' | 'nutrition' | 'social';
  duration: number; // in days
  participants: number;
  difficulty: 'easy' | 'medium' | 'hard';
  startDate: string;
  progress?: number;
  rewards: string[];
}

const sampleChallenges: Challenge[] = [
  {
    id: '1',
    title: '7 Days of Mindfulness',
    description: 'Practice daily meditation and mindfulness exercises',
    category: 'mental',
    duration: 7,
    participants: 128,
    difficulty: 'easy',
    startDate: '2024-03-01',
    progress: 57,
    rewards: ['Mindfulness Badge', 'Meditation Timer Pro']
  },
  {
    id: '2',
    title: '30-Day Fitness Challenge',
    description: 'Daily workouts combining cardio and strength training',
    category: 'physical',
    duration: 30,
    participants: 256,
    difficulty: 'hard',
    startDate: '2024-03-15',
    rewards: ['Fitness Warrior Badge', 'Premium Workout Plan']
  },
  {
    id: '3',
    title: 'Plant-Based Week',
    description: 'Try a plant-based diet for one week',
    category: 'nutrition',
    duration: 7,
    participants: 92,
    difficulty: 'medium',
    startDate: '2024-03-10',
    rewards: ['Green Eater Badge', 'Vegan Cookbook']
  }
];

const Challenges: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(sampleChallenges);
  const [activeFilter, setActiveFilter] = useState<Challenge['category'] | 'all'>('all');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('show') && command.includes('challenges')) {
      if (command.includes('mental')) {
        setActiveFilter('mental');
        voiceService.speak('Showing mental wellness challenges');
      } else if (command.includes('physical')) {
        setActiveFilter('physical');
        voiceService.speak('Showing physical fitness challenges');
      } else if (command.includes('nutrition')) {
        setActiveFilter('nutrition');
        voiceService.speak('Showing nutrition challenges');
      } else if (command.includes('social')) {
        setActiveFilter('social');
        voiceService.speak('Showing social challenges');
      } else if (command.includes('all')) {
        setActiveFilter('all');
        voiceService.speak('Showing all challenges');
      }
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

  const filteredChallenges = challenges.filter(challenge =>
    activeFilter === 'all' || challenge.category === activeFilter
  );

  const getCategoryColor = (category: Challenge['category']) => {
    switch (category) {
      case 'mental':
        return 'bg-purple-100 text-purple-600';
      case 'physical':
        return 'bg-blue-100 text-blue-600';
      case 'nutrition':
        return 'bg-green-100 text-green-600';
      case 'social':
        return 'bg-yellow-100 text-yellow-600';
    }
  };

  const getDifficultyColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-600';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600';
      case 'hard':
        return 'bg-red-100 text-red-600';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Wellness Challenges</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Category Filters */}
      <section className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'mental', 'physical', 'nutrition', 'social'].map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category as Challenge['category'] | 'all')}
              className={`px-4 py-2 rounded-full capitalize ${
                activeFilter === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Challenges Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map(challenge => (
          <div key={challenge.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(challenge.category)}`}>
                  {challenge.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium">{challenge.duration} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Participants:</span>
                  <span className="font-medium">{challenge.participants}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Starts:</span>
                  <span className="font-medium">{challenge.startDate}</span>
                </div>
              </div>
              {challenge.progress !== undefined && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                </div>
              )}
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Rewards:</h4>
                <div className="flex flex-wrap gap-2">
                  {challenge.rewards.map((reward, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-yellow-50 text-yellow-600 rounded text-sm"
                    >
                      {reward}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t">
              <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Join Challenge
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Voice Commands */}
      <section className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Show all challenges"</li>
          <li>"Show mental challenges"</li>
          <li>"Show physical challenges"</li>
          <li>"Show nutrition challenges"</li>
        </ul>
      </section>
    </div>
  );
};

export default Challenges; 