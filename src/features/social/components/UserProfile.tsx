import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, MessageCircle, UserPlus, Calendar, MapPin, Heart } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

interface UserProfileProps {
  isOwnProfile?: boolean;
  userId?: string;
}

interface Interest {
  id: string;
  name: string;
}

export default function UserProfile({ isOwnProfile = false, userId }: UserProfileProps) {
  const { user } = useAuth();

  // Mock data for development
  const profile = {
    name: isOwnProfile ? user?.name : 'Jane Smith',
    photoURL: isOwnProfile ? user?.photoURL : 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
    location: 'San Francisco, CA',
    joinDate: 'January 2024',
    bio: 'Passionate about mental wellness and mindfulness. Love meditation and yoga.',
    interests: [
      { id: '1', name: 'Meditation' },
      { id: '2', name: 'Yoga' },
      { id: '3', name: 'Mindfulness' },
      { id: '4', name: 'Mental Health' }
    ],
    stats: {
      friends: 142,
      meditations: 56,
      journalEntries: 24
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-500" />

      {/* Profile Info */}
      <div className="relative px-6 pb-6">
        {/* Avatar and Actions */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="flex items-end space-x-4">
            <img
              src={profile.photoURL || 'https://api.dicebear.com/7.x/avatars/svg?seed=default'}
              alt={profile.name || 'Profile'}
              className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile.name}
              </h1>
            </div>
          </div>

          {isOwnProfile ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <Edit2 className="h-5 w-5" />
            </motion.button>
          ) : (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <UserPlus className="h-5 w-5" />
                <span>Connect</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Info and Stats */}
        <div className="space-y-4">
          {/* Location and Join Date */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {profile.location}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Joined {profile.joinDate}
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-400">
            {profile.bio}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            {Object.entries(profile.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <div
                key={interest.id}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 
                         text-purple-600 dark:text-purple-400 rounded-full 
                         text-sm flex items-center"
              >
                <Heart className="h-3 w-3 mr-1" />
                {interest.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 