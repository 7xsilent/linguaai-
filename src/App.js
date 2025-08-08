// src/App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

import {
  FiHome, FiBook, FiMic, FiMessageSquare,
  FiAward, FiTrendingUp, FiSettings,
  FiUser, FiLogIn, FiCheckCircle, FiPieChart,
  FiMenu, FiX
} from 'react-icons/fi';

// Import pages
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import PracticePage from './pages/PracticePage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import SpeakingPage from './pages/SpeakingPage';
import ConversationPage from './pages/ConversationPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProgressPage from './pages/ProgressPage';
import ChallengesPage from './pages/ChallengesPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  // Close sidebar automatically on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  // Prevent page scroll when menu is open
  useEffect(() => {
    document.body.classList.toggle('menu-open', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <div className="app-container">
      {/* Navbar */}
      {!hideNavbar && (
        <header className="navbar">
          <button
            className="mobile-menu-button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link to="/" className="nav-logo">LinguaAI</Link>
          <nav className="nav-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}><FiHome /> Home</Link>
            <Link to="/lessons" className={`nav-link ${location.pathname === '/lessons' ? 'active' : ''}`}><FiBook /> Lessons</Link>
            <Link to="/practice" className={`nav-link ${location.pathname === '/practice' ? 'active' : ''}`}><FiMic /> Practice</Link>
            <Link to="/vocabulary" className={`nav-link ${location.pathname === '/vocabulary' ? 'active' : ''}`}><FiBook /> Vocabulary</Link>
            <Link to="/grammar" className={`nav-link ${location.pathname === '/grammar' ? 'active' : ''}`}><FiCheckCircle /> Grammar</Link>
            <Link to="/speaking" className={`nav-link ${location.pathname === '/speaking' ? 'active' : ''}`}><FiMic /> Speaking</Link>
            <Link to="/conversation" className={`nav-link ${location.pathname === '/conversation' ? 'active' : ''}`}><FiMessageSquare /> Conversation</Link>
          </nav>
          <div className="auth-buttons">
            <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}><FiUser /> Profile</Link>
            <Link to="/login" className="nav-button"><FiLogIn /> Login</Link>
          </div>
        </header>
      )}

      <div className="main-content-wrapper">
        {/* Mobile overlay */}
        {!hideNavbar && (
          <div
            className={`mobile-overlay ${sidebarOpen ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        {!hideNavbar && (
          <aside className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
            <Link to="/leaderboard" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${location.pathname === '/leaderboard' ? 'active' : ''}`}><FiTrendingUp /> Leaderboard</Link>
            <Link to="/achievements" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${location.pathname === '/achievements' ? 'active' : ''}`}><FiAward /> Achievements</Link>
            <Link to="/progress" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${location.pathname === '/progress' ? 'active' : ''}`}><FiPieChart /> Progress</Link>
            <Link to="/challenges" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${location.pathname === '/challenges' ? 'active' : ''}`}><FiCheckCircle /> Challenges</Link>
            <Link to="/settings" onClick={() => setSidebarOpen(false)} className={`sidebar-link ${location.pathname === '/settings' ? 'active' : ''}`}><FiSettings /> Settings</Link>
          </aside>
        )}

        <main className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            <Route path="/lessons" element={<PrivateRoute><LessonsPage /></PrivateRoute>} />
            <Route path="/practice" element={<PrivateRoute><PracticePage /></PrivateRoute>} />
            <Route path="/vocabulary" element={<PrivateRoute><VocabularyPage /></PrivateRoute>} />
            <Route path="/grammar" element={<PrivateRoute><GrammarPage /></PrivateRoute>} />
            <Route path="/speaking" element={<PrivateRoute><SpeakingPage /></PrivateRoute>} />
            <Route path="/conversation" element={<PrivateRoute><ConversationPage /></PrivateRoute>} />
            <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
            <Route path="/progress" element={<PrivateRoute><ProgressPage /></PrivateRoute>} />
            <Route path="/challenges" element={<PrivateRoute><ChallengesPage /></PrivateRoute>} />
            <Route path="/achievements" element={<PrivateRoute><AchievementsPage /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <AppContent />
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
