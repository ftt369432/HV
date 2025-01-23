import React from 'react';
import { Mail, MessageSquare, Phone } from 'lucide-react';

const contactMethods = [
  {
    name: 'Email Support',
    description: 'Get in touch with our support team',
    icon: Mail,
    contact: 'support@healthvibes.com',
    action: 'Send email'
  },
  {
    name: 'Live Chat',
    description: 'Chat with our wellness experts',
    icon: MessageSquare,
    contact: 'Available 24/7',
    action: 'Start chat'
  },
  {
    name: 'Phone Support',
    description: 'Speak directly with our team',
    icon: Phone,
    contact: '+1 (888) 123-4567',
    action: 'Call now'
  }
];

export default function Contact() {
  return (
    <div id="contact" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Have questions? We're here to help you on your wellness journey
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactMethods.map((method) => (
              <div
                key={method.name}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 text-center transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <method.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {method.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {method.description}
                </p>
                <p className="mt-2 text-lg font-medium text-primary-600 dark:text-primary-400">
                  {method.contact}
                </p>
                <button className="mt-6 w-full rounded-full bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors">
                  {method.action}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
                  placeholder="How can we help you?"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}