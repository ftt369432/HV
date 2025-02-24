import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FitnessLevel, WorkoutGoal } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface PhysicalStats {
  level: FitnessLevel;
  goal: WorkoutGoal;
  weeklyWorkouts: number;
  activeMinutes: number;
  stepsToday: number;
  caloriesBurned: number;
}

const PhysicalWellness: React.FC = () => {
  const [stats] = useState<PhysicalStats>({
    level: 'intermediate',
    goal: 'strength',
    weeklyWorkouts: 3,
    activeMinutes: 150,
    stepsToday: 7500,
    caloriesBurned: 450
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('start workout')) {
      window.location.href = '/physical/workout';
    } else if (command.includes('show exercises')) {
      window.location.href = '/physical/exercises';
    } else if (command.includes('track activity')) {
      window.location.href = '/physical/activity';
    } else if (command.includes('stats')) {
      voiceService.speak(
        `You've completed ${stats.weeklyWorkouts} workouts this week, ` +
        `with ${stats.activeMinutes} active minutes and ${stats.stepsToday} steps today.`
      );
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
        <h1 className="text-3xl font-bold">Physical Wellness</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Quick Stats */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Progress</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Steps</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold">{stats.stepsToday}</span>
              <span className="ml-2 text-sm text-gray-500">/ 10,000</span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Minutes</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold">{stats.activeMinutes}</span>
              <span className="ml-2 text-sm text-gray-500">min</span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Calories Burned</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold">{stats.caloriesBurned}</span>
              <span className="ml-2 text-sm text-gray-500">kcal</span>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Weekly Workouts</h3>
            <div className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold">{stats.weeklyWorkouts}</span>
              <span className="ml-2 text-sm text-gray-500">/ 5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/physical/workout"
            className="p-6 bg-green-50 rounded-lg hover:bg-green-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Start Workout</h3>
            <p className="text-gray-600">Begin your training session</p>
          </Link>
          <Link
            to="/physical/exercises"
            className="p-6 bg-blue-50 rounded-lg hover:bg-blue-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Exercise Library</h3>
            <p className="text-gray-600">Browse exercises and techniques</p>
          </Link>
          <Link
            to="/physical/activity"
            className="p-6 bg-purple-50 rounded-lg hover:bg-purple-100 text-center"
          >
            <h3 className="text-xl font-medium mb-2">Activity Tracking</h3>
            <p className="text-gray-600">Monitor your daily movement</p>
          </Link>
        </div>
      </section>

      {/* Profile & Goals */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Fitness Level</h3>
            <select
              value={stats.level}
              className="w-full p-2 border rounded"
              disabled
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Current Goal</h3>
            <select
              value={stats.goal}
              className="w-full p-2 border rounded"
              disabled
            >
              <option value="strength">Strength Training</option>
              <option value="cardio">Cardio Fitness</option>
              <option value="flexibility">Flexibility</option>
              <option value="weightLoss">Weight Loss</option>
            </select>
          </div>
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Start workout"</li>
          <li>"Show exercises"</li>
          <li>"Track activity"</li>
          <li>"What are my stats?"</li>
        </ul>
      </section>
    </div>
  );
};

export default PhysicalWellness; 