import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface MacroDistributionProps {
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  goals: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

export default function MacroDistribution({ macros = { protein: 0, carbs: 0, fat: 0 }, goals }: MacroDistributionProps) {
  const data = [
    { name: 'Protein', value: macros.protein || 0, goal: goals.protein, color: '#EF4444' },
    { name: 'Carbs', value: macros.carbs || 0, goal: goals.carbs, color: '#3B82F6' },
    { name: 'Fat', value: macros.fat || 0, goal: goals.fat, color: '#F59E0B' }
  ];

  return (
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
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-3 gap-4 mt-4 text-center">
        {data.map((macro) => (
          <div key={macro.name}>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {macro.value}g / {macro.goal}g
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {macro.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}