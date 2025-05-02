import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Match, Team, Prediction } from '../types';
import { MATCH_SLOTS, FAVORITE_PREDICTIONS_KEY, TEAMS } from '../constants';
import { safeLocalStorage } from '../utils/localStorageUtils';
import { calculatePredictionScore } from '../utils/predictionUtils';

interface MatchContextType {
  selectedMatches: Match[];
  predictions: Prediction[];
  favoritePredictions: Prediction[];
  recentPredictions: Prediction[];
  isTeamSelected: (teamId: string) => boolean;
  handleTeamSelect: (index: number, position: 'homeTeam' | 'awayTeam', teamId: string) => void;
  runPredictions: () => Promise<void>;
  toggleFavorite: (prediction: Prediction) => void;
  isMatchFavorite: (prediction: Prediction) => boolean;
  loading: boolean;
  error: string | null;
}

const MatchContext = createContext<MatchContextType>({
  selectedMatches: [],
  predictions: [],
  favoritePredictions: [],
  recentPredictions: [],
  isTeamSelected: () => false,
  handleTeamSelect: () => {},
  runPredictions: async () => {},
  toggleFavorite: () => {},
  isMatchFavorite: () => false,
  loading: false,
  error: null,
});

export const useMatches = () => useContext(MatchContext);

interface MatchProviderProps {
  children: ReactNode;
}

export const MatchProvider = ({ children }: MatchProviderProps) => {
  const [selectedMatches, setSelectedMatches] = useState<Match[]>(
    Array(MATCH_SLOTS).fill(null).map(() => ({ homeTeam: null, awayTeam: null }))
  );
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [favoritePredictions, setFavoritePredictions] = useState<Prediction[]>([]);
  const [recentPredictions, setRecentPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load favorite predictions from localStorage
  useEffect(() => {
    const savedFavorites = safeLocalStorage('get', FAVORITE_PREDICTIONS_KEY);
    if (savedFavorites) {
      try {
        setFavoritePredictions(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Failed to parse favorite predictions:', error);
      }
    }

    const savedRecent = safeLocalStorage('get', 'recentPredictions');
    if (savedRecent) {
      try {
        setRecentPredictions(JSON.parse(savedRecent));
      } catch (error) {
        console.error('Failed to parse recent predictions:', error);
      }
    }
  }, []);

  const isTeamSelected = (teamId: string) => {
    return selectedMatches.some(match =>
      (match?.homeTeam?.id === teamId) || (match?.awayTeam?.id === teamId)
    );
  };

  const handleTeamSelect = (index: number, position: 'homeTeam' | 'awayTeam', teamId: string) => {
    const team = TEAMS.find(t => t.id === teamId);
    
    const updatedMatches = [...selectedMatches];
    updatedMatches[index] = {
      ...updatedMatches[index],
      [position]: teamId ? team || null : null
    };
    
    setSelectedMatches(updatedMatches);
  };

  const runPredictions = async () => {
    const validMatches = selectedMatches.filter(match => match?.homeTeam && match?.awayTeam);

    if (validMatches.length === 0) {
      setError('Please select at least one complete match!');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mock API calls for now
      const newPredictions = await Promise.all(
        validMatches.map(async (match) => {
          // In a real app, you would fetch from an actual API
          // For now, we'll generate mock prediction data
          const mockData = generateMockPredictionData(match);
          const predictionScore = calculatePredictionScore(mockData);
          return {
            ...mockData,
            match,
            teamAnalysis: {
              ...mockData.team_analysis,
              predictionScore
            }
          };
        })
      );

      setPredictions(newPredictions);
      
      // Save to recent predictions
      const updatedRecent = [...newPredictions, ...recentPredictions].slice(0, 5);
      setRecentPredictions(updatedRecent);
      safeLocalStorage('set', 'recentPredictions', JSON.stringify(updatedRecent));
      
    } catch (err) {
      setError('Error running predictions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (prediction: Prediction) => {
    const index = favoritePredictions.findIndex(fav => 
      fav.match.homeTeam?.id === prediction.match.homeTeam?.id && 
      fav.match.awayTeam?.id === prediction.match.awayTeam?.id
    );

    let updatedFavorites: Prediction[];
    
    if (index === -1) {
      updatedFavorites = [...favoritePredictions, prediction];
    } else {
      updatedFavorites = [...favoritePredictions];
      updatedFavorites.splice(index, 1);
    }
    
    setFavoritePredictions(updatedFavorites);
    safeLocalStorage('set', FAVORITE_PREDICTIONS_KEY, JSON.stringify(updatedFavorites));
  };

  const isMatchFavorite = (prediction: Prediction) => {
    return favoritePredictions.some(fav => 
      fav.match.homeTeam?.id === prediction.match.homeTeam?.id && 
      fav.match.awayTeam?.id === prediction.match.awayTeam?.id
    );
  };

  return (
    <MatchContext.Provider 
      value={{
        selectedMatches,
        predictions,
        favoritePredictions,
        recentPredictions,
        isTeamSelected,
        handleTeamSelect,
        runPredictions,
        toggleFavorite,
        isMatchFavorite,
        loading,
        error
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

// Helper function to generate mock prediction data
function generateMockPredictionData(match: Match) {
  const homeTeam = match.homeTeam!;
  const awayTeam = match.awayTeam!;
  
  const homeWins = Math.floor(Math.random() * 10) + 1;
  const draws = Math.floor(Math.random() * 5) + 1;
  const awayWins = Math.floor(Math.random() * 7) + 1;
  const matchesCount = homeWins + draws + awayWins;
  
  return {
    team_analysis: {
      matches_count: matchesCount,
      head_to_head_stats: {
        home_wins: homeWins,
        away_wins: awayWins,
        draws: draws,
        home_win_percentage: (homeWins / matchesCount) * 100
      },
      average_goals: {
        average_home_goals: (Math.random() * 2 + 0.5).toFixed(2),
        average_away_goals: (Math.random() * 2 + 0.5).toFixed(2),
        average_total_goals: (Math.random() * 4 + 1).toFixed(2)
      },
      both_teams_scored_percentage: Math.floor(Math.random() * 80) + 20,
      home_form_index: Math.floor(Math.random() * 100),
      away_form_index: Math.floor(Math.random() * 100)
    },
    prediction: {
      homeExpectedGoals: Math.random() * 3,
      awayExpectedGoals: Math.random() * 3,
      modelPredictions: {
        randomForest: Math.random() > 0.5 ? "home_win" : "away_win",
        poisson: {
          homeGoals: Math.random() * 3,
          awayGoals: Math.random() * 3
        },
        elo: {
          homeWinProb: Math.random()
        }
      }
    }
  };
}