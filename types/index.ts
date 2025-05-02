export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  league: string;
}

export interface Match {
  homeTeam: Team | null;
  awayTeam: Team | null;
}

export interface HeadToHeadStats {
  home_wins: number;
  away_wins: number;
  draws: number;
  home_win_percentage: number;
}

export interface AverageGoals {
  average_home_goals: number;
  average_away_goals: number;
  average_total_goals: number;
}

export interface TeamAnalysis {
  matches_count: number;
  head_to_head_stats: HeadToHeadStats;
  average_goals: AverageGoals;
  both_teams_scored_percentage: number;
  home_form_index: number;
  away_form_index: number;
  predictionScore?: number;
}

export interface ModelPredictions {
  randomForest: string;
  poisson: {
    homeGoals: number;
    awayGoals: number;
  };
  elo: {
    homeWinProb: number;
  };
}

export interface PredictionData {
  homeExpectedGoals: number;
  awayExpectedGoals: number;
  modelPredictions: ModelPredictions;
}

export interface Prediction {
  match: Match;
  team_analysis: TeamAnalysis;
  prediction: PredictionData;
  teamAnalysis: TeamAnalysis;
}

export interface UserSettings {
  darkMode: boolean;
  language: string;
  notificationsEnabled: boolean;
}

export interface User {
  email: string;
  username: string;
}