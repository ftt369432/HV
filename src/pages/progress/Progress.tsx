import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface ProgressStats {
  mentalWellness: {
    meditationMinutes: number;
    journalEntries: number;
    moodScore: number;
    streakDays: number;
  };
  physicalWellness: {
    workoutsCompleted: number;
    activeMinutes: number;
    caloriesBurned: number;
    stepsCount: number;
  };
  nutrition: {
    waterIntake: number;
    mealsLogged: number;
    healthyMeals: number;
    caloriesAvg: number;
  };
  social: {
    challengesCompleted: number;
    connections: number;
    eventsAttended: number;
    discussionsParticipated: number;
  };
}

const Progress: React.FC = () => {
  const [stats] = useState<ProgressStats>({
    mentalWellness: {
      meditationMinutes: 420,
      journalEntries: 15,
      moodScore: 85,
      streakDays: 7
    },
    physicalWellness: {
      workoutsCompleted: 12,
      activeMinutes: 840,
      caloriesBurned: 4500,
      stepsCount: 85000
    },
    nutrition: {
      waterIntake: 45,
      mealsLogged: 42,
      healthyMeals: 35,
      caloriesAvg: 2100
    },
    social: {
      challengesCompleted: 3,
      connections: 24,
      eventsAttended: 2,
      discussionsParticipated: 8
    }
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('mental progress')) {
      voiceService.speak(
        `In mental wellness, you've meditated for ${stats.mentalWellness.meditationMinutes} minutes, ` +
        `made ${stats.mentalWellness.journalEntries} journal entries, and maintained a ` +
        `${stats.mentalWellness.streakDays} day streak.`
      );
    } else if (command.includes('physical progress')) {
      voiceService.speak(
        `In physical wellness, you've completed ${stats.physicalWellness.workoutsCompleted} workouts, ` +
        `been active for ${stats.physicalWellness.activeMinutes} minutes, and ` +
        `burned ${stats.physicalWellness.caloriesBurned} calories.`
      );
    } else if (command.includes('nutrition progress')) {
      voiceService.speak(
        `In nutrition, you've logged ${stats.nutrition.mealsLogged} meals, ` +
        `${stats.nutrition.healthyMeals} of which were healthy meals, and ` +
        `consumed an average of ${stats.nutrition.caloriesAvg} calories.`
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

  const getProgressColor = (percentage: number): string => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-blue-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Progress Overview</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Mental Wellness Progress */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mental Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Meditation</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.mentalWellness.meditationMinutes}m</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${(stats.mentalWellness.meditationMinutes / 600) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Journal Entries</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.mentalWellness.journalEntries}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stats.mentalWellness.journalEntries / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Mood Score</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.mentalWellness.moodScore}%</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor(stats.mentalWellness.moodScore)}`}
                  style={{ width: `${stats.mentalWellness.moodScore}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Streak</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.mentalWellness.streakDays} days</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(stats.mentalWellness.streakDays / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Physical Wellness Progress */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Physical Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Workouts</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.physicalWellness.workoutsCompleted}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stats.physicalWellness.workoutsCompleted / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Minutes</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.physicalWellness.activeMinutes}m</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(stats.physicalWellness.activeMinutes / 1200) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Calories Burned</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.physicalWellness.caloriesBurned}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-orange-500"
                  style={{ width: `${(stats.physicalWellness.caloriesBurned / 5000) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Steps</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.physicalWellness.stepsCount}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stats.physicalWellness.stepsCount / 100000) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Progress */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Water (L)</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.nutrition.waterIntake}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stats.nutrition.waterIntake / 50) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Meals Logged</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.nutrition.mealsLogged}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(stats.nutrition.mealsLogged / 50) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Healthy Meals</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.nutrition.healthyMeals}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor((stats.nutrition.healthyMeals / stats.nutrition.mealsLogged) * 100)}`}
                  style={{ width: `${(stats.nutrition.healthyMeals / stats.nutrition.mealsLogged) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Avg. Calories</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.nutrition.caloriesAvg}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(stats.nutrition.caloriesAvg / 2500) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Progress */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Social</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Challenges</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.social.challengesCompleted}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${(stats.social.challengesCompleted / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Connections</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.social.connections}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${(stats.social.connections / 30) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Events</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.social.eventsAttended}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${(stats.social.eventsAttended / 5) * 100}%` }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Discussions</h3>
            <div className="mt-2">
              <div className="text-3xl font-semibold">{stats.social.discussionsParticipated}</div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-500"
                  style={{ width: `${(stats.social.discussionsParticipated / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Show my mental wellness progress"</li>
          <li>"Show my physical wellness progress"</li>
          <li>"Show my nutrition progress"</li>
        </ul>
      </section>
    </div>
  );
};

export default Progress; 