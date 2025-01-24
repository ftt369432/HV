import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import { Meal, DailyNutrition, NutritionGoals } from '../types';

export interface Recipe {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  difficulty: string;
  image: string;
  tags: string[];
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
}

interface NutritionState {
  dailyLogs: Record<string, DailyNutrition>;
  goals: NutritionGoals;
  getCurrentDayLog: () => DailyNutrition;
  addMeal: (meal: Omit<NutritionState['meals'][0], 'id'>) => void;
  updateGoals: (goals: Partial<NutritionGoals>) => void;
  logWaterIntake: (amount: number) => void;
  meals: Array<{
    id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    date: string;
    time: string;
  }>;
  recipes: Recipe[];
  favorites: string[]; // Recipe IDs
  dailyGoals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  removeMeal: (id: string) => void;
  addRecipe: (recipe: Omit<Recipe, 'id'>) => void;
  toggleFavorite: (recipeId: string) => void;
  updateDailyGoals: (goals: Partial<NutritionState['dailyGoals']>) => void;
  getDailyMacros: (date: string) => {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

const defaultGoals: NutritionGoals = {
  dailyCalories: 2000,
  macros: {
    protein: 150,
    carbs: 200,
    fat: 65
  },
  waterIntake: 2500 // ml
};

const defaultDayLog: DailyNutrition = {
  date: new Date(),
  meals: [],
  totalCalories: 0,
  macros: {
    protein: 0,
    carbs: 0,
    fat: 0
  },
  waterIntake: 0
};

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set, get) => ({
      dailyLogs: {},
      goals: defaultGoals,
      meals: [],
      recipes: [],
      favorites: [],
      dailyGoals: {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 65
      },

      getCurrentDayLog: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const currentLog = get().dailyLogs[today];
        if (!currentLog) {
          return { ...defaultDayLog, date: today };
        }
        return {
          ...currentLog,
          macros: currentLog.macros || defaultDayLog.macros
        };
      },

      addMeal: (meal) => set((state) => ({
        meals: [...state.meals, { ...meal, id: Date.now().toString(), date: format(new Date(), 'yyyy-MM-dd'), time: format(new Date(), 'HH:mm') }]
      })),

      removeMeal: (id) => set((state) => ({
        meals: state.meals.filter(meal => meal.id !== id)
      })),

      addRecipe: (recipe) => set((state) => ({
        recipes: [...state.recipes, { ...recipe, id: Date.now().toString(), isFavorite: false }]
      })),

      toggleFavorite: (recipeId) => set((state) => ({
        recipes: state.recipes.map(recipe =>
          recipe.id === recipeId
            ? { ...recipe, isFavorite: !recipe.isFavorite }
            : recipe
        ),
        favorites: state.favorites.includes(recipeId)
          ? state.favorites.filter(id => id !== recipeId)
          : [...state.favorites, recipeId]
      })),

      updateDailyGoals: (goals) => set((state) => ({
        dailyGoals: { ...state.dailyGoals, ...goals }
      })),

      getDailyMacros: (date) => ({
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }),

      updateGoals: (newGoals) => {
        set((state) => ({
          goals: {
            ...state.goals,
            ...newGoals,
            macros: {
              ...state.goals.macros,
              ...(newGoals.macros || {})
            }
          }
        }));
      },

      logWaterIntake: (amount) => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const currentLog = get().getCurrentDayLog();
        
        const newIntake = Math.max(0, currentLog.waterIntake + amount);
        
        set((state) => ({
          dailyLogs: {
            ...state.dailyLogs,
            [today]: {
              ...currentLog,
              waterIntake: newIntake
            }
          }
        }));
      }
    }),
    {
      name: 'nutrition-storage'
    }
  )
);