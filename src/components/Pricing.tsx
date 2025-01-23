import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    description: 'Essential features for your wellness journey',
    features: [
      'Basic meal planning',
      'Simple workout tracking',
      'Daily wellness tips',
      'Limited meditation content'
    ],
    cta: 'Get Started',
    featured: false
  },
  {
    name: 'Pro',
    price: '$12',
    description: 'Advanced features for dedicated wellness enthusiasts',
    features: [
      'Personalized meal plans',
      'Advanced workout analytics',
      'Guided meditation library',
      'Progress tracking',
      'Priority support'
    ],
    cta: 'Start Free Trial',
    featured: true
  },
  {
    name: 'Ultimate',
    price: '$29',
    description: 'Complete wellness solution for optimal results',
    features: [
      'AI-powered recommendations',
      '1-on-1 coaching sessions',
      'Custom workout programs',
      'Nutrition consultation',
      'Premium meditation content',
      'Family account sharing'
    ],
    cta: 'Contact Sales',
    featured: false
  }
];

export default function Pricing() {
  return (
    <div id="pricing" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your wellness journey
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl ${
                tier.featured
                  ? 'bg-primary-600 dark:bg-primary-500 text-white ring-4 ring-primary-600 dark:ring-primary-400'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-gray-700'
              } p-8 shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex-1">
                <h3 className={`text-2xl font-semibold ${tier.featured ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{tier.price}</span>
                  {tier.price !== 'Free' && (
                    <span className={`ml-1 text-xl ${tier.featured ? 'text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>
                      /month
                    </span>
                  )}
                </div>
                <p className={`mt-6 text-base ${
                  tier.featured ? 'text-gray-100' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {tier.description}
                </p>

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className={`h-5 w-5 ${
                        tier.featured ? 'text-white' : 'text-primary-500 dark:text-primary-400'
                      }`} />
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    className={`w-full rounded-full px-6 py-3 text-center text-base font-medium transition-colors ${
                      tier.featured
                        ? 'bg-white text-primary-600 hover:bg-gray-50'
                        : 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600'
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}