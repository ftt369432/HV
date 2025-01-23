import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Message, SuggestedPrompt, SpeechOptions } from './types';
import { suggestedPrompts } from './data';
import { generateResponse } from './responseGenerator';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import SuggestedPrompts from './SuggestedPrompts';
import FollowUpSuggestions from './FollowUpSuggestions';
import SpeechSettings from './settings/SpeechSettings';
import Collapsible from '../shared/Collapsible';

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [followUpSuggestions, setFollowUpSuggestions] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [speechOptions, setSpeechOptions] = useState<SpeechOptions>({
    rate: 1,
    pitch: 1,
    volume: 1
  });

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setFollowUpSuggestions([]);

    // Generate AI response
    setTimeout(() => {
      const response = generateResponse(content);
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: response.text,
        sender: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      if (response.followUp) {
        setFollowUpSuggestions(response.followUp);
      }
    }, 1500);
  }, []);

  const handlePromptClick = (prompt: SuggestedPrompt) => {
    handleSendMessage(prompt.text);
  };

  const toggleVoice = () => setIsVoiceActive(!isVoiceActive);
  const toggleSettings = () => setShowSettings(!showSettings);

  useKeyboardShortcuts({
    onSend: () => handleSendMessage(''),
    onVoiceToggle: toggleVoice,
    onMinimizeToggle: () => {},
    isMinimized: false
  });

  return (
    <Collapsible
      title="AI Assistant"
      icon={<Bot className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
      className="fixed bottom-6 right-6 w-96"
      contentClassName="flex flex-col h-[600px]"
    >
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatMessages 
          messages={messages} 
          isTyping={isTyping}
          speechOptions={speechOptions}
        />
        
        {messages.length === 0 && (
          <SuggestedPrompts
            prompts={suggestedPrompts}
            onPromptClick={handlePromptClick}
          />
        )}

        <FollowUpSuggestions
          suggestions={followUpSuggestions}
          onSuggestionClick={handleSendMessage}
        />

        {showSettings && (
          <SpeechSettings
            options={speechOptions}
            onOptionsChange={setSpeechOptions}
          />
        )}

        <ChatInput 
          onSendMessage={handleSendMessage}
          onVoiceToggle={toggleVoice}
          isVoiceActive={isVoiceActive}
        />
      </div>
    </Collapsible>
  );
}