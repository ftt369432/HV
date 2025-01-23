import React from 'react';
import { ExternalLink } from 'lucide-react';
import { AIProvider, ProviderConfig } from '../../config/apiKeys';

interface APIKeyCardProps {
  provider: AIProvider;
  config: ProviderConfig;
  value: string;
  showKey: boolean;
  onChange: (value: string) => void;
}

export default function APIKeyCard({ provider, config, value, showKey, onChange }: APIKeyCardProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {config.name}
        </h4>
        <a
          href={config.docsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-600 dark:text-primary-400 hover:underline flex items-center text-xs"
        >
          <span>Docs</span>
          <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      </div>
      
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
        {config.description}
      </p>
      
      <input
        type={showKey ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
        placeholder={config.placeholder}
      />
    </div>
  );
}