import React from 'react';
import { LucideIcon, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  percentage: number;
  onQuickAdd?: () => void;
  quickAddLabel?: string;
  onClick?: () => void;
}

export default function MetricCard({
  icon: Icon,
  label,
  current,
  target,
  unit,
  color,
  percentage,
  onQuickAdd,
  quickAddLabel,
  onClick
}: MetricCardProps) {
  return (
    <motion.div 
      className={`relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4 transition-all duration-200 group ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-5 w-5 ${color}`} />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {label}
        </span>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {current}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
          {unit}
        </span>
      </div>
      
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full ${color.replace('text', 'bg')}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="mt-1 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Target: {target} {unit}
        </span>
        {onQuickAdd && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
            }}
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center space-x-1 text-xs ${color} hover:opacity-80`}
          >
            <Plus className="h-3 w-3" />
            <span>{quickAddLabel}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}