import { SpeechOptions } from '../../components/AIAssistant/types';

interface VoiceOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class VoiceService {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesisUtterance;
  private options: VoiceOptions;

  constructor(options: VoiceOptions = {}) {
    this.options = {
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      ...options
    };
    this.synthesis = new SpeechSynthesisUtterance();
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition(): void {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognitionAPI();
      if (this.recognition) {
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
      }
    }
  }

  public startListening(
    onResult: (text: string) => void,
    onError: (error: string) => void
  ): void {
    if (!this.recognition) {
      onError('Speech recognition is not supported in this browser');
      return;
    }

    this.recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = Array.from(event.results)
        .map(result => result[0].transcript)
        .join(' ');
      onResult(text);
    };

    this.recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      onError(event.error);
    };

    this.recognition.start();
  }

  public stopListening(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  public speak(text: string, options?: VoiceOptions): void {
    const utterance = new SpeechSynthesisUtterance(text);
    const finalOptions = { ...this.options, ...options };

    utterance.rate = finalOptions.rate || 1.0;
    utterance.pitch = finalOptions.pitch || 1.0;
    utterance.volume = finalOptions.volume || 1.0;

    window.speechSynthesis.speak(utterance);
  }

  public updateOptions(newOptions: VoiceOptions): void {
    this.options = { ...this.options, ...newOptions };
  }

  public getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    });
  }
} 