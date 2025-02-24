import React, { useState } from 'react';
import { DietaryPreference, HealthGoal, MealPlan } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions: string[];
}

const sampleMeals: Record<DietaryPreference, Meal[]> = {
  standard: [
    {
      name: 'Grilled Chicken Salad',
      calories: 350,
      protein: 35,
      carbs: 15,
      fats: 18,
      ingredients: ['Chicken breast', 'Mixed greens', 'Olive oil', 'Balsamic vinegar'],
      instructions: ['Grill chicken', 'Mix greens', 'Dress with oil and vinegar']
    },
    {
      name: 'Salmon with Quinoa',
      calories: 450,
      protein: 30,
      carbs: 35,
      fats: 22,
      ingredients: ['Salmon fillet', 'Quinoa', 'Vegetables', 'Lemon'],
      instructions: ['Cook quinoa', 'Bake salmon', 'Steam vegetables']
    }
  ],
  vegetarian: [
    {
      name: 'Lentil Curry',
      calories: 380,
      protein: 18,
      carbs: 45,
      fats: 12,
      ingredients: ['Lentils', 'Coconut milk', 'Curry spices', 'Rice'],
      instructions: ['Cook lentils', 'Simmer in curry sauce', 'Serve with rice']
    }
  ],
  vegan: [
    {
      name: 'Tofu Stir-fry',
      calories: 320,
      protein: 15,
      carbs: 35,
      fats: 14,
      ingredients: ['Tofu', 'Mixed vegetables', 'Soy sauce', 'Brown rice'],
      instructions: ['Press tofu', 'Stir-fry vegetables', 'Add sauce']
    }
  ]
};

const MealPlanner: React.FC = () => {
  const [preference, setPreference] = useState<DietaryPreference>('standard');
  const [goal, setGoal] = useState<HealthGoal>('maintenance');
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('add meal')) {
      const mealName = command.replace('add meal', '').trim();
      const meal = sampleMeals[preference].find(m => 
        m.name.toLowerCase().includes(mealName)
      );
      if (meal) {
        setSelectedMeals(prev => [...prev, meal]);
        voiceService.speak(`Added ${meal.name} to your meal plan`);
      }
    } else if (command.includes('clear meals')) {
      setSelectedMeals([]);
      voiceService.speak('Cleared all meals from your plan');
    } else if (command.includes('set preference')) {
      if (command.includes('vegetarian')) {
        setPreference('vegetarian');
        voiceService.speak('Set preference to vegetarian');
      } else if (command.includes('vegan')) {
        setPreference('vegan');
        voiceService.speak('Set preference to vegan');
      }
    }
  };

  const toggleVoiceAssistant = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      voiceService.startListening(
        handleVoiceCommand,
        (error) => console.error('Voice recognition error:', error)
      );
      setIsListening(true);
    }
  };

  const getTotalNutrition = () => {
    return selectedMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fats: acc.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Meal Planner</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Preferences */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Dietary Preference</h3>
            <select
              value={preference}
              onChange={(e) => setPreference(e.target.value as DietaryPreference)}
              className="w-full p-2 border rounded"
            >
              <option value="standard">Standard</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Health Goal</h3>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as HealthGoal)}
              className="w-full p-2 border rounded"
            >
              <option value="weightLoss">Weight Loss</option>
              <option value="maintenance">Maintenance</option>
              <option value="muscleGain">Muscle Gain</option>
              <option value="energy">Energy</option>
            </select>
          </div>
        </div>
      </section>

      {/* Available Meals */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Available Meals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sampleMeals[preference].map((meal, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">{meal.name}</h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Calories:</span> {meal.calories}
                </p>
                <div className="flex space-x-4 text-sm text-gray-600">
                  <span>P: {meal.protein}g</span>
                  <span>C: {meal.carbs}g</span>
                  <span>F: {meal.fats}g</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedMeals(prev => [...prev, meal])}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add to Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Meals */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Meal Plan</h2>
          <div className="text-sm text-gray-600">
            Total: {getTotalNutrition().calories} calories
          </div>
        </div>
        <div className="space-y-4">
          {selectedMeals.map((meal, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <span>{meal.calories} cal</span>
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMeals(prev => prev.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">Ingredients:</h4>
                <ul className="mt-1 text-sm text-gray-600 list-disc list-inside">
                  {meal.ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          {selectedMeals.length === 0 && (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No meals selected yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Add meal [meal name]"</li>
          <li>"Clear meals"</li>
          <li>"Set preference to [vegetarian/vegan]"</li>
        </ul>
      </section>
    </div>
  );
};

export default MealPlanner; 