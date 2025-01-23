import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Heart, 
  Activity, 
  Smile, 
  TrendingUp 
} from 'lucide-react';

interface Stat {
  id: string;
  label: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
}

export default function StatsBar() {
  const stats: Stat[] = [
    {
      id: 'mood',
      label: 'Mood Score',
      value: '85',
      change: 5,
      icon: Smile,
      color: 'text-yellow-500'
    },
    {
      id: 'stress',
      label: 'Stress Level',
      value: 'Low',
      change: -10,
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      id: 'meditation',
      label: 'Meditation',
      value: '45m',
      change: 15,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: 'activity',
      label: 'Activity',
      value: '6.2k',
      change: 8,
      icon: Activity,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp 
                    className={`h-4 w-4 ${
                      isPositive ? 'text-green-500' : 'text-red-500'
                    }`} 
                    style={{ 
                      transform: isPositive ? 'none' : 'rotate(180deg)' 
                    }}
                  />
                  <span className={`text-sm font-medium ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 