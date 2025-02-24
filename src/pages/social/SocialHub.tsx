import React, { useState } from 'react';
import { Smile, Brain, Heart, Activity, Users, Trophy, Calendar } from 'lucide-react';
import PageStatsBar, { StatItem } from '../../components/shared/PageStatsBar';

interface SocialStats {
  connections: number;
  challengesCompleted: number;
  weeklyInteractions: number;
  dayStreak: number;
}

const SocialHub: React.FC = () => {
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);

  const headerStats: StatItem[] = [
    {
      icon: <Smile className="h-5 w-5" />,
      label: "Mood Score",
      value: "85",
      change: 5,
      color: "text-yellow-500"
    },
    {
      icon: <Brain className="h-5 w-5" />,
      label: "Stress Level",
      value: "Low",
      change: -10,
      color: "text-purple-500"
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Meditation",
      value: "45m",
      change: 15,
      color: "text-red-500"
    },
    {
      icon: <Activity className="h-5 w-5" />,
      label: "Activity",
      value: "6.2k",
      change: 8,
      color: "text-green-500"
    }
  ];

  const socialStats: SocialStats = {
    connections: 24,
    challengesCompleted: 8,
    weeklyInteractions: 15,
    dayStreak: 7
  };

  const toggleVoiceAssistant = () => {
    setIsVoiceAssistantActive(!isVoiceAssistantActive);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageStatsBar stats={headerStats} />

      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Social Hub
          </h1>
          <button
            onClick={toggleVoiceAssistant}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isVoiceAssistantActive ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Social Stats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-3xl font-bold text-blue-600">{socialStats.connections}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Connections</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <Trophy className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-3xl font-bold text-green-600">{socialStats.challengesCompleted}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Challenges Completed</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <Activity className="h-8 w-8 text-purple-500 mb-2" />
              <div className="text-3xl font-bold text-purple-600">{socialStats.weeklyInteractions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Weekly Interactions</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <Calendar className="h-8 w-8 text-orange-500 mb-2" />
              <div className="text-3xl font-bold text-orange-600">{socialStats.dayStreak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Connections</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">View and manage your connections</p>
            <div className="text-blue-600 dark:text-blue-400 text-sm">3 active chats</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Challenges</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Join wellness challenges</p>
            <div className="text-green-600 dark:text-green-400 text-sm">2 active challenges</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Events</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Upcoming community events</p>
            <div className="text-purple-600 dark:text-purple-400 text-sm">2 upcoming</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SocialHub; 