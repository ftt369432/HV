import { Exercise, ExerciseType, MuscleGroup, IntensityLevel } from '../types';

const exerciseDatabase: Partial<Exercise>[] = [
  {
    name: 'Push-ups',
    type: 'strength',
    muscleGroups: ['chest', 'shoulders', 'arms'],
    description: 'Classic bodyweight exercise for upper body strength',
    instructions: [
      'Start in a plank position',
      'Lower your body until chest nearly touches the ground',
      'Push back up to starting position'
    ],
    intensity: 'moderate'
  },
  {
    name: 'Squats',
    type: 'strength',
    muscleGroups: ['legs'],
    description: 'Fundamental lower body exercise',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower your body as if sitting back into a chair',
      'Keep chest up and back straight',
      'Return to standing position'
    ],
    intensity: 'moderate'
  },
  // Add more exercises here
];

export function generateWorkout(
  type: ExerciseType,
  targetMuscleGroups: MuscleGroup[],
  intensity: IntensityLevel,
  duration: number
): Exercise[] {
  // Filter exercises based on type and muscle groups
  const filteredExercises = exerciseDatabase.filter(exercise => 
    exercise.type === type &&
    exercise.muscleGroups?.some(group => targetMuscleGroups.includes(group)) &&
    exercise.intensity === intensity
  );

  // Select exercises based on duration (assume 5 minutes per exercise)
  const numberOfExercises = Math.floor(duration / 5);
  const selectedExercises = [];

  for (let i = 0; i < numberOfExercises; i++) {
    const randomIndex = Math.floor(Math.random() * filteredExercises.length);
    const exercise = filteredExercises[randomIndex];
    
    if (exercise) {
      selectedExercises.push({
        ...exercise,
        id: `${exercise.name}-${Date.now()}-${i}`,
        sets: 3,
        reps: 12,
        duration: 5,
        calories: 50
      } as Exercise);
    }
  }

  return selectedExercises;
}