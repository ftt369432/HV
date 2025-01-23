import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Activity, Calendar } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function ProfilePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-primary-600 to-primary-400">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-16 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  John Doe
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Member since January 2024
                </p>
              </div>
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <Activity className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Workout Streak
                </h3>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  7 days
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <Calendar className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Goals Completed
                </h3>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  12
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <Settings className="w-8 h-8 text-primary-600 dark:text-primary-400 mb-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Active Programs
                </h3>
                <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}