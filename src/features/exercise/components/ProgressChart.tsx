import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useTheme } from '../../../contexts/ThemeContext';
import { useWorkoutStore } from '../stores/workoutStore';
import { format, subDays } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ProgressChart() {
  const { isCyberpunk } = useTheme();
  const workouts = useWorkoutStore(state => state.workouts);

  // Generate last 7 days dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), i);
    return format(date, 'yyyy-MM-dd');
  }).reverse();

  // Prepare data for the chart
  const data = {
    labels: dates.map(date => format(new Date(date), 'EEE')),
    datasets: [
      {
        label: 'Duration (minutes)',
        data: dates.map(date => {
          const workout = workouts.find(w => w.date === date);
          return workout ? workout.duration : 0;
        }),
        borderColor: isCyberpunk ? '#8B5CF6' : '#6366F1',
        backgroundColor: isCyberpunk 
          ? 'rgba(139, 92, 246, 0.1)'
          : 'rgba(99, 102, 241, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isCyberpunk ? '#A855F7' : '#818CF8',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Calories Burned',
        data: dates.map(date => {
          const workout = workouts.find(w => w.date === date);
          return workout ? workout.caloriesBurned : 0;
        }),
        borderColor: isCyberpunk ? '#EC4899' : '#F472B6',
        backgroundColor: isCyberpunk
          ? 'rgba(236, 72, 153, 0.1)'
          : 'rgba(244, 114, 182, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: isCyberpunk ? '#DB2777' : '#EC4899',
        pointBorderColor: '#fff',
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: isCyberpunk ? '#E5E7EB' : '#4B5563',
          font: {
            family: 'Inter, system-ui, sans-serif',
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: isCyberpunk ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: isCyberpunk ? '#E5E7EB' : '#1F2937',
        bodyColor: isCyberpunk ? '#E5E7EB' : '#4B5563',
        borderColor: isCyberpunk ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: isCyberpunk ? '#9CA3AF' : '#6B7280'
        }
      },
      y: {
        grid: {
          color: isCyberpunk ? 'rgba(75, 85, 99, 0.2)' : 'rgba(243, 244, 246, 0.8)'
        },
        ticks: {
          color: isCyberpunk ? '#9CA3AF' : '#6B7280'
        }
      }
    }
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
} 