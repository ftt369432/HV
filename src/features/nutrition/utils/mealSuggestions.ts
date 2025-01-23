import { NutritionPreferences } from '../types/preferences';
import { Recipe } from '../types/meals';
import { generateRecipe } from './recipeGenerator';

export async function generateMealSuggestion(
  prompt: string,
  preferences: NutritionPreferences
): Promise<string> {
  // Analyze the prompt for meal type and requirements
  const mealType = determineMealType(prompt);
  const requirements = analyzeRequirements(prompt);

  // Check if the current time is within fasting window
  if (preferences.intermittentFasting.enabled) {
    const isInFastingWindow = checkFastingWindow(
      preferences.intermittentFasting.startTime,
      preferences.intermittentFasting.fastingWindow
    );
    if (isInFastingWindow) {
      return "I notice you're currently in your fasting window. Would you like to schedule this meal for your eating window instead?";
    }
  }

  // Generate appropriate recipe based on preferences and requirements
  const recipe = await generateRecipe({
    mealType,
    requirements,
    preferences,
  });

  return formatMealSuggestion(recipe);
}

function determineMealType(prompt: string): 'breakfast' | 'lunch' | 'dinner' | 'snack' {
  const lowerPrompt = prompt.toLowerCase();
  if (lowerPrompt.includes('breakfast')) return 'breakfast';
  if (lowerPrompt.includes('lunch')) return 'lunch';
  if (lowerPrompt.includes('dinner')) return 'dinner';
  return 'snack';
}

function analyzeRequirements(prompt: string) {
  return {
    isQuick: prompt.toLowerCase().includes('quick') || prompt.toLowerCase().includes('fast'),
    isHealthy: prompt.toLowerCase().includes('healthy'),
    isProteinRich: prompt.toLowerCase().includes('protein'),
    isLowCarb: prompt.toLowerCase().includes('low carb'),
    isLowCalorie: prompt.toLowerCase().includes('low calorie'),
  };
}

function checkFastingWindow(startTime: string, fastingWindow: number): boolean {
  const now = new Date();
  const [hours, minutes] = startTime.split(':').map(Number);
  const fastStart = new Date();
  fastStart.setHours(hours, minutes, 0, 0);

  const fastEnd = new Date(fastStart);
  fastEnd.setHours(fastEnd.getHours() + fastingWindow);

  return now >= fastStart && now <= fastEnd;
}

function formatMealSuggestion(recipe: Recipe): string {
  return `
Here's a suggestion for you: ${recipe.name}

This ${recipe.dietaryInfo.isVegan ? 'vegan' : recipe.dietaryInfo.isVegetarian ? 'vegetarian' : ''} recipe:
• Takes ${recipe.prepTime + recipe.cookTime} minutes to prepare
• Contains ${recipe.totalCalories} calories
• Has ${recipe.macros.protein}g protein, ${recipe.macros.carbs}g carbs, and ${recipe.macros.fat}g fat

Would you like the full recipe and instructions?
  `.trim();
}