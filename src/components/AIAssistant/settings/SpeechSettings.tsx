import React from 'react';
import { Volume2, Settings2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpeechOptions } from '../types';

interface SpeechSettingsProps {
  options: SpeechOptions;
  onOptionsChange: (options: SpeechOptions) => void;
}

export default function SpeechSettings({ options, onOptionsChange }: SpeechSettingsProps) {
  const handleChange = (key: keyof SpeechOptions, value: number) => {
    onOptionsChange({ ...options, [key]: value });
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Settings2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">Speech Settings</h3>
        </div>
        <button 
          onClick={() => {
            const utterance = new SpeechSynthesisUtterance("Testing voice settings");
            Object.assign(utterance, options);
            window.speechSynthesis.speak(utterance);
          }}
          className="flex items-center space-x-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
        >
          <Volume2 className="h-4 w-4" />
          <span>Test</span>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>Speed</span>
            <span>{options.rate?.toFixed(1)}x</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={options.rate}
            onChange={(e) => handleChange('rate', parseFloat(e.target.value))}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>Pitch</span>
            <span>{options.pitch?.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={options.pitch}
            onChange={(e) => handleChange('pitch', parseFloat(e.target.value))}
            className="w-full mt-1"
          />
        </div>

        <div>
          <label className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
            <span>Volume</span>
            <span>{options.volume?.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={options.volume}
            onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
            className="w-full mt-1"
          />
        </div>
      </div>
    </div>
  );
}