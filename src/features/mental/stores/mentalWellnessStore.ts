import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MeditationSession, MoodEntry, JournalEntry, MentalWellnessStats } from '../types';
import { startOfDay } from 'date-fns';

interface MentalWellnessState {
  meditationSessions: MeditationSession[];
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  stats: MentalWellnessStats;
  addMeditationSession: (session: Omit<MeditationSession, 'id'>) => void;
  addMoodEntry: (entry: Omit<MoodEntry, 'id'>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  getStats: () => MentalWellnessStats;
}

export const useMentalWellnessStore = create<MentalWellnessState>()(
  persist(
    (set, get) => ({
      meditationSessions: [],
      moodEntries: [],
      journalEntries: [],
      stats: {
        totalMeditationMinutes: 0,
        weeklyMeditationStreak: 0,
        monthlyMoodTrend: [],
        averageStressLevel: 'moderate'
      },
      addMeditationSession: (session) => {
        const newSession = { ...session, id: Date.now().toString() };
        set((state) => ({
          meditationSessions: [...state.meditationSessions, newSession],
          stats: {
            ...state.stats,
            totalMeditationMinutes: state.stats.totalMeditationMinutes + session.duration
          }
        }));
      },
      addMoodEntry: (entry) => {
        const newEntry = { ...entry, id: Date.now().toString() };
        set((state) => ({
          moodEntries: [...state.moodEntries, newEntry],
          stats: {
            ...state.stats,
            monthlyMoodTrend: [...state.stats.monthlyMoodTrend, entry.mood].slice(-30)
          }
        }));
      },
      addJournalEntry: (entry) => {
        const newEntry = { ...entry, id: Date.now().toString() };
        set((state) => ({
          journalEntries: [...state.journalEntries, newEntry]
        }));
      },
      getStats: () => {
        return get().stats;
      }
    }),
    {
      name: 'mental-wellness-storage'
    }
  )
);