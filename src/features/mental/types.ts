import { MeditationType, MoodType, StressLevel } from '../../components/AIAssistant/types';

export interface MeditationSession {
  id: string;
  type: MeditationType;
  duration: number;
  completedAt: Date;
  notes?: string;
}

export interface MoodEntry {
  id: string;
  mood: MoodType;
  stressLevel: StressLevel;
  notes: string;
  timestamp: Date;
}

export interface JournalEntry {
  id: string;
  content: string;
  mood: MoodType;
  tags: string[];
  createdAt: Date;
}

export interface MentalWellnessStats {
  totalMeditationMinutes: number;
  weeklyMeditationStreak: number;
  monthlyMoodTrend: MoodType[];
  averageStressLevel: StressLevel;
}