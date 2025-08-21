export default function About() {
  const benefits = [
    {
      icon: "🎯",
      title: "Precision Agriculture",
      description: "Get targeted solutions for your specific crops and growing conditions"
    },
    {
      icon: "⚡",
      title: "Instant AI Support",
      description: "24/7 availability with immediate responses to urgent farming queries"
    },
    {
      icon: "👥",
      title: "Expert Network",
      description: "Access to certified horticulture officers and agricultural specialists"
    },
    {
      icon: "📈",
      title: "Data-Driven Insights",
      description: "Make informed decisions based on agricultural data and trends"
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description: "Your farming data is protected with enterprise-grade security"
    },
    {
      icon: "🌱",
      title: "Sustainable Practices",
      description: "Promote eco-friendly and sustainable farming methodologies"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Submit Your Query",
      description: "Describe your farming challenge or question in detail through our intuitive interface",
      icon: "📝"
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Our advanced AI system analyzes your query and provides immediate preliminary guidance",
      icon: "🤖"
    },
    {
      step: "03",
      title: "Expert Review",
      description: "Qualified horticulture officers review complex cases and provide professional insights",
      icon: "👨‍🔬"
    },
    {
      step: "04",
      title: "Get Solutions",
      description: "Receive comprehensive solutions with actionable steps and follow-up recommendations",
      icon: "✅"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="text-center animate-fade-in">
          <div className="floating-element inline-block mb-6">
            <span className="text-6xl">🌾</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 font-display">
            About AgroConnect
          </h1>
          <p className="text-xl text-farmGreen-600 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing agriculture by connecting farmers with expert knowledge and AI-powered solutions. 
            Our platform bridges the gap between traditional farming wisdom and modern technology.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
              Our Mission
            </h2>
            <div className="space-y-4 text-farmGreen-700 text-lg leading-relaxed">
              <p>
                AgroConnect was born from a simple yet powerful vision: to ensure that every farmer, 
                regardless of location or resources, has access to expert agricultural guidance.
              </p>
              <p>
                We believe that combining artificial intelligence with human expertise creates the 
                most effective support system for modern farming challenges.
              </p>
              <p>
                Our platform democratizes access to agricultural knowledge, helping farmers make 
                informed decisions that improve crop yields, sustainability, and profitability.
              </p>
            </div>
          </div>
          <div className="card p-8 bg-gradient-to-br from-farmGreen-50 to-farmYellow-50 animate-slide-up">
            <div className="text-center">
              <div className="text-8xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold gradient-text mb-4 font-display">
                Impact by Numbers
              </h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-farmGreen-600">10K+</div>
                  <div className="text-sm text-farmGreen-500">Farmers Helped</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-farmGreen-600">50K+</div>
                  <div className="text-sm text-farmGreen-500">Problems Solved</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-farmGreen-600">98%</div>
                  <div className="text-sm text-farmGreen-500">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-farmGreen-600">24/7</div>
                  <div className="text-sm text-farmGreen-500">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
            How AgroConnect Works
          </h2>
          <p className="text-xl text-farmGreen-600 max-w-3xl mx-auto">
            Our streamlined process ensures you get the right help at the right time
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((step, index) => (
            <div 
              key={index}
              className="card p-6 text-center hover:scale-105 transition-all duration-300 animate-slide-up group relative"
              style={{animationDelay: `${index * 0.15}s`}}
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-farmGreen-500 to-farmGreen-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {step.step}
              </div>
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-farmGreen-800 mb-3 font-display">
                {step.title}
              </h3>
              <p className="text-farmGreen-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
            Why Choose AgroConnect?
          </h2>
          <p className="text-xl text-farmGreen-600 max-w-3xl mx-auto">
            We provide comprehensive support that addresses every aspect of modern farming
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="card p-6 hover:scale-105 transition-all duration-300 animate-slide-up group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-farmGreen-800 mb-3 font-display">
                {benefit.title}
              </h3>
              <p className="text-farmGreen-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="card p-12 bg-gradient-to-br from-farmGreen-50 to-farmYellow-50 animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
                Powered by Advanced Technology
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🧠</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-farmGreen-800 mb-2">AI-Powered Analysis</h4>
                    <p className="text-farmGreen-600">
                      Machine learning algorithms analyze your queries and provide instant, accurate recommendations
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">🔗</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-farmGreen-800 mb-2">Supabase Integration</h4>
                    <p className="text-farmGreen-600">
                      Secure, real-time database ensures your data is always safe and accessible
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">📱</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-farmGreen-800 mb-2">Responsive Design</h4>
                    <p className="text-farmGreen-600">
                      Access our platform seamlessly across all devices - desktop, tablet, or mobile
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-6 floating-element">⚡</div>
              <h3 className="text-2xl font-bold gradient-text mb-4 font-display">
                Lightning Fast Responses
              </h3>
              <p className="text-farmGreen-600 text-lg">
                Get answers to your farming questions in seconds, not days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-6 font-display">
            What Our Users Say
          </h2>
          <p className="text-xl text-farmGreen-600 max-w-3xl mx-auto">
            Real stories from farmers and officers who use AgroConnect daily
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card p-6 animate-slide-up">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-farmGreen-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">RK</span>
              </div>
              <div>
                <h4 className="font-semibold text-farmGreen-800">Rajesh Kumar</h4>
                <p className="text-sm text-farmGreen-600">Wheat Farmer, Punjab</p>
              </div>
            </div>
            <p className="text-farmGreen-700 italic">
              "AgroConnect saved my crop! The AI quickly identified the disease and the officer provided exact treatment steps. My yield increased by 25% this season."
            </p>
            <div className="flex text-yellow-400 mt-4">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
          <div className="card p-6 animate-slide-up" style={{animationDelay: "0.1s"}}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-farmGreen-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">PS</span>
              </div>
              <div>
                <h4 className="font-semibold text-farmGreen-800">Priya Sharma</h4>
                <p className="text-sm text-farmGreen-600">Tomato Farmer, Maharashtra</p>
              </div>
            </div>
            <p className="text-farmGreen-700 italic">
              "The 24/7 support is incredible. Even at 3 AM when I noticed pest damage, I got immediate help. The platform is so easy to use!"
            </p>
            <div className="flex text-yellow-400 mt-4">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
          <div className="card p-6 animate-slide-up" style={{animationDelay: "0.2s"}}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-farmGreen-500 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">DS</span>
              </div>
              <div>
                <h4 className="font-semibold text-farmGreen-800">Dr. Suresh</h4>
                <p className="text-sm text-farmGreen-600">Horticulture Officer</p>
              </div>
            </div>
            <p className="text-farmGreen-700 italic">
              "As an officer, this platform helps me reach more farmers efficiently. The AI pre-screening saves time and helps me focus on complex cases."
            </p>
            <div className="flex text-yellow-400 mt-4">
              ⭐⭐⭐⭐⭐
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto text-center animate-fade-in">
        <div className="card p-12 bg-gradient-to-r from-farmGreen-600 to-farmGreen-700 text-white">
          <div className="floating-element inline-block mb-6">
            <span className="text-6xl">🚀</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-farmGreen-100 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from expert guidance and AI-powered insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-farmGreen-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-farmGreen-50 transform hover:scale-105 transition-all duration-200 shadow-xl">
              Start Your Journey
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-farmGreen-700 transform hover:scale-105 transition-all duration-200">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}