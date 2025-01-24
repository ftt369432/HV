import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';

interface ShoppingListProps {
  list: Array<{
    category: string;
    items: Array<{
      name: string;
      amount: string;
      recipe: string;
      isChecked?: boolean;
    }>;
  }>;
  onToggleItem: (category: string, itemName: string) => void;
}

export default function ShoppingList({ list, onToggleItem }: ShoppingListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-lg">
          <ShoppingBag className="h-5 w-5 text-emerald-500" />
        </div>
        <h3 className="text-lg font-medium">Shopping List</h3>
      </div>

      <div className="space-y-6">
        {list.map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-medium text-gray-500 mb-3">
              {category.category}
            </h4>
            <div className="space-y-2">
              {category.items.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 4 }}
                  onClick={() => onToggleItem(category.category, item.name)}
                  className="w-full flex items-center justify-between p-3 rounded-lg
                         bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 
                         dark:hover:bg-gray-900/70 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                ${item.isChecked 
                                  ? 'border-emerald-500 bg-emerald-500' 
                                  : 'border-gray-300 dark:border-gray-600'
                                }`}
                    >
                      {item.isChecked && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-sm ${
                      item.isChecked 
                        ? 'text-gray-400 line-through' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {item.amount} {item.name}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {item.recipe}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 