import React, { useState, useEffect } from 'react';
import { MeditationType } from '../../features/types';
import { VoiceService } from '../../services/voice/voiceService';

const voiceService = new VoiceService();

interface MeditationSession {
  type: MeditationType;
  duration: number; // in minutes
  instructions: string[];
  currentStep: number;
  isActive: boolean;
}

const Meditation: React.FC = () => {
  const [session, setSession] = useState<MeditationSession>({
    type: 'relaxation',
    duration: 5,
    instructions: [
      "Find a comfortable position and close your eyes",
      "Take a deep breath in through your nose",
      "Slowly exhale through your mouth",
      "Focus on your breathing",
      "Notice any thoughts without judgment",
      "Return your attention to your breath"
    ],
    currentStep: 0,
    isActive: false
  });

  const [timeRemaining, setTimeRemaining] = useState(session.duration * 60);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (session.isActive && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [session.isActive, timeRemaining]);

  const startSession = () => {
    setSession(prev => ({ ...prev, isActive: true }));
    voiceService.speak("Let's begin your meditation session. Find a comfortable position and close your eyes.");
    progressInstructions();
  };

  const endSession = () => {
    setSession(prev => ({ ...prev, isActive: false, currentStep: 0 }));
    voiceService.speak("Your meditation session is complete. Take a moment to slowly open your eyes.");
  };

  const progressInstructions = () => {
    const interval = setInterval(() => {
      setSession(prev => {
        if (prev.currentStep >= prev.instructions.length - 1) {
          clearInterval(interval);
          return prev;
        }
        const nextStep = prev.currentStep + 1;
        voiceService.speak(prev.instructions[nextStep]);
        return { ...prev, currentStep: nextStep };
      });
    }, 20000); // Progress to next instruction every 20 seconds

    return () => clearInterval(interval);
  };

  const handleVoiceCommand = (text: string) => {
    const command = text.toLowerCase();
    
    if (command.includes('start meditation')) {
      startSession();
    } else if (command.includes('end session') || command.includes('stop meditation')) {
      endSession();
    } else if (command.includes('set time')) {
      const minutes = parseInt(command.match(/\d+/)?.[0] || '5');
      setSession(prev => ({ ...prev, duration: minutes }));
      setTimeRemaining(minutes * 60);
      voiceService.speak(`Setting meditation time to ${minutes} minutes`);
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
        <h1 className="text-3xl font-bold">Meditation</h1>
        <button
          onClick={toggleVoiceAssistant}
          className={`px-4 py-2 rounded-full ${
            isListening ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isListening ? 'Stop Listening' : 'Start Voice Assistant'}
        </button>
      </div>

      {/* Session Setup */}
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Type</h3>
            <select
              value={session.type}
              onChange={(e) => setSession(prev => ({ ...prev, type: e.target.value as MeditationType }))}
              className="w-full p-2 border rounded"
              disabled={session.isActive}
            >
              <option value="focus">Focus</option>
              <option value="relaxation">Relaxation</option>
              <option value="sleep">Sleep</option>
              <option value="stress">Stress Relief</option>
            </select>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">Duration (minutes)</h3>
            <select
              value={session.duration}
              onChange={(e) => {
                const duration = parseInt(e.target.value);
                setSession(prev => ({ ...prev, duration }));
                setTimeRemaining(duration * 60);
              }}
              className="w-full p-2 border rounded"
              disabled={session.isActive}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>
      </section>

      {/* Timer Display */}
      <section className="mb-8 text-center">
        <div className="inline-block p-8 bg-blue-50 rounded-full">
          <span className="text-4xl font-bold">
            {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </section>

      {/* Controls */}
      <section className="mb-8 text-center">
        <button
          onClick={session.isActive ? endSession : startSession}
          className={`px-8 py-4 rounded-lg text-white text-lg ${
            session.isActive ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {session.isActive ? 'End Session' : 'Start Session'}
        </button>
      </section>

      {/* Voice Commands */}
      <section className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Voice Commands</h2>
        <p className="mb-4">Try saying:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>"Start meditation"</li>
          <li>"End session"</li>
          <li>"Set time to 10 minutes"</li>
        </ul>
      </section>
    </div>
  );
};

export default Meditation; 