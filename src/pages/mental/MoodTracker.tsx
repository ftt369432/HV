import React, { useState } from 'react';
import { MoodType, StressLevel } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface MoodEntry {
  timestamp: Date;
  mood: MoodType;
  stressLevel: StressLevel;
  notes: string;
}

const MoodTracker: React.FC = () => {
  const [currentEntry, setCurrentEntry] = useState<MoodEntry>({
    timestamp: new Date(),
    mood: 'calm',
    stressLevel: 'low',
    notes: ''
  });
  const [moodHistory] = useState<MoodEntry[]>([
    // Sample data - replace with actual data from backend
    {
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      mood: 'energetic',
      stressLevel: 'low',
      notes: 'Great workout session'
    },
    {
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      mood: 'tired',
      stressLevel: 'moderate',
      notes: 'Busy workday'
    }
  ]);
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('set mood')) {
      const moodMatch = command.match(/set mood (anxious|stressed|tired|calm|energetic)/);
      if (moodMatch) {
        const mood = moodMatch[1] as MoodType;
        setCurrentEntry(prev => ({ ...prev, mood }));
        voiceService.speak(`Mood set to ${mood}`);
      }
    } else if (command.includes('set stress')) {
      const stressMatch = command.match(/set stress (low|moderate|high)/);
      if (stressMatch) {
        const stressLevel = stressMatch[1] as StressLevel;
        setCurrentEntry(prev => ({ ...prev, stressLevel }));
        voiceService.speak(`Stress level set to ${stressLevel}`);
      }
    } else if (command.includes('add note')) {
      const note = command.replace('add note', '').trim();
      setCurrentEntry(prev => ({ ...prev, notes: note }));
      voiceService.speak('Note added');
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

  const getMoodEmoji = (mood: MoodType): string => {
    const emojiMap: Record<MoodType, string> = {
      anxious: '😰',
      stressed: '😓',
      tired: '😴',
      calm: '😌',
      energetic: '⚡'
    };
    return emojiMap[mood];
  };

  const getStressColor = (level: StressLevel): string => {
    const colorMap: Record<StressLevel, string> = {
      low: 'bg-green-100',
      moderate: 'bg-yellow-100',
      high: 'bg-red-100'
    };
    return colorMap[level];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mood Tracker</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Current Mood Entry */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Mood</h3>
            <div className="grid grid-cols-5 gap-2">
              {(['anxious', 'stressed', 'tired', 'calm', 'energetic'] as MoodType[]).map(mood => (
                <button
                  key={mood}
                  onClick={() => setCurrentEntry(prev => ({ ...prev, mood }))}
                  className={`p-4 rounded-lg text-center ${
                    currentEntry.mood === mood ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-50'
                  }`}
                >
                  <span className="text-2xl">{getMoodEmoji(mood)}</span>
                  <span className="block text-sm mt-1 capitalize">{mood}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Stress Level</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'moderate', 'high'] as StressLevel[]).map(level => (
                <button
                  key={level}
                  onClick={() => setCurrentEntry(prev => ({ ...prev, stressLevel: level }))}
                  className={`p-4 rounded-lg text-center ${
                    currentEntry.stressLevel === level ? 'ring-2 ring-blue-500' : ''
                  } ${getStressColor(level)}`}
                >
                  <span className="block text-sm capitalize">{level}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <textarea
            value={currentEntry.notes}
            onChange={(e) => setCurrentEntry(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Add notes about how you're feeling..."
            className="w-full p-4 border rounded-lg"
            rows={3}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Save Entry
          </button>
        </div>
      </section>

      {/* Mood History */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Recent Moods</h2>
        <div className="space-y-4">
          {moodHistory.map((entry, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                  <div>
                    <div className="font-medium capitalize">{entry.mood}</div>
                    <div className="text-sm text-gray-500">
                      {entry.timestamp.toLocaleDateString()} {entry.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${getStressColor(entry.stressLevel)}`}>
                  {entry.stressLevel}
                </span>
              </div>
              {entry.notes && (
                <div className="mt-2 text-gray-600 text-sm">{entry.notes}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Set mood [anxious/stressed/tired/calm/energetic]"</li>
          <li>"Set stress [low/moderate/high]"</li>
          <li>"Add note [your note here]"</li>
        </ul>
      </section>
    </div>
  );
};

export default MoodTracker; 