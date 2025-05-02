import React from 'react';
import { Prediction } from '../types';
import { useMatches } from '../context/MatchContext';

interface PredictionCardProps {
  prediction: Prediction;
  index: number;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, index }) => {
  const { toggleFavorite, isMatchFavorite } = useMatches();
  const isFavorite = isMatchFavorite(prediction);
  
  if (!prediction?.match?.homeTeam || !prediction?.match?.awayTeam || !prediction?.teamAnalysis) {
    return null;
  }
  
  const { match, teamAnalysis } = prediction;
  const { homeTeam, awayTeam } = match;
  const {
    matches_count,
    head_to_head_stats,
    average_goals,
    both_teams_scored_percentage,
    home_form_index,
    away_form_index,
    predictionScore
  } = teamAnalysis;
  
  return (
    <div 
      className={`prediction-card bg-[#1A1A1A]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-xl p-4 ${index < 3 ? 'ring-2 ring-[#CCFF00]' : ''}`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-center text-lg font-semibold">Premier League Head-to-Head</h3>
        <button 
          onClick={() => toggleFavorite(prediction)}
          className={`favorite-btn text-2xl ${isFavorite ? 'active' : ''}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <i className={`ri-star-${isFavorite ? 'fill' : 'line'}`}></i>
        </button>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-center">
          <img 
            src={homeTeam.logoUrl} 
            alt={homeTeam.name} 
            width="60" 
            height="60" 
            className="mx-auto mb-2 team-logo" 
            loading="lazy"
          />
          <span className="text-sm">{homeTeam.name}</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[#CCFF00]">{matches_count}</div>
          <div className="text-xs">Matches</div>
        </div>
        <div className="text-center">
          <img 
            src={awayTeam.logoUrl} 
            alt={awayTeam.name} 
            width="60" 
            height="60" 
            className="mx-auto mb-2 team-logo" 
            loading="lazy"
          />
          <span className="text-sm">{awayTeam.name}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center tooltip">
          <div className="text-xl font-bold">{head_to_head_stats.home_wins}</div>
          <div className="text-xs">Home Wins</div>
          <div className="text-sm">{(head_to_head_stats.home_wins / matches_count * 100).toFixed(1)}%</div>
          <span className="tooltiptext">Number of times the home team has won in their head-to-head matches</span>
        </div>
        <div className="text-center tooltip">
          <div className="text-xl font-bold">{head_to_head_stats.draws}</div>
          <div className="text-xs">Draws</div>
          <div className="text-sm">{(head_to_head_stats.draws / matches_count * 100).toFixed(1)}%</div>
          <span className="tooltiptext">Number of times these teams have drawn in their head-to-head matches</span>
        </div>
        <div className="text-center tooltip">
          <div className="text-xl font-bold">{head_to_head_stats.away_wins}</div>
          <div className="text-xs">Away Wins</div>
          <div className="text-sm">{(head_to_head_stats.away_wins / matches_count * 100).toFixed(1)}%</div>
          <span className="tooltiptext">Number of times the away team has won in their head-to-head matches</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <div className="tooltip">
            <div className="text-xs">Home</div>
            <div className="text-sm">{average_goals.average_home_goals}</div>
            <span className="tooltiptext">Average goals scored by the home team in their matches</span>
          </div>
          <div className="text-center tooltip">
            <div className="text-xs">Avg. Goals</div>
            <div className="text-xl font-bold text-[#CCFF00]">{average_goals.average_total_goals}</div>
            <span className="tooltiptext">Average total goals scored in matches involving these teams</span>
          </div>
          <div className="text-right tooltip">
            <div className="text-xs">Away</div>
            <div className="text-sm">{average_goals.average_away_goals}</div>
            <span className="tooltiptext">Average goals scored by the away team in their matches</span>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm tooltip">
            Both Teams Scored
            <span className="tooltiptext">Percentage of matches where both teams scored at least one goal</span>
          </span>
          <span className="text-sm">{both_teams_scored_percentage}%</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-[#CCFF00] h-2 rounded-full"
            style={{ width: `${both_teams_scored_percentage}%` }}
          ></div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center tooltip">
          <div className="text-xs">Home Form Index</div>
          <div className="text-lg font-bold text-[#CCFF00]">{home_form_index}%</div>
          <span className="tooltiptext">A measure of the home team's recent performance</span>
        </div>
        <div className="text-center tooltip">
          <div className="text-xs">Away Form Index</div>
          <div className="text-lg font-bold text-[#CCFF00]">{away_form_index}%</div>
          <span className="tooltiptext">A measure of the away team's recent performance</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-sm text-[#CCFF00]">
          Prediction Score: <span className="font-bold text-base">{predictionScore?.toFixed(2) ?? 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;