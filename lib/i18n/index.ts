export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr';

export const languages: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  mr: 'मराठी',
};

export const dictionaries = {
  en: {
    welcome: 'Welcome to Election Sathi',
    askMe: 'Ask me about the election process...',
    listening: 'Listening...',
    tapToSpeak: 'Tap to speak',
    registration: 'Voter Registration',
    findBooth: 'Find Polling Booth',
    candidates: 'Know Candidates',
    pollDay: 'Polling Day Guide',
    errorSpeech: 'Speech recognition not supported in this browser.',
  },
  hi: {
    welcome: 'इलेक्शन साथी में आपका स्वागत है',
    askMe: 'चुनाव प्रक्रिया के बारे में मुझसे पूछें...',
    listening: 'सुन रहा हूँ...',
    tapToSpeak: 'बोलने के लिए टैप करें',
    registration: 'वोटर रजिस्ट्रेशन',
    findBooth: 'पोलिंग बूथ खोजें',
    candidates: 'उम्मीदवारों को जानें',
    pollDay: 'मतदान दिवस गाइड',
    errorSpeech: 'आपके ब्राउज़र में आवाज़ पहचानने की सुविधा नहीं है।',
  },
  // Stubs
  te: {}, ta: {}, bn: {}, mr: {},
};

export function getDictionary(lang: Language) {
  return dictionaries[lang] || dictionaries.en;
}
