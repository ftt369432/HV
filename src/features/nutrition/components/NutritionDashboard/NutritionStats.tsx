import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Apple, Droplet, Dumbbell } from 'lucide-react';

interface NutritionStatsProps {
  calories: {
    consumed: number;
    goal: number;
  };
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  water: {
    consumed: number;
    goal: number;
  };
}

export default function NutritionStats({ calories, macros, water }: NutritionStatsProps) {
  const macroData = [
    { name: 'Protein', value: macros.protein, color: '#EF4444' },
    { name: 'Carbs', value: macros.carbs, color: '#3B82F6' },
    { name: 'Fat', value: macros.fat, color: '#F59E0B' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Apple className="h-6 w-6 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Calories
          </h3>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {calories.consumed}
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            / {calories.goal}
          </span>
        </div>
        <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-full bg-green-500 rounded-full"
            style={{
              width: `${Math.min((calories.consumed / calories.goal) * 100, 100)}%`
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Dumbbell className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Macros
          </h3>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {macroData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Droplet className="h-6 w-6 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Water Intake
          </h3>
        </div>
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {water.consumed}ml
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
            / {water.goal}ml
          </span>
        </div>
        <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{
              width: `${Math.min((water.consumed / water.goal) * 100, 100)}%`
            }}
          />
        </div>
      </div>
    </div>
  );
}