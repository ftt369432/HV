import { SpeechOptions } from '../types';

export function createSpeechSynthesisUtterance(text: string, options: SpeechOptions = {}): SpeechSynthesisUtterance {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 1;
  utterance.pitch = options.pitch || 1;
  utterance.volume = options.volume || 1;
  
  // Try to find a female voice for the assistant
  window.speechSynthesis.onvoiceschanged = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => voice.lang === 'en-US' && voice.name.includes('Female')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  };

  return utterance;
}

export function startSpeechRecognition(
  onResult: (transcript: string) => void,
  onEnd: () => void
): SpeechRecognition | null {
  if (!('webkitSpeechRecognition' in window)) {
    console.warn('Speech recognition is not supported in this browser.');
    return null;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onend = onEnd;
  recognition.start();

  return recognition;
}