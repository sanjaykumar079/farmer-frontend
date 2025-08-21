import { useState, useEffect } from "react";
import { useSupabase } from "../../context/SupabaseContext";

export default function FarmerDashboard() {
  const { user } = useSupabase();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [queryHistory, setQueryHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("new-query");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/farmers/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
      });
      const data = await res.json();
      setResponse(data.response);
      
      // Add to history (in a real app, this would be stored in database)
      const newQuery = {
        id: Date.now(),
        question: query,
        answer: data.response,
        timestamp: new Date().toLocaleString(),
        status: "completed"
      };
      setQueryHistory(prev => [newQuery, ...prev]);
      setQuery("");
    } catch (error) {
      setResponse("Sorry, there was an error processing your query. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { icon: "🌱", title: "Crop Health", description: "Monitor your crop conditions" },
    { icon: "💧", title: "Irrigation", description: "Water management tips" },
    { icon: "🐛", title: "Pest Control", description: "Identify and treat pests" },
    { icon: "🌾", title: "Harvest Guide", description: "Optimal harvesting advice" },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text font-display">
                Welcome back, Farmer!
              </h1>
              <p className="text-farmGreen-600 text-lg">
                {user?.email} • Ready to solve farming challenges today?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <div 
              key={index}
              className="card p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer animate-slide-up group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {action.icon}
              </div>
              <h3 className="font-semibold text-farmGreen-800 mb-2">{action.title}</h3>
              <p className="text-sm text-farmGreen-600">{action.description}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-farmGreen-100 rounded-lg p-1 max-w-md">
            <button
              onClick={() => setActiveTab("new-query")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "new-query"
                  ? "bg-white text-farmGreen-700 shadow-sm"
                  : "text-farmGreen-600 hover:text-farmGreen-700"
              }`}
            >
              New Query
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                activeTab === "history"
                  ? "bg-white text-farmGreen-700 shadow-sm"
                  : "text-farmGreen-600 hover:text-farmGreen-700"
              }`}
            >
              History ({queryHistory.length})
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "new-query" && (
              <div className="card p-8 animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">❓</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text font-display">
                      Ask Your Question
                    </h2>
                    <p className="text-farmGreen-600">Get AI-powered solutions instantly</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                      Describe your farming challenge or question
                    </label>
                    <textarea
                      className="input-field resize-none"
                      rows="6"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g., My tomato leaves are turning yellow and I'm not sure why. The plants are 6 weeks old and I water them daily..."
                      disabled={isLoading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing your query...</span>
                      </div>
                    ) : (
                      <>
                        <span>🚀 Submit Query</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Response */}
                {response && (
                  <div className="mt-8 p-6 bg-gradient-to-r from-farmGreen-50 to-farmYellow-50 rounded-lg border border-farmGreen-200 animate-slide-up">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-farmGreen-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white">🤖</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-farmGreen-800 mb-2">AI Response:</h3>
                        <p className="text-farmGreen-700 leading-relaxed">{response}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "history" && (
              <div className="card p-8 animate-fade-in">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">📋</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold gradient-text font-display">
                      Query History
                    </h2>
                    <p className="text-farmGreen-600">Review your past questions and answers</p>
                  </div>
                </div>

                {queryHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📭</div>
                    <h3 className="text-xl font-semibold text-farmGreen-800 mb-2">No queries yet</h3>
                    <p className="text-farmGreen-600">Submit your first query to see it here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {queryHistory.map((item) => (
                      <div key={item.id} className="border border-farmGreen-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm text-farmGreen-500">{item.timestamp}</span>
                          <span className="px-2 py-1 bg-farmGreen-100 text-farmGreen-700 text-xs rounded-full">
                            {item.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <h4 className="font-medium text-farmGreen-800 mb-1">Question:</h4>
                          <p className="text-farmGreen-700 text-sm">{item.question}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-farmGreen-800 mb-1">Answer:</h4>
                          <p className="text-farmGreen-700 text-sm">{item.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tips Card */}
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">💡</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Pro Tips</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-farmGreen-500 mt-1">•</span>
                  <p className="text-farmGreen-700">Be specific about your crop type and growing conditions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-farmGreen-500 mt-1">•</span>
                  <p className="text-farmGreen-700">Include photos when describing visual problems</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-farmGreen-500 mt-1">•</span>
                  <p className="text-farmGreen-700">Mention your location and current weather conditions</p>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-farmGreen-500 mt-1">•</span>
                  <p className="text-farmGreen-700">Describe what you've already tried</p>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🆘</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Need Help?</h3>
              </div>
              <p className="text-farmGreen-600 text-sm mb-4">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <button className="btn-secondary w-full text-sm">
                Contact Support
              </button>
            </div>

            {/* Weather Widget (Placeholder) */}
            <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100 animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🌤️</span>
                <h3 className="font-bold text-blue-800 font-display">Weather</h3>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700 mb-1">24°C</div>
                <div className="text-sm text-blue-600">Partly Cloudy</div>
                <div className="text-xs text-blue-500 mt-2">Perfect for outdoor work</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}