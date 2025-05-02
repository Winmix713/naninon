import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    const success = login(email, password);
    
    if (success) {
      setEmail('');
      setPassword('');
      setError('');
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-[#141414] border border-[#CCFF00]/20 rounded-2xl p-6 max-w-md w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#CCFF00]">Bejelentkezés</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 bg-[#1A1A1A] border border-[#CCFF00]/20 rounded-md text-white focus:outline-none focus:border-[#CCFF00]/50"
              placeholder="Email címed"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-[#1A1A1A] border border-[#CCFF00]/20 rounded-md text-white focus:outline-none focus:border-[#CCFF00]/50"
              placeholder="Jelszavad"
            />
          </div>
          
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;