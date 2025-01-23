import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { startOfDay } from 'date-fns';
import { Meal, DailyNutrition, NutritionGoals } from '../types';

interface NutritionState {
  dailyLogs: Record<string, DailyNutrition>;
  goals: NutritionGoals;
  getCurrentDayLog: () => DailyNutrition;
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateGoals: (goals: Partial<NutritionGoals>) => void;
  logWaterIntake: (amount: number) => void;
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

      getCurrentDayLog: () => {
        const today = startOfDay(new Date()).toISOString();
        const currentLog = get().dailyLogs[today];
        if (!currentLog) {
          return { ...defaultDayLog, date: new Date() };
        }
        return {
          ...currentLog,
          macros: currentLog.macros || defaultDayLog.macros
        };
      },

      addMeal: (meal) => {
        const today = startOfDay(new Date()).toISOString();
        const currentLog = get().getCurrentDayLog();
        
        const newMeal = {
          ...meal,
          id: Date.now().toString()
        };

        const updatedMacros = {
          protein: currentLog.macros.protein + (meal.macros?.protein || 0),
          carbs: currentLog.macros.carbs + (meal.macros?.carbs || 0),
          fat: currentLog.macros.fat + (meal.macros?.fat || 0)
        };

        set((state) => ({
          dailyLogs: {
            ...state.dailyLogs,
            [today]: {
              ...currentLog,
              meals: [...currentLog.meals, newMeal],
              totalCalories: currentLog.totalCalories + meal.calories,
              macros: updatedMacros
            }
          }
        }));
      },

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
        const today = startOfDay(new Date()).toISOString();
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