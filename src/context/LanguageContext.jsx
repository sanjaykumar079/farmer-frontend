// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    // Navbar
    home: 'Home',
    about: 'About',
    farmerDashboard: 'Farmer Dashboard',
    officerPanel: 'Officer Panel',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    
    // Home Page
    heroTitle: 'AgroConnect',
    heroSubtitle: 'Bridging the gap between farmers and horticulture experts with AI-powered solutions',
    getStarted: 'Get Started Today',
    learnMore: 'Learn More',
    activeFarmers: 'Active Farmers',
    expertOfficers: 'Expert Officers',
    queriesResolved: 'Queries Resolved',
    successRate: 'Success Rate',
    
    // Features
    smartQuerySystem: 'Smart Query System',
    smartQueryDesc: 'Submit your farming questions and get AI-powered responses instantly',
    expertConsultation: 'Expert Consultation',
    expertConsultationDesc: 'Connect directly with certified horticulture officers for professional advice',
    analyticsDashboard: 'Analytics Dashboard',
    analyticsDashboardDesc: 'Track your queries, monitor crop health, and analyze farming patterns',
    realtimeSupport: 'Real-time Support',
    realtimeSupportDesc: 'Get immediate assistance for urgent farming issues and emergencies',
    
    // Login Page
    welcomeTitle: 'Welcome to AgroConnect',
    signInSubtitle: 'Sign in to access your agricultural dashboard',
    continueWithGoogle: 'Continue with Google',
    trustedBy: 'Trusted by farmers worldwide',
    happyFarmers: 'Happy Farmers',
    whyChoose: 'Why choose AgroConnect?',
    aiPowered: 'AI-powered instant solutions',
    aiPoweredDesc: 'Get immediate answers to your farming questions',
    expertOfficers: 'Expert horticulture officers',
    expertOfficersDesc: 'Connect with certified agricultural specialists',
    accessAnywhere: 'Access anywhere, anytime',
    accessAnywhereDesc: 'Mobile-friendly platform for on-the-go support',
    securePrivate: 'Secure and private platform',
    securePrivateDesc: 'Your data is protected with enterprise-grade security',
    
    // Farmer Dashboard
    welcomeBack: 'Welcome back, Farmer!',
    readyToSolve: 'Ready to solve farming challenges today?',
    cropHealth: 'Crop Health',
    cropHealthDesc: 'Monitor your crop conditions',
    irrigation: 'Irrigation',
    irrigationDesc: 'Water management tips',
    pestControl: 'Pest Control',
    pestControlDesc: 'Identify and treat pests',
    harvestGuide: 'Harvest Guide',
    harvestGuideDesc: 'Optimal harvesting advice',
    newQuery: 'New Query',
    history: 'History',
    askQuestion: 'Ask Your Question',
    aiSolutions: 'Get AI-powered solutions instantly',
    describeChallenge: 'Describe your farming challenge or question',
    submitQuery: 'Submit Query',
    processingQuery: 'Processing your query...',
    aiResponse: 'AI Response:',
    
    // Tips and Support
    proTips: 'Pro Tips',
    needHelp: 'Need Help?',
    contactSupport: 'Contact Support',
    weather: 'Weather',
    
    // Officer Dashboard
    officerDashboard: 'Officer Dashboard',
    helpingFarmers: 'Helping farmers grow better crops',
    pendingQueries: 'Pending Queries',
    resolvedToday: 'Resolved Today',
    highPriority: 'High Priority',
    responseRate: 'Response Rate',
    pending: 'Pending',
    resolved: 'Resolved',
    allQueries: 'All Queries',
    farmerQueries: 'Farmer Queries',
    reviewRespond: 'Review and respond to farmer questions',
    
    // Common
    loading: 'Loading...',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    language: 'Language',
    selectLanguage: 'Select Language',
  },
  
  hi: {
    // नेवबार (Navbar)
    home: 'होम',
    about: 'हमारे बारे में',
    farmerDashboard: 'किसान डैशबोर्ड',
    officerPanel: 'अधिकारी पैनल',
    signIn: 'साइन इन',
    signOut: 'साइन आउट',
    
    // होम पेज (Home Page)
    heroTitle: 'एग्रोकनेक्ट',
    heroSubtitle: 'AI-संचालित समाधानों के साथ किसानों और बागवानी विशेषज्ञों के बीच पुल का काम',
    getStarted: 'आज ही शुरू करें',
    learnMore: 'और जानें',
    activeFarmers: 'सक्रिय किसान',
    expertOfficers: 'विशेषज्ञ अधिकारी',
    queriesResolved: 'हल की गई समस्याएं',
    successRate: 'सफलता दर',
    
    // विशेषताएं (Features)
    smartQuerySystem: 'स्मार्ट प्रश्न प्रणाली',
    smartQueryDesc: 'अपने खेती के सवाल पूछें और तुरंत AI-संचालित जवाब पाएं',
    expertConsultation: 'विशेषज्ञ सलाह',
    expertConsultationDesc: 'प्रमाणित बागवानी अधिकारियों से सीधे व्यावसायिक सलाह लें',
    analyticsDashboard: 'विश्लेषण डैशबोर्ड',
    analyticsDashboardDesc: 'अपनी प्रश्नों को ट्रैक करें, फसल स्वास्थ्य की निगरानी करें',
    realtimeSupport: 'वास्तविक समय सहायता',
    realtimeSupportDesc: 'जरूरी खेती की समस्याओं के लिए तत्काल सहायता प्राप्त करें',
    
    // लॉगिन पेज (Login Page)
    welcomeTitle: 'एग्रोकनेक्ट में आपका स्वागत है',
    signInSubtitle: 'अपने कृषि डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    continueWithGoogle: 'गूगल के साथ जारी रखें',
    trustedBy: 'दुनियाभर के किसानों द्वारा भरोसेमंद',
    happyFarmers: 'खुश किसान',
    whyChoose: 'एग्रोकनेक्ट क्यों चुनें?',
    aiPowered: 'AI-संचालित तत्काल समाधान',
    aiPoweredDesc: 'अपने खेती के सवालों के तुरंत जवाब पाएं',
    expertOfficers: 'विशेषज्ञ बागवानी अधिकारी',
    expertOfficersDesc: 'प्रमाणित कृषि विशेषज्ञों से जुड़ें',
    accessAnywhere: 'कहीं भी, कभी भी पहुंच',
    accessAnywhereDesc: 'चलते-फिरते सहायता के लिए मोबाइल-फ्रेंडली प्लेटफॉर्म',
    securePrivate: 'सुरक्षित और निजी प्लेटफॉर्म',
    securePrivateDesc: 'आपका डेटा एंटरप्राइज-ग्रेड सुरक्षा के साथ सुरक्षित है',
    
    // किसान डैशबोर्ड (Farmer Dashboard)
    welcomeBack: 'वापस स्वागत है, किसान!',
    readyToSolve: 'आज खेती की चुनौतियों को हल करने के लिए तैयार हैं?',
    cropHealth: 'फसल स्वास्थ्य',
    cropHealthDesc: 'अपनी फसल की स्थिति की निगरानी करें',
    irrigation: 'सिंचाई',
    irrigationDesc: 'पानी प्रबंधन के टिप्स',
    pestControl: 'कीट नियंत्रण',
    pestControlDesc: 'कीटों की पहचान और उपचार',
    harvestGuide: 'फसल गाइड',
    harvestGuideDesc: 'इष्टतम कटाई की सलाह',
    newQuery: 'नई समस्या',
    history: 'इतिहास',
    askQuestion: 'अपना प्रश्न पूछें',
    aiSolutions: 'तुरंत AI-संचालित समाधान प्राप्त करें',
    describeChallenge: 'अपनी खेती की चुनौती या प्रश्न का वर्णन करें',
    submitQuery: 'प्रश्न जमा करें',
    processingQuery: 'आपकी समस्या को संसाधित कर रहे हैं...',
    aiResponse: 'AI का जवाब:',
    
    // टिप्स और सहायता (Tips and Support)
    proTips: 'प्रो टिप्स',
    needHelp: 'मदद चाहिए?',
    contactSupport: 'सहायता से संपर्क करें',
    weather: 'मौसम',
    
    // अधिकारी डैशबोर्ड (Officer Dashboard)
    officerDashboard: 'अधिकारी डैशबोर्ड',
    helpingFarmers: 'किसानों को बेहतर फसल उगाने में मदद करना',
    pendingQueries: 'लंबित प्रश्न',
    resolvedToday: 'आज हल हुए',
    highPriority: 'उच्च प्राथमिकता',
    responseRate: 'प्रतिक्रिया दर',
    pending: 'लंबित',
    resolved: 'हल हो गए',
    allQueries: 'सभी प्रश्न',
    farmerQueries: 'किसान प्रश्न',
    reviewRespond: 'किसान प्रश्नों की समीक्षा करें और जवाब दें',
    
    // सामान्य (Common)
    loading: 'लोड हो रहा है...',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    delete: 'मिटाएं',
    edit: 'संपादित करें',
    close: 'बंद करें',
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
  },
  
  te: {
    // నావ్‌బార్ (Navbar)
    home: 'హోమ్',
    about: 'మా గురించి',
    farmerDashboard: 'రైతు డ్యాష్‌బోర్డ్',
    officerPanel: 'అధికారి ప్యానెల్',
    signIn: 'సైన్ ఇన్',
    signOut: 'సైన్ అవుట్',
    
    // హోమ్ పేజీ (Home Page)
    heroTitle: 'ఆగ్రోకనెక్ట్',
    heroSubtitle: 'AI-ఆధారిత పరిష్కారాలతో రైతులు మరియు వ్యవసాయ నిపుణుల మధ్య వారధిగా పనిచేస్తుంది',
    getStarted: 'ఈరోజే ప్రారంభించండి',
    learnMore: 'మరింత తెలుసుకోండి',
    activeFarmers: 'క్రియాశీల రైతులు',
    expertOfficers: 'నిపుణ అధికారులు',
    queriesResolved: 'పరిష్కరించబడిన ప్రశ్నలు',
    successRate: 'విజయ రేటు',
    
    // లక్షణాలు (Features)
    smartQuerySystem: 'స్మార్ట్ ప్రశ్న వ్యవస్థ',
    smartQueryDesc: 'మీ వ్యవసాయ ప్రశ్నలను అడగండి మరియు తక్షణమే AI-ఆధారిత సమాధానాలు పొందండి',
    expertConsultation: 'నిపుణ సలహా',
    expertConsultationDesc: 'ధృవీకరించబడిన వ్యవసాయ అధికారులతో ప్రత్యక్షంగా వృత్తిపరమైన సలహా తీసుకోండి',
    analyticsDashboard: 'విశ్లేషణ డ్యాష్‌బోర్డ్',
    analyticsDashboardDesc: 'మీ ప్రశ్నలను ట్రాక్ చేయండి, పంట ఆరోగ్యాన్ని పర్యవేక్షించండి',
    realtimeSupport: 'రియల్ టైమ్ మద్దతు',
    realtimeSupportDesc: 'అత్యవసర వ్యవసాయ సమస్యలకు తక్షణ సహాయం పొందండి',
    
    // లాగిన్ పేజీ (Login Page)
    welcomeTitle: 'ఆగ్రోకనెక్ట్‌కు స్వాగతం',
    signInSubtitle: 'మీ వ్యవసాయ డ్యాష్‌బోర్డ్‌ను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి',
    continueWithGoogle: 'గూగుల్‌తో కొనసాగండి',
    trustedBy: 'ప్రపంచవ్యాప్తంగా రైతులచే నమ్మబడింది',
    happyFarmers: 'సంతోషకర రైతులు',
    whyChoose: 'ఆగ్రోకనెక్ట్ ఎందుకు ఎంచుకోవాలి?',
    aiPowered: 'AI-ఆధారిత తక్షణ పరిష్కారాలు',
    aiPoweredDesc: 'మీ వ్యవసాయ ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి',
    expertOfficers: 'నిపుణ వ్యవసాయ అధికారులు',
    expertOfficersDesc: 'ధృవీకరించబడిన వ్యవసాయ నిపుణులతో కనెక్ట్ అవ్వండి',
    accessAnywhere: 'ఎక్కడైనా, ఎప్పుడైనా యాక్సెస్',
    accessAnywhereDesc: 'మొబైల్-ఫ్రెండ్లీ ప్లాట్‌ఫారమ్ ద్వారా ప్రయాణంలో మద్దతు',
    securePrivate: 'సురక్షిత మరియు ప్రైవేట్ ప్లాట్‌ఫారమ్',
    securePrivateDesc: 'మీ డేటా ఎంటర్‌ప్రైజ్-గ్రేడ్ భద్రతతో సురక్షితం',
    
    // రైతు డ్యాష్‌బోర్డ్ (Farmer Dashboard)
    welcomeBack: 'తిరిగి స్వాగతం, రైతు!',
    readyToSolve: 'ఈరోజు వ్యవసాయ సవాళ్లను పరిష్కరించడానికి సిద్ధంగా ఉన్నారా?',
    cropHealth: 'పంట ఆరోగ్యం',
    cropHealthDesc: 'మీ పంట పరిస్థితులను పర్యవేక్షించండి',
    irrigation: 'నీటిపారుదల',
    irrigationDesc: 'నీటి నిర్వహణ చిట్కాలు',
    pestControl: 'కీటకాల నియంత్రణ',
    pestControlDesc: 'కీటకాలను గుర్తించడం మరియు చికిత్స',
    harvestGuide: 'కోత గైడ్',
    harvestGuideDesc: 'సరైన కోతకు సలహా',
    newQuery: 'కొత్త ప్రశ్న',
    history: 'చరిత్ర',
    askQuestion: 'మీ ప్రశ్న అడగండి',
    aiSolutions: 'తక్షణమే AI-ఆధారిత పరిష్కారాలు పొందండి',
    describeChallenge: 'మీ వ్యవసాయ సవాలు లేదా ప్రశ్నను వివరించండి',
    submitQuery: 'ప్రశ్న సమర్పించండి',
    processingQuery: 'మీ ప్రశ్నను ప్రాసెస్ చేస్తున్నాం...',
    aiResponse: 'AI ప్రతిస్పందన:',
    
    // చిట్కాలు మరియు మద్దతు (Tips and Support)
    proTips: 'ప్రో చిట్కాలు',
    needHelp: 'సహాయం కావాలా?',
    contactSupport: 'మద్దతుని సంప్రదించండి',
    weather: 'వాతావరణం',
    
    // అధికారి డ్యాష్‌బోర్డ్ (Officer Dashboard)
    officerDashboard: 'అధికారి డ్యాష్‌బోర్డ్',
    helpingFarmers: 'రైతులకు మెరుగైన పంటలు పండించడంలో సహాయం చేయడం',
    pendingQueries: 'పెండింగ్ ప్రశ్నలు',
    resolvedToday: 'ఈరోజు పరిష్కరించబడినవి',
    highPriority: 'అధిక ప్రాధాన్యత',
    responseRate: 'ప్రతిస్పందన రేటు',
    pending: 'పెండింగ్',
    resolved: 'పరిష్కరించబడింది',
    allQueries: 'అన్ని ప్రశ్నలు',
    farmerQueries: 'రైతు ప్రశ్నలు',
    reviewRespond: 'రైతు ప్రశ్నలను సమీక్షించండి మరియు ప్రతిస్పందించండి',
    
    // సాధారణ (Common)
    loading: 'లోడ్ అవుతోంది...',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    delete: 'తొలగించండి',
    edit: 'సవరించండి',
    close: 'మూయండి',
    language: 'భాష',
    selectLanguage: 'భాషను ఎంచుకోండి',
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get from localStorage or default to English
    return localStorage.getItem('preferred-language') || 'en';
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const translate = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const value = {
    language,
    translate,
    changeLanguage,
    availableLanguages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
      { code: 'te', name: 'తెలుగు', flag: '🇮🇳' }
    ]
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};