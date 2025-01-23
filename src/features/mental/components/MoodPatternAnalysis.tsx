import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { MoodType } from '../../../components/AIAssistant/types';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';

const MOOD_COLORS = {
  anxious: '#FCD34D',
  stressed: '#F87171',
  tired: '#C084FC',
  calm: '#60A5FA',
  energetic: '#4ADE80'
};

export default function MoodPatternAnalysis() {
  const { moodEntries } = useMentalWellnessStore();

  const moodFrequency = moodEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  const data = Object.entries(moodFrequency).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Mood Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={MOOD_COLORS[entry.name.toLowerCase() as MoodType]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}