import { Category, WorkoutPlan, MealPlan, MentalWellnessPlan } from './types';
import { generateWorkoutPlan } from './features/workoutPlanner';
import { generateMealPlan } from './features/mealPlanner';
import { generateMentalWellnessPlan } from './features/mentalWellness';

interface Response {
  text: string;
  followUp?: string[];
  data?: WorkoutPlan | MealPlan | MentalWellnessPlan;
}

function formatWorkoutPlan(plan: WorkoutPlan): string {
  return `Here's your ${plan.duration}-minute ${plan.goal} workout for ${plan.level} level:

Warm-up (${plan.warmup.duration}):
${plan.warmup.exercises.map(ex => `• ${ex}`).join('\n')}

Main Workout:
${plan.exercises.map(ex => `• ${ex.name}
  - ${ex.duration} work / ${ex.rest} rest
  - ${ex.sets} sets`).join('\n\n')}

Cool-down (${plan.cooldown.duration}):
${plan.cooldown.exercises.map(ex => `• ${ex}`).join('\n')}

Remember to stay hydrated and listen to your body!`;
}

function formatMealPlan(plan: MealPlan): string {
  const dayPlan = plan.days[0].meals;
  return `Here's your ${plan.preference} meal plan optimized for ${plan.goal}:

Breakfast: ${dayPlan.breakfast}
Lunch: ${dayPlan.lunch}
Dinner: ${dayPlan.dinner}
Snack: ${dayPlan.snacks}

Tips:
${plan.tips.map(tip => `• ${tip}`).join('\n')}`;
}

function formatMentalWellnessPlan(plan: MentalWellnessPlan): string {
  return `Based on your current mood (${plan.mood}) and stress level (${plan.stressLevel}), here's your wellness plan:

🧘‍♀️ Recommended Meditation:
${plan.meditation.name} (${plan.meditation.duration})
${plan.meditation.description}

✨ Daily Affirmation:
"${plan.dailyAffirmation}"

📝 Journal Prompts:
${plan.journalPrompts.map(prompt => `• ${prompt}`).join('\n')}

💭 Mood-Specific Recommendations:
${plan.recommendations.map(rec => `• ${rec}`).join('\n')}

⚡ Stress Management Tips:
${plan.stressManagementTips.map(tip => `• ${tip}`).join('\n')}`;
}

export function generateResponse(input: string): Response {
  const lowerInput = input.toLowerCase();
  
  // Mental wellness and meditation
  if (lowerInput.includes('meditation') || lowerInput.includes('stress') || lowerInput.includes('anxiety') || lowerInput.includes('mood')) {
    let mood: 'anxious' | 'stressed' | 'tired' | 'calm' | 'energetic' = 'stressed';
    if (lowerInput.includes('anxious')) mood = 'anxious';
    if (lowerInput.includes('tired')) mood = 'tired';
    if (lowerInput.includes('calm')) mood = 'calm';
    if (lowerInput.includes('energetic')) mood = 'energetic';

    let stressLevel: 'low' | 'moderate' | 'high' = 'moderate';
    if (lowerInput.includes('very stressed') || lowerInput.includes('high stress')) stressLevel = 'high';
    if (lowerInput.includes('little stressed') || lowerInput.includes('low stress')) stressLevel = 'low';

    let meditationType: 'focus' | 'relaxation' | 'sleep' | 'stress' = 'relaxation';
    if (lowerInput.includes('focus')) meditationType = 'focus';
    if (lowerInput.includes('sleep')) meditationType = 'sleep';
    if (lowerInput.includes('stress')) meditationType = 'stress';

    const plan = generateMentalWellnessPlan(mood, stressLevel, meditationType);

    return {
      text: formatMentalWellnessPlan(plan),
      data: plan,
      followUp: [
        'Would you like to try a different meditation?',
        'Should we focus on specific stress management techniques?',
        'Would you like more journal prompts?'
      ]
    };
  }

  // Workout plan generation
  if (lowerInput.includes('workout') || lowerInput.includes('exercise')) {
    let level: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    if (lowerInput.includes('beginner')) level = 'beginner';
    if (lowerInput.includes('advanced')) level = 'advanced';

    let goal: 'strength' | 'cardio' | 'flexibility' | 'weightLoss' = 'cardio';
    if (lowerInput.includes('strength')) goal = 'strength';
    if (lowerInput.includes('flexible')) goal = 'flexibility';
    if (lowerInput.includes('weight loss')) goal = 'weightLoss';

    const duration = 30;
    const plan = generateWorkoutPlan(level, goal, duration);

    return {
      text: formatWorkoutPlan(plan),
      data: plan,
      followUp: [
        'Would you like to adjust the intensity?',
        'Should we modify any exercises?',
        'Would you like a different duration?'
      ]
    };
  }

  // Meal plan generation
  if (lowerInput.includes('meal') || lowerInput.includes('diet') || lowerInput.includes('food')) {
    let preference: 'standard' | 'vegetarian' | 'vegan' = 'standard';
    if (lowerInput.includes('vegetarian')) preference = 'vegetarian';
    if (lowerInput.includes('vegan')) preference = 'vegan';

    let goal: 'weightLoss' | 'muscleGain' | 'maintenance' | 'energy' = 'maintenance';
    if (lowerInput.includes('weight loss')) goal = 'weightLoss';
    if (lowerInput.includes('muscle')) goal = 'muscleGain';
    if (lowerInput.includes('energy')) goal = 'energy';

    const plan = generateMealPlan(preference, goal);

    return {
      text: formatMealPlan(plan),
      data: plan,
      followUp: [
        'Would you like recipes for any of these meals?',
        'Should we adjust portions?',
        'Would you like a different meal plan?'
      ]
    };
  }

  // Default response
  return {
    text: "I can help you with personalized workout plans, meal recommendations, and mental wellness guidance. What would you like to know about?",
    followUp: [
      "Create a workout plan",
      "Generate a meal plan",
      "Get meditation guidance",
      "Manage stress and anxiety"
    ]
  };
}