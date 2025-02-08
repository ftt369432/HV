import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  ShoppingBag, 
  CalendarDays, 
  Sparkles,
  SlidersHorizontal,
  Clock,
  Users,
  Globe,
  Utensils,
  Flame,
  Heart,
  Apple,
  Carrot,
  Fish,
  Beef,
  Wheat,
  Camera,
  Mic,
  Image as ImageIcon,
  Plus,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Recipe } from '../types';
import { usePreferencesStore } from '../stores';
import RecipeCard from './RecipeCard';
import ShoppingList from './ShoppingList';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCardBackground, getPrimaryButtonStyle } from '../../../utils/themeUtils';

interface GeneratedMealPlan {
  recipes: Recipe[];
  shoppingList: {
    category: string;
    items: Array<{
      name: string;
      amount: string;
      recipe: string;
      isChecked?: boolean;
    }>;
  }[];
}

interface FoodAnalysis {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
  portions: number;
}

const cuisineTypes = [
  { id: 'any', label: 'Any Cuisine', icon: Globe, color: 'text-blue-500' },
  { id: 'italian', label: 'Italian', icon: Utensils, color: 'text-green-500' },
  { id: 'asian', label: 'Asian', icon: Carrot, color: 'text-orange-500' },
  { id: 'mexican', label: 'Mexican', icon: Flame, color: 'text-red-500' },
  { id: 'mediterranean', label: 'Mediterranean', icon: Fish, color: 'text-cyan-500' },
  { id: 'american', label: 'American', icon: Beef, color: 'text-purple-500' },
  { id: 'indian', label: 'Indian', icon: Wheat, color: 'text-yellow-500' },
  { id: 'healthy', label: 'Healthy', icon: Apple, color: 'text-emerald-500' }
];

// Example of vibrant colors for icons
const vibrantColors = {
  clock: 'text-yellow-400 hover:text-yellow-300',
  users: 'text-green-400 hover:text-green-300',
  utensils: 'text-red-400 hover:text-red-300',
  flame: 'text-orange-400 hover:text-orange-300',
};

