import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface WaterLog {
  timestamp: Date;
  amount: number; // in ml
}

interface WaterStats {
  dailyGoal: number; // in ml
  currentIntake: number; // in ml
  logs: WaterLog[];
  streak: number; // days
}

const WaterTracker: React.FC = () => {
  const [stats, setStats] = useState<WaterStats>({
    dailyGoal: 2500,
    currentIntake: 1500,
    logs: [
      { timestamp: new Date(Date.now() - 30 * 60 * 1000), amount: 250 },
      { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), amount: 500 },
      { timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), amount: 750 }
    ],
    streak: 5
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('add water')) {
      const match = command.match(/(\d+)\s*(ml|glass|glasses)/);
      if (match) {
        let amount = parseInt(match[1]);
        if (match[2] === 'glass' || match[2] === 'glasses') {
          amount *= 250; // Convert glasses to ml
        }
        addWater(amount);
        voiceService.speak(`Added ${amount}ml of water`);
      }
    } else if (command.includes('water status')) {
      const remaining = stats.dailyGoal - stats.currentIntake;
      voiceService.speak(
        `You've had ${stats.currentIntake}ml of water today. ` +
        `${remaining > 0 ? `You need ${remaining}ml more to reach your goal.` : 'You\'ve reached your daily goal!'}`
      );
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

  const addWater = (amount: number) => {
    setStats(prev => ({
      ...prev,
      currentIntake: prev.currentIntake + amount,
      logs: [
        { timestamp: new Date(), amount },
        ...prev.logs
      ]
    }));
  };

  const getProgressPercentage = () => {
    return Math.min((stats.currentIntake / stats.dailyGoal) * 100, 100);
  };

  const getProgressColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Water Tracker</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Progress Circle */}
      <section className="mb-8">
        <div className="max-w-xs mx-auto relative">
          <div className="aspect-square rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats.currentIntake}ml</div>
              <div className="text-gray-500">of {stats.dailyGoal}ml</div>
            </div>
          </div>
          <div
            className={`absolute inset-0 rounded-full border-8 ${getProgressColor()}`}
            style={{
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${100 - getProgressPercentage()}%)`
            }}
          />
        </div>
      </section>

      {/* Quick Add Buttons */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Add</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[250, 500, 750, 1000].map(amount => (
            <button
              key={amount}
              onClick={() => addWater(amount)}
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 text-center"
            >
              <div className="text-xl font-medium">{amount}ml</div>
              <div className="text-sm text-gray-600">
                {amount === 250 ? '1 Glass' : `${amount / 250} Glasses`}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Daily Goal</div>
            <div className="text-2xl font-semibold">{stats.dailyGoal}ml</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Remaining</div>
            <div className="text-2xl font-semibold">
              {Math.max(stats.dailyGoal - stats.currentIntake, 0)}ml
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow text-center">
            <div className="text-sm text-gray-500">Day Streak</div>
            <div className="text-2xl font-semibold">{stats.streak} days</div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Today's Log</h2>
        <div className="space-y-4">
          {stats.logs.map((log, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div>
                <div className="font-medium">{log.amount}ml</div>
                <div className="text-sm text-gray-500">{formatTime(log.timestamp)}</div>
              </div>
              <div className="text-blue-500">
                {log.amount === 250 ? '1 Glass' : `${log.amount / 250} Glasses`}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Add water [amount] ml"</li>
          <li>"Add water [number] glasses"</li>
          <li>"What's my water status?"</li>
        </ul>
      </section>
    </div>
  );
};

export default WaterTracker; 