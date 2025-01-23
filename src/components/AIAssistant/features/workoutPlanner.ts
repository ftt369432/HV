import { Exercise, WorkoutPlan, FitnessLevel, WorkoutGoal } from '../types';

const exercises: Record<FitnessLevel, Exercise[]> = {
  beginner: [
    { name: 'Bodyweight Squats', duration: '45 sec', rest: '15 sec', sets: 3 },
    { name: 'Push-ups (Modified)', duration: '30 sec', rest: '30 sec', sets: 3 },
    { name: 'Walking Lunges', duration: '45 sec', rest: '15 sec', sets: 2 },
    { name: 'Plank Hold', duration: '20 sec', rest: '40 sec', sets: 3 },
  ],
  intermediate: [
    { name: 'Jump Squats', duration: '45 sec', rest: '15 sec', sets: 4 },
    { name: 'Push-ups', duration: '40 sec', rest: '20 sec', sets: 4 },
    { name: 'Burpees', duration: '30 sec', rest: '30 sec', sets: 3 },
    { name: 'Mountain Climbers', duration: '45 sec', rest: '15 sec', sets: 4 },
  ],
  advanced: [
    { name: 'Plyometric Lunges', duration: '45 sec', rest: '15 sec', sets: 5 },
    { name: 'Diamond Push-ups', duration: '40 sec', rest: '20 sec', sets: 4 },
    { name: 'Burpee Pull-ups', duration: '30 sec', rest: '30 sec', sets: 4 },
    { name: 'Plank to Pike', duration: '45 sec', rest: '15 sec', sets: 4 },
  ],
};

const goalSpecificExercises: Record<WorkoutGoal, Exercise[]> = {
  strength: [
    { name: 'Push-ups', duration: '40 sec', rest: '20 sec', sets: 4 },
    { name: 'Bodyweight Rows', duration: '40 sec', rest: '20 sec', sets: 4 },
    { name: 'Pike Push-ups', duration: '30 sec', rest: '30 sec', sets: 3 },
  ],
  cardio: [
    { name: 'High Knees', duration: '45 sec', rest: '15 sec', sets: 4 },
    { name: 'Jumping Jacks', duration: '45 sec', rest: '15 sec', sets: 4 },
    { name: 'Mountain Climbers', duration: '40 sec', rest: '20 sec', sets: 4 },
  ],
  flexibility: [
    { name: 'Dynamic Stretches', duration: '60 sec', rest: '0 sec', sets: 2 },
    { name: 'Yoga Flow', duration: '90 sec', rest: '30 sec', sets: 2 },
    { name: 'Mobility Work', duration: '60 sec', rest: '30 sec', sets: 2 },
  ],
  weightLoss: [
    { name: 'Burpees', duration: '30 sec', rest: '30 sec', sets: 4 },
    { name: 'Mountain Climbers', duration: '45 sec', rest: '15 sec', sets: 4 },
    { name: 'Jump Rope', duration: '45 sec', rest: '15 sec', sets: 4 },
  ],
};

export function generateWorkoutPlan(
  fitnessLevel: FitnessLevel,
  goal: WorkoutGoal,
  duration: number
): WorkoutPlan {
  const baseExercises = exercises[fitnessLevel];
  const goalExercises = goalSpecificExercises[goal];
  
  // Combine and shuffle exercises based on duration and goal
  const combinedExercises = [...baseExercises, ...goalExercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(duration / 5)); // Approximate 5 minutes per exercise including rest

  return {
    exercises: combinedExercises,
    duration,
    level: fitnessLevel,
    goal,
    warmup: {
      name: 'Dynamic Warm-up',
      duration: '5 min',
      exercises: [
        'Arm circles',
        'Leg swings',
        'Hip rotations',
        'Light jogging in place'
      ]
    },
    cooldown: {
      name: 'Cool-down Stretches',
      duration: '5 min',
      exercises: [
        'Hamstring stretch',
        'Quad stretch',
        'Child\'s pose',
        'Cat-cow stretch'
      ]
    }
  };
}