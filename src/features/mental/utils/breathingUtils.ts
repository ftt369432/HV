export const breathingExercises = {
  '4-7-8': {
    name: '4-7-8 Breathing',
    description: 'A natural tranquilizer for the nervous system',
    phases: [
      { name: 'inhale', duration: 4, instruction: 'Inhale quietly through your nose' },
      { name: 'hold', duration: 7, instruction: 'Hold your breath' },
      { name: 'exhale', duration: 8, instruction: 'Exhale completely through your mouth' }
    ],
    totalCycles: 4
  },
  'box': {
    name: 'Box Breathing',
    description: 'Equal duration breathing for focus and calm',
    phases: [
      { name: 'inhale', duration: 4, instruction: 'Inhale through your nose' },
      { name: 'hold', duration: 4, instruction: 'Hold your breath' },
      { name: 'exhale', duration: 4, instruction: 'Exhale through your mouth' },
      { name: 'hold', duration: 4, instruction: 'Hold your breath' }
    ],
    totalCycles: 4
  },
  'calm': {
    name: 'Calming Breath',
    description: 'Long exhales for relaxation',
    phases: [
      { name: 'inhale', duration: 4, instruction: 'Inhale slowly through your nose' },
      { name: 'hold', duration: 2, instruction: 'Brief pause' },
      { name: 'exhale', duration: 6, instruction: 'Long, slow exhale through your mouth' }
    ],
    totalCycles: 5
  }
};

export function getBreathingExerciseForMood(mood: string) {
  switch (mood) {
    case 'anxious':
    case 'stressed':
      return breathingExercises['4-7-8'];
    case 'tired':
      return breathingExercises['box'];
    default:
      return breathingExercises['calm'];
  }
}