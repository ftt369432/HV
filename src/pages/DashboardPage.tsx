import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Brain, 
  Heart, 
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react';

interface HealthMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface Activity {
  id: string;
  type: string;
  duration: string;
  time: string;
}

export default function DashboardPage() {
  const metrics: HealthMetric[] = [
    {
      id: '1',
      label: 'Average Mood',
      value: '85/100',
      change: 5,
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      id: '2',
      label: 'Meditation Time',
      value: '45 mins',
      change: 15,
      icon: Heart,
      color: 'text-red-500'
    },
    {
      id: '3',
      label: 'Social Connections',
      value: '12 friends',
      change: 2,
      icon: Users,
      color: 'text-blue-500'
    }
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'Meditation Session',
      duration: '15 minutes',
      time: '2 hours ago'
    },
    {
      id: '2',
      type: 'Mood Check-in',
      duration: 'Feeling Great',
      time: '4 hours ago'
    },
    {
      id: '3',
      type: 'Journal Entry',
      duration: 'Daily Reflection',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Welcome back! Here's your wellness overview.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isPositive = metric.change > 0;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-900 ${metric.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {metric.label}
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {metric.value}
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
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Activities
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {recentActivities.map((activity) => (
            <div 
              key={activity.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Activity className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.type}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 