// src/components/Dashboard/OfficerDashboard.jsx
import { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useOfficerAuth } from "../Auth/OfficerLogin";

import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  User,
  Filter,
  Search
} from "lucide-react";

const STATIC_FARMER_QUERIES = [
  {
    id: 1,
    farmer_id: "farmer_001",
    query_text: "My wheat crop is showing signs of rust disease. The leaves have orange-brown spots. What immediate action should I take?",
    image_url: null,
    status: "pending",
    urgency: "high",
    created_at: "2024-01-22T09:30:00Z",
    farmer: {
      id: "farmer_001",
      full_name: "Ravi Patel",
      email: "ravi.patel@example.com",
      location: "Gujarat"
    },
    replies: []
  },
  {
    id: 2,
    farmer_id: "farmer_002",
    query_text: "Best fertilizer schedule for cotton crop in current season?",
    image_url: null,
    status: "pending",
    urgency: "medium",
    created_at: "2024-01-22T08:15:00Z",
    farmer: {
      id: "farmer_002",
      full_name: "Sunita Devi",
      email: "sunita.devi@example.com",
      location: "Punjab"
    },
    replies: []
  },
  {
    id: 3,
    farmer_id: "farmer_003",
    query_text: "My tomato plants are showing yellow spots on leaves. What could be the cause?",
    image_url: null,
    status: "answered",
    urgency: "medium",
    created_at: "2024-01-20T10:30:00Z",
    farmer: {
      id: "farmer_003",
      full_name: "Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      location: "Maharashtra"
    },
    replies: [
      {
        id: 1,
        officer_id: "officer_001",
        officer_name: "Dr. Priya Sharma",
        response_text: "The yellow spots on your tomato leaves could indicate early blight. Apply copper-based fungicide every 7-10 days. Ensure proper air circulation and avoid overhead watering. Remove affected leaves immediately.",
        created_at: "2024-01-20T11:15:00Z"
      }
    ]
  },
  {
    id: 4,
    farmer_id: "farmer_004",
    query_text: "Pest control for cotton crop - need urgent advice. Small white insects on leaves.",
    image_url: null,
    status: "answered",
    urgency: "high",
    created_at: "2024-01-19T14:20:00Z",
    farmer: {
      id: "farmer_004",
      full_name: "Amit Singh",
      email: "amit.singh@example.com",
      location: "Rajasthan"
    },
    replies: [
      {
        id: 2,
        officer_id: "officer_001",
        officer_name: "Dr. Priya Sharma",
        response_text: "The white insects you're seeing are likely whiteflies. Use yellow sticky traps immediately. Apply neem oil spray in evening hours. For severe infestation, use Imidacloprid-based insecticide as per recommended dosage.",
        created_at: "2024-01-19T15:45:00Z"
      },
      {
        id: 3,
        officer_id: "officer_001",
        officer_name: "Dr. Priya Sharma", 
        response_text: "Also ensure proper field sanitation. Remove crop residues and weeds. Monitor the field daily for early detection. Consider beneficial insects like ladybugs for natural pest control.",
        created_at: "2024-01-19T16:00:00Z"
      }
    ]
  }
];

