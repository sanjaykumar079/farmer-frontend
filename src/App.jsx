// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./components/Auth/Login";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard";
import OfficerDashboard from "./components/Dashboard/OfficerDashboard";
import { useSupabase } from "./context/SupabaseContext";
import { LanguageProvider } from "./context/LanguageContext";

export default function App() {
  const { user } = useSupabase();

  return (
    <LanguageProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            {user && <Route path="/dashboard" element={<FarmerDashboard />} />}
            {user && <Route path="/officer" element={<OfficerDashboard />} />}
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}