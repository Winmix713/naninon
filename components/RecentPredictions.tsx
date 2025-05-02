import React from 'react';
import { useMatches } from '../context/MatchContext';

const RecentPredictions: React.FC = () => {
  const { recentPredictions } = useMatches();

  if (recentPredictions.length === 0) {
    return (
      <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Legutóbbi predikciók</h2>
        <p className="text-center py-10">Nincs még legutóbbi predikció. Futtass néhány predikciót!</p>
      </div>
    );
  }

  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Legutóbbi predikciók</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentPredictions.map((prediction, index) => {
          if (!prediction?.match?.homeTeam || !prediction?.match?.awayTeam || !prediction?.teamAnalysis) {
            return null;
          }

          return (
            <div key={index} className="bg-white/5 p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <img 
                  src={prediction.match.homeTeam.logoUrl} 
                  alt={`${prediction.match.homeTeam.name} Logo`} 
                  className="w-8 h-8"
                />
                <span className="text-lg font-semibold">vs</span>
                <img 
                  src={prediction.match.awayTeam.logoUrl} 
                  alt={`${prediction.match.awayTeam.name} Logo`} 
                  className="w-8 h-8"
                />
              </div>
              <p className="text-center">
                {prediction.match.homeTeam.name} vs {prediction.match.awayTeam.name}
              </p>
              <p className="text-center text-sm text-[#CCFF00]">
                Prediction Score: {prediction.teamAnalysis.predictionScore?.toFixed(2) ?? 'N/A'}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentPredictions;