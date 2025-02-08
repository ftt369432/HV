import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  show: boolean;
}

export default function Tooltip({ children, content, show }: TooltipProps) {
  return (
    <div className="relative">
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 
                     text-white text-sm rounded whitespace-nowrap z-50"
          >
            {content}
            <div className="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent 
                        border-r-gray-900 dark:border-r-gray-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 