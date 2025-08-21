import { useState, useEffect } from "react";
import { useSupabase } from "../../context/SupabaseContext";

export default function OfficerDashboard() {
  const { user } = useSupabase();
  const [activeTab, setActiveTab] = useState("pending");
  const [queries, setQueries] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      farmLocation: "Punjab, India",
      cropType: "Wheat",
      issue: "Yellow spots appearing on wheat leaves, affecting about 30% of the field. Started noticing this after recent rainfall.",
      urgency: "high",
      timestamp: "2024-01-20 09:30 AM",
      status: "pending",
      aiSuggestion: "Possible fungal infection (leaf rust). Recommend fungicide application and improved drainage."
    },
    {
      id: 2,
      farmerName: "Priya Sharma",
      farmLocation: "Maharashtra, India",
      cropType: "Tomatoes",
      issue: "Tomato plants are wilting despite adequate watering. Soil seems moist but plants look droopy in the afternoon.",
      urgency: "medium",
      timestamp: "2024-01-20 11:15 AM",
      status: "pending",
      aiSuggestion: "Possible root rot or overwatering. Check soil drainage and reduce watering frequency."
    },
    {
      id: 3,
      farmerName: "Mohan Singh",
      farmLocation: "Gujarat, India",
      cropType: "Cotton",
      issue: "White flies are attacking cotton plants. Traditional methods aren't working effectively.",
      urgency: "high",
      timestamp: "2024-01-19 04:20 PM",
      status: "resolved",
      officerResponse: "Applied integrated pest management approach with neem oil spray and yellow sticky traps. Follow up in 7 days."
    }
  ]);

  const [selectedQuery, setSelectedQuery] = useState(null);
  const [response, setResponse] = useState("");

  const stats = [
    { title: "Pending Queries", count: queries.filter(q => q.status === "pending").length, icon: "⏳", color: "yellow" },
    { title: "Resolved Today", count: 12, icon: "✅", color: "green" },
    { title: "High Priority", count: queries.filter(q => q.urgency === "high" && q.status === "pending").length, icon: "🚨", color: "red" },
    { title: "Response Rate", count: "94%", icon: "📊", color: "blue" }
  ];

  const handleRespond = (queryId) => {
    setQueries(prev => prev.map(q => 
      q.id === queryId 
        ? { ...q, status: "resolved", officerResponse: response, resolvedBy: user?.email }
        : q
    ));
    setSelectedQuery(null);
    setResponse("");
  };

  const filteredQueries = queries.filter(q => 
    activeTab === "all" ? true : q.status === activeTab
  );

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case "high": return "bg-red-100 text-red-800 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-farmGreen-400 to-farmGreen-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl">👨‍💼</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text font-display">
                Officer Dashboard
              </h1>
              <p className="text-farmGreen-600 text-lg">
                {user?.email} • Helping farmers grow better crops
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="card p-6 animate-slide-up hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-farmGreen-600 text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold text-farmGreen-800">{stat.count}</p>
                  </div>
                  <div className="text-4xl opacity-80">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-farmGreen-100 rounded-lg p-1 max-w-lg">
            {[
              { key: "pending", label: "Pending" },
              { key: "resolved", label: "Resolved" },
              { key: "all", label: "All Queries" }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-white text-farmGreen-700 shadow-sm"
                    : "text-farmGreen-600 hover:text-farmGreen-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Queries List */}
          <div className="lg:col-span-2">
            <div className="card p-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-farmGreen-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">📋</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold gradient-text font-display">
                    Farmer Queries
                  </h2>
                  <p className="text-farmGreen-600">Review and respond to farmer questions</p>
                </div>
              </div>

              {filteredQueries.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-farmGreen-800 mb-2">No queries found</h3>
                  <p className="text-farmGreen-600">All caught up! No {activeTab} queries at the moment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQueries.map((query) => (
                    <div key={query.id} className="border border-farmGreen-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
                      {/* Query Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-farmGreen-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {query.farmerName[0]}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-farmGreen-800">{query.farmerName}</h3>
                            <p className="text-sm text-farmGreen-600">{query.farmLocation} • {query.cropType}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(query.urgency)}`}>
                            {query.urgency.toUpperCase()}
                          </span>
                          <span className="text-xs text-farmGreen-500">{query.timestamp}</span>
                        </div>
                      </div>

                      {/* Query Content */}
                      <div className="mb-4">
                        <h4 className="font-medium text-farmGreen-800 mb-2">Issue Description:</h4>
                        <p className="text-farmGreen-700 leading-relaxed">{query.issue}</p>
                      </div>

                      {/* AI Suggestion */}
                      {query.aiSuggestion && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                          <div className="flex items-start space-x-2">
                            <span className="text-blue-600 text-lg">🤖</span>
                            <div>
                              <h4 className="font-medium text-blue-800 mb-1">AI Suggestion:</h4>
                              <p className="text-blue-700 text-sm">{query.aiSuggestion}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Officer Response (if resolved) */}
                      {query.officerResponse && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                          <div className="flex items-start space-x-2">
                            <span className="text-green-600 text-lg">✅</span>
                            <div>
                              <h4 className="font-medium text-green-800 mb-1">Officer Response:</h4>
                              <p className="text-green-700 text-sm mb-2">{query.officerResponse}</p>
                              {query.resolvedBy && (
                                <p className="text-xs text-green-600">Resolved by: {query.resolvedBy}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {query.status === "pending" && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => setSelectedQuery(query)}
                            className="btn-primary text-sm px-4 py-2"
                          >
                            Respond
                          </button>
                          <button className="btn-secondary text-sm px-4 py-2">
                            Mark as Urgent
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6 animate-slide-up">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">⚡</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Quick Actions</h3>
              </div>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-xl">📊</span>
                  <span className="text-farmGreen-700">Generate Report</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-xl">👥</span>
                  <span className="text-farmGreen-700">View All Farmers</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-xl">📚</span>
                  <span className="text-farmGreen-700">Knowledge Base</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-farmGreen-50 transition-colors duration-200 flex items-center space-x-3">
                  <span className="text-xl">⚙️</span>
                  <span className="text-farmGreen-700">Settings</span>
                </button>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.2s"}}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📈</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-farmGreen-600 text-sm">Response Time</span>
                  <span className="font-semibold text-farmGreen-800">2.3 hrs avg</span>
                </div>
                <div className="w-full bg-farmGreen-100 rounded-full h-2">
                  <div className="bg-farmGreen-500 h-2 rounded-full" style={{width: "85%"}}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-farmGreen-600 text-sm">Satisfaction Rate</span>
                  <span className="font-semibold text-farmGreen-800">4.8/5.0</span>
                </div>
                <div className="w-full bg-farmGreen-100 rounded-full h-2">
                  <div className="bg-farmGreen-500 h-2 rounded-full" style={{width: "96%"}}></div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.3s"}}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🕒</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Recent Activity</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-farmGreen-700">Resolved wheat disease query</p>
                    <p className="text-farmGreen-500 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-farmGreen-700">Updated knowledge base</p>
                    <p className="text-farmGreen-500 text-xs">4 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-farmGreen-700">Reviewed AI suggestions</p>
                    <p className="text-farmGreen-500 text-xs">6 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="card p-6 animate-slide-up" style={{animationDelay: "0.4s"}}>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📢</span>
                <h3 className="font-bold text-farmGreen-800 font-display">Announcements</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-1">System Update</h4>
                  <p className="text-blue-700">New AI models deployed for better crop disease detection</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-1">Training Session</h4>
                  <p className="text-green-700">Monthly officer training on Jan 25th at 2 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Modal */}
        {selectedQuery && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text font-display">
                  Respond to Query
                </h3>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6 p-4 bg-farmGreen-50 rounded-lg">
                <h4 className="font-semibold text-farmGreen-800 mb-2">Farmer: {selectedQuery.farmerName}</h4>
                <p className="text-farmGreen-700 mb-2"><strong>Location:</strong> {selectedQuery.farmLocation}</p>
                <p className="text-farmGreen-700 mb-2"><strong>Crop:</strong> {selectedQuery.cropType}</p>
                <p className="text-farmGreen-700 mb-2"><strong>Issue:</strong> {selectedQuery.issue}</p>
                {selectedQuery.aiSuggestion && (
                  <div className="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-blue-800 text-sm"><strong>AI Suggestion:</strong> {selectedQuery.aiSuggestion}</p>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-farmGreen-700 mb-2">
                  Your Expert Response
                </label>
                <textarea
                  className="input-field resize-none"
                  rows="6"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Provide your expert advice and recommendations..."
                />
                <p className="text-xs text-farmGreen-500 mt-2">
                  Tip: Include specific steps, dosages, and follow-up recommendations
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleRespond(selectedQuery.id)}
                  disabled={!response.trim()}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Response
                </button>
                <button
                  onClick={() => setSelectedQuery(null)}
                  className="btn-secondary px-6"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}