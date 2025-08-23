// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import LoginSelection from "./components/Auth/LoginSelection";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard";
import OfficerDashboard from "./components/Dashboard/OfficerDashboard";
import DiseaseAnalyzer from "./components/DiseaseDetection/DiseaseAnalyzer";
import { OfficerProtectedRoute } from "./components/Auth/OfficerLogin";
import { useSupabase } from "./context/SupabaseContext";
import { LanguageProvider } from "./context/LanguageContext";
import { useLanguage } from "./context/LanguageContext";

// Protected Route Component for Farmers (Supabase auth)
function FarmerProtectedRoute({ children }) {
  const { user } = useSupabase();
  const { translate } = useLanguage();
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-farmGreen-50 to-farmYellow-50">
        <div className="card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold gradient-text mb-4">
            {translate('signIn')} Required
          </h2>
          <p className="text-farmGreen-600 mb-6">
            Please sign in to access this feature
          </p>
          <a href="/login" className="btn-primary">
            {translate('signIn')}
          </a>
        </div>
      </div>
    );
  }
  
  return children;
}

// Main App Component
function AppContent() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-farmGreen-50 via-farmYellow-50 to-orange-50">
        <Navbar />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginSelection />} />
            
            {/* Farmer Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <FarmerProtectedRoute>
                  <FarmerDashboard />
                </FarmerProtectedRoute>
              } 
            />
            <Route 
              path="/disease-detection" 
              element={
                <FarmerProtectedRoute>
                  <DiseaseAnalyzer />
                </FarmerProtectedRoute>
              } 
            />
            
            {/* Officer Protected Route */}
            <Route 
              path="/officer/dashboard" 
              element={
                <OfficerProtectedRoute>
                  <OfficerDashboard />
                </OfficerProtectedRoute>
              } 
            />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// 404 Not Found Component
function NotFound() {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-6">🌾</div>
        <h1 className="text-4xl font-bold gradient-text mb-4 font-display">
          404 - Page Not Found
        </h1>
        <p className="text-farmGreen-600 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <a href="/" className="btn-primary inline-block">
            Home
          </a>
          <a href="/about" className="btn-secondary inline-block">
            About
          </a>
        </div>
      </div>
    </div>
  );
}

// Main App with Providers
export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}