import React, { useState } from 'react';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'workshop' | 'meetup' | 'challenge' | 'webinar';
  attendees: number;
  maxAttendees: number;
  host: string;
}

interface Discussion {
  id: string;
  title: string;
  author: string;
  content: string;
  category: 'wellness' | 'fitness' | 'nutrition' | 'mindfulness';
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

const sampleEvents: CommunityEvent[] = [
  {
    id: '1',
    title: 'Mindful Morning Meditation',
    description: 'Start your day with a guided meditation session',
    date: '2024-03-15',
    time: '08:00 AM',
    location: 'Virtual',
    category: 'workshop',
    attendees: 45,
    maxAttendees: 100,
    host: 'Sarah Johnson'
  },
  {
    id: '2',
    title: 'Healthy Cooking Workshop',
    description: 'Learn to prepare nutritious and delicious meals',
    date: '2024-03-20',
    time: '06:00 PM',
    location: 'Community Center',
    category: 'meetup',
    attendees: 28,
    maxAttendees: 30,
    host: 'Chef Mike Chen'
  }
];

const sampleDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'Tips for Maintaining Work-Life Balance',
    author: 'Emma Davis',
    content: 'Share your strategies for balancing work and wellness...',
    category: 'wellness',
    likes: 24,
    comments: 12,
    timestamp: '2 hours ago',
    tags: ['stress-management', 'lifestyle', 'wellness']
  },
  {
    id: '2',
    title: 'Plant-Based Diet Success Stories',
    author: 'Alex Thompson',
    content: 'My journey transitioning to a plant-based diet...',
    category: 'nutrition',
    likes: 18,
    comments: 8,
    timestamp: '4 hours ago',
    tags: ['nutrition', 'plant-based', 'health']
  }
];

const Community: React.FC = () => {
  const [events, setEvents] = useState<CommunityEvent[]>(sampleEvents);
  const [discussions, setDiscussions] = useState<Discussion[]>(sampleDiscussions);
  const [activeTab, setActiveTab] = useState<'events' | 'discussions'>('events');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('show events')) {
      setActiveTab('events');
      voiceService.speak('Showing community events');
    } else if (command.includes('show discussions')) {
      setActiveTab('discussions');
      voiceService.speak('Showing community discussions');
    } else if (command.includes('join event')) {
      voiceService.speak('Please select an event to join from the list');
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

  const getCategoryColor = (category: CommunityEvent['category'] | Discussion['category']) => {
    const colors = {
      workshop: 'bg-blue-100 text-blue-600',
      meetup: 'bg-green-100 text-green-600',
      challenge: 'bg-purple-100 text-purple-600',
      webinar: 'bg-yellow-100 text-yellow-600',
      wellness: 'bg-indigo-100 text-indigo-600',
      fitness: 'bg-red-100 text-red-600',
      nutrition: 'bg-green-100 text-green-600',
      mindfulness: 'bg-purple-100 text-purple-600'
    };
    return colors[category];
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'events'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Events
        </button>
        <button
          onClick={() => setActiveTab('discussions')}
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'discussions'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Discussions
        </button>
      </div>

      {/* Events Section */}
      {activeTab === 'events' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Upcoming Events</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Create Event
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {event.attendees}/{event.maxAttendees} attending
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Date:</span>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Time:</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Location:</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 w-20">Host:</span>
                      <span>{event.host}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <button className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Discussions Section */}
      {activeTab === 'discussions' && (
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Community Discussions</h2>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Start Discussion
            </button>
          </div>
          <div className="space-y-4">
            {discussions.map(discussion => (
              <div key={discussion.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{discussion.title}</h3>
                    <p className="text-sm text-gray-500">
                      Posted by {discussion.author} • {discussion.timestamp}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getCategoryColor(discussion.category)}`}>
                    {discussion.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{discussion.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1">
                    <span>👍</span> {discussion.likes} likes
                  </button>
                  <button className="flex items-center gap-1">
                    <span>💬</span> {discussion.comments} comments
                  </button>
                  <button className="flex items-center gap-1">
                    <span>📤</span> Share
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Voice Commands */}
      <section className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Show community events"</li>
          <li>"Show discussions"</li>
          <li>"Join event"</li>
        </ul>
      </section>
    </div>
  );
};

export default Community; 