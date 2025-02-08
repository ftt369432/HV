import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Meal, FoodAnalysis } from '../types';

interface MealTrackingState {
  meals: Record<string, Meal[]>; // date -> meals
  addMeal: (date: string, meal: Meal) => void;
  addFoodAnalysis: (date: string, analysis: FoodAnalysis) => void;
  removeMeal: (date: string, mealId: string) => void;
  getDailyMacros: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  getMealHistory: (startDate: string, endDate: string) => Record<string, Meal[]>;
}

export const useMealTrackingStore = create<MealTrackingState>()(
  persist(
    (set, get) => ({
      meals: {},

      addMeal: (date, meal) => set((state) => ({
        meals: {
          ...state.meals,
          [date]: [...(state.meals[date] || []), meal],
        },
      })),

      addFoodAnalysis: (date, analysis) => {
        const meal: Meal = {
          id: Date.now().toString(),
          name: analysis.name,
          calories: analysis.calories,
          protein: analysis.protein,
          carbs: analysis.carbs,
          fat: analysis.fat,
          date,
          time: new Date().toLocaleTimeString(),
          portions: analysis.portions,
        };
        get().addMeal(date, meal);
      },

      removeMeal: (date, mealId) => set((state) => ({
        meals: {
          ...state.meals,
          [date]: state.meals[date]?.filter((meal) => meal.id !== mealId) || [],
        },
      })),

      getDailyMacros: (date) => {
        const meals = get().meals[date] || [];
        return meals.reduce(
          (acc, meal) => ({
            calories: acc.calories + meal.calories,
            protein: acc.protein + meal.protein,
            carbs: acc.carbs + meal.carbs,
            fat: acc.fat + meal.fat,
          }),
          { calories: 0, protein: 0, carbs: 0, fat: 0 }
        );
      },

      getMealHistory: (startDate, endDate) => {
        const history: Record<string, Meal[]> = {};
        const current = new Date(startDate);
        const end = new Date(endDate);

        while (current <= end) {
          const dateStr = current.toISOString().split('T')[0];
          history[dateStr] = get().meals[dateStr] || [];
          current.setDate(current.getDate() + 1);
        }

        return history;
      },
    }),
    {
      name: 'meal-tracking-storage',
    }
  )
); 