import React from 'react';
import { motion } from 'framer-motion';
import { Search, MoreVertical } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    photoURL: string;
  }[];
  lastMessage: {
    text: string;
    timestamp: Date;
    senderId: string;
  };
  unreadCount: number;
}

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (chatId: string) => void;
}

export default function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  const { user } = useAuth();
  
  // Temporary mock data
  const chats: Chat[] = [
    {
      id: '1',
      participants: [
        {
          id: '2',
          name: 'Jane Smith',
          photoURL: '/avatars/jane.jpg'
        }
      ],
      lastMessage: {
        text: 'Looking forward to our meditation session!',
        timestamp: new Date(),
        senderId: '2'
      },
      unreadCount: 2
    },
    {
      id: '2',
      participants: [
        {
          id: '3',
          name: 'John Doe',
          photoURL: '/avatars/john.jpg'
        }
      ],
      lastMessage: {
        text: 'Thanks for the wellness tips!',
        timestamp: new Date(Date.now() - 3600000),
        senderId: '1'
      },
      unreadCount: 0
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search chats"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="overflow-y-auto h-[calc(100vh-16rem)]">
        {chats.map((chat) => {
          const participant = chat.participants[0];
          const isSelected = chat.id === selectedChat;

          return (
            <motion.button
              key={chat.id}
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
              onClick={() => onSelectChat(chat.id)}
              className={`
                w-full p-4 flex items-center space-x-3 border-b border-gray-200 dark:border-gray-700
                ${isSelected ? 'bg-purple-50 dark:bg-purple-900/20' : ''}
              `}
            >
              <img
                src={participant.photoURL}
                alt={participant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {participant.name}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTime(chat.lastMessage.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage.senderId === user?.id ? 'You: ' : ''}
                  {chat.lastMessage.text}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <span className="px-2 py-1 text-xs font-medium text-white bg-purple-500 rounded-full">
                  {chat.unreadCount}
                </span>
              )}
              <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <MoreVertical className="h-5 w-5 text-gray-400" />
              </button>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
} 