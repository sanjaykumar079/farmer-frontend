// src/components/Auth/OfficerLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OfficerLogin = () => {
  const [credentials, setCredentials] = useState({
    passkey: '',
    officer_id: '',
    region: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleOfficerLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/officer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail);
      }

      const data = await response.json();
      localStorage.setItem('officer_token', data.access_token);
      localStorage.setItem('officer_data', JSON.stringify(data.officer));
      navigate('/officer/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full card p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-3xl">👮‍♂️</span>
          </div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Officer Portal</h1>
          <p className="text-blue-600">Secure access for agricultural officers</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleOfficerLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Access Passkey
            </label>
            <input
              type="password"
              value={credentials.passkey}
              onChange={(e) => setCredentials({...credentials, passkey: e.target.value})}
              className="input-field"
              placeholder="Enter your department passkey"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Officer ID
            </label>
            <input
              type="text"
              value={credentials.officer_id}
              onChange={(e) => setCredentials({...credentials, officer_id: e.target.value})}
              className="input-field"
              placeholder="e.g., AGR001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              Region
            </label>
            <select
              value={credentials.region}
              onChange={(e) => setCredentials({...credentials, region: e.target.value})}
              className="input-field"
              required
            >
              <option value="">Select Region</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? 'Verifying...' : 'Access Officer Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficerLogin;