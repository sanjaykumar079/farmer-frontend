// src/components/LanguageSelector.jsx
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

export default function LanguageSelector({ variant = 'default' }) {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  // Different variants for different contexts
  const getButtonStyles = () => {
    switch (variant) {
      case 'navbar':
        return "flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 group border border-transparent hover:border-farmGreen-200";
      case 'mobile':
        return "flex items-center space-x-2 px-4 py-3 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 w-full text-left";
      case 'footer':
        return "flex items-center space-x-2 px-3 py-2 rounded-lg bg-farmGreen-800 hover:bg-farmGreen-700 transition-colors duration-200 text-white";
      default:
        return "flex items-center space-x-2 px-4 py-2 rounded-lg bg-white border border-farmGreen-200 hover:border-farmGreen-300 shadow-sm hover:shadow-md transition-all duration-200";
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'navbar':
        return "text-sm font-medium text-farmGreen-700 group-hover:text-farmGreen-900";
      case 'mobile':
        return "text-base font-medium text-farmGreen-700";
      case 'footer':
        return "text-sm font-medium text-white";
      default:
        return "text-sm font-medium text-farmGreen-700";
    }
  };

  const getDropdownStyles = () => {
    switch (variant) {
      case 'mobile':
        return "absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-farmGreen-100 z-50 max-h-60 overflow-y-auto";
      default:
        return "absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-farmGreen-100 z-50 animate-slide-up";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={getButtonStyles()}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg" role="img" aria-label={currentLanguage?.name}>
          {currentLanguage?.flag}
        </span>
        <span className={getTextStyles()}>
          {currentLanguage?.name}
        </span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${variant === 'footer' ? 'text-white' : 'text-farmGreen-600'}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          {variant === 'mobile' && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-25 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          {/* Dropdown Menu */}
          <div className={getDropdownStyles()}>
            <div className="py-2">
              {/* Header */}
              <div className="px-4 py-2 border-b border-farmGreen-100">
                <div className="flex items-center space-x-2 text-farmGreen-600">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">
                    Select Language
                  </span>
                </div>
              </div>

              {/* Language Options */}
              <div className="py-1">
                {availableLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-farmGreen-50 transition-colors duration-150 group ${
                      language === lang.code 
                        ? 'bg-farmGreen-50 text-farmGreen-800 font-medium' 
                        : 'text-farmGreen-700 hover:text-farmGreen-800'
                    }`}
                  >
                    <span className="text-xl flex-shrink-0" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">
                        {lang.name}
                      </div>
                      <div className="text-xs text-farmGreen-500">
                        {lang.code === 'en' && 'English'}
                        {lang.code === 'hi' && 'हिंदी'}
                        {lang.code === 'te' && 'తెలుగు'}
                      </div>
                    </div>
                    {language === lang.code && (
                      <Check className="w-4 h-4 text-farmGreen-600 flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-farmGreen-100">
                <p className="text-xs text-farmGreen-500">
                  Language preference is saved automatically
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Additional Language Stats Component for Admin/Dashboard
export function LanguageStats() {
  const { language, availableLanguages } = useLanguage();

  return (
    <div className="card p-6 bg-gradient-to-r from-farmGreen-50 to-farmYellow-50">
      <h3 className="text-lg font-bold text-farmGreen-800 mb-4 flex items-center">
        <Globe className="w-5 h-5 mr-2" />
        Language Support
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {availableLanguages.map((lang) => (
          <div 
            key={lang.code}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              language === lang.code
                ? 'border-farmGreen-300 bg-farmGreen-100'
                : 'border-farmGreen-200 bg-white hover:border-farmGreen-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl" role="img" aria-label={lang.name}>
                {lang.flag}
              </span>
              {language === lang.code && (
                <div className="flex items-center text-farmGreen-600">
                  <Check className="w-4 h-4 mr-1" />
                  <span className="text-xs font-medium">Active</span>
                </div>
              )}
            </div>
            <div className="text-sm font-medium text-farmGreen-800">
              {lang.name}
            </div>
            <div className="text-xs text-farmGreen-600">
              Code: {lang.code.toUpperCase()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Usage Stats (Mock data) */}
      <div className="mt-6 pt-4 border-t border-farmGreen-200">
        <h4 className="text-sm font-semibold text-farmGreen-700 mb-3">
          Platform Usage by Language
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-farmGreen-600">🇺🇸 English</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-farmGreen-200 rounded-full overflow-hidden">
                <div className="h-full bg-farmGreen-500 rounded-full" style={{width: '65%'}}></div>
              </div>
              <span className="text-xs text-farmGreen-600">65%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-farmGreen-600">🇮🇳 हिंदी</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-farmGreen-200 rounded-full overflow-hidden">
                <div className="h-full bg-farmGreen-500 rounded-full" style={{width: '25%'}}></div>
              </div>
              <span className="text-xs text-farmGreen-600">25%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-farmGreen-600">🇮🇳 తెలుగు</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2 bg-farmGreen-200 rounded-full overflow-hidden">
                <div className="h-full bg-farmGreen-500 rounded-full" style={{width: '10%'}}></div>
              </div>
              <span className="text-xs text-farmGreen-600">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}