export const calculateTotalCalories = (protein: number, carbs: number, fat: number) => {
  return protein * 4 + carbs * 4 + fat * 9;
};

export const calculateMacroPercentages = (protein: number, carbs: number, fat: number) => {
  const totalCalories = calculateTotalCalories(protein, carbs, fat);
  return {
    protein: Math.round((protein * 4 / totalCalories) * 100),
    carbs: Math.round((carbs * 4 / totalCalories) * 100),
    fat: Math.round((fat * 9 / totalCalories) * 100)
  };
};

export const calculateBMR = (
  weight: number, // in kg
  height: number, // in cm
  age: number,
  gender: 'male' | 'female'
) => {
  if (gender === 'male') {
    return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  }
  return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
};

export const calculateTDEE = (bmr: number, activityLevel: number) => {
  return Math.round(bmr * activityLevel);
}; 