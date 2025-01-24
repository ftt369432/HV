import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame, Timer, Zap } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useWorkoutStore } from '../stores/workoutStore';

export default function WorkoutStats() {
  const { isCyberpunk } = useTheme();
  const stats = useWorkoutStore(state => state.getTotalStats());

  const statCards = [
    {
      title: 'Total Workouts',
      value: stats.totalWorkouts,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      trend: '+12%'
    },
    {
      title: 'Calories Burned',
      value: stats.caloriesBurned.toLocaleString(),
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      trend: '+8%'
    },
    {
      title: 'Active Minutes',
      value: `${Math.floor(stats.totalDuration / 60)}h ${stats.totalDuration % 60}m`,
      icon: Timer,
      color: 'from-cyan-500 to-blue-500',
      trend: '+15%'
    },
    {
      title: 'Current Streak',
      value: `${stats.streakDays} days`,
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      trend: 'Best: 14'
    }
  ];

  return (
    <>
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${
              isCyberpunk
                ? 'bg-black/20 backdrop-blur-sm border border-white/10'
                : 'bg-white/10 backdrop-blur-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs text-white/80">{stat.trend}</span>
            </div>
            <div className="mt-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <p className="text-sm text-white/80">{stat.title}</p>
            </div>
          </motion.div>
        );
      })}
    </>
  );
} 