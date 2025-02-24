import React, { useState } from 'react';
import { Exercise, FitnessLevel, WorkoutGoal } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface WorkoutPlan {
  name: string;
  exercises: Exercise[];
  duration: number;
  level: FitnessLevel;
  goal: WorkoutGoal;
  warmup: string[];
  cooldown: string[];
  tips: string[];
}

const WorkoutPlanner: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<WorkoutPlan>({
    name: 'Full Body Workout',
    exercises: [
      {
        name: 'Push-ups',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'Start in a plank position, lower your body until your chest nearly touches the ground, then push back up'
      },
      {
        name: 'Squats',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'Stand with feet shoulder-width apart, lower your body as if sitting back into a chair, then return to standing'
      },
      {
        name: 'Plank',
        duration: '30 seconds',
        rest: '30 seconds',
        sets: 3,
        instructions: 'Hold a straight-arm plank position, keeping your core tight and body straight'
      }
    ],
    duration: 30,
    level: 'intermediate',
    goal: 'strength',
    warmup: [
      'Light jogging in place - 2 minutes',
      'Arm circles - 30 seconds',
      'Hip rotations - 30 seconds'
    ],
    cooldown: [
      'Light stretching - 2 minutes',
      'Deep breathing - 1 minute',
      'Final relaxation - 1 minute'
    ],
    tips: [
      'Stay hydrated throughout the workout',
      'Focus on proper form rather than speed',
      'Listen to your body and rest when needed'
    ]
  });
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('start workout')) {
      voiceService.speak('Starting your workout. Beginning with warmup.');
    } else if (command.includes('next exercise')) {
      // TODO: Implement exercise progression
      voiceService.speak('Moving to the next exercise');
    } else if (command.includes('show plan')) {
      voiceService.speak(
        `Your workout plan includes ${currentPlan.exercises.length} exercises ` +
        `for ${currentPlan.duration} minutes at ${currentPlan.level} level.`
      );
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Workout Planner</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Workout Overview */}
      <section className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">{currentPlan.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-gray-500">Duration</p>
              <p className="text-xl font-semibold">{currentPlan.duration} min</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Level</p>
              <p className="text-xl font-semibold capitalize">{currentPlan.level}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Goal</p>
              <p className="text-xl font-semibold capitalize">{currentPlan.goal}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warmup */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Warm-up</h2>
        <div className="bg-blue-50 rounded-lg p-6">
          <ul className="space-y-2">
            {currentPlan.warmup.map((step, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Main Workout */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
        <div className="space-y-4">
          {currentPlan.exercises.map((exercise, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-medium mb-2">{exercise.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{exercise.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sets</p>
                  <p className="font-medium">{exercise.sets}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rest</p>
                  <p className="font-medium">{exercise.rest}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">{exercise.instructions}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cooldown */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Cool-down</h2>
        <div className="bg-green-50 rounded-lg p-6">
          <ul className="space-y-2">
            {currentPlan.cooldown.map((step, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Tips</h2>
        <div className="bg-yellow-50 rounded-lg p-6">
          <ul className="space-y-2">
            {currentPlan.tips.map((tip, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Start workout"</li>
          <li>"Next exercise"</li>
          <li>"Show workout plan"</li>
        </ul>
      </section>
    </div>
  );
};

export default WorkoutPlanner; 