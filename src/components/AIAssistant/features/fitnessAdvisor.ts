import { WorkoutPlan, Exercise, FitnessLevel, WorkoutGoal } from '../types';

const exercises: Record<FitnessLevel, Exercise[]> = {
  beginner: [
    { name: 'Bodyweight Squats', duration: '45 sec', rest: '15 sec', sets: 3, instructions: 'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair' },
    { name: 'Modified Push-ups', duration: '30 sec', rest: '30 sec', sets: 3, instructions: 'Perform push-ups with knees on the ground to reduce difficulty' },
    { name: 'Walking Lunges', duration: '45 sec', rest: '15 sec', sets: 2, instructions: 'Step forward into a lunge position, alternating legs' },
    { name: 'Plank Hold', duration: '20 sec', rest: '40 sec', sets: 3, instructions: 'Hold a straight-arm plank position, keeping your body in a straight line' }
  ],
  intermediate: [
    { name: 'Jump Squats', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'Perform a squat, then explosively jump up' },
    { name: 'Push-ups', duration: '40 sec', rest: '20 sec', sets: 4, instructions: 'Standard push-ups with full range of motion' },
    { name: 'Burpees', duration: '30 sec', rest: '30 sec', sets: 3, instructions: 'Drop to a plank, perform a push-up, jump feet forward, then jump up' },
    { name: 'Mountain Climbers', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'In plank position, alternate bringing knees to chest' }
  ],
  advanced: [
    { name: 'Plyometric Lunges', duration: '45 sec', rest: '15 sec', sets: 5, instructions: 'Jump and switch legs in lunge position' },
    { name: 'Diamond Push-ups', duration: '40 sec', rest: '20 sec', sets: 4, instructions: 'Push-ups with hands close together forming a diamond shape' },
    { name: 'Burpee Pull-ups', duration: '30 sec', rest: '30 sec', sets: 4, instructions: 'Perform a burpee, then do a pull-up at the top' },
    { name: 'Plank to Pike', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'From plank position, pike hips up to form an inverted V' }
  ]
};

const goalSpecificExercises: Record<WorkoutGoal, Exercise[]> = {
  strength: [
    { name: 'Push-ups', duration: '40 sec', rest: '20 sec', sets: 4, instructions: 'Focus on slow, controlled movements' },
    { name: 'Bodyweight Rows', duration: '40 sec', rest: '20 sec', sets: 4, instructions: 'Find a sturdy horizontal bar and perform rows' },
    { name: 'Pike Push-ups', duration: '30 sec', rest: '30 sec', sets: 3, instructions: 'Pike position push-ups to target shoulders' }
  ],
  cardio: [
    { name: 'High Knees', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'Run in place bringing knees up high' },
    { name: 'Jumping Jacks', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'Classic jumping jacks at a fast pace' },
    { name: 'Mountain Climbers', duration: '40 sec', rest: '20 sec', sets: 4, instructions: 'Fast-paced mountain climbers' }
  ],
  flexibility: [
    { name: 'Dynamic Stretches', duration: '60 sec', rest: '0 sec', sets: 2, instructions: 'Perform flowing stretches without holding' },
    { name: 'Yoga Flow', duration: '90 sec', rest: '30 sec', sets: 2, instructions: 'Move through basic yoga poses' },
    { name: 'Mobility Work', duration: '60 sec', rest: '30 sec', sets: 2, instructions: 'Joint mobility exercises' }
  ],
  weightLoss: [
    { name: 'Burpees', duration: '30 sec', rest: '30 sec', sets: 4, instructions: 'Full burpees with push-up' },
    { name: 'Mountain Climbers', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'Fast-paced for maximum calorie burn' },
    { name: 'Jump Rope', duration: '45 sec', rest: '15 sec', sets: 4, instructions: 'Simulated or real jump rope' }
  ]
};

export function generateWorkoutPlan(
  fitnessLevel: FitnessLevel,
  goal: WorkoutGoal,
  duration: number = 30
): WorkoutPlan {
  const baseExercises = exercises[fitnessLevel];
  const goalExercises = goalSpecificExercises[goal];
  
  const selectedExercises = [...baseExercises, ...goalExercises]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(duration / 5));

  return {
    exercises: selectedExercises,
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
    },
    tips: [
      'Stay hydrated throughout your workout',
      'Focus on proper form over speed',
      'Listen to your body and rest when needed',
      'Breathe steadily and rhythmically'
    ]
  };
}