import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DietaryPreference, HealthGoal } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';
import { Apple, Droplet, Utensils, Scale } from 'lucide-react';

const voiceService = new VoiceService();

interface NutritionStats {
  calories: {
    current: number;
    target: number;
  };
  water: {
    current: number;
    target: number;
  };
  mealsLogged: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

const NutritionHub: React.FC = () => {
  const navigate = useNavigate();
  const [isVoiceAssistantActive, setIsVoiceAssistantActive] = useState(false);

  const nutritionStats: NutritionStats = {
    calories: {
      current: 1450,
      target: 2000
    },
    water: {
      current: 1.5,
      target: 2.5
    },
    mealsLogged: 3,
    macros: {
      protein: 80,
      carbs: 200,
      fats: 55
    }
  };

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('plan meals') || lowerCommand.includes('meal plan')) {
      navigate('/nutrition/meal-planner');
    } else if (lowerCommand.includes('water') || lowerCommand.includes('track water')) {
      navigate('/nutrition/water-tracker');
    } else if (lowerCommand.includes('log') || lowerCommand.includes('nutrition log')) {
      navigate('/nutrition/nutrition-log');
    } else if (lowerCommand.includes('show stats') || lowerCommand.includes('nutrition stats')) {
      voiceService.speak(
        `You've consumed ${nutritionStats.calories.current} out of ${nutritionStats.calories.target} calories today. ` +
        `You've had ${nutritionStats.water.current} liters of water out of your ${nutritionStats.water.target} liter goal. ` +
        `You've logged ${nutritionStats.mealsLogged} meals so far.`
      );
    }
  };

  const toggleVoiceAssistant = () => {
    if (isVoiceAssistantActive) {
      voiceService.stopListening();
    } else {
      voiceService.startListening(handleVoiceCommand, (error) => console.error('Voice recognition error:', error));
    }
    setIsVoiceAssistantActive(!isVoiceAssistantActive);
  };

  const getProgressColor = (current: number, target: number): string => {
    const percentage = (current / target) * 100;
    if (percentage >= 90 && percentage <= 110) return 'bg-green-500';
    if (percentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Nutrition Hub
          </h1>
          <button
            onClick={toggleVoiceAssistant}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {isVoiceAssistantActive ? 'Stop Voice Assistant' : 'Start Voice Assistant'}
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Today's Nutrition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Calories Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Calories</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {nutritionStats.calories.current}
                  </span>
                  <span className="text-sm text-gray-500">/ {nutritionStats.calories.target}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressColor(nutritionStats.calories.current, nutritionStats.calories.target)}`}
                  style={{ width: `${(nutritionStats.calories.current / nutritionStats.calories.target) * 100}%` }}
                />
              </div>
            </div>

            {/* Water Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Water (L)</h3>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {nutritionStats.water.current}
                  </span>
                  <span className="text-sm text-gray-500">/ {nutritionStats.water.target}</span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${getProgressColor(nutritionStats.water.current, nutritionStats.water.target)}`}
                  style={{ width: `${(nutritionStats.water.current / nutritionStats.water.target) * 100}%` }}
                />
              </div>
            </div>

            {/* Meals Logged Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 dark:text-gray-400">Meals Logged</h3>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {nutritionStats.mealsLogged}
                </div>
              </div>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i < nutritionStats.mealsLogged ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Macros Card */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="text-sm text-gray-600 dark:text-gray-400 mb-4">Macros (g)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Protein</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {nutritionStats.macros.protein}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Carbs</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {nutritionStats.macros.carbs}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Fats</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {nutritionStats.macros.fats}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              to="/nutrition/meal-planner"
              className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Meal Planning</h3>
              <p className="text-gray-600 dark:text-gray-400">Plan your daily meals</p>
            </Link>
            <Link 
              to="/nutrition/water-tracker"
              className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Water Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">Monitor water intake</p>
            </Link>
            <Link 
              to="/nutrition/nutrition-log"
              className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nutrition Log</h3>
              <p className="text-gray-600 dark:text-gray-400">Log your meals and snacks</p>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Voice Commands
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Try saying:</p>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• "Plan meals" - Open meal planner</li>
              <li>• "Track water" - Open water tracker</li>
              <li>• "Log meal" - Open nutrition log</li>
              <li>• "Show nutrition stats" - Hear your current stats</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NutritionHub; 