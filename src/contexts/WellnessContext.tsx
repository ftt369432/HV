import React, { createContext, useContext, useState, useEffect } from 'react';
import { WellnessStats, MetricProgress } from '../components/SystemsBar/types';

interface WellnessContextType {
  stats: WellnessStats;
  updateMetric: (metric: keyof WellnessStats, value: number) => void;
  resetDailyStats: () => void;
}

const defaultStats: WellnessStats = {
  steps: { current: 0, target: 10000, percentage: 0 },
  water: { current: 0, target: 2.5, percentage: 0 },
  sleep: { current: 0, target: 8, percentage: 0 },
  nutrition: { current: 0, target: 2000, percentage: 0 },
  calories: { current: 0, target: 600, percentage: 0 },
  mental: { current: 0, target: 100, percentage: 0 }
};

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<WellnessStats>(() => {
    const saved = localStorage.getItem('wellnessStats');
    return saved ? JSON.parse(saved) : defaultStats;
  });

  useEffect(() => {
    localStorage.setItem('wellnessStats', JSON.stringify(stats));
  }, [stats]);

  const calculatePercentage = (current: number, target: number): number => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  const updateMetric = (metric: keyof WellnessStats, value: number) => {
    setStats(prev => ({
      ...prev,
      [metric]: {
        ...prev[metric],
        current: value,
        percentage: calculatePercentage(value, prev[metric].target)
      }
    }));
  };

  const resetDailyStats = () => {
    setStats(defaultStats);
  };

  useEffect(() => {
    const lastReset = localStorage.getItem('lastStatsReset');
    const today = new Date().toDateString();

    if (lastReset !== today) {
      resetDailyStats();
      localStorage.setItem('lastStatsReset', today);
    }
  }, []);

  return (
    <WellnessContext.Provider value={{ stats, updateMetric, resetDailyStats }}>
      {children}
    </WellnessContext.Provider>
  );
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (context === undefined) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
}