import { Brain, Heart, Salad, Sparkles, Activity, Moon, Sun, LineChart } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Feature {
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  route?: string;
}

export const features: Feature[] = [
  {
    name: 'Smart Nutrition',
    description: 'AI-powered meal plans tailored to your dietary preferences and goals.',
    icon: Salad,
    gradient: 'from-green-500 to-emerald-500',
    route: '/nutrition'
  },
  {
    name: 'Fitness Tracking',
    description: 'Adaptive workout plans that evolve with your progress.',
    icon: Activity,
    gradient: 'from-blue-500 to-indigo-500',
    route: '/fitness'
  },
  {
    name: 'Mental Wellness',
    description: 'Guided meditation and mindfulness exercises for mental balance.',
    icon: Brain,
    gradient: 'from-purple-500 to-pink-500',
    route: '/mental-wellness'
  },
  {
    name: 'Sleep Analysis',
    description: 'Track and improve your sleep patterns for better recovery.',
    icon: Moon,
    gradient: 'from-indigo-500 to-purple-500'
  },
  {
    name: 'Health Metrics',
    description: 'Monitor vital health indicators and track your progress.',
    icon: Heart,
    gradient: 'from-red-500 to-pink-500'
  },
  {
    name: 'Progress Analytics',
    description: 'Detailed insights and analytics to optimize your wellness journey.',
    icon: LineChart,
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    name: 'Daily Routines',
    description: 'Build and maintain healthy habits with smart reminders.',
    icon: Sun,
    gradient: 'from-orange-500 to-yellow-500'
  },
  {
    name: 'AI Coach',
    description: 'Get personalized recommendations and guidance from our AI wellness coach.',
    icon: Sparkles,
    gradient: 'from-violet-500 to-purple-500'
  }
];