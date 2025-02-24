import React, { useState } from 'react';
import { Exercise, FitnessLevel } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface ExerciseCategory {
  name: string;
  exercises: Exercise[];
}

const exerciseLibrary: ExerciseCategory[] = [
  {
    name: 'Strength Training',
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
        name: 'Dumbbell Rows',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'Bend at hips, keep back straight, pull dumbbell to hip level, then lower back down'
      }
    ]
  },
  {
    name: 'Cardio',
    exercises: [
      {
        name: 'Jumping Jacks',
        duration: '60 seconds',
        rest: '20 seconds',
        sets: 3,
        instructions: 'Jump while spreading legs and raising arms, then return to starting position'
      },
      {
        name: 'Mountain Climbers',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'Start in plank position, alternate bringing knees to chest in a running motion'
      },
      {
        name: 'Burpees',
        duration: '30 seconds',
        rest: '30 seconds',
        sets: 3,
        instructions: 'Drop to a squat, kick feet back to plank, return to squat, then jump up'
      }
    ]
  },
  {
    name: 'Flexibility',
    exercises: [
      {
        name: 'Forward Fold',
        duration: '30 seconds',
        rest: '10 seconds',
        sets: 3,
        instructions: 'Stand tall, hinge at hips, fold forward reaching for toes'
      },
      {
        name: 'Cat-Cow Stretch',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'On hands and knees, alternate between arching and rounding your back'
      },
      {
        name: 'Downward Dog',
        duration: '45 seconds',
        rest: '15 seconds',
        sets: 3,
        instructions: 'Form an inverted V with your body, pressing heels toward the ground'
      }
    ]
  }
];

const ExerciseLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Strength Training');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<FitnessLevel>('intermediate');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('show category')) {
      const category = exerciseLibrary.find(cat => 
        command.includes(cat.name.toLowerCase())
      );
      if (category) {
        setSelectedCategory(category.name);
        voiceService.speak(`Showing ${category.name} exercises`);
      }
    } else if (command.includes('search for')) {
      const searchQuery = command.replace('search for', '').trim();
      setSearchTerm(searchQuery);
      voiceService.speak(`Searching for ${searchQuery}`);
    } else if (command.includes('explain')) {
      const exerciseName = command.replace('explain', '').trim();
      const exercise = exerciseLibrary
        .flatMap(cat => cat.exercises)
        .find(ex => ex.name.toLowerCase() === exerciseName);
      if (exercise) {
        voiceService.speak(exercise.instructions);
      }
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

  const filteredExercises = exerciseLibrary
    .find(cat => cat.name === selectedCategory)
    ?.exercises.filter(exercise =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Exercise Library</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Filters */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              {exerciseLibrary.map(category => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as FitnessLevel)}
              className="w-full p-2 border rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search exercises..."
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </section>

      {/* Exercise Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-medium mb-2">{exercise.name}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Duration:</span> {exercise.duration}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Sets:</span> {exercise.sets}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Rest:</span> {exercise.rest}
                </p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700">Instructions:</h4>
                  <p className="text-sm text-gray-600 mt-1">{exercise.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Show category cardio"</li>
          <li>"Search for push-ups"</li>
          <li>"Explain burpees"</li>
        </ul>
      </section>
    </div>
  );
};

export default ExerciseLibrary; 