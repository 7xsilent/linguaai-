// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import PracticePage from './pages/PracticePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LeaderboardPage from './pages/LeaderboardPage';
import SpeakingPracticePage from './pages/SpeakingPracticePage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarCheckerPage from './pages/GrammarCheckerPage';
import ChallengesPage from './pages/ChallengesPage';
import AIConversationPage from './pages/AIConversationPage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import SettingsPage from './pages/SettingsPage';
import PrivateRoute from './components/common/PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/lessons" element={<PrivateRoute><LessonsPage /></PrivateRoute>} />
      <Route path="/practice" element={<PrivateRoute><PracticePage /></PrivateRoute>} />
      <Route path="/leaderboard" element={<PrivateRoute><LeaderboardPage /></PrivateRoute>} />
      <Route path="/speaking" element={<PrivateRoute><SpeakingPracticePage /></PrivateRoute>} />
      <Route path="/vocabulary" element={<PrivateRoute><VocabularyPage /></PrivateRoute>} />
      <Route path="/grammar" element={<PrivateRoute><GrammarCheckerPage /></PrivateRoute>} />
      <Route path="/challenges" element={<PrivateRoute><ChallengesPage /></PrivateRoute>} />
      <Route path="/chat" element={<PrivateRoute><AIConversationPage /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
      <Route path="/progress" element={<PrivateRoute><ProgressPage /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;
