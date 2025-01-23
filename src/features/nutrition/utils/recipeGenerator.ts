import { Recipe, Ingredient } from '../types/meals';
import { NutritionPreferences } from '../types/preferences';

interface RecipeGeneratorOptions {
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  requirements: {
    isQuick: boolean;
    isHealthy: boolean;
    isProteinRich: boolean;
    isLowCarb: boolean;
    isLowCalorie: boolean;
  };
  preferences: NutritionPreferences;
}

// This is a mock implementation - in a real app, this would connect to an API
// or database of recipes and use more sophisticated filtering and recommendation logic
export async function generateRecipe(options: RecipeGeneratorOptions): Promise<Recipe> {
  const { mealType, requirements, preferences } = options;

  // Mock recipe generation based on preferences and requirements
  const recipe: Recipe = {
    id: Date.now().toString(),
    name: `Healthy ${mealType.charAt(0).toUpperCase() + mealType.slice(1)} Bowl`,
    description: "A nutritious and delicious meal that fits your dietary preferences",
    ingredients: generateIngredients(preferences, requirements),
    instructions: [
      "Prepare all ingredients",
      "Mix ingredients in a bowl",
      "Season to taste",
      "Enjoy your meal!"
    ],
    prepTime: requirements.isQuick ? 10 : 20,
    cookTime: requirements.isQuick ? 15 : 30,
    servings: 1,
    totalCalories: requirements.isLowCalorie ? 400 : 600,
    macros: {
      protein: requirements.isProteinRich ? 30 : 20,
      carbs: requirements.isLowCarb ? 20 : 40,
      fat: 15
    },
    tags: generateTags(preferences, requirements),
    dietaryInfo: {
      isVegetarian: preferences.dietaryRestrictions.includes('vegetarian'),
      isVegan: preferences.dietaryRestrictions.includes('vegan'),
      isGlutenFree: preferences.dietaryRestrictions.includes('gluten-free'),
      isDairyFree: preferences.dietaryRestrictions.includes('dairy-free'),
      isKeto: preferences.dietaryRestrictions.includes('keto'),
      isPaleo: preferences.dietaryRestrictions.includes('paleo')
    }
  };

  return recipe;
}

function generateIngredients(
  preferences: NutritionPreferences,
  requirements: RecipeGeneratorOptions['requirements']
): Ingredient[] {
  // Mock ingredient generation based on preferences
  const baseIngredients: Ingredient[] = [
    {
      id: '1',
      name: preferences.dietaryRestrictions.includes('vegan') ? 'Tofu' : 'Chicken',
      amount: 100,
      unit: 'g',
      calories: 120,
      protein: 20,
      carbs: 0,
      fat: 5
    },
    {
      id: '2',
      name: 'Mixed Vegetables',
      amount: 200,
      unit: 'g',
      calories: 80,
      protein: 4,
      carbs: 16,
      fat: 0
    }
  ];

  return baseIngredients.filter(ingredient => 
    !preferences.allergies.includes(ingredient.name.toLowerCase()) &&
    !preferences.dislikedIngredients.includes(ingredient.name.toLowerCase())
  );
}

function generateTags(
  preferences: NutritionPreferences,
  requirements: RecipeGeneratorOptions['requirements']
): string[] {
  const tags: string[] = [...preferences.dietaryRestrictions];
  
  if (requirements.isQuick) tags.push('quick');
  if (requirements.isHealthy) tags.push('healthy');
  if (requirements.isProteinRich) tags.push('high-protein');
  if (requirements.isLowCarb) tags.push('low-carb');
  if (requirements.isLowCalorie) tags.push('low-calorie');

  return tags;
}