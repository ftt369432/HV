import { MealPlan, DietaryPreference, HealthGoal } from '../types';

const mealOptions: Record<DietaryPreference, Record<string, string[]>> = {
  standard: {
    breakfast: [
      'Oatmeal with berries and nuts',
      'Greek yogurt parfait',
      'Whole grain toast with eggs and avocado',
      'Protein smoothie bowl'
    ],
    lunch: [
      'Grilled chicken salad',
      'Turkey and avocado wrap',
      'Quinoa bowl with roasted vegetables',
      'Tuna sandwich on whole grain bread'
    ],
    dinner: [
      'Baked salmon with sweet potato',
      'Lean beef stir-fry with brown rice',
      'Chicken breast with quinoa and vegetables',
      'Turkey meatballs with zucchini noodles'
    ],
    snacks: [
      'Apple with almond butter',
      'Greek yogurt with honey',
      'Mixed nuts and dried fruit',
      'Protein bar'
    ]
  },
  vegetarian: {
    breakfast: [
      'Overnight oats with chia seeds',
      'Tofu scramble with vegetables',
      'Smoothie bowl with granola',
      'Whole grain toast with avocado'
    ],
    lunch: [
      'Chickpea and quinoa salad',
      'Lentil soup with whole grain bread',
      'Buddha bowl with tofu',
      'Vegetable wrap with hummus'
    ],
    dinner: [
      'Black bean and sweet potato tacos',
      'Tempeh stir-fry with brown rice',
      'Vegetable curry with quinoa',
      'Mushroom and spinach pasta'
    ],
    snacks: [
      'Hummus with carrots',
      'Trail mix',
      'Roasted chickpeas',
      'Energy balls'
    ]
  },
  vegan: {
    breakfast: [
      'Chia seed pudding with coconut milk',
      'Tofu scramble with vegetables',
      'Green smoothie bowl',
      'Overnight oats with plant milk'
    ],
    lunch: [
      'Quinoa and black bean bowl',
      'Lentil and vegetable soup',
      'Tempeh and avocado sandwich',
      'Buddha bowl with tahini dressing'
    ],
    dinner: [
      'Chickpea curry with brown rice',
      'Lentil shepherd\'s pie',
      'Stir-fried tofu with vegetables',
      'Bean and sweet potato tacos'
    ],
    snacks: [
      'Mixed nuts and dried fruit',
      'Apple with almond butter',
      'Roasted chickpeas',
      'Energy balls'
    ]
  }
};

const healthGoalModifiers: Record<HealthGoal, (meals: string[]) => string[]> = {
  weightLoss: (meals) => meals.map(meal => `${meal} (reduced portion)`),
  muscleGain: (meals) => meals.map(meal => `${meal} (extra protein)`),
  maintenance: (meals) => meals,
  energy: (meals) => meals.map(meal => `${meal} (complex carbs)`),
};

export function generateMealPlan(
  preference: DietaryPreference,
  goal: HealthGoal,
  daysCount: number = 1
): MealPlan {
  const plans = Array.from({ length: daysCount }, (_, dayIndex) => {
    const options = mealOptions[preference];
    const modifier = healthGoalModifiers[goal];

    const breakfast = modifier([options.breakfast[Math.floor(Math.random() * options.breakfast.length)]]);
    const lunch = modifier([options.lunch[Math.floor(Math.random() * options.lunch.length)]]);
    const dinner = modifier([options.dinner[Math.floor(Math.random() * options.dinner.length)]]);
    const snacks = modifier([options.snacks[Math.floor(Math.random() * options.snacks.length)]]);

    return {
      day: dayIndex + 1,
      meals: {
        breakfast: breakfast[0],
        lunch: lunch[0],
        dinner: dinner[0],
        snacks: snacks[0]
      }
    };
  });

  return {
    preference,
    goal,
    days: plans,
    tips: [
      'Drink water throughout the day',
      'Eat slowly and mindfully',
      'Listen to your body\'s hunger cues',
      'Prepare meals in advance when possible'
    ]
  };
}