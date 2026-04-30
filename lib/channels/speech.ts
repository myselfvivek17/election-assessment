// Wrapper for SpeechRecognition and SpeechSynthesis

export class SpeechService {
  private recognition: any = null;
  private synthesis: SpeechSynthesis | null = null;
  private onResultCallback: ((text: string) => void) | null = null;
  private onErrorCallback: ((error: string) => void) | null = null;
  private onEndCallback: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;

        this.recognition.onresult = (event: any) => {
          const text = event.results[0][0].transcript;
          if (this.onResultCallback) this.onResultCallback(text);
        };
        
        this.recognition.onerror = (event: any) => {
          if (this.onErrorCallback) this.onErrorCallback(event.error);
        };

        this.recognition.onend = () => {
          if (this.onEndCallback) this.onEndCallback();
        };
      }
      this.synthesis = window.speechSynthesis;
    }
  }

  setLang(lang: string) {
    if (this.recognition) {
      const localeMap: Record<string, string> = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'te': 'te-IN',
        'ta': 'ta-IN',
        'bn': 'bn-IN',
        'mr': 'mr-IN',
      };
      this.recognition.lang = localeMap[lang] || 'hi-IN';
    }
  }

  startListening(onResult: (text: string) => void, onError?: (err: string) => void, onEnd?: () => void) {
    this.onResultCallback = onResult;
    this.onErrorCallback = onError || null;
    this.onEndCallback = onEnd || null;

    if (this.recognition) {
      try {
        this.recognition.start();
      } catch (e) {
        console.error("Speech recognition already started");
      }
    } else {
      if (onError) onError("Speech recognition not supported in this browser.");
    }
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text: string, lang: string = 'hi-IN', onEnd?: () => void) {
    if (!this.synthesis) return;
    this.synthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    
    const localeMap: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'bn': 'bn-IN',
      'mr': 'mr-IN',
    };
    utterance.lang = localeMap[lang] || 'hi-IN';

    if (onEnd) {
      utterance.onend = onEnd;
    }

    this.synthesis.speak(utterance);
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

// Singleton instance for the client
let speechServiceInstance: SpeechService | null = null;
export const getSpeechService = () => {
  if (!speechServiceInstance) {
    speechServiceInstance = new SpeechService();
  }
  return speechServiceInstance;
};
