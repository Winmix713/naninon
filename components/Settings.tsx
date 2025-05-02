import React from 'react';
import { useSettings } from '../context/SettingsContext';

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  
  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Beállítások</h2>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label htmlFor="darkModeToggle" className="text-lg">Sötét mód</label>
          <div className="relative">
            <input 
              type="checkbox" 
              id="darkModeToggle" 
              checked={settings.darkMode}
              onChange={(e) => updateSettings({ darkMode: e.target.checked })}
              className="sr-only"
            />
            <div 
              className={`block w-14 h-8 rounded-full transition-colors ${settings.darkMode ? 'bg-[#CCFF00]' : 'bg-gray-600'}`}
            ></div>
            <div 
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.darkMode ? 'transform translate-x-6' : ''}`}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="languageSelect" className="text-lg">Nyelv</label>
          <select
            id="languageSelect"
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            className="bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white p-2"
          >
            <option value="hu">Magyar</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="notificationsToggle" className="text-lg">Értesítések</label>
          <div className="relative">
            <input 
              type="checkbox" 
              id="notificationsToggle" 
              checked={settings.notificationsEnabled}
              onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
              className="sr-only"
            />
            <div 
              className={`block w-14 h-8 rounded-full transition-colors ${settings.notificationsEnabled ? 'bg-[#CCFF00]' : 'bg-gray-600'}`}
            ></div>
            <div 
              className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.notificationsEnabled ? 'transform translate-x-6' : ''}`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;