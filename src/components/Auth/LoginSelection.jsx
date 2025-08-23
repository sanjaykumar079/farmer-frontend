// src/components/Auth/LoginSelection.jsx
import { useState } from 'react';
import { supabase } from "../../supabaseClient";

export default function LoginSelection() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Farmer Google Login
  const handleFarmerLogin = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Officer Login Component
  const OfficerLoginForm = () => {
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleOfficerLogin = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch('http://127.0.0.1:8000/auth/officer-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passkey })
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.detail);
        }

        const data = await response.json();
        localStorage.setItem('officer_token', data.access_token);
        localStorage.setItem('officer_data', JSON.stringify(data.officer));
        // Redirect to officer dashboard
        window.location.href = '/officer/dashboard';

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="space-y-4">
        {error && (
          <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-blue-700 mb-2">
            Access Passkey
          </label>
          <input
            type="password"
            value={passkey}
            onChange={(e) => setPasskey(e.target.value)}
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter passkey (123)"
            required
          />
        </div>

        <button
          onClick={handleOfficerLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {loading ? 'Verifying...' : 'Access Officer Dashboard'}
        </button>

        <div className="text-center text-sm text-blue-600">
          <p>Use passkey: <strong>123</strong></p>
        </div>
      </div>
    );
  };

  if (selectedRole === 'farmer') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 hero-pattern">
        <div className="absolute inset-0 bg-gradient-to-br from-farmGreen-50/90 to-farmYellow-50/90"></div>
        <div className="relative max-w-md w-full">
          <div className="card p-8 animate-fade-in">
            {/* Back Button */}
            <button 
              onClick={() => setSelectedRole(null)}
              className="mb-4 text-farmGreen-600 hover:text-farmGreen-800 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Login Options</span>
            </button>

            {/* Farmer Login Content */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-2xl mx-auto mb-4 flex items-center justify-center floating-element">
                <span className="text-white text-3xl">🌱</span>
              </div>
              <h1 className="text-3xl font-bold gradient-text font-display mb-2">
                Farmer Portal
              </h1>
              <p className="text-farmGreen-600 text-lg">
                Connect with agricultural experts and AI solutions
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleFarmerLogin}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-200 hover:border-farmGreen-300 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 group mb-6"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-farmGreen-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing you in...</span>
                </div>
              ) : (
                <>
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="group-hover:text-farmGreen-700 transition-colors">Continue with Google</span>
                </>
              )}
            </button>

            {/* Farmer Benefits */}
            <div className="pt-6 border-t border-farmGreen-100">
              <h3 className="text-lg font-semibold text-farmGreen-800 mb-4 text-center">
                What you'll get:
              </h3>
              <div className="space-y-3">
                {[
                  { icon: "🤖", title: "AI-powered crop analysis", desc: "Instant disease detection and solutions" },
                  { icon: "👨‍🌾", title: "Expert consultation", desc: "Connect with agricultural officers" },
                  { icon: "📱", title: "Mobile-first platform", desc: "Access anywhere, anytime" },
                  { icon: "🔒", title: "Secure data", desc: "Your information is protected" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-farmGreen-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span>{feature.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-farmGreen-800 text-sm">{feature.title}</h4>
                      <p className="text-farmGreen-600 text-xs">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedRole === 'officer') {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full">
          <div className="card p-8">
            {/* Back Button */}
            <button 
              onClick={() => setSelectedRole(null)}
              className="mb-4 text-blue-600 hover:text-blue-800 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to Login Options</span>
            </button>

            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-3xl">👮‍♂️</span>
              </div>
              <h1 className="text-3xl font-bold text-blue-800 mb-2">Officer Portal</h1>
              <p className="text-blue-600">Secure access for agricultural officers</p>
            </div>

            <OfficerLoginForm />
          </div>
        </div>
      </div>
    );
  }

  // Main login selection screen
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-farmGreen-50/90 to-farmYellow-50/90"></div>
      <div className="relative max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-2xl mx-auto mb-6 flex items-center justify-center floating-element">
            <span className="text-white text-4xl">🌾</span>
          </div>
          <h1 className="text-4xl font-bold gradient-text font-display mb-4">
            Welcome to AgroConnect
          </h1>
          <p className="text-farmGreen-600 text-xl max-w-2xl mx-auto">
            Choose your role to access your personalized agricultural dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Farmer Login Card */}
          <div 
            onClick={() => setSelectedRole('farmer')}
            className="card p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white text-3xl">🌱</span>
              </div>
              <h2 className="text-2xl font-bold text-farmGreen-800 mb-4">
                I'm a Farmer
              </h2>
              <p className="text-farmGreen-600 mb-6 leading-relaxed">
                Get AI-powered crop analysis, disease detection, and connect with agricultural experts to boost your farm productivity.
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  "🔍 Instant crop disease detection",
                  "🤖 AI-powered farming solutions", 
                  "👨‍🌾 Expert consultation access",
                  "📊 Farm management tools"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-farmGreen-700">
                    <span className="mr-2">{feature.split(' ')[0]}</span>
                    <span>{feature.substring(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-farmGreen-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-sm text-farmGreen-700 font-medium">Login with Google</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-farmGreen-500 to-farmGreen-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-farmGreen-600 hover:to-farmGreen-700 transition-all duration-200 transform group-hover:scale-105">
                Continue as Farmer
              </button>
            </div>
          </div>

          {/* Officer Login Card */}
          <div 
            onClick={() => setSelectedRole('officer')}
            className="card p-8 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white text-3xl">👮‍♂️</span>
              </div>
              <h2 className="text-2xl font-bold text-blue-800 mb-4">
                I'm an Officer
              </h2>
              <p className="text-blue-600 mb-6 leading-relaxed">
                Access your secure dashboard to manage farmer queries, provide expert guidance, and oversee agricultural programs.
              </p>
              
              <div className="space-y-3 mb-6">
                {[
                  "📋 Manage farmer queries",
                  "👥 Provide expert guidance",
                  "📊 Analytics and reporting",
                  "🔐 Secure admin access"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-blue-700">
                    <span className="mr-2">{feature.split(' ')[0]}</span>
                    <span>{feature.substring(2)}</span>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-blue-600">🔐</span>
                  <span className="text-sm text-blue-700 font-medium">Simple Passkey Authentication</span>
                </div>
                <div className="text-xs text-blue-500 mt-2">Use passkey: 123</div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform group-hover:scale-105">
                Continue as Officer
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 animate-fade-in">
          <div className="card p-6 bg-gradient-to-r from-farmGreen-600 to-blue-600 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Trusted by Agricultural Community</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm opacity-90">Happy Farmers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Expert Officers</div>
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm opacity-90">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-6 text-farmGreen-600 text-sm">
            <div className="flex items-center space-x-1">
              <span>📞</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🛡️</span>
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span>Instant Access</span>
            </div>
          </div>
          <p className="text-xs text-farmGreen-500 mt-4">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-farmGreen-700">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-farmGreen-700">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}