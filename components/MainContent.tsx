import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import MatchSelection from './MatchSelection';
import PredictionResults from './PredictionResults';
import Statistics from './Statistics';
import RecentPredictions from './RecentPredictions';
import Settings from './Settings';
import { useMatches } from '../context/MatchContext';

const MainContent: React.FC = () => {
  const { activeSection } = useNavigation();
  const { predictions } = useMatches();
  
  return (
    <main className="container mx-auto px-4 py-8 flex-grow">
      {activeSection === 'home' && (
        <>
          <MatchSelection />
          {predictions.length > 0 && <PredictionResults />}
        </>
      )}
      
      {activeSection === 'statistics' && <Statistics />}
      
      {activeSection === 'favorites' && <Statistics useFavorites={true} />}
      
      {activeSection === 'recent' && <RecentPredictions />}
      
      {activeSection === 'settings' && <Settings />}
    </main>
  );
};

export default MainContent;