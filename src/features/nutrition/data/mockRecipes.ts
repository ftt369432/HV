import { Recipe } from '../types';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Grilled Chicken Salad',
    calories: 450,
    protein: 35,
    carbs: 25,
    fat: 28,
    prepTime: '25 mins',
    difficulty: 'Easy',
    image: 'https://example.com/chicken-salad.jpg',
    tags: ['High Protein', 'Low Carb', 'Gluten Free'],
    ingredients: [
      '2 chicken breasts',
      'Mixed greens',
      'Cherry tomatoes',
      'Cucumber',
      'Olive oil'
    ],
    instructions: [
      'Grill the chicken',
      'Chop vegetables',
      'Mix ingredients',
      'Add dressing'
    ],
    isFavorite: false
  },
  {
    id: '2',
    name: 'Salmon with Roasted Vegetables',
    calories: 520,
    protein: 42,
    carbs: 30,
    fat: 32,
    prepTime: '35 mins',
    difficulty: 'Medium',
    image: 'https://example.com/salmon.jpg',
    tags: ['High Protein', 'Omega-3', 'Gluten Free'],
    ingredients: [
      'Salmon fillet',
      'Broccoli',
      'Carrots',
      'Sweet potato',
      'Olive oil'
    ],
    instructions: [
      'Preheat oven',
      'Season salmon',
      'Roast vegetables',
      'Bake salmon'
    ],
    isFavorite: false
  }
];

export const mockShoppingList = [
  {
    category: 'Produce',
    items: [
      { name: 'Mixed Greens', amount: '2 bags', recipe: 'Grilled Chicken Salad' },
      { name: 'Cherry Tomatoes', amount: '1 pint', recipe: 'Grilled Chicken Salad' },
      { name: 'Cucumber', amount: '2', recipe: 'Grilled Chicken Salad' },
      { name: 'Broccoli', amount: '1 head', recipe: 'Salmon with Roasted Vegetables' },
      { name: 'Carrots', amount: '4', recipe: 'Salmon with Roasted Vegetables' },
      { name: 'Sweet Potato', amount: '2', recipe: 'Salmon with Roasted Vegetables' }
    ]
  },
  {
    category: 'Protein',
    items: [
      { name: 'Chicken Breast', amount: '2 lbs', recipe: 'Grilled Chicken Salad' },
      { name: 'Salmon Fillet', amount: '1 lb', recipe: 'Salmon with Roasted Vegetables' }
    ]
  },
  {
    category: 'Pantry',
    items: [
      { name: 'Olive Oil', amount: '1 bottle', recipe: 'Multiple Recipes' },
      { name: 'Salt', amount: 'to taste', recipe: 'Multiple Recipes' },
      { name: 'Black Pepper', amount: 'to taste', recipe: 'Multiple Recipes' }
    ]
  }
]; 