import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Users } from 'lucide-react';
import UserProfile from '../components/UserProfile';
import ChatList from '../components/ChatList';
import Chat from '../components/Chat';
import FriendRequests from '../components/FriendRequests';

type Tab = 'messages' | 'friends';

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<Tab>('messages');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-10rem)]">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Social
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Connect with friends and chat
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('messages')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg
            ${activeTab === 'messages'
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          <MessageCircle className="h-5 w-5" />
          <span>Messages</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('friends')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg
            ${activeTab === 'friends'
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }
          `}
        >
          <Users className="h-5 w-5" />
          <span>Friends</span>
        </motion.button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm h-full">
        <AnimatePresence mode="wait">
          {activeTab === 'messages' ? (
            <motion.div
              key="messages"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex"
            >
              <ChatList
                onSelectChat={setSelectedChat}
                selectedChat={selectedChat}
              />
              {selectedChat ? (
                <Chat chatId={selectedChat} />
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="friends"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full grid grid-cols-1 lg:grid-cols-2 gap-6 p-6"
            >
              <UserProfile isOwnProfile={true} />
              <FriendRequests />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 