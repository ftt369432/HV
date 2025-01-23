import React, { useState } from 'react';
import { features } from './features/featureData';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="py-24 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Transform Your Wellness Journey
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Discover how our platform helps you achieve your wellness goals
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-w-16 aspect-h-9"
                >
                  <div className="p-8 bg-gradient-to-br rounded-2xl h-full"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${activeFeature.gradient})` }}>
                    <div className="h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                      <activeFeature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{activeFeature.name}</h3>
                    <p className="text-white/90 mb-8">{activeFeature.description}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {features.map((feature) => (
                <button
                  key={feature.name}
                  onClick={() => setActiveFeature(feature)}
                  className={`p-6 rounded-2xl text-left transition-all duration-200 ${
                    activeFeature.name === feature.name
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <feature.icon className={`h-8 w-8 ${
                    activeFeature.name === feature.name
                      ? 'text-white'
                      : 'text-primary-600 dark:text-primary-400'
                  }`} />
                  <h3 className="mt-4 text-lg font-semibold">{feature.name}</h3>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}