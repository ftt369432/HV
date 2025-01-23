import React from 'react';
import { Activity, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">HealthVibes</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Your journey to holistic wellness starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Features</a></li>
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Pricing</a></li>
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">About</a></li>
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Blog</a></li>
              <li><a href="#" className="text-base text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 tracking-wider uppercase">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 dark:text-gray-500 text-center">
            © {new Date().getFullYear()} HealthVibes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}