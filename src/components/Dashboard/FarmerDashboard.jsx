import { useState, useEffect, useRef } from "react";
import { 
  Camera, Send, Clock, CheckCircle, AlertCircle, MessageSquare, 
  Mic, MicOff, Play, Pause, Upload, Leaf, Brain, TrendingUp,
  FileImage, Volume2
} from "lucide-react";

const STATIC_QUERIES = [
  {
    id: 1,
    query_text: "My tomato plants are showing yellow spots on leaves. What could be the cause?",
    image_url: null,
    voice_url: null,
    status: "answered",
    urgency: "medium",
    created_at: "2024-01-20T10:30:00Z",
    replies: [
      {
        id: 1,
        officer_name: "Dr. Rajesh Kumar",
        response_text: "The yellow spots on your tomato leaves could indicate early blight. Apply copper-based fungicide every 7-10 days. Ensure proper air circulation and avoid overhead watering. Remove affected leaves immediately.",
        created_at: "2024-01-20T11:15:00Z"
      }
    ]
  },
  {
    id: 2,
    query_text: "Best time to harvest wheat crop in this weather?",
    image_url: null,
    voice_url: null,
    status: "pending",
    urgency: "high",
    created_at: "2024-01-21T08:00:00Z",
    replies: []
  },
  {
    id: 3,
    query_text: "Pest control for cotton crop - need urgent advice",
    image_url: null,
    voice_url: null,
    status: "answered",
    urgency: "high",
    created_at: "2024-01-19T14:20:00Z",
    replies: [
      {
        id: 2,
        officer_name: "Dr. Priya Sharma",
        response_text: "For cotton pests, identify the specific pest first. Use integrated pest management: neem oil spray for aphids, Bt cotton for bollworm. Monitor field daily and use yellow sticky traps. Avoid excessive pesticide use.",
        created_at: "2024-01-19T15:45:00Z"
      },
      {
        id: 3,
        officer_name: "Dr. Priya Sharma",
        response_text: "Also ensure proper field sanitation. Remove crop residues and maintain field hygiene. Consider beneficial insects like ladybugs for natural pest control.",
        created_at: "2024-01-19T16:00:00Z"
      }
    ]
  }
];

