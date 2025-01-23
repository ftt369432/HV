import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  name: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  route?: string;
}

export default function FeatureCard({ name, description, icon: Icon, gradient, route }: FeatureCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <motion.div 
      className={`relative group ${route ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300"
        style={{ backgroundImage: `linear-gradient(to right, ${gradient})` }}
      />
      <div className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg transform transition-all duration-300">
        <div 
          className="absolute -inset-0.5 bg-gradient-to-r rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
          style={{ backgroundImage: `linear-gradient(to right, ${gradient})` }}
        />
        <div className="relative">
          <div className="h-12 w-12 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300">
            <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <h3 className="mt-6 text-xl font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
            {name}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300">
            {description}
          </p>
          {route && (
            <div className="mt-4 text-sm text-primary-600 dark:text-primary-400 group-hover:text-white/90">
              Click to explore →
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}