import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <div className="relative py-24 bg-gradient-to-br from-primary-600 to-accent-600 dark:from-primary-900 dark:to-accent-900">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] aspect-[1/0.3] bg-white/10 rounded-[100%]" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Sparkles className="mx-auto h-12 w-12 text-white/90" />
          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Transform Your Life?
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
            Join thousands of users who have already started their wellness journey. 
            Get personalized plans, expert guidance, and a supportive community.
          </p>
          
          <div className="mt-12 flex justify-center space-x-6">
            <button className="px-8 py-3 bg-white text-primary-600 rounded-full font-medium hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 flex items-center">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
              Contact Sales
            </button>
          </div>
          
          <p className="mt-8 text-sm text-white/80">
            No credit card required. 14-day free trial.
          </p>
        </div>
      </div>
    </div>
  );
}