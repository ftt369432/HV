import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Droplet, Moon, Apple, Brain, Flame } from 'lucide-react';
import MetricCard from './MetricCard';
import { useWellness } from '../../contexts/WellnessContext';
import Collapsible from '../shared/Collapsible';

export default function SystemsBar() {
  const { stats, updateMetric } = useWellness();
  const navigate = useNavigate();

  const handleQuickAdd = (metric: keyof typeof stats, increment: number) => {
    const currentValue = stats[metric].current;
    updateMetric(metric, currentValue + increment);
  };

  const handleMetricClick = (route: string) => {
    navigate(route);
  };

  return (
    <Collapsible
      title="Daily Progress"
      icon={<Activity className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
      className="fixed bottom-24 left-6 right-6 transition-all duration-200"
      contentClassName="p-4"
    >
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div onClick={() => handleMetricClick('/nutrition')} className="cursor-pointer">
          <MetricCard
            icon={Apple}
            label="Nutrition"
            current={stats.nutrition.current}
            target={stats.nutrition.target}
            unit="kcal"
            color="text-green-500"
            percentage={stats.nutrition.percentage}
            onQuickAdd={() => handleQuickAdd('nutrition', 200)}
            quickAddLabel="+200kcal"
          />
        </div>
        
        <div onClick={() => handleMetricClick('/mental-wellness')} className="cursor-pointer">
          <MetricCard
            icon={Brain}
            label="Mental Wellness"
            current={stats.mental ? stats.mental.current : 0}
            target={stats.mental ? stats.mental.target : 100}
            unit="points"
            color="text-purple-500"
            percentage={stats.mental ? stats.mental.percentage : 0}
            quickAddLabel="Check In"
          />
        </div>
        
        <MetricCard
          icon={Droplet}
          label="Water"
          current={stats.water.current}
          target={stats.water.target}
          unit="L"
          color="text-cyan-500"
          percentage={stats.water.percentage}
          onQuickAdd={() => handleQuickAdd('water', 0.25)}
          quickAddLabel="+250ml"
        />
        
        <MetricCard
          icon={Activity}
          label="Steps"
          current={stats.steps.current}
          target={stats.steps.target}
          unit="steps"
          color="text-blue-500"
          percentage={stats.steps.percentage}
          onQuickAdd={() => handleQuickAdd('steps', 1000)}
          quickAddLabel="+1k steps"
        />
        
        <MetricCard
          icon={Flame}
          label="Burned"
          current={stats.calories.current}
          target={stats.calories.target}
          unit="kcal"
          color="text-orange-500"
          percentage={stats.calories.percentage}
          onQuickAdd={() => handleQuickAdd('calories', 100)}
          quickAddLabel="+100kcal"
        />
      </div>
    </Collapsible>
  );
}