import React from 'react';
import { ArrowRight, Activity, Heart, Brain, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative overflow-hidden pt-32 pb-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200/50 dark:bg-primary-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-200/50 dark:bg-accent-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-primary-300/50 dark:bg-primary-800/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center space-x-4 mb-8">
            <Activity className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-pulse" />
            <Heart className="h-12 w-12 text-accent-600 dark:text-accent-400 animate-pulse animation-delay-2000" />
            <Brain className="h-12 w-12 text-primary-600 dark:text-primary-400 animate-pulse animation-delay-4000" />
          </div>
          
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">Transform Your Life with</span>
            <span className="block mt-2">
              <span className="text-primary-600 dark:text-primary-400">Personalized</span>{' '}
              <span className="text-accent-600 dark:text-accent-400">Wellness</span>
            </span>
          </h1>
          
          <p className="mt-6 max-w-md mx-auto text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:mt-8 md:max-w-3xl">
            Your all-in-one platform for holistic health. Get personalized nutrition, 
            fitness plans, and mental wellness guidance tailored just for you.
          </p>

          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
            <div className="rounded-full">
              <a
                href="#features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="mt-3 rounded-full sm:mt-0 sm:ml-3">
              <a
                href="#features"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">10k+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent-600 dark:text-accent-400">95%</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">24/7</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}