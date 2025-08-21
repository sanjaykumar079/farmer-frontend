// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import Logout from "./Auth/Logout";
import LanguageSelector from "./LanguageSelector";
import { useSupabase } from "../context/SupabaseContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { user } = useSupabase();
  const { translate } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-farmGreen-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span className="text-white text-xl">🌱</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold gradient-text font-display">
                  AgroConnect
                </span>
                <span className="text-xs text-farmGreen-600 font-medium">
                  Farmer-Horticulture Hub
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="text-farmGreen-700 hover:text-farmGreen-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-farmGreen-50"
              >
                {translate('home')}
              </Link>
              <Link 
                to="/about" 
                className="text-farmGreen-700 hover:text-farmGreen-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-farmGreen-50"
              >
                {translate('about')}
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-farmGreen-700 hover:text-farmGreen-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-farmGreen-50"
                  >
                    {translate('farmerDashboard')}
                  </Link>
                  <Link 
                    to="/officer" 
                    className="text-farmGreen-700 hover:text-farmGreen-900 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-farmGreen-50"
                  >
                    {translate('officerPanel')}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Auth Buttons & Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-farmGreen-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user.email?.[0].toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-farmGreen-700 font-medium">
                    {user.email}
                  </span>
                </div>
                <Logout />
              </div>
            ) : (
              <Link to="/login">
                <button className="btn-primary">
                  {translate('signIn')}
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-farmGreen-700 hover:text-farmGreen-900 hover:bg-farmGreen-50 transition-colors duration-200"
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={!isMobileMenuOpen ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={isMobileMenuOpen ? 'block' : 'hidden'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-farmGreen-100">
              <Link 
                to="/" 
                className="text-farmGreen-700 hover:text-farmGreen-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-farmGreen-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translate('home')}
              </Link>
              <Link 
                to="/about" 
                className="text-farmGreen-700 hover:text-farmGreen-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-farmGreen-50 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {translate('about')}
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-farmGreen-700 hover:text-farmGreen-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-farmGreen-50 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {translate('farmerDashboard')}
                  </Link>
                  <Link 
                    to="/officer" 
                    className="text-farmGreen-700 hover:text-farmGreen-900 block px-3 py-2 rounded-md text-base font-medium hover:bg-farmGreen-50 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {translate('officerPanel')}
                  </Link>
                </>
              )}
              <div className="pt-4 pb-3 border-t border-farmGreen-100">
                {user ? (
                  <div className="flex items-center px-3 space-y-3 flex-col">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-farmGreen-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">
                          {user.email?.[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm text-farmGreen-700 font-medium">
                        {user.email}
                      </span>
                    </div>
                    <Logout />
                  </div>
                ) : (
                  <div className="px-3">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="btn-primary w-full">
                        {translate('signIn')}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}