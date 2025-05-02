import React from 'react';
import { useTimer } from '../context/TimerContext';

const Timer: React.FC = () => {
  const { timeLeft } = useTimer();
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return (
    <div className="fixed top-4 right-4 bg-[#CCFF00] text-black px-4 py-2 rounded-md font-bold">
      {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
};

export default Timer;