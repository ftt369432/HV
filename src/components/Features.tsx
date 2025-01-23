import React from 'react';
import FeatureCard from './features/FeatureCard';
import { features } from './features/featureData';

export default function Features() {
  return (
    <div id="features" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-primary-600 dark:text-primary-400 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need for a healthier you
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
            Discover our comprehensive suite of tools designed to support your wellness journey
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <FeatureCard
                key={feature.name}
                name={feature.name}
                description={feature.description}
                icon={feature.icon}
                gradient={feature.gradient}
                route={feature.route}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}