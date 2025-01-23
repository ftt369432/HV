import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Moon, Globe, Shield } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function SettingsPage() {
  const { isDark, toggle: toggleTheme } = useTheme();

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      settings: [
        { name: 'Profile Information', description: 'Update your personal details' },
        { name: 'Email Preferences', description: 'Manage your email settings' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        { name: 'Push Notifications', description: 'Configure app notifications' },
        { name: 'Email Notifications', description: 'Manage email alerts' }
      ]
    },
    {
      title: 'Privacy',
      icon: Lock,
      settings: [
        { name: 'Privacy Settings', description: 'Control your privacy preferences' },
        { name: 'Data Usage', description: 'Manage how your data is used' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Settings
        </h1>

        <div className="grid grid-cols-1 gap-8">
          {/* Theme Toggle */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Toggle dark mode on or off
                  </p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isDark ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isDark ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Settings Sections */}
          {settingSections.map((section) => (
            <div
              key={section.title}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <section.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div
                    key={setting.name}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        {setting.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {setting.description}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}