export default function FarmerDashboard() {
  const [queries, setQueries] = useState(STATIC_QUERIES);
  const [showNewQueryForm, setShowNewQueryForm] = useState(false);
  const [showDiseasePredictor, setShowDiseasePredictor] = useState(false);
  const [newQuery, setNewQuery] = useState({
    query_text: "",
    urgency: "medium",
    image: null,
    voice: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Voice recording states
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Disease prediction states
  const [diseaseImage, setDiseaseImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmitQuery = async (e) => {
    e.preventDefault();
    if (!newQuery.query_text.trim() && !audioBlob) return;

    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const query = {
      id: queries.length + 1,
      query_text: newQuery.query_text || "Voice message attached",
      image_url: newQuery.image ? URL.createObjectURL(newQuery.image) : null,
      voice_url: audioBlob ? URL.createObjectURL(audioBlob) : null,
      status: "pending",
      urgency: newQuery.urgency,
      created_at: new Date().toISOString(),
      replies: []
    };

    setQueries([query, ...queries]);
    setNewQuery({ query_text: "", urgency: "medium", image: null, voice: null });
    setAudioBlob(null);
    setShowNewQueryForm(false);
    setIsSubmitting(false);
  };

  // Helper function to pick a supported MIME type for audio recording
  const pickMimeType = () => {
    const candidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4" // Safari
    ];
    return candidates.find(t => window.MediaRecorder && MediaRecorder.isTypeSupported(t)) || "";
  };

  // Enhanced voice recording function with better error handling
  const startRecording = async () => {
    try {
      // 1) Basic capability / secure-context check
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("This browser doesn't support microphone recording.");
        return;
      }
      if (location.protocol !== "https:" && location.hostname !== "localhost") {
        alert("Microphone requires HTTPS or http://localhost in dev.");
        return;
      }

      // 2) Optional: Check current permission state
      try {
        const perm = await navigator.permissions?.query({ name: "microphone" });
        console.log("Mic permission:", perm?.state);
      } catch {}

      // 3) Ask for audio stream with enhanced audio settings
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { 
          echoCancellation: true, 
          noiseSuppression: true,
          autoGainControl: true
        }
      });

      // 4) Construct MediaRecorder with a supported mime type
      const mimeType = pickMimeType();
      const mediaRecorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        // IMPORTANT: use the SAME mimeType you recorded with
        const recordedType = mediaRecorder.mimeType || mimeType || "audio/webm;codecs=opus";
        const blob = new Blob(audioChunksRef.current, { type: recordedType });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      
      // Show specific error messages based on error type
      const errorName = error?.name;
      if (errorName === "NotAllowedError" || errorName === "PermissionDeniedError") {
        alert("Microphone access was denied. Please enable it in your browser's site settings and try again.");
      } else if (errorName === "NotFoundError" || errorName === "DevicesNotFoundError") {
        alert("No microphone found. Please connect a microphone and try again.");
      } else if (errorName === "NotReadableError") {
        alert("Microphone is in use by another app (Zoom/Teams/etc). Please close other apps and try again.");
      } else if (errorName === "SecurityError") {
        alert("Browser blocked access due to insecure context. Please use HTTPS or localhost.");
      } else if (errorName === "NotSupportedError") {
        alert("Audio recording format not supported by this browser.");
      } else {
        alert("Unable to start recording. Please check your microphone permissions and device settings.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(intervalRef.current);
    }
  };

  const playVoice = () => {
    if (audioBlob && audioRef.current) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlayingVoice(true);
      
      audioRef.current.onended = () => {
        setIsPlayingVoice(false);
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  const deleteVoiceRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    setIsPlayingVoice(false);
  };

  // Disease prediction functions
  const handleDiseaseImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDiseaseImage(file);
      setPredictionResult(null);
    }
  };

  const analyzeDiseaseImage = async () => {
    if (!diseaseImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock prediction results
    const mockResults = [
      {
        disease: "Early Blight",
        confidence: 89.5,
        severity: "Moderate",
        treatment: "Apply copper-based fungicide every 7-10 days. Improve air circulation and avoid overhead watering.",
        prevention: "Use drip irrigation, maintain proper plant spacing, and apply preventive fungicide sprays."
      },
      {
        disease: "Leaf Spot",
        confidence: 72.3,
        severity: "Mild",
        treatment: "Remove affected leaves and apply neem oil spray weekly.",
        prevention: "Ensure proper drainage and avoid wet foliage conditions."
      }
    ];
    
    setPredictionResult(mockResults[0]);
    setIsAnalyzing(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'answered': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                Welcome Back, Farmer!
              </h1>
              <p className="text-green-600 text-lg">
                Ready to solve your farming challenges?
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDiseasePredictor(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Brain className="w-5 h-5" />
                <span>Disease Predictor</span>
              </button>
              <button
                onClick={() => setShowNewQueryForm(true)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>New Query</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {queries.length}
            </div>
            <div className="text-sm text-green-500">Total Queries</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-yellow-500">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {queries.filter(q => q.status === 'pending').length}
            </div>
            <div className="text-sm text-green-500">Pending</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {queries.filter(q => q.status === 'answered').length}
            </div>
            <div className="text-sm text-green-500">Resolved</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border-l-4 border-red-500">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {queries.filter(q => q.urgency === 'high').length}
            </div>
            <div className="text-sm text-green-500">High Priority</div>
          </div>
        </div>

        {/* Disease Prediction Modal */}
        {showDiseasePredictor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent flex items-center">
                  <Brain className="w-7 h-7 mr-2 text-green-600" />
                  AI Disease Predictor
                </h2>
                <button
                  onClick={() => setShowDiseasePredictor(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Section */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Crop Image for Analysis
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleDiseaseImageUpload}
                        className="hidden"
                        id="disease-image"
                      />
                      <label htmlFor="disease-image" className="cursor-pointer">
                        {diseaseImage ? (
                          <div className="space-y-2">
                            <img 
                              src={URL.createObjectURL(diseaseImage)} 
                              alt="Disease analysis" 
                              className="max-w-full h-48 object-cover rounded-lg mx-auto"
                            />
                            <p className="text-sm text-gray-600">{diseaseImage.name}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <FileImage className="w-12 h-12 text-gray-400 mx-auto" />
                            <p className="text-gray-600">Click to upload crop image</p>
                            <p className="text-xs text-gray-400">Supports JPG, PNG files</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <button
                    onClick={analyzeDiseaseImage}
                    disabled={!diseaseImage || isAnalyzing}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        <span>Analyze Disease</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Results Section */}
                <div className="space-y-6">
                  {predictionResult ? (
                    <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-green-800">Analysis Results</h3>
                        <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            {predictionResult.confidence}% confident
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <span className="font-semibold text-gray-700">Disease:</span>
                          <span className="ml-2 text-red-600 font-medium">{predictionResult.disease}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Severity:</span>
                          <span className="ml-2 text-yellow-600 font-medium">{predictionResult.severity}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Treatment:</span>
                          <p className="mt-1 text-gray-600 text-sm">{predictionResult.treatment}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-gray-700">Prevention:</span>
                          <p className="mt-1 text-gray-600 text-sm">{predictionResult.prevention}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                      <Leaf className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Upload an image to get AI-powered disease analysis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Query Modal */}
        {showNewQueryForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-yellow-600 bg-clip-text text-transparent">Ask Your Question</h2>
                <button
                  onClick={() => setShowNewQueryForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <form onSubmit={handleSubmitQuery} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your farming challenge
                  </label>
                  <textarea
                    value={newQuery.query_text}
                    onChange={(e) => setNewQuery({...newQuery, query_text: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows="4"
                    placeholder="Describe your farming challenge in detail..."
                  />
                </div>

                {/* Enhanced Voice Recording Section */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Or record a voice message
                  </label>
                  
                  {!audioBlob ? (
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                          isRecording 
                            ? 'bg-red-500 hover:bg-red-600 text-white' 
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-4 h-4" />
                            <span>Stop Recording</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4" />
                            <span>Start Recording</span>
                          </>
                        )}
                      </button>
                      {isRecording && (
                        <div className="flex items-center space-x-2 text-red-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="font-mono">{formatTime(recordingTime)}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={playVoice}
                          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                        >
                          {isPlayingVoice ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                        <Volume2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700">Voice message recorded ({formatTime(recordingTime)})</span>
                      </div>
                      <button
                        type="button"
                        onClick={deleteVoiceRecording}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <audio ref={audioRef} className="hidden" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      value={newQuery.urgency}
                      onChange={(e) => setNewQuery({...newQuery, urgency: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Image (Optional)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewQuery({...newQuery, image: e.target.files[0]})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || (!newQuery.query_text.trim() && !audioBlob)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold flex-1 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Query'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewQueryForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Queries List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-green-800">
            Query History
          </h2>
          
          {queries.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">No queries yet</h3>
              <p className="text-green-600">Start by submitting your first farming question!</p>
            </div>
          ) : (
            queries.map((query, index) => (
              <div 
                key={query.id} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  {query.image_url && (
                    <img
                      src={query.image_url}
                      alt="Query"
                      className="w-32 h-24 object-cover rounded-lg border flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(query.status)}`}>
                          {getStatusIcon(query.status)}
                          <span className="capitalize">{query.status}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getUrgencyColor(query.urgency)}`}>
                          {query.urgency.toUpperCase()}
                        </span>
                        {query.voice_url && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 flex items-center space-x-1">
                            <Volume2 className="w-3 h-3" />
                            <span>Voice</span>
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(query.created_at).toLocaleDateString()} at{' '}
                        {new Date(query.created_at).toLocaleTimeString()}
                      </div>
                    </div>
                    <p className="text-green-800 mb-4 leading-relaxed">
                      {query.query_text}
                    </p>
                  </div>
                </div>

                {/* Replies Section */}
                {query.replies && query.replies.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-green-100">
                    <h4 className="font-semibold text-green-800 mb-4 flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Officer Responses ({query.replies.length})
                    </h4>
                    <div className="space-y-4">
                      {query.replies.map((reply) => (
                        <div 
                          key={reply.id} 
                          className="bg-green-50 border border-green-200 rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">
                                  {reply.officer_name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <span className="font-medium text-green-800">
                                {reply.officer_name}
                              </span>
                            </div>
                            <div className="text-sm text-green-600">
                              {new Date(reply.created_at).toLocaleDateString()} at{' '}
                              {new Date(reply.created_at).toLocaleTimeString()}
                            </div>
                          </div>
                          <p className="text-green-700 leading-relaxed">
                            {reply.response_text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-green-600">
          <p className="text-lg font-medium mb-2">Need immediate assistance?</p>
          <p className="text-sm">
            Contact our 24/7 helpline: <span className="font-semibold">1800-XXX-FARM</span>
          </p>
        </div>
      </div>
    </div>
  );
}