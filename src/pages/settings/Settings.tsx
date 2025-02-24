import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
    updates: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'connections' | 'private';
    activitySharing: boolean;
    dataCollection: boolean;
  };
  units: {
    weight: 'kg' | 'lbs';
    height: 'cm' | 'ft';
    distance: 'km' | 'mi';
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    contrastMode: boolean;
    reduceMotion: boolean;
  };
}

const Settings: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      push: true,
      reminders: true,
      updates: false
    },
    privacy: {
      profileVisibility: 'connections',
      activitySharing: true,
      dataCollection: true
    },
    units: {
      weight: 'kg',
      height: 'cm',
      distance: 'km'
    },
    accessibility: {
      fontSize: 'medium',
      contrastMode: false,
      reduceMotion: false
    }
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('change theme')) {
      if (command.includes('dark')) {
        setPreferences(prev => ({ ...prev, theme: 'dark' }));
        voiceService.speak('Changed theme to dark mode');
      } else if (command.includes('light')) {
        setPreferences(prev => ({ ...prev, theme: 'light' }));
        voiceService.speak('Changed theme to light mode');
      }
    } else if (command.includes('privacy')) {
      voiceService.speak('Opening privacy settings');
      // Scroll to privacy section
      document.getElementById('privacy-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleVoiceAssistant = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      voiceService.startListening(
        handleVoiceCommand,
        (error) => console.error('Voice recognition error:', error)
      );
      setIsListening(true);
    }
  };

  const updatePreference = (
    category: keyof UserPreferences,
    setting: string,
    value: any
  ) => {
    setPreferences(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object'
        ? { ...prev[category], [setting]: value }
        : value
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Appearance */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => updatePreference('theme', '', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) => updatePreference('language', '', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {Object.entries(preferences.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updatePreference('notifications', key, e.target.checked)}
                  className="rounded text-blue-500"
                />
                <span className="capitalize">{key}</span>
              </label>
              <span className="text-sm text-gray-500">
                {value ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section id="privacy-section" className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={preferences.privacy.profileVisibility}
              onChange={(e) => updatePreference('privacy', 'profileVisibility', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="public">Public</option>
              <option value="connections">Connections Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.privacy.activitySharing}
                onChange={(e) => updatePreference('privacy', 'activitySharing', e.target.checked)}
                className="rounded text-blue-500"
              />
              <span>Activity Sharing</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.privacy.dataCollection}
                onChange={(e) => updatePreference('privacy', 'dataCollection', e.target.checked)}
                className="rounded text-blue-500"
              />
              <span>Data Collection</span>
            </label>
          </div>
        </div>
      </section>

      {/* Units */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Units</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight
            </label>
            <select
              value={preferences.units.weight}
              onChange={(e) => updatePreference('units', 'weight', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="lbs">Pounds (lbs)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <select
              value={preferences.units.height}
              onChange={(e) => updatePreference('units', 'height', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="cm">Centimeters (cm)</option>
              <option value="ft">Feet (ft)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance
            </label>
            <select
              value={preferences.units.distance}
              onChange={(e) => updatePreference('units', 'distance', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="km">Kilometers (km)</option>
              <option value="mi">Miles (mi)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Accessibility</h2>
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Size
            </label>
            <select
              value={preferences.accessibility.fontSize}
              onChange={(e) => updatePreference('accessibility', 'fontSize', e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.accessibility.contrastMode}
                onChange={(e) => updatePreference('accessibility', 'contrastMode', e.target.checked)}
                className="rounded text-blue-500"
              />
              <span>High Contrast Mode</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={preferences.accessibility.reduceMotion}
                onChange={(e) => updatePreference('accessibility', 'reduceMotion', e.target.checked)}
                className="rounded text-blue-500"
              />
              <span>Reduce Motion</span>
            </label>
          </div>
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Change theme to dark mode"</li>
          <li>"Change theme to light mode"</li>
          <li>"Show privacy settings"</li>
        </ul>
      </section>
    </div>
  );
};

export default Settings; 