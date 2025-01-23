import { NutritionAdvice, DietaryPreference, HealthGoal } from '../types';

const mealSuggestions: Record<DietaryPreference, string[]> = {
  standard: [
    'Grilled chicken with quinoa and roasted vegetables',
    'Salmon with sweet potato and steamed broccoli',
    'Turkey and avocado wrap with mixed greens',
    'Greek yogurt parfait with berries and honey'
  ],
  vegetarian: [
    'Chickpea curry with brown rice',
    'Lentil soup with whole grain bread',
    'Quinoa bowl with roasted vegetables and tofu',
    'Spinach and mushroom frittata'
  ],
  vegan: [
    'Buddha bowl with tempeh and tahini dressing',
    'Black bean and sweet potato tacos',
    'Overnight oats with chia seeds and almond milk',
    'Lentil and vegetable stir-fry'
  ]
};

const healthySnacks: Record<DietaryPreference, string[]> = {
  standard: [
    'Greek yogurt with berries',
    'Apple slices with almond butter',
    'Hard-boiled eggs',
    'Mixed nuts and dried fruit'
  ],
  vegetarian: [
    'Hummus with carrot sticks',
    'Cottage cheese with fruit',
    'Trail mix',
    'Roasted chickpeas'
  ],
  vegan: [
    'Energy balls (dates and nuts)',
    'Fruit smoothie',
    'Roasted edamame',
    'Rice cakes with avocado'
  ]
};

export function generateNutritionAdvice(
  preference: DietaryPreference,
  goal: HealthGoal,
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
): NutritionAdvice {
  const suggestions = mealType === 'snack' ? healthySnacks[preference] : mealSuggestions[preference];
  const randomSuggestions = suggestions
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const tips = [
    'Stay hydrated throughout the day',
    'Practice mindful eating',
    'Listen to your hunger cues',
    'Include a variety of colors in your meals'
  ];

  const goalSpecificTips = {
    weightLoss: [
      'Focus on protein-rich foods',
      'Include fiber-rich vegetables',
      'Control portion sizes',
      'Avoid processed foods'
    ],
    muscleGain: [
      'Increase protein intake',
      'Eat complex carbohydrates',
      'Include healthy fats',
      'Time meals around workouts'
    ],
    maintenance: [
      'Balance macronutrients',
      'Maintain consistent meal times',
      'Listen to hunger signals',
      'Practice portion control'
    ],
    energy: [
      'Include complex carbohydrates',
      'Stay hydrated',
      'Eat regular meals',
      'Include protein with each meal'
    ]
  };

  return {
    suggestions: randomSuggestions,
    tips: [...tips, ...goalSpecificTips[goal]],
    preference,
    goal,
    mealType
  };
}