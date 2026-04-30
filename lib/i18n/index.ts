export type Language = 'en' | 'hi' | 'te' | 'ta' | 'bn' | 'mr';

export type Dictionary = {
  welcome: string;
  askMe: string;
  listening: string;
  tapToSpeak: string;
  registration: string;
  findBooth: string;
  candidates: string;
  pollDay: string;
  myths: string;
  errorSpeech: string;
  // Register page
  registerTitle: string;
  registerSubtitle: string;
  eligibilityTitle: string;
  docsTitle: string;
  stepsTitle: string;
  // Booth page
  boothTitle: string;
  boothSubtitle: string;
  boothPlaceholder: string;
  boothYourBooth: string;
  boothIdsTitle: string;
  // Candidates page
  candidatesTitle: string;
  candidatesSubtitle: string;
  candidatesPlaceholder: string;
  candidatesResultTitle: string;
  candidatesSource: string;
  education: string;
  assets: string;
  criminalCases: string;
  viewAffidavit: string;
  // Poll day page
  pollDayTitle: string;
  pollDayStep: string;
  pollDayOf: string;
  readAloud: string;
  back: string;
  next: string;
  // Myths page
  mythsTitle: string;
  myth: string;
  fact: string;
};

export const languages: Record<Language, string> = {
  en: 'English',
  hi: 'हिन्दी',
  te: 'తెలుగు',
  ta: 'தமிழ்',
  bn: 'বাংলা',
  mr: 'मराठी',
};

export const dictionaries: Record<Language, Partial<Dictionary>> = {
  en: {
    welcome: 'Welcome to Election Sathi',
    askMe: 'Ask me about the election process...',
    listening: 'Listening...',
    tapToSpeak: 'Tap to speak',
    registration: 'Voter Registration',
    findBooth: 'Find Polling Booth',
    candidates: 'Know Candidates',
    pollDay: 'Polling Day Guide',
    myths: 'Myth Buster',
    errorSpeech: 'Speech recognition not supported in this browser.',
    registerTitle: 'Voter Registration',
    registerSubtitle: 'Am I eligible to vote?',
    eligibilityTitle: 'Eligibility Checklist',
    docsTitle: 'Documents Required',
    stepsTitle: 'Steps to Register Online',
    boothTitle: 'Find My Polling Booth',
    boothSubtitle: 'Where do I vote?',
    boothPlaceholder: 'Enter your locality or area name',
    boothYourBooth: 'Your Polling Booth',
    boothIdsTitle: '12 ECI-Approved Photo IDs',
    candidatesTitle: 'Know Candidates (KYC)',
    candidatesSubtitle: 'Who is on my ballot?',
    candidatesPlaceholder: 'Enter Constituency (e.g., Patna Sahib)',
    candidatesResultTitle: 'Candidates in',
    candidatesSource: 'Source',
    education: 'Education',
    assets: 'Assets',
    criminalCases: 'Criminal Cases',
    viewAffidavit: 'View Affidavit',
    pollDayTitle: 'Polling Day Guide',
    pollDayStep: 'Step',
    pollDayOf: 'of',
    readAloud: 'Read Aloud',
    back: 'Back',
    next: 'Next',
    mythsTitle: 'Myth Buster',
    myth: 'Myth',
    fact: 'Fact',
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
    myths: 'मिथक तोड़ो',
    errorSpeech: 'आपके ब्राउज़र में आवाज़ पहचानने की सुविधा नहीं है।',
    registerTitle: 'वोटर रजिस्ट्रेशन',
    registerSubtitle: 'क्या मैं मतदान के लिए पात्र हूँ?',
    eligibilityTitle: 'पात्रता जाँच सूची',
    docsTitle: 'आवश्यक दस्तावेज़',
    stepsTitle: 'ऑनलाइन रजिस्ट्रेशन के चरण',
    boothTitle: 'मेरा मतदान केंद्र खोजें',
    boothSubtitle: 'मैं कहाँ मतदान करूँ?',
    boothPlaceholder: 'अपना इलाका या क्षेत्र का नाम दर्ज करें',
    boothYourBooth: 'आपका मतदान केंद्र',
    boothIdsTitle: '12 ECI-अनुमोदित फोटो ID',
    candidatesTitle: 'उम्मीदवारों को जानें (KYC)',
    candidatesSubtitle: 'मेरे मतपत्र पर कौन है?',
    candidatesPlaceholder: 'निर्वाचन क्षेत्र दर्ज करें (जैसे, पटना साहिब)',
    candidatesResultTitle: 'उम्मीदवार',
    candidatesSource: 'स्रोत',
    education: 'शिक्षा',
    assets: 'संपत्ति',
    criminalCases: 'आपराधिक मामले',
    viewAffidavit: 'शपथ पत्र देखें',
    pollDayTitle: 'मतदान दिवस गाइड',
    pollDayStep: 'चरण',
    pollDayOf: 'में से',
    readAloud: 'ज़ोर से पढ़ें',
    back: 'वापस',
    next: 'आगे',
    mythsTitle: 'मिथक तोड़ो',
    myth: 'भ्रम',
    fact: 'सच्चाई',
  },
  // Stubs
  te: {}, ta: {}, bn: {}, mr: {},
};

export function getDictionary(lang: Language): Dictionary {
  return { ...dictionaries.en, ...(dictionaries[lang] || {}) } as Dictionary;
}
