import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface ActivityStats {
  steps: number;
  activeMinutes: number;
  caloriesBurned: number;
  distanceKm: number;
  heartRate: number;
  activities: {
    timestamp: Date;
    type: string;
    duration: number;
    calories: number;
  }[];
}

const ActivityTracker: React.FC = () => {
  const [stats, setStats] = useState<ActivityStats>({
    steps: 7842,
    activeMinutes: 45,
    caloriesBurned: 320,
    distanceKm: 5.2,
    heartRate: 72,
    activities: [
      {
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: 'Walking',
        duration: 30,
        calories: 150
      },
      {
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        type: 'Running',
        duration: 15,
        calories: 170
      }
    ]
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('add activity')) {
      // TODO: Implement activity addition via voice
      voiceService.speak('Activity tracking feature coming soon');
    } else if (command.includes('daily stats')) {
      voiceService.speak(
        `You've taken ${stats.steps} steps today, ` +
        `been active for ${stats.activeMinutes} minutes, ` +
        `and burned ${stats.caloriesBurned} calories.`
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

  const getProgressColor = (current: number, target: number): string => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Activity Tracker</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Daily Progress */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Steps */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Steps</h3>
            <div className="mt-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold">{stats.steps}</span>
                <span className="ml-2 text-sm text-gray-500">/ 10,000</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor(stats.steps, 10000)}`}
                  style={{ width: `${Math.min((stats.steps / 10000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Minutes */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Minutes</h3>
            <div className="mt-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold">{stats.activeMinutes}</span>
                <span className="ml-2 text-sm text-gray-500">/ 60</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor(stats.activeMinutes, 60)}`}
                  style={{ width: `${Math.min((stats.activeMinutes / 60) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Calories */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Calories Burned</h3>
            <div className="mt-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold">{stats.caloriesBurned}</span>
                <span className="ml-2 text-sm text-gray-500">kcal</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor(stats.caloriesBurned, 500)}`}
                  style={{ width: `${Math.min((stats.caloriesBurned / 500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Distance</h3>
            <div className="mt-2">
              <div className="flex items-baseline">
                <span className="text-3xl font-semibold">{stats.distanceKm}</span>
                <span className="ml-2 text-sm text-gray-500">km</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full ${getProgressColor(stats.distanceKm, 8)}`}
                  style={{ width: `${Math.min((stats.distanceKm / 8) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heart Rate Monitor */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Heart Rate</h2>
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <span className="text-4xl font-bold text-red-500">{stats.heartRate}</span>
            <span className="ml-2 text-gray-500">BPM</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            {stats.heartRate < 60 ? 'Resting' :
             stats.heartRate < 100 ? 'Normal' :
             stats.heartRate < 140 ? 'Active' : 'Intense'}
          </p>
        </div>
      </section>

      {/* Activity History */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {stats.activities.map((activity, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{activity.type}</h3>
                  <p className="text-sm text-gray-500">
                    {activity.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{activity.duration} minutes</p>
                  <p className="text-sm text-gray-500">{activity.calories} kcal</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Activity Button */}
      <section className="mb-8 text-center">
        <button
          onClick={() => {/* TODO: Implement activity addition */}}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Log New Activity
        </button>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Add activity [walking/running/cycling]"</li>
          <li>"What are my daily stats?"</li>
          <li>"Show my heart rate"</li>
        </ul>
      </section>
    </div>
  );
};

export default ActivityTracker; 