export default function AIChef() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [mealPlan, setMealPlan] = useState<GeneratedMealPlan | null>(null);
  const [filters, setFilters] = useState({
    servings: 2,
    days: 7,
    prepTime: '30',
    cuisine: 'Any',
  });
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [foodAnalysis, setFoodAnalysis] = useState<FoodAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { isCyberpunk } = useTheme();

  const { preferences } = usePreferencesStore();

  const generateMealPlan = async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI service call
      const mockMealPlan: GeneratedMealPlan = {
        recipes: [
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
            ingredients: [],
            instructions: [],
            isFavorite: false
          },
          // Add more mock recipes...
        ],
        shoppingList: [
          {
            category: 'Produce',
            items: [
              { name: 'Mixed Greens', amount: '2 bags', recipe: 'Grilled Chicken Salad' },
              { name: 'Cherry Tomatoes', amount: '1 pint', recipe: 'Grilled Chicken Salad' }
            ]
          },
          {
            category: 'Protein',
            items: [
              { name: 'Chicken Breast', amount: '2 lbs', recipe: 'Grilled Chicken Salad' }
            ]
          }
        ]
      };

      setTimeout(() => {
        setMealPlan(mockMealPlan);
        setIsGenerating(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating meal plan:', error);
      setIsGenerating(false);
    }
  };

  const handleToggleItem = (category: string, itemName: string) => {
    if (!mealPlan) return;

    setMealPlan({
      ...mealPlan,
      shoppingList: mealPlan.shoppingList.map(cat => {
        if (cat.category === category) {
          return {
            ...cat,
            items: cat.items.map(item => {
              if (item.name === itemName) {
                return { ...item, isChecked: !item.isChecked };
              }
              return item;
            })
          };
        }
        return cat;
      })
    });
  };

  // Voice command handling
  const startVoiceCommand = async () => {
    try {
      setIsListening(true);
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (error) {
      console.error('Error starting voice recognition:', error);
      setIsListening(false);
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes('take picture') || command.includes('capture food')) {
      handleCameraClick();
    } else if (command.includes('analyze')) {
      if (capturedImage) {
        analyzeFoodImage(capturedImage);
      }
    } else if (command.includes('generate meal plan')) {
      generateMealPlan();
    }
    // Add more voice commands as needed
  };

  // Camera and image handling
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        analyzeFoodImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeFoodImage = async (imageData: string) => {
    setIsAnalyzing(true);
    try {
      // TODO: Replace with actual AI service call
      // This would call your AI service for food recognition and calorie estimation
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      setFoodAnalysis({
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 15,
        confidence: 0.92,
        portions: 1
      });
    } catch (error) {
      console.error('Error analyzing food image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`p-6 rounded-2xl ${
        isCyberpunk 
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/25'
          : 'bg-primary-50 dark:bg-gray-800'
      }`}>
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-xl ${
              isCyberpunk
                ? 'bg-white/10 backdrop-blur-sm'
                : 'bg-white dark:bg-gray-700'
            }`}
          >
            <ChefHat className="h-8 w-8 text-primary-500 dark:text-primary-400" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Chef
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your personal nutrition assistant
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-xl ${
            isCyberpunk
              ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
          } shadow-sm flex items-center space-x-3`}
        >
          <Camera className="h-5 w-5 text-primary-500" />
          <span className="text-gray-700 dark:text-gray-200">
            Analyze Food
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-xl ${
            isCyberpunk
              ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
          } shadow-sm flex items-center space-x-3`}
        >
          <Utensils className="h-5 w-5 text-primary-500" />
          <span className="text-gray-700 dark:text-gray-200">
            Generate Recipe
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`p-4 rounded-xl ${
            isCyberpunk
              ? 'bg-gray-800/50 hover:bg-gray-800/70 backdrop-blur-sm'
              : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
          } shadow-sm flex items-center space-x-3`}
        >
          <Clock className="h-5 w-5 text-primary-500" />
          <span className="text-gray-700 dark:text-gray-200">
            Meal Planning
          </span>
        </motion.button>
      </div>

      {/* Search Bar */}
      <div className={`relative ${
        isCyberpunk ? 'neon-glow' : ''
      }`}>
        <input
          type="text"
          placeholder="Ask AI Chef anything..."
          className={`w-full px-4 py-3 pl-12 rounded-xl ${
            isCyberpunk
              ? 'bg-gray-800/50 border border-gray-700/50 text-white'
              : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
          } focus:outline-none focus:ring-2 focus:ring-primary-500`}
        />
        <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>

      {/* Filters with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg 
                 border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
            <SlidersHorizontal className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Customize Your Meal Plan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Servings Selector */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-lg">
                <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
              </div>
              <span>Servings</span>
            </label>
            <select
              value={filters.servings}
              onChange={(e) => setFilters({ ...filters, servings: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700/50 dark:text-white
                     focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                     transition-colors duration-200"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} people</option>
              ))}
            </select>
          </div>

          {/* Days Selector */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-lg 
                          hover:bg-emerald-200 dark:hover:bg-emerald-800/40 transition-colors">
                <CalendarDays className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
              </div>
              <span>Days to Plan</span>
            </label>
            <select
              value={filters.days}
              onChange={(e) => setFilters({ ...filters, days: Number(e.target.value) })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700/50 dark:text-white
                     focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400
                     transition-colors duration-200"
            >
              {[1, 3, 5, 7, 14].map((n) => (
                <option key={n} value={n}>{n} days</option>
              ))}
            </select>
          </div>

          {/* Time Selector */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-lg
                          hover:bg-amber-200 dark:hover:bg-amber-800/40 transition-colors">
                <Clock className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              </div>
              <span>Max Prep Time</span>
            </label>
            <select
              value={filters.prepTime}
              onChange={(e) => setFilters({ ...filters, prepTime: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700/50 dark:text-white
                     focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400
                     transition-colors duration-200"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="any">Any</option>
            </select>
          </div>

          {/* Cuisine Selector */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <div className="bg-fuchsia-100 dark:bg-fuchsia-900/30 p-1.5 rounded-lg
                          hover:bg-fuchsia-200 dark:hover:bg-fuchsia-800/40 transition-colors">
                <Utensils className="h-4 w-4 text-fuchsia-500 dark:text-fuchsia-400" />
              </div>
              <span>Cuisine Type</span>
            </label>
            <select
              value={filters.cuisine}
              onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 
                     dark:border-gray-600 dark:bg-gray-700/50 dark:text-white
                     focus:ring-2 focus:ring-fuchsia-500 dark:focus:ring-fuchsia-400
                     transition-colors duration-200"
            >
              {cuisineTypes.map((cuisine) => (
                <option key={cuisine.id} value={cuisine.id}>{cuisine.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.98 }}
            onClick={generateMealPlan}
            disabled={isGenerating}
            className="px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 
                   hover:from-violet-600 hover:to-fuchsia-600 text-white rounded-xl
                   flex items-center space-x-3 shadow-lg disabled:opacity-50
                   transition-all duration-200"
          >
            <Sparkles className="h-5 w-5" />
            <span className="text-lg font-medium">
              {isGenerating ? 'Creating Your Plan...' : 'Generate Meal Plan'}
            </span>
          </motion.button>
        </div>
      </motion.div>

      {/* Food Analysis Results */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center justify-center p-8 bg-white dark:bg-gray-800 
                     rounded-xl shadow-sm"
          >
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <span className="ml-3 text-lg">Analyzing your food...</span>
          </motion.div>
        )}

        {foodAnalysis && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Food Analysis Results</h3>
              <span className="text-sm text-gray-500">
                {(foodAnalysis.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(foodAnalysis)
                .filter(([key]) => !['confidence', 'name'].includes(key))
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 capitalize">{key}</div>
                    <div className="text-lg font-medium">{value}</div>
                  </div>
                ))
              }
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Add to meal tracking
                // TODO: Implement meal tracking logic
              }}
              className={`mt-4 w-full flex items-center justify-center space-x-2 p-3
                       rounded-lg ${getPrimaryButtonStyle(isCyberpunk)}`}
            >
              <Plus className="h-5 w-5" />
              <span>Add to Meal Tracking</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {mealPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Generated Meal Plan */}
            <div className={`p-6 rounded-xl ${getCardBackground(isCyberpunk)}`}>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Your Meal Plan
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mealPlan.recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onAddToMealPlan={() => {}}
                    onToggleFavorite={() => {}}
                  />
                ))}
              </div>
            </div>

            {/* Shopping List */}
            <ShoppingList
              list={mealPlan.shoppingList}
              onToggleItem={handleToggleItem}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}