import { MoodType } from '../../../components/AIAssistant/types';
import { MoodEntry } from '../types';

export function analyzeMoodTriggers(entries: MoodEntry[]): Record<string, number> {
  const triggers: Record<string, number> = {
    work: 0,
    relationships: 0,
    health: 0,
    sleep: 0,
    environment: 0
  };

  entries.forEach(entry => {
    const notes = entry.notes.toLowerCase();
    
    // Work-related triggers
    if (notes.includes('work') || notes.includes('job') || notes.includes('career')) {
      triggers.work++;
    }

    // Relationship triggers
    if (notes.includes('family') || notes.includes('friend') || notes.includes('relationship')) {
      triggers.relationships++;
    }

    // Health triggers
    if (notes.includes('health') || notes.includes('exercise') || notes.includes('eating')) {
      triggers.health++;
    }

    // Sleep triggers
    if (notes.includes('sleep') || notes.includes('tired') || notes.includes('rest')) {
      triggers.sleep++;
    }

    // Environmental triggers
    if (notes.includes('weather') || notes.includes('noise') || notes.includes('environment')) {
      triggers.environment++;
    }
  });

  return triggers;
}

export function generateMoodInsights(
  currentMood: MoodType,
  sessionNotes: string,
  moodHistory: MoodEntry[]
): string[] {
  const insights: string[] = [];

  // Analyze mood patterns
  const recentMoods = moodHistory.slice(-7);
  const moodFrequency = recentMoods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<MoodType, number>);

  // Most frequent mood
  const mostFrequentMood = Object.entries(moodFrequency).sort((a, b) => b[1] - a[1])[0];
  if (mostFrequentMood) {
    insights.push(
      `Over the past week, you've most frequently experienced feeling ${mostFrequentMood[0]} (${mostFrequentMood[1]} times).`
    );
  }

  // Mood improvement or decline
  const firstMood = recentMoods[0]?.mood;
  const lastMood = recentMoods[recentMoods.length - 1]?.mood;
  if (firstMood && lastMood) {
    const moodValues: Record<MoodType, number> = {
      anxious: 2,
      stressed: 1,
      tired: 3,
      calm: 4,
      energetic: 5
    };

    if (moodValues[lastMood] > moodValues[firstMood]) {
      insights.push('Your mood has shown improvement over the past week.');
    } else if (moodValues[lastMood] < moodValues[firstMood]) {
      insights.push('Your mood has experienced some challenges over the past week.');
    }
  }

  // Analyze triggers
  const triggers = analyzeMoodTriggers(recentMoods);
  const significantTriggers = Object.entries(triggers)
    .filter(([_, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  if (significantTriggers.length > 0) {
    insights.push(
      `Common triggers for your mood changes include ${significantTriggers
        .map(([trigger]) => trigger)
        .join(', ')}.`
    );
  }

  // Current session analysis
  insights.push(
    `In today's session, we focused on managing your ${currentMood} state through conversation and breathing exercises.`
  );

  return insights;
}