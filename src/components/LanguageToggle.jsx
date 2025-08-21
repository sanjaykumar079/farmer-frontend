// // src/components/LanguageToggle.jsx
// import { useLanguage } from '../context/LanguageContext';

// export default function LanguageToggle() {
//   const { language, toggleLanguage } = useLanguage();

//   return (
//     <button
//       onClick={toggleLanguage}
//       className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-farmGreen-100 hover:bg-farmGreen-200 text-farmGreen-700 hover:text-farmGreen-800 transition-all duration-200 border border-farmGreen-200 hover:border-farmGreen-300"
//       title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
//     >
//       <span className="text-sm font-medium">
//         {language === 'en' ? '🇺🇸 EN' : '🇮🇳 हिं'}
//       </span>
//       <div className="w-4 h-4 flex items-center justify-center">
//         <svg 
//           className="w-3 h-3 transition-transform duration-200 hover:rotate-180" 
//           fill="none" 
//           stroke="currentColor" 
//           viewBox="0 0 24 24"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l5-5 5 5" />
//         </svg>
//       </div>
//     </button>
//   );
// }