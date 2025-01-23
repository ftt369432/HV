import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import NutritionPage from './features/nutrition/pages/NutritionPage';
import MentalWellnessPage from './features/mental/pages/MentalWellnessPage';
import FitnessPage from './features/fitness/pages/FitnessPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import Footer from './components/Footer';
import AIChat from './components/AIAssistant/AIChat';
import SystemsBar from './components/SystemsBar/SystemsBar';
import APIKeyManager from './components/APIKeyManager/APIKeyManager';
import { WellnessProvider } from './contexts/WellnessContext';

function App() {
  return (
    <WellnessProvider>
      <Router>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/nutrition" element={<NutritionPage />} />
              <Route path="/mental-wellness" element={<MentalWellnessPage />} />
              <Route path="/fitness" element={<FitnessPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
          <SystemsBar />
          <AIChat />
          <APIKeyManager />
        </div>
      </Router>
    </WellnessProvider>
  );
}

export default App;