import { supabase } from "../../supabaseClient";
import { useState } from "react";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
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

  const features = [
    {
      icon: "🤖",
      title: "AI-powered instant solutions",
      description: "Get immediate answers to your farming questions"
    },
    {
      icon: "👨‍💼",
      title: "Expert horticulture officers",
      description: "Connect with certified agricultural specialists"
    },
    {
      icon: "📱",
      title: "Access anywhere, anytime",
      description: "Mobile-friendly platform for on-the-go support"
    },
    {
      icon: "🔒",
      title: "Secure and private platform",
      description: "Your data is protected with enterprise-grade security"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 hero-pattern">
      <div className="absolute inset-0 bg-gradient-to-br from-farmGreen-50/90 to-farmYellow-50/90"></div>
      <div className="relative max-w-md w-full">
        {/* Login Card */}
        <div className="card p-8 animate-fade-in">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-2xl mx-auto mb-4 flex items-center justify-center floating-element">
              <span className="text-white text-3xl">🌱</span>
            </div>
            <h1 className="text-3xl font-bold gradient-text font-display mb-2">
              Welcome to AgroConnect
            </h1>
            <p className="text-farmGreen-600 text-lg">
              Sign in to access your agricultural dashboard
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
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

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-farmGreen-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-farmGreen-500">Trusted by farmers worldwide</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div>
              <div className="text-2xl font-bold text-farmGreen-600">10K+</div>
              <div className="text-xs text-farmGreen-500">Happy Farmers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-farmGreen-600">500+</div>
              <div className="text-xs text-farmGreen-500">Expert Officers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-farmGreen-600">98%</div>
              <div className="text-xs text-farmGreen-500">Success Rate</div>
            </div>
          </div>

          {/* Features List */}
          <div className="pt-6 border-t border-farmGreen-100">
            <h3 className="text-lg font-semibold text-farmGreen-800 mb-4 text-center">
              Why choose AgroConnect?
            </h3>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="w-8 h-8 bg-farmGreen-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-farmGreen-600">{feature.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-farmGreen-800 text-sm">{feature.title}</h4>
                    <p className="text-farmGreen-600 text-xs">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-farmGreen-100 text-center">
            <p className="text-xs text-farmGreen-500">
              By signing in, you agree to our{" "}
              <a href="#" className="underline hover:text-farmGreen-700">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-farmGreen-700">Privacy Policy</a>
            </p>
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mt-8 animate-slide-up">
          <div className="card p-6 bg-gradient-to-r from-farmGreen-600 to-farmGreen-700 text-white text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Transform Your Farming?</h3>
            <p className="text-farmGreen-100 text-sm">
              Join thousands of farmers getting expert guidance and AI-powered solutions daily
            </p>
          </div>
        </div>

        {/* Support */}
        <div className="mt-6 text-center animate-fade-in">
          <div className="flex items-center justify-center space-x-4 text-farmGreen-600 text-sm">
            <div className="flex items-center space-x-1">
              <span>📞</span>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🛡️</span>
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>⚡</span>
              <span>Instant Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}