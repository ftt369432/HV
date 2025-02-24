import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: string;
}

interface MealEntry {
  timestamp: Date;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: (FoodItem & { quantity: number })[];
}

const commonFoods: FoodItem[] = [
  {
    name: 'Banana',
    calories: 105,
    protein: 1.3,
    carbs: 27,
    fats: 0.3,
    servingSize: '1 medium'
  },
  {
    name: 'Greek Yogurt',
    calories: 130,
    protein: 12,
    carbs: 8,
    fats: 4,
    servingSize: '170g container'
  },
  {
    name: 'Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    servingSize: '100g'
  },
  {
    name: 'Brown Rice',
    calories: 216,
    protein: 5,
    carbs: 45,
    fats: 1.8,
    servingSize: '1 cup cooked'
  }
];

const NutritionLog: React.FC = () => {
  const [meals, setMeals] = useState<MealEntry[]>([
    {
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      type: 'lunch',
      foods: [
        { ...commonFoods[2], quantity: 1 }, // Chicken Breast
        { ...commonFoods[3], quantity: 1 }  // Brown Rice
      ]
    },
    {
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      type: 'breakfast',
      foods: [
        { ...commonFoods[0], quantity: 1 }, // Banana
        { ...commonFoods[1], quantity: 1 }  // Greek Yogurt
      ]
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState<MealEntry['type']>('snack');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('add food')) {
      const foodName = command.replace('add food', '').trim();
      const food = commonFoods.find(f => 
        f.name.toLowerCase().includes(foodName)
      );
      if (food) {
        addFoodToMeal(food);
        voiceService.speak(`Added ${food.name} to your ${selectedMealType}`);
      }
    } else if (command.includes('show totals')) {
      const totals = calculateDailyTotals();
      voiceService.speak(
        `Today's totals: ${totals.calories} calories, ` +
        `${totals.protein}g protein, ${totals.carbs}g carbs, ` +
        `and ${totals.fats}g fats.`
      );
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

  const addFoodToMeal = (food: FoodItem) => {
    const now = new Date();
    const existingMeal = meals.find(m => m.type === selectedMealType);

    if (existingMeal) {
      setMeals(prev => prev.map(meal =>
        meal.type === selectedMealType
          ? {
              ...meal,
              foods: [...meal.foods, { ...food, quantity: 1 }]
            }
          : meal
      ));
    } else {
      setMeals(prev => [
        {
          timestamp: now,
          type: selectedMealType,
          foods: [{ ...food, quantity: 1 }]
        },
        ...prev
      ]);
    }
  };

  const calculateDailyTotals = () => {
    return meals.reduce((acc, meal) => {
      const mealTotals = meal.foods.reduce((foodAcc, food) => ({
        calories: foodAcc.calories + (food.calories * food.quantity),
        protein: foodAcc.protein + (food.protein * food.quantity),
        carbs: foodAcc.carbs + (food.carbs * food.quantity),
        fats: foodAcc.fats + (food.fats * food.quantity)
      }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

      return {
        calories: acc.calories + mealTotals.calories,
        protein: acc.protein + mealTotals.protein,
        carbs: acc.carbs + mealTotals.carbs,
        fats: acc.fats + mealTotals.fats
      };
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const filteredFoods = commonFoods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nutrition Log</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Daily Totals */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Daily Totals</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(calculateDailyTotals()).map(([nutrient, value]) => (
            <div key={nutrient} className="p-4 bg-white rounded-lg shadow text-center">
              <div className="text-sm text-gray-500 capitalize">{nutrient}</div>
              <div className="text-2xl font-semibold">
                {Math.round(value)}
                {nutrient === 'calories' ? '' : 'g'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Food */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Add Food</h2>
          <select
            value={selectedMealType}
            onChange={(e) => setSelectedMealType(e.target.value as MealEntry['type'])}
            className="p-2 border rounded"
          >
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search foods..."
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{food.name}</h3>
                  <p className="text-sm text-gray-500">{food.servingSize}</p>
                </div>
                <button
                  onClick={() => addFoodToMeal(food)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                <div>
                  <div className="font-medium">{food.calories}</div>
                  <div className="text-xs">cal</div>
                </div>
                <div>
                  <div className="font-medium">{food.protein}g</div>
                  <div className="text-xs">protein</div>
                </div>
                <div>
                  <div className="font-medium">{food.carbs}g</div>
                  <div className="text-xs">carbs</div>
                </div>
                <div>
                  <div className="font-medium">{food.fats}g</div>
                  <div className="text-xs">fats</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Meal Log */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Log</h2>
        <div className="space-y-6">
          {meals.map((meal, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="font-medium capitalize">{meal.type}</h3>
                  <p className="text-sm text-gray-500">
                    {meal.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {meal.foods.reduce((acc, food) => acc + (food.calories * food.quantity), 0)} cal
                  </div>
                  <div className="text-sm text-gray-500">
                    {meal.foods.length} items
                  </div>
                </div>
              </div>
              <div className="p-4">
                {meal.foods.map((food, foodIndex) => (
                  <div key={foodIndex} className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium">{food.name}</div>
                      <div className="text-sm text-gray-500">{food.servingSize}</div>
                    </div>
                    <div className="text-right">
                      <div>{food.calories * food.quantity} cal</div>
                      <div className="text-sm text-gray-500">
                        P: {food.protein * food.quantity}g • 
                        C: {food.carbs * food.quantity}g • 
                        F: {food.fats * food.quantity}g
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Add food [food name]"</li>
          <li>"Show my daily totals"</li>
        </ul>
      </section>
    </div>
  );
};

export default NutritionLog; 