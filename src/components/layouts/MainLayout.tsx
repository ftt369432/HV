import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar';
import StatsBar from '../StatsBar';
import AIChat from '../AIAssistant/AIChat';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 ml-60"
      >
        <StatsBar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>

        <AIChat />
      </motion.div>
    </div>
  );
} 