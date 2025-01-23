import React from 'react';
import { Bot, Minimize2, Maximize2, Settings2 } from 'lucide-react';

interface ChatHeaderProps {
  isMinimized: boolean;
  showSettings: boolean;
  onToggleMinimize: () => void;
  onToggleSettings: () => void;
}

export default function ChatHeader({ 
  isMinimized, 
  showSettings,
  onToggleMinimize,
  onToggleSettings 
}: ChatHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-primary-50 dark:bg-gray-800 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <Bot className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">HealthVibes AI</h3>
          {!isMinimized && (
            <p className="text-sm text-gray-600 dark:text-gray-300">Your wellness assistant</p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!isMinimized && (
          <button
            onClick={onToggleSettings}
            className={`p-2 rounded-lg transition-colors ${
              showSettings 
                ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            title="Voice settings"
          >
            <Settings2 className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onToggleMinimize}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {isMinimized ? (
            <Maximize2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Minimize2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>
    </div>
  );
}