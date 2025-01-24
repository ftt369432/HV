import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks } from 'date-fns';
import { useMealTrackingStore } from '../stores/mealTrackingStore';

export default function MealHistory() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [weekStart, setWeekStart] = React.useState(startOfWeek(selectedDate));
  const getMealHistory = useMealTrackingStore(state => state.getMealHistory);
  const getDailyMacros = useMealTrackingStore(state => state.getDailyMacros);

  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: endOfWeek(weekStart)
  });

  const weekHistory = getMealHistory(
    weekStart.toISOString().split('T')[0],
    endOfWeek(weekStart).toISOString().split('T')[0]
  );

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = direction === 'prev' 
      ? subWeeks(weekStart, 1)
      : addWeeks(weekStart, 1);
    setWeekStart(newWeekStart);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateWeek('prev')}
          className="p-2 text-gray-600 dark:text-gray-400"
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span className="text-lg font-medium">
            {format(weekStart, 'MMMM d')} - {format(endOfWeek(weekStart), 'MMMM d, yyyy')}
          </span>
        </div>

        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigateWeek('next')}
          className="p-2 text-gray-600 dark:text-gray-400"
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day) => {
          const dateStr = day.toISOString().split('T')[0];
          const meals = weekHistory[dateStr] || [];
          const macros = getDailyMacros(dateStr);

          return (
            <motion.div
              key={dateStr}
              whileHover={{ y: -2 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm"
            >
              <div className="text-center mb-2">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {format(day, 'EEE')}
                </div>
                <div className="text-lg font-medium">
                  {format(day, 'd')}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {macros.calories} cal
                </div>
                <div className="text-xs text-gray-500">
                  {meals.length} meals
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
} 