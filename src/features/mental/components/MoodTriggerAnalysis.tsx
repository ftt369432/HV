import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useMentalWellnessStore } from '../stores/mentalWellnessStore';
import { analyzeMoodTriggers } from '../utils/moodUtils';

export default function MoodTriggerAnalysis() {
  const { moodEntries } = useMentalWellnessStore();
  const triggers = analyzeMoodTriggers(moodEntries);

  const data = Object.entries(triggers).map(([trigger, count]) => ({
    name: trigger.charAt(0).toUpperCase() + trigger.slice(1),
    count
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Common Mood Triggers
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}