export default function OfficerDashboard() {
  const { translate } = useLanguage();
  const [queries, setQueries] = useState(STATIC_FARMER_QUERIES);
  const [replyText, setReplyText] = useState({});
  const [filter, setFilter] = useState("all"); // all, pending, answered
  const [searchTerm, setSearchTerm] = useState("");
  const [isReplying, setIsReplying] = useState({});
  const { officerData, logout } = useOfficerAuth();

  const filteredQueries = queries.filter(query => {
    const matchesFilter = filter === "all" || query.status === filter;
    const matchesSearch = query.query_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         query.farmer.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSubmitReply = async (queryId) => {
    const text = replyText[queryId]?.trim();
    if (!text) return;

    setIsReplying({...isReplying, [queryId]: true});

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newReply = {
      id: Date.now(),
      officer_id: "officer_001",
      officer_name: "Dr. Priya Sharma",
      response_text: text,
      created_at: new Date().toISOString()
    };

    setQueries(prevQueries => 
      prevQueries.map(query => 
        query.id === queryId 
          ? { 
              ...query, 
              replies: [...(query.replies || []), newReply],
              status: "answered" 
            }
          : query
      )
    );

    setReplyText(prev => ({ ...prev, [queryId]: "" }));
    setIsReplying({...isReplying, [queryId]: false});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'answered': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const pendingCount = queries.filter(q => q.status === 'pending').length;
  const answeredCount = queries.filter(q => q.status === 'answered').length;
  const highPriorityCount = queries.filter(q => q.urgency === 'high').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 font-display mb-2">
                {translate('officerDashboard')}
              </h1>
              <p className="text-blue-600 text-lg">
                {translate('helpingFarmers')}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-blue-600">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Officer: Dr. Priya Sharma</span>
              </div>
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2 group"
              >
                <span className="text-lg group-hover:rotate-12 transition-transform duration-200">🚪</span>
                <span className="text-sm font-semibold">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center animate-slide-up bg-white">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {queries.length}
            </div>
            <div className="text-sm text-gray-600">{translate('allQueries')}</div>
          </div>
          <div className="card p-6 text-center animate-slide-up bg-white" style={{animationDelay: "0.1s"}}>
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {pendingCount}
            </div>
            <div className="text-sm text-gray-600">{translate('pendingQueries')}</div>
          </div>
          <div className="card p-6 text-center animate-slide-up bg-white" style={{animationDelay: "0.2s"}}>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {answeredCount}
            </div>
            <div className="text-sm text-gray-600">{translate('resolvedToday')}</div>
          </div>
          <div className="card p-6 text-center animate-slide-up bg-white" style={{animationDelay: "0.3s"}}>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {highPriorityCount}
            </div>
            <div className="text-sm text-gray-600">{translate('highPriority')}</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="card p-6 mb-8 bg-white">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-blue-600" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="input-field w-auto min-w-32"
              >
                <option value="all">All Queries</option>
                <option value="pending">Pending</option>
                <option value="answered">Answered</option>
              </select>
            </div>
            <div className="flex items-center space-x-2 flex-1 max-w-md">
              <Search className="w-5 h-5 text-blue-600" />
              <input
                type="text"
                placeholder="Search queries or farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field flex-1"
              />
            </div>
          </div>
        </div>

        {/* Queries List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-800 font-display flex items-center">
            <MessageSquare className="w-6 h-6 mr-2" />
            {translate('farmerQueries')} ({filteredQueries.length})
          </h2>
          
          {filteredQueries.length === 0 ? (
            <div className="card p-12 text-center bg-white">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">No queries found</h3>
              <p className="text-blue-600">
                {filter !== "all" ? `No ${filter} queries at the moment.` : "No farmer queries yet."}
              </p>
            </div>
          ) : (
            filteredQueries.map((query, index) => (
              <div 
                key={query.id} 
                className="card p-6 animate-slide-up hover:shadow-lg transition-all duration-300 bg-white"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Query Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-800 text-lg">
                        {query.farmer.full_name}
                      </h3>
                      <p className="text-sm text-blue-600">
                        {query.farmer.location} • {query.farmer.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                      {query.status === 'pending' && <Clock className="w-3 h-3 inline mr-1" />}
                      {query.status === 'answered' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                      {query.status.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(query.urgency)}`}>
                      {query.urgency === 'high' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                      {query.urgency.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Query Content */}
                <div className="mb-4">
                  <div className="flex items-start gap-4">
                    {query.image_url && (
                      <img
                        src={query.image_url}
                        alt="Query"
                        className="w-32 h-24 object-cover rounded-lg border flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-2">
                        Submitted on {new Date(query.created_at).toLocaleDateString()} at{' '}
                        {new Date(query.created_at).toLocaleTimeString()}
                      </div>
                      <p className="text-gray-800 leading-relaxed">
                        {query.query_text}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Existing Replies */}
                {query.replies && query.replies.length > 0 && (
                  <div className="mb-6 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Previous Responses ({query.replies.length})
                    </h4>
                    <div className="space-y-3">
                      {query.replies.map((reply, replyIndex) => (
                        <div 
                          key={reply.id} 
                          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-semibold">
                                  {reply.officer_name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="font-medium text-blue-800 text-sm">
                                {reply.officer_name}
                              </span>
                            </div>
                            <div className="text-xs text-blue-600">
                              {new Date(reply.created_at).toLocaleDateString()} at{' '}
                              {new Date(reply.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          <p className="text-blue-700 text-sm leading-relaxed">
                            {reply.response_text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <Send className="w-4 h-4 mr-2" />
                    {query.replies && query.replies.length > 0 ? "Add Follow-up Response" : "Provide Response"}
                  </h4>
                  <div className="flex gap-3">
                    <textarea
                      className="flex-1 border border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                      rows="3"
                      placeholder="Type your response to help the farmer..."
                      value={replyText[query.id] || ""}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [query.id]: e.target.value }))}
                    />
                    <button
                      onClick={() => handleSubmitReply(query.id)}
                      disabled={!replyText[query.id]?.trim() || isReplying[query.id]}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 h-fit"
                    >
                      {isReplying[query.id] ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Quick Response Templates */}
                  <div className="mt-3">
                    <div className="text-sm text-gray-600 mb-2">Quick responses:</div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Thank you for your query. I'll investigate this issue...",
                        "Please provide more details about the symptoms...",
                        "I recommend immediate action to prevent spread...",
                        "This appears to be a common issue. Here's what to do..."
                      ].map((template, idx) => (
                        <button
                          key={idx}
                          onClick={() => setReplyText(prev => ({ ...prev, [query.id]: template }))}
                          className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                        >
                          {template.substring(0, 30)}...
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Officer Guidelines */}
        <div className="card p-6 mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-lg font-bold text-blue-800 mb-4">📋 Response Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-semibold mb-2">✅ Best Practices:</h4>
              <ul className="space-y-1">
                <li>• Be specific and actionable</li>
                <li>• Include timing for treatments</li>
                <li>• Mention safety precautions</li>
                <li>• Ask for follow-up when needed</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚡ Priority Response Times:</h4>
              <ul className="space-y-1">
                <li>• High Priority: Within 2 hours</li>
                <li>• Medium Priority: Within 6 hours</li>
                <li>• Low Priority: Within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}