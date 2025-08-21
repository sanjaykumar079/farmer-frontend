// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useSupabase } from "../context/SupabaseContext";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { user } = useSupabase();
  const { translate } = useLanguage();

  const features = [
    {
      icon: "🌾",
      title: translate('smartQuerySystem'),
      description: translate('smartQueryDesc')
    },
    {
      icon: "👨‍💼",
      title: translate('expertConsultation'),
      description: translate('expertConsultationDesc')
    },
    {
      icon: "📊",
      title: translate('analyticsDashboard'),
      description: translate('analyticsDashboardDesc')
    },
    {
      icon: "🚀",
      title: translate('realtimeSupport'),
      description: translate('realtimeSupportDesc')
    }
  ];

  const stats = [
    { number: "10K+", label: translate('activeFarmers') },
    { number: "500+", label: translate('expertOfficers') },
    { number: "50K+", label: translate('queriesResolved') },
    { number: "98%", label: translate('successRate') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative hero-pattern py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-farmGreen-50/80 to-farmYellow-50/80"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="floating-element inline-block mb-6">
              <span className="text-8xl">🌾</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">
              <span className="gradient-text">{translate('heroTitle')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-farmGreen-700 mb-8 max-w-3xl mx-auto font-medium">
              {translate('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
              {user ? (
                <Link to="/dashboard">
                  <button className="btn-primary text-lg px-8 py-4">
                    {translate('farmerDashboard')}
                  </button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn-primary text-lg px-8 py-4">
                    {translate('getStarted')}
                  </button>
                </Link>
              )}
              <Link to="/about">
                <button className="btn-secondary text-lg px-8 py-4">
                  {translate('learnMore')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-farmGreen-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6 font-display">
              Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-farmGreen-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with expert knowledge to revolutionize agricultural support
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card p-8 text-center hover:scale-105 transition-all duration-300 animate-slide-up group"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-farmGreen-800 mb-4 font-display">
                  {feature.title}
                </h3>
                <p className="text-farmGreen-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-farmGreen-600 to-farmGreen-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-farmGreen-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from expert guidance and AI-powered insights
          </p>
          {!user && (
            <Link to="/login">
              <button className="bg-white text-farmGreen-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-farmGreen-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
                {translate('getStarted')}
              </button>
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-farmGreen-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-farmGreen-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <span className="text-2xl font-bold font-display">AgroConnect</span>
              </div>
              <p className="text-farmGreen-200">
                Empowering farmers with technology and expert knowledge for sustainable agriculture.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-farmGreen-200 hover:text-white transition-colors">
                  {translate('home')}
                </Link>
                <Link to="/about" className="block text-farmGreen-200 hover:text-white transition-colors">
                  {translate('about')}
                </Link>
                {user && (
                  <Link to="/dashboard" className="block text-farmGreen-200 hover:text-white transition-colors">
                    {translate('farmerDashboard')}
                  </Link>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-farmGreen-200">
                <p>📞 1-800-FARM-HELP</p>
                <p>📧 support@agroconnect.com</p>
                <p>🕒 24/7 Support Available</p>
              </div>
            </div>
          </div>
          <div className="border-t border-farmGreen-700 mt-8 pt-8 text-center text-farmGreen-300">
            <p>&copy; 2024 AgroConnect. All rights reserved. Built for farmers, by technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}