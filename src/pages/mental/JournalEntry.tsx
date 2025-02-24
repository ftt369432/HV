import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface JournalEntry {
  date: Date;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

const JournalEntry: React.FC = () => {
  const [entry, setEntry] = useState<JournalEntry>({
    date: new Date(),
    title: '',
    content: '',
    mood: '',
    tags: []
  });
  const [isListening, setIsListening] = useState(false);
  const [isRecordingContent, setIsRecordingContent] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('start recording')) {
      setIsRecordingContent(true);
      voiceService.speak('Recording your journal entry. Speak your thoughts.');
    } else if (command.includes('stop recording')) {
      setIsRecordingContent(false);
      voiceService.speak('Recording stopped.');
    } else if (isRecordingContent) {
      setEntry(prev => ({
        ...prev,
        content: prev.content + ' ' + text
      }));
    } else if (command.includes('set title')) {
      const title = text.replace('set title', '').trim();
      setEntry(prev => ({ ...prev, title }));
      voiceService.speak(`Title set to: ${title}`);
    }
  };

  const toggleVoiceAssistant = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
      setIsRecordingContent(false);
    } else {
      voiceService.startListening(
        handleVoiceCommand,
        (error) => console.error('Voice recognition error:', error)
      );
      setIsListening(true);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving entry:', entry);
    voiceService.speak('Journal entry saved successfully.');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Journal Entry</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Entry Header */}
        <div className="mb-6">
          <input
            type="text"
            value={entry.title}
            onChange={(e) => setEntry(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Entry Title"
            className="w-full text-2xl font-semibold p-2 border-b focus:outline-none focus:border-blue-500"
          />
          <div className="text-sm text-gray-500 mt-2">
            {entry.date.toLocaleDateString()} • {entry.date.toLocaleTimeString()}
          </div>
        </div>

        {/* Mood Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Mood
          </label>
          <select
            value={entry.mood}
            onChange={(e) => setEntry(prev => ({ ...prev, mood: e.target.value }))}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Mood</option>
            <option value="happy">Happy</option>
            <option value="calm">Calm</option>
            <option value="anxious">Anxious</option>
            <option value="sad">Sad</option>
            <option value="energetic">Energetic</option>
          </select>
        </div>

        {/* Journal Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Thoughts
            {isRecordingContent && (
              <span className="ml-2 text-red-500 animate-pulse">Recording...</span>
            )}
          </label>
          <textarea
            value={entry.content}
            onChange={(e) => setEntry(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write (or speak) your thoughts here..."
            className="w-full h-64 p-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            placeholder="Add tags (comma separated)"
            className="w-full p-2 border rounded"
            value={entry.tags.join(', ')}
            onChange={(e) => setEntry(prev => ({
              ...prev,
              tags: e.target.value.split(',').map(tag => tag.trim())
            }))}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Entry
          </button>
        </div>

        {/* Voice Commands Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-medium mb-2">Voice Commands</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
            <li>"Start recording" - Begin voice-to-text for journal content</li>
            <li>"Stop recording" - End voice-to-text recording</li>
            <li>"Set title [your title]" - Set the entry title</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry; 