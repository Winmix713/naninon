import React, { useState } from 'react';
import { useMatches } from '../context/MatchContext';
import PredictionCard from './PredictionCard';

const PredictionResults: React.FC = () => {
  const { predictions } = useMatches();
  const [sortBy, setSortBy] = useState<string>('predictionScore');
  const [algorithm, setAlgorithm] = useState<string>('default');
  
  if (predictions.length === 0) {
    return null;
  }
  
  const getSortedPredictions = () => {
    return [...predictions].sort((a, b) => {
      if (sortBy === 'matchName') {
        const nameA = `${a.match.homeTeam?.name} vs ${a.match.awayTeam?.name}`.toLowerCase();
        const nameB = `${b.match.homeTeam?.name} vs ${b.match.awayTeam?.name}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'predictionScore') {
        return (b.teamAnalysis.predictionScore || 0) - (a.teamAnalysis.predictionScore || 0);
      }
      if (sortBy === 'averageGoals') {
        return (b.teamAnalysis.average_goals.average_total_goals || 0) - (a.teamAnalysis.average_goals.average_total_goals || 0);
      }
      if (sortBy === 'btts') {
        return (b.teamAnalysis.both_teams_scored_percentage || 0) - (a.teamAnalysis.both_teams_scored_percentage || 0);
      }
      return 0;
    });
  };

  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Predikciók eredménye</h2>
      
      <div className="mb-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="w-full lg:w-auto">
          <label htmlFor="sortPredictions" className="mr-2 text-white/70">Rendezés:</label>
          <select
            id="sortPredictions"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white p-2 w-full lg:w-auto"
          >
            <option value="predictionScore">Predikciós pontszám</option>
            <option value="averageGoals">Átlagos gólszám</option>
            <option value="btts">Mindkét csapat gólját</option>
            <option value="matchName">Mérkőzés neve</option>
          </select>
        </div>
        
        <div className="w-full lg:w-auto">
          <label htmlFor="predictionAlgorithm" className="mr-2 text-white/70">Predikciós algoritmus:</label>
          <select
            id="predictionAlgorithm"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white p-2 w-full lg:w-auto"
          >
            <option value="default">Alapértelmezett</option>
            <option value="attackDefense">Támadó-védő erősségek</option>
            <option value="seasonalTrends">Szezonális trendek</option>
            <option value="machineLearning">Gépi tanulás</option>
          </select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {getSortedPredictions().map((prediction, index) => (
          <PredictionCard 
            key={`${prediction.match.homeTeam?.id}-${prediction.match.awayTeam?.id}`} 
            prediction={prediction} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default PredictionResults;