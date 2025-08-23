import { useEffect, useState } from 'react';

export function OfficerProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [officerData, setOfficerData] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('officer_token');
        const storedOfficerData = localStorage.getItem('officer_data');
        
        if (!token || !storedOfficerData) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verify token with backend
        const response = await fetch(`http://127.0.0.1:8000/auth/verify-officer-token?token=${token}`);
        
        if (response.ok) {
          setIsAuthenticated(true);
          setOfficerData(JSON.parse(storedOfficerData));
        } else {
          // Token is invalid, clear storage
          localStorage.removeItem('officer_token');
          localStorage.removeItem('officer_data');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="card p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Verifying Access</h2>
          <p className="text-blue-600">Please wait while we authenticate your credentials...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="card p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🔐</div>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Officer Access Required
          </h2>
          <p className="text-blue-600 mb-6">
            You need to be authenticated as an officer to access this area.
          </p>
          <div className="space-y-3">
            <a href="/login" className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 inline-block">
              Officer Login
            </a>
            <a href="/" className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200 inline-block">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Pass officer data to children components
  return (
    <div>
      {/* You can add a context provider here to share officer data */}
      {children}
    </div>
  );
}

// Hook to use officer data in components
export function useOfficerAuth() {
  const [officerData, setOfficerData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('officer_token');
    const storedOfficerData = localStorage.getItem('officer_data');
    
    if (token && storedOfficerData) {
      setOfficerData(JSON.parse(storedOfficerData));
      setIsAuthenticated(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('officer_token');
    localStorage.removeItem('officer_data');
    setOfficerData(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  };

  return {
    officerData,
    isAuthenticated,
    logout
  };
}