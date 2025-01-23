import React from 'react';
import { motion } from 'framer-motion';
import { 
  Edit2, 
  MessageCircle, 
  UserPlus, 
  Calendar, 
  MapPin, 
  Heart 
} from 'lucide-react';
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

  // Temporary mock data
  const profile = {
    name: isOwnProfile ? user?.name : 'Jane Smith',
    photoURL: isOwnProfile ? user?.photoURL : '/avatars/jane.jpg',
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
        {/* Avatar */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <div className="flex items-end space-x-4">
            <img
              src={profile.photoURL}
              alt={profile.name}
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
              className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm"
            >
              <Edit2 className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </motion.button>
          ) : (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-purple-600 text-white rounded-full shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-sm"
              >
                <UserPlus className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
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
          <p className="text-gray-600 dark:text-gray-400">
            {profile.bio}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
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
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Interests
          </h3>
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