import { MentalWellnessPlan, MoodType, StressLevel, MeditationType } from '../types';

const meditationExercises: Record<MeditationType, Array<{name: string; duration: string; description: string; instructions: string[]}>> = {
  focus: [
    {
      name: 'Breath Awareness',
      duration: '5 min',
      description: 'Focus on your natural breath pattern, observing each inhale and exhale',
      instructions: [
        'Find a comfortable seated position',
        'Close your eyes or maintain a soft gaze',
        'Focus on the sensation of breath at your nostrils',
        'When mind wanders, gently return to the breath'
      ]
    },
    {
      name: 'Body Scan',
      duration: '10 min',
      description: 'Systematically focus attention on different parts of your body',
      instructions: [
        'Lie down in a comfortable position',
        'Start at your toes and work up to your head',
        'Notice any sensations without judgment',
        'Release tension as you scan each area'
      ]
    }
  ],
  relaxation: [
    {
      name: 'Progressive Relaxation',
      duration: '15 min',
      description: 'Gradually relax each muscle group in your body',
      instructions: [
        'Tense each muscle group for 5 seconds',
        'Release and relax for 10 seconds',
        'Notice the difference between tension and relaxation',
        'Move systematically through your body'
      ]
    },
    {
      name: 'Calming Visualization',
      duration: '10 min',
      description: 'Imagine a peaceful, serene environment',
      instructions: [
        'Close your eyes and take deep breaths',
        'Visualize a peaceful place in detail',
        'Engage all your senses in the visualization',
        'Stay with the peaceful imagery'
      ]
    }
  ],
  sleep: [
    {
      name: 'Bedtime Body Scan',
      duration: '20 min',
      description: 'Gentle body awareness practice to prepare for sleep',
      instructions: [
        'Lie in bed in a comfortable position',
        'Scan your body from feet to head',
        'Release any tension you notice',
        'Let your body become heavy and relaxed'
      ]
    },
    {
      name: 'Sleep Stories',
      duration: '15 min',
      description: 'Calming narratives to help you drift off',
      instructions: [
        'Get comfortable in bed',
        'Listen to the story without trying to follow it',
        'Let your mind wander naturally',
        'Don\'t worry about staying awake'
      ]
    }
  ],
  stress: [
    {
      name: 'Stress Release',
      duration: '10 min',
      description: 'Quick practice to release acute stress',
      instructions: [
        'Find a quiet space',
        'Take slow, deep breaths',
        'Focus on releasing tension with each exhale',
        'Use positive affirmations'
      ]
    },
    {
      name: 'Emotional Balance',
      duration: '15 min',
      description: 'Practice for processing difficult emotions',
      instructions: [
        'Acknowledge your current emotional state',
        'Breathe into any areas of tension',
        'Label emotions without judgment',
        'Practice self-compassion'
      ]
    }
  ]
};

export function generateMentalWellnessPlan(
  mood: MoodType,
  stressLevel: StressLevel,
  preferredMeditation: MeditationType
): MentalWellnessPlan {
  const meditations = meditationExercises[preferredMeditation];
  const selectedMeditation = meditations[Math.floor(Math.random() * meditations.length)];

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

  const stressManagementTips: Record<StressLevel, string[]> = {
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

  return {
    mood,
    stressLevel,
    meditation: selectedMeditation,
    recommendations: moodRecommendations[mood],
    stressManagementTips: stressManagementTips[stressLevel],
    dailyAffirmation: generateDailyAffirmation(mood),
    journalPrompts: generateJournalPrompts(mood, stressLevel)
  };
}

function generateDailyAffirmation(mood: MoodType): string {
  const affirmations: Record<MoodType, string[]> = {
    anxious: [
      "I am safe and capable of handling whatever comes my way",
      "This feeling is temporary and I am in control",
      "I choose peace over worry"
    ],
    stressed: [
      "I choose to be calm and centered in all situations",
      "I release what I cannot control",
      "I am stronger than my stress"
    ],
    tired: [
      "I honor my need for rest and renewal",
      "My energy is returning with each breath",
      "I give myself permission to rest and recharge"
    ],
    calm: [
      "I am grateful for this moment of peace and clarity",
      "I carry this calmness with me throughout my day",
      "I am centered and balanced"
    ],
    energetic: [
      "I channel my energy into positive actions and growth",
      "My enthusiasm lights the way for others",
      "I use my energy to create positive change"
    ]
  };
  
  const moodAffirmations = affirmations[mood];
  return moodAffirmations[Math.floor(Math.random() * moodAffirmations.length)];
}

function generateJournalPrompts(mood: MoodType, stressLevel: StressLevel): string[] {
  const basePrompts = [
    "What are three things I'm grateful for today?",
    "How can I show myself compassion right now?",
    "What would make today great?"
  ];

  const moodSpecificPrompts: Record<MoodType, string[]> = {
    anxious: [
      "What specific situations trigger my anxiety?",
      "What has helped me feel calm in the past?",
      "How can I better support myself when feeling anxious?"
    ],
    stressed: [
      "What tasks can I delegate or postpone?",
      "How can I break down my challenges into smaller steps?",
      "What boundaries do I need to set?"
    ],
    tired: [
      "What activities drain my energy the most?",
      "How can I create more space for rest?",
      "What energizes me naturally?"
    ],
    calm: [
      "What practices help me maintain this sense of peace?",
      "How can I share this calmness with others?",
      "What wisdom can I draw from this peaceful state?"
    ],
    energetic: [
      "How can I channel this energy productively?",
      "What important goals can I work toward today?",
      "How can I maintain this positive momentum?"
    ]
  };

  return [...basePrompts, ...moodSpecificPrompts[mood]];
}