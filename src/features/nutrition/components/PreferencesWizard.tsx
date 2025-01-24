import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings2, 
  AlertCircle, 
  Apple, 
  Calendar, 
  Droplets,
  Scale,
  Clock 
} from 'lucide-react';

interface PreferencesStep {
  id: string;
  title: string;
  icon: React.ElementType;
}

const steps: PreferencesStep[] = [
  {
    id: 'diet-type',
    title: 'Diet Type',
    icon: Apple,
  },
  {
    id: 'allergies',
    title: 'Allergies & Restrictions',
    icon: AlertCircle,
  },
  {
    id: 'goals',
    title: 'Nutrition Goals',
    icon: Scale,
  },
  {
    id: 'schedule',
    title: 'Meal Schedule',
    icon: Clock,
  },
  {
    id: 'integrations',
    title: 'Calendar Integration',
    icon: Calendar,
  },
  {
    id: 'hydration',
    title: 'Hydration Goals',
    icon: Droplets,
  }
];

const dietTypes = [
  { id: 'standard', label: 'Standard Balanced' },
  { id: 'keto', label: 'Ketogenic' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'mediterranean', label: 'Mediterranean' },
  { id: 'lowCarb', label: 'Low Carb' },
  { id: 'glutenFree', label: 'Gluten Free' }
];

const commonAllergies = [
  'Dairy', 'Eggs', 'Fish', 'Shellfish', 'Tree Nuts',
  'Peanuts', 'Wheat', 'Soy', 'Sesame'
];

interface Preferences {
  dietaryRestrictions: string[];
  allergies: string[];
  goals: string[];
  cuisinePreferences: string[];
}

export default function PreferencesWizard() {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<Preferences>({
    dietaryRestrictions: [],
    allergies: [],
    goals: [],
    cuisinePreferences: []
  });

        return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-8">
        {/* Wizard steps will go here */}
        <p>Preferences wizard coming soon...</p>
              </div>
            </div>
  );
}