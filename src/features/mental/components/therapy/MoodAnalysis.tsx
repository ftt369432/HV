import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MoodType } from '../../../../components/AIAssistant/types';
import { useMentalWellnessStore } from '../../stores/mentalWellnessStore';
import { generateMoodInsights } from '../../utils/moodUtils';

interface MoodAnalysisProps {
  initialMood: MoodType;
  sessionNotes: string;
  onComplete: () => void;
}

export default function MoodAnalysis({ initialMood, sessionNotes, onComplete }: MoodAnalysisProps) {
  const { moodEntries } = useMentalWellnessStore();
  const insights = generateMoodInsights(initialMood, sessionNotes, moodEntries);

  const moodData = moodEntries.slice(-7).map(entry => ({
    date: new Date(entry.timestamp).toLocaleDateString(),
    value: getMoodValue(entry.mood)
  }));

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Mood Trends
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: '#8884d8' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Session Insights
        </h3>
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-700 dark:text-gray-300">{insight}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Complete Analysis
      </button>
    </div>
  );
}

function getMoodValue(mood: MoodType): number {
  const moodValues: Record<MoodType, number> = {
    anxious: 2,
    stressed: 1,
    tired: 3,
    calm: 4,
    energetic: 5
  };
  return moodValues[mood];
}