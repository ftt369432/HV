import React from 'react';
import { motion } from 'framer-motion';
import { 
  Bell, 
  Shield, 
  Globe, 
  Database,
  UserCircle,
  Sliders
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const settingSections = [
  {
    title: 'Account',
    icon: UserCircle,
    items: [
      { label: 'Profile Information', description: 'Update your personal details' },
      { label: 'Password', description: 'Change your password' },
      { label: 'Email', description: 'Manage email preferences' }
    ]
  },
  {
    title: 'Preferences',
    icon: Sliders,
    items: [
      { label: 'Theme', description: 'Customize your interface', component: ThemeToggle },
      { label: 'Language', description: 'Select your preferred language' },
      { label: 'Units', description: 'Choose measurement units' }
    ]
  },
  {
    title: 'Privacy',
    icon: Shield,
    items: [
      { label: 'Data Sharing', description: 'Control what data is shared' },
      { label: 'Privacy Settings', description: 'Manage your privacy preferences' }
    ]
  }
];

export default function SettingsPage() {
  const { isCyberpunk } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>

        <div className="space-y-6">
          {settingSections.map((section) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                         ${isCyberpunk ? 'border border-gray-800/50' : ''}`}
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isCyberpunk 
                        ? 'bg-gray-800/50' 
                        : 'bg-gray-100 dark:bg-gray-700'
                    }`}>
                      <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between p-4 rounded-lg
                                hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                transition-colors"
                      >
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                        {item.component && <item.component />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}