import { MentalWellnessPlan, MoodType, StressLevel, MeditationType } from '../types';

const meditationExercises: Record<MeditationType, Array<{name: string; duration: string; description: string}>> = {
  focus: [
    {
      name: 'Breath Awareness',
      duration: '5 min',
      description: 'Focus on your natural breath pattern, observing each inhale and exhale'
    },
    {
      name: 'Body Scan',
      duration: '10 min',
      description: 'Systematically focus attention on different parts of your body'
    },
    {
      name: 'Mindful Observation',
      duration: '7 min',
      description: 'Choose an object and focus all attention on observing its details'
    }
  ],
  relaxation: [
    {
      name: 'Progressive Relaxation',
      duration: '15 min',
      description: 'Gradually relax each muscle group in your body'
    },
    {
      name: 'Calming Visualization',
      duration: '10 min',
      description: 'Imagine a peaceful, serene environment'
    },
    {
      name: 'Deep Breathing',
      duration: '5 min',
      description: '4-7-8 breathing technique for relaxation'
    }
  ],
  sleep: [
    {
      name: 'Bedtime Body Scan',
      duration: '20 min',
      description: 'Gentle body awareness practice to prepare for sleep'
    },
    {
      name: 'Sleep Stories',
      duration: '15 min',
      description: 'Calming narratives to help you drift off'
    },
    {
      name: 'Night Time Meditation',
      duration: '10 min',
      description: 'Gentle meditation to release the day\'s tension'
    }
  ],
  stress: [
    {
      name: 'Stress Release',
      duration: '10 min',
      description: 'Quick practice to release acute stress'
    },
    {
      name: 'Emotional Balance',
      duration: '15 min',
      description: 'Practice for processing difficult emotions'
    },
    {
      name: 'Mindful Movement',
      duration: '12 min',
      description: 'Gentle movement to release physical tension'
    }
  ]
};

const moodRecommendations: Record<MoodType, string[]> = {
  anxious: [
    'Practice grounding techniques',
    'Try deep breathing exercises',
    'Take a mindful walk',
    'Write in your journal'
  ],
  stressed: [
    'Take regular breaks',
    'Practice progressive muscle relaxation',
    'Listen to calming music',
    'Do light stretching'
  ],
  tired: [
    'Take a power nap',
    'Get some fresh air',
    'Have a healthy snack',
    'Do energizing breathing exercises'
  ],
  calm: [
    'Maintain your routine',
    'Practice gratitude',
    'Connect with others',
    'Engage in creative activities'
  ],
  energetic: [
    'Channel energy into exercise',
    'Work on important tasks',
    'Practice mindful productivity',
    'Engage in social activities'
  ]
};

const stressManagement: Record<StressLevel, string[]> = {
  low: [
    'Maintain current practices',
    'Practice preventive self-care',
    'Regular exercise',
    'Healthy sleep schedule'
  ],
  moderate: [
    'Increase relaxation practices',
    'Review and adjust commitments',
    'Enhance support system',
    'Practice time management'
  ],
  high: [
    'Prioritize immediate self-care',
    'Seek support from others',
    'Reduce non-essential commitments',
    'Focus on basics: sleep, nutrition, movement'
  ]
};

export function generateMentalWellnessPlan(
  mood: MoodType,
  stressLevel: StressLevel,
  preferredMeditation: MeditationType
): MentalWellnessPlan {
  const meditation = meditationExercises[preferredMeditation];
  const recommendations = moodRecommendations[mood];
  const stressManagementTips = stressManagement[stressLevel];

  return {
    mood,
    stressLevel,
    meditation: meditation[Math.floor(Math.random() * meditation.length)],
    recommendations,
    stressManagementTips,
    dailyAffirmation: generateDailyAffirmation(mood),
    journalPrompts: generateJournalPrompts(mood, stressLevel)
  };
}

function generateDailyAffirmation(mood: MoodType): string {
  const affirmations = {
    anxious: "I am safe and capable of handling whatever comes my way",
    stressed: "I choose to be calm and centered in all situations",
    tired: "I honor my need for rest and renewal",
    calm: "I am grateful for this moment of peace and clarity",
    energetic: "I channel my energy into positive actions and growth"
  };
  
  return affirmations[mood];
}

function generateJournalPrompts(mood: MoodType, stressLevel: StressLevel): string[] {
  const basePrompts = [
    "What are three things I'm grateful for today?",
    "How can I show myself compassion right now?",
    "What would make today great?"
  ];

  const moodSpecificPrompts = {
    anxious: [
      "What specific situations trigger my anxiety?",
      "What has helped me feel calm in the past?"
    ],
    stressed: [
      "What tasks can I delegate or postpone?",
      "How can I break down my challenges into smaller steps?"
    ],
    tired: [
      "What activities drain my energy the most?",
      "How can I create more space for rest?"
    ],
    calm: [
      "What practices help me maintain this sense of peace?",
      "How can I share this calmness with others?"
    ],
    energetic: [
      "How can I channel this energy productively?",
      "What important goals can I work toward today?"
    ]
  };

  return [...basePrompts, ...moodSpecificPrompts[mood]];
}