import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { usePreferencesStore, DietaryRestriction } from '../stores/preferencesStore';

const dietaryRestrictions: { value: DietaryRestriction; label: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
  { value: 'keto', label: 'Ketogenic' },
  { value: 'paleo', label: 'Paleo' },
  { value: 'pescatarian', label: 'Pescatarian' }
];

export default function PreferencesWizard({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const { preferences, updatePreferences, setInitialized } = usePreferencesStore();
  const [tempPreferences, setTempPreferences] = useState(preferences);

  const steps = [
    {
      title: 'Dietary Restrictions',
      description: 'Select any dietary restrictions that apply to you',
      component: (
        <div className="grid grid-cols-2 gap-4">
          {dietaryRestrictions.map((restriction) => (
            <button
              key={restriction.value}
              onClick={() => {
                const current = tempPreferences.dietaryRestrictions;
                const updated = current.includes(restriction.value)
                  ? current.filter((r) => r !== restriction.value)
                  : [...current, restriction.value];
                setTempPreferences({
                  ...tempPreferences,
                  dietaryRestrictions: updated
                });
              }}
              className={`p-4 rounded-lg border-2 transition-colors ${
                tempPreferences.dietaryRestrictions.includes(restriction.value)
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <span className="text-sm font-medium">{restriction.label}</span>
            </button>
          ))}
        </div>
      )
    },
    {
      title: 'Allergies & Intolerances',
      description: 'Add any food allergies or intolerances',
      component: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Type an allergy and press Enter"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value) {
                setTempPreferences({
                  ...tempPreferences,
                  allergies: [...tempPreferences.allergies, e.currentTarget.value]
                });
                e.currentTarget.value = '';
              }
            }}
          />
          <div className="flex flex-wrap gap-2">
            {tempPreferences.allergies.map((allergy, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-sm flex items-center"
              >
                {allergy}
                <button
                  onClick={() => {
                    setTempPreferences({
                      ...tempPreferences,
                      allergies: tempPreferences.allergies.filter((_, i) => i !== index)
                    });
                  }}
                  className="ml-2 hover:text-red-800 dark:hover:text-red-200"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Nutrition Goals',
      description: 'Set your daily nutrition goals',
      component: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Daily Calories</label>
            <input
              type="number"
              value={tempPreferences.calorieGoal}
              onChange={(e) =>
                setTempPreferences({
                  ...tempPreferences,
                  calorieGoal: parseInt(e.target.value)
                })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Protein (g)</label>
              <input
                type="number"
                value={tempPreferences.proteinGoal}
                onChange={(e) =>
                  setTempPreferences({
                    ...tempPreferences,
                    proteinGoal: parseInt(e.target.value)
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Carbs (g)</label>
              <input
                type="number"
                value={tempPreferences.carbGoal}
                onChange={(e) =>
                  setTempPreferences({
                    ...tempPreferences,
                    carbGoal: parseInt(e.target.value)
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fat (g)</label>
              <input
                type="number"
                value={tempPreferences.fatGoal}
                onChange={(e) =>
                  setTempPreferences({
                    ...tempPreferences,
                    fatGoal: parseInt(e.target.value)
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Meal Schedule',
      description: 'Set your preferred meal times',
      component: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(tempPreferences.mealTimes).map(([meal, time]) => (
              <div key={meal}>
                <label className="block text-sm font-medium mb-2 capitalize">
                  {meal} Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTempPreferences({
                      ...tempPreferences,
                      mealTimes: {
                        ...tempPreferences.mealTimes,
                        [meal]: e.target.value
                      }
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="intermittentFasting"
                checked={tempPreferences.intermittentFasting.enabled}
                onChange={(e) =>
                  setTempPreferences({
                    ...tempPreferences,
                    intermittentFasting: {
                      ...tempPreferences.intermittentFasting,
                      enabled: e.target.checked
                    }
                  })
                }
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <label htmlFor="intermittentFasting" className="text-sm font-medium">
                Enable Intermittent Fasting
              </label>
            </div>
            {tempPreferences.intermittentFasting.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fasting Window (hours)
                  </label>
                  <input
                    type="number"
                    value={tempPreferences.intermittentFasting.fastingWindow}
                    onChange={(e) =>
                      setTempPreferences({
                        ...tempPreferences,
                        intermittentFasting: {
                          ...tempPreferences.intermittentFasting,
                          fastingWindow: parseInt(e.target.value)
                        }
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    value={tempPreferences.intermittentFasting.startTime}
                    onChange={(e) =>
                      setTempPreferences({
                        ...tempPreferences,
                        intermittentFasting: {
                          ...tempPreferences.intermittentFasting,
                          startTime: e.target.value
                        }
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }
  ];

  const handleComplete = () => {
    updatePreferences(tempPreferences);
    setInitialized(true);
    onComplete();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {steps[step].title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {steps[step].description}
        </p>
      </div>

      <div className="mb-8">{steps[step].component}</div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {step === steps.length - 1 ? (
          <button
            onClick={handleComplete}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white"
          >
            <span>Complete</span>
            <Check className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary-600 text-white"
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}