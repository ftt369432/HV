import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface Connection {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastActive: string;
  mutualChallenges: number;
  wellnessScore: number;
  interests: string[];
}

const sampleConnections: Connection[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '👩',
    status: 'online',
    lastActive: 'Now',
    mutualChallenges: 3,
    wellnessScore: 85,
    interests: ['Meditation', 'Yoga', 'Healthy Cooking']
  },
  {
    id: '2',
    name: 'Mike Chen',
    avatar: '👨',
    status: 'offline',
    lastActive: '2h ago',
    mutualChallenges: 2,
    wellnessScore: 78,
    interests: ['Running', 'Weight Training', 'Nutrition']
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: '👩',
    status: 'online',
    lastActive: 'Now',
    mutualChallenges: 4,
    wellnessScore: 92,
    interests: ['Mindfulness', 'Pilates', 'Plant-based Diet']
  }
];

const Connections: React.FC = () => {
  const [connections, setConnections] = useState<Connection[]>(sampleConnections);
  const [searchTerm, setSearchTerm] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('search for')) {
      const searchQuery = command.replace('search for', '').trim();
      setSearchTerm(searchQuery);
      voiceService.speak(`Searching for connections with "${searchQuery}"`);
    } else if (command.includes('show online')) {
      setSearchTerm('online');
      voiceService.speak('Showing online connections');
    } else if (command.includes('clear search')) {
      setSearchTerm('');
      voiceService.speak('Cleared search filters');
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

  const filteredConnections = connections.filter(connection =>
    connection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    connection.interests.some(interest => 
      interest.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    (searchTerm.toLowerCase() === 'online' && connection.status === 'online')
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Connections</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Search and Filters */}
      <section className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search connections..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => setSearchTerm('online')}
            className={`px-4 py-2 rounded ${
              searchTerm === 'online'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Online Now
          </button>
        </div>
      </section>

      {/* Connections List */}
      <section className="space-y-4">
        {filteredConnections.map(connection => (
          <div key={connection.id} className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-start">
                <div className="relative">
                  <div className="text-4xl">{connection.avatar}</div>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      connection.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-medium">{connection.name}</h3>
                  <p className="text-sm text-gray-500">
                    {connection.status === 'online' ? 'Online Now' : `Last active ${connection.lastActive}`}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {connection.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold">
                  {connection.wellnessScore}%
                </div>
                <div className="text-sm text-gray-500">Wellness Score</div>
                <div className="mt-2 text-sm text-blue-600">
                  {connection.mutualChallenges} mutual challenges
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Message
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Start Challenge
              </button>
            </div>
          </div>
        ))}
        {filteredConnections.length === 0 && (
          <div className="text-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No connections found</p>
          </div>
        )}
      </section>

      {/* Voice Commands */}
      <section className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Search for [name or interest]"</li>
          <li>"Show online connections"</li>
          <li>"Clear search"</li>
        </ul>
      </section>
    </div>
  );
};

export default Connections; 