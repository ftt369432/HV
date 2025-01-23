import React, { useState, useEffect } from 'react';
import { Settings, Eye, EyeOff, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { APIKeys, loadAPIKeys, saveAPIKeys, providerConfigs, AIProvider } from '../../config/apiKeys';
import APIKeyCard from './APIKeyCard';

export default function APIKeyManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeys, setShowKeys] = useState(false);
  const [keys, setKeys] = useState<APIKeys>(loadAPIKeys());
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setKeys(loadAPIKeys());
  }, []);

  const handleSave = async () => {
    try {
      setStatus('saving');
      saveAPIKeys(keys);
      setStatus('saved');
      setTimeout(() => setStatus('idle'), 2000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  const handleKeyChange = (provider: AIProvider, value: string) => {
    setKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const filteredProviders = Object.entries(providerConfigs).filter(([key, config]) =>
    config.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-6 p-3 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform duration-200"
      >
        <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-20 right-6 w-96 max-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Providers</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowKeys(!showKeys)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                title={showKeys ? "Hide API keys" : "Show API keys"}
              >
                {showKeys ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search providers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
            {filteredProviders.map(([provider, config]) => (
              <APIKeyCard
                key={provider}
                provider={provider as AIProvider}
                config={config}
                value={keys[provider as AIProvider]}
                showKey={showKeys}
                onChange={(value) => handleKeyChange(provider as AIProvider, value)}
              />
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={status === 'saving'}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>
                {status === 'idle' && 'Save Keys'}
                {status === 'saving' && 'Saving...'}
                {status === 'saved' && 'Saved!'}
                {status === 'error' && 'Error!'}
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}