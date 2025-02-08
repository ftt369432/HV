import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Clock } from 'lucide-react';

interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    photoURL: string;
    mutualFriends: number;
  };
  status: 'pending' | 'sent';
  timestamp: Date;
}

export default function FriendRequests() {
  // Temporary mock data
  const requests: FriendRequest[] = [
    {
      id: '1',
      user: {
        id: '2',
        name: 'Sarah Wilson',
        photoURL: '/avatars/sarah.jpg',
        mutualFriends: 3
      },
      status: 'pending',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      user: {
        id: '3',
        name: 'Michael Brown',
        photoURL: '/avatars/michael.jpg',
        mutualFriends: 5
      },
      status: 'sent',
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    
    if (hours < 24) {
      return `${hours}h ago`;
    }
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleAccept = (requestId: string) => {
    // Add accept logic here
  };

  const handleReject = (requestId: string) => {
    // Add reject logic here
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Friend Requests
        </h2>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {requests.map((request) => (
          <div key={request.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={request.user.photoURL}
                  alt={request.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {request.user.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {request.user.mutualFriends} mutual friends
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatTime(request.timestamp)}
              </span>
            </div>

            {request.status === 'pending' ? (
              <div className="mt-4 flex space-x-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAccept(request.id)}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg
                           hover:bg-purple-600 flex items-center justify-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Accept</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleReject(request.id)}
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 
                           text-gray-700 dark:text-gray-300 rounded-lg
                           hover:bg-gray-200 dark:hover:bg-gray-600
                           flex items-center justify-center space-x-2"
                >
                  <X className="h-4 w-4" />
                  <span>Reject</span>
                </motion.button>
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center px-4 py-2 
                           bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-500"
              >
                <Clock className="h-4 w-4 mr-2" />
                <span>Request Sent</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {requests.length === 0 && (
        <div className="p-6 text-center text-gray-500">
          No friend requests at the moment
        </div>
      )}
    </div>
  );
} 