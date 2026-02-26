import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { DashboardView } from './components/DashboardView';

export const IncidentManager = () => {
  const [view, setView] = useState('landing'); 
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  if (view === 'landing') {
    return <LandingPage onLogin={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginPage onBack={() => setView('landing')} onSuccess={handleLoginSuccess} />;
  }

  return <DashboardView currentUser={user} onLogout={handleLogout} />;
};
