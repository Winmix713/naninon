import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TIMER_DURATION } from '../constants';

interface TimerContextType {
  timeLeft: number;
  timerExpired: boolean;
}

const TimerContext = createContext<TimerContextType>({
  timeLeft: TIMER_DURATION,
  timerExpired: false,
});

export const useTimer = () => useContext(TimerContext);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(timer);
          setTimerExpired(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimerContext.Provider value={{ timeLeft, timerExpired }}>
      {children}
    </TimerContext.Provider>
  );
};