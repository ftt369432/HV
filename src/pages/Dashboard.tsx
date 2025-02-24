import React from 'react';
import { Link } from 'react-router-dom';
import { WellnessMetrics } from '../features/types';

interface DashboardProps {
  metrics?: WellnessMetrics;
}

const Dashboard: React.FC<DashboardProps> = ({ metrics }) => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Wellness Dashboard</h1>
      
      {/* Mental Wellness Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Mental Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/mental/meditation" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
            <h3 className="font-medium">Meditation</h3>
            <p className="text-sm text-gray-600">{metrics?.mental.meditationMinutes || 0} minutes today</p>
          </Link>
          <Link to="/mental/mood" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
            <h3 className="font-medium">Mood Tracking</h3>
            <p className="text-sm text-gray-600">Current mood: {metrics?.mental.moodScore || 'Not set'}</p>
          </Link>
        </div>
      </section>

      {/* Physical Wellness Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Physical Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/physical/workout" className="p-4 bg-green-50 rounded-lg hover:bg-green-100">
            <h3 className="font-medium">Workouts</h3>
            <p className="text-sm text-gray-600">{metrics?.physical.workoutsCompleted || 0} completed</p>
          </Link>
          <Link to="/physical/activity" className="p-4 bg-green-50 rounded-lg hover:bg-green-100">
            <h3 className="font-medium">Activity Tracking</h3>
            <p className="text-sm text-gray-600">{metrics?.physical.activeMinutes || 0} active minutes</p>
          </Link>
        </div>
      </section>

      {/* Nutrition Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Nutrition</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/nutrition/meals" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100">
            <h3 className="font-medium">Meal Planning</h3>
            <p className="text-sm text-gray-600">{metrics?.nutrition.mealsLogged || 0} meals logged</p>
          </Link>
          <Link to="/nutrition/water" className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100">
            <h3 className="font-medium">Water Intake</h3>
            <p className="text-sm text-gray-600">{metrics?.nutrition.waterIntake || 0}ml today</p>
          </Link>
        </div>
      </section>

      {/* Social Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Social Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/social/connections" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
            <h3 className="font-medium">Connections</h3>
            <p className="text-sm text-gray-600">{metrics?.social.connectionsCount || 0} connections</p>
          </Link>
          <Link to="/social/challenges" className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
            <h3 className="font-medium">Challenges</h3>
            <p className="text-sm text-gray-600">{metrics?.social.activitiesParticipated || 0} participated</p>
          </Link>
        </div>
      </section>

      {/* Voice Assistant Section */}
      <section className="mt-8 p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
        <h2 className="text-2xl font-semibold mb-4">Voice Assistant</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Start a meditation session"</li>
          <li>"Log my workout"</li>
          <li>"Track my water intake"</li>
          <li>"How am I doing today?"</li>
        </ul>
      </section>
    </div>
  );
};

export default Dashboard; 