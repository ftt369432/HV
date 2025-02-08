import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  timestamp: Date;
  senderId: string;
}

interface ChatProps {
  chatId: string;
}

export default function Chat({ chatId }: ChatProps) {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  // Temporary mock data
  const messages: Message[] = [
    {
      id: '1',
      text: 'Hey! How are you doing today?',
      timestamp: new Date(Date.now() - 3600000),
      senderId: '2'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished a meditation session.',
      timestamp: new Date(Date.now() - 3500000),
      senderId: user?.id || ''
    },
    {
      id: '3',
      text: 'That\'s awesome! Would you like to join our group meditation tomorrow?',
      timestamp: new Date(Date.now() - 3400000),
      senderId: '2'
    }
  ];

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Add send message logic here
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="/avatars/jane.jpg"
            alt="Jane Smith"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-medium text-gray-900 dark:text-white">
              Jane Smith
            </h2>
            <p className="text-sm text-gray-500">
              Online
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <Phone className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <Video className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <MoreVertical className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.senderId === user?.id;

          return (
            <div
              key={message.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[70%] rounded-lg px-4 py-2
                  ${isOwnMessage 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }
                `}
              >
                <p className="break-words">{message.text}</p>
                <p className={`
                  text-xs mt-1
                  ${isOwnMessage ? 'text-purple-100' : 'text-gray-500'}
                `}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-end space-x-2">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder-gray-500 focus:ring-2 focus:ring-purple-500
                     resize-none"
            rows={1}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-3 bg-purple-500 text-white rounded-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 