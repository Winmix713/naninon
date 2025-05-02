import React from 'react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { Trophy, Bell, User, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b backdrop-blur-lg bg-transparent border-transparent py-5">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center transition-all duration-500 opacity-100 translate-y-0">
          <div className="mr-2 h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5">
            <div className="h-full w-full rounded-md bg-background flex items-center justify-center">
              <Trophy className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Win<span className="text-blue-400">Mix.hu</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 transition-all duration-500 delay-100 opacity-100 translate-y-0">
            <div className="px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors duration-200 flex items-center gap-2">
              <Trophy className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-white">0 Points</span>
            </div>
            <div className="px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors duration-200">
              <span className="text-xs font-medium text-white">0% Win Rate</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 transition-all duration-500 delay-200 opacity-100 translate-y-0">
            <button className="relative p-2 rounded-full bg-muted/50 hover:bg-muted/80 transition-colors duration-200">
              <Bell className="h-4 w-4 text-white" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500"></span>
            </button>
            
            {isAuthenticated ? (
              <button 
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors duration-200"
              >
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-medium text-white">{user?.username}</span>
                <ChevronDown className="h-3 w-3 text-white opacity-60" />
              </button>
            ) : (
              <button 
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 hover:bg-muted/80 transition-colors duration-200"
              >
                <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                  <User className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-medium text-white">Profile</span>
                <ChevronDown className="h-3 w-3 text-white opacity-60" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};

export default Header;