import React from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Timer from './components/Timer';
import { NavigationProvider } from './context/NavigationContext';
import { TimerProvider } from './context/TimerContext';
import { AuthProvider } from './context/AuthContext';
import { MatchProvider } from './context/MatchContext';
import { SettingsProvider } from './context/SettingsContext';
import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <TimerProvider>
          <MatchProvider>
            <NavigationProvider>
              <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-white">
                <Header />
                <Timer />
                <MainContent />
                <Footer />
              </div>
            </NavigationProvider>
          </MatchProvider>
        </TimerProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;