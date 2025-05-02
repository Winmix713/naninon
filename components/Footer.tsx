import React from 'react';
import { useNavigation, NavigationSection } from '../context/NavigationContext';
import { useMatches } from '../context/MatchContext';

const Footer: React.FC = () => {
  const { navigate, activeSection } = useNavigation();
  const { favoritePredictions } = useMatches();
  
  const handleNavigate = (section: NavigationSection) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(section);
  };
  
  return (
    <footer className="bg-[#0A0A0A]/80 backdrop-blur-md border-t border-[#CCFF00]/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <nav className="flex justify-around md:justify-start space-x-4 md:space-x-6 mb-4 md:mb-0 w-full md:w-auto">
            <a 
              href="#" 
              onClick={handleNavigate('home')}
              className={`flex flex-col items-center ${activeSection === 'home' ? 'text-[#CCFF00]' : 'text-white/70 hover:text-[#CCFF00] transition-colors'}`}
              aria-label="Home"
            >
              <i className="ri-home-line text-2xl mb-1"></i>
              <span className="text-xs">Home</span>
            </a>
            
            <a 
              href="#" 
              onClick={handleNavigate('statistics')}
              className={`flex flex-col items-center ${activeSection === 'statistics' ? 'text-[#CCFF00]' : 'text-white/70 hover:text-[#CCFF00] transition-colors'}`}
              aria-label="Statistics"
            >
              <i className="ri-bar-chart-line text-2xl mb-1"></i>
              <span className="text-xs">Statistics</span>
            </a>
            
            <a 
              href="#" 
              onClick={handleNavigate('favorites')}
              className={`flex flex-col items-center ${activeSection === 'favorites' ? 'text-[#CCFF00]' : 'text-white/70 hover:text-[#CCFF00] transition-colors'}`}
              aria-label="Favorited Statistics"
            >
              <i className="ri-star-line text-2xl mb-1"></i>
              <span className="text-xs">Favorites</span>
            </a>
            
            <a 
              href="#" 
              onClick={handleNavigate('recent')}
              className={`flex flex-col items-center ${activeSection === 'recent' ? 'text-[#CCFF00]' : 'text-white/70 hover:text-[#CCFF00] transition-colors'}`}
              aria-label="Recent"
            >
              <i className="ri-history-line text-2xl mb-1"></i>
              <span className="text-xs">Recent</span>
            </a>
            
            <a 
              href="#" 
              onClick={handleNavigate('settings')}
              className={`flex flex-col items-center ${activeSection === 'settings' ? 'text-[#CCFF00]' : 'text-white/70 hover:text-[#CCFF00] transition-colors'}`}
              aria-label="Settings"
            >
              <i className="ri-settings-line text-2xl mb-1"></i>
              <span className="text-xs">Settings</span>
            </a>
          </nav>
          
          <div className="text-[#CCFF00] hidden md:block">
            {favoritePredictions.length > 0 ? (
              <span className="text-sm">Kedvencek száma: <span className="font-semibold">{favoritePredictions.length}</span></span>
            ) : (
              <span className="text-sm">Nincs kiválasztott kedvenc mérkőzés</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;