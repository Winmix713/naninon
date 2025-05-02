import { Prediction } from '../types';

export const calculatePredictionScore = (data: any) => {
  const weights = {
    headToHead: 0.25,
    form: 0.20,
    expectedGoals: 0.20,
    modelPredictions: 0.35
  };

  let score = 0;

  // Head-to-head
  const homeWinPercentage = data.team_analysis.head_to_head_stats.home_win_percentage || 0;
  const headToHeadScore = homeWinPercentage / 100;
  score += headToHeadScore * weights.headToHead;

  // Form
  const homeFormIndex = data.team_analysis.home_form_index || 0;
  const awayFormIndex = data.team_analysis.away_form_index || 0;
  const formDifference = (homeFormIndex - awayFormIndex) / 100;
  const formScore = (formDifference + 1) / 2;  // Normalize to 0-1
  score += formScore * weights.form;

  // Expected goals
  const homeExpectedGoals = data.prediction.homeExpectedGoals || 0;
  const awayExpectedGoals = data.prediction.awayExpectedGoals || 0;
  const expectedGoalsDifference = homeExpectedGoals - awayExpectedGoals;
  const expectedGoalsScore = (expectedGoalsDifference + 4) / 8;  // Normalize to 0-1, assuming max difference of 4
  score += expectedGoalsScore * weights.expectedGoals;

  // Model predictions
  let modelScore = 0;
  if (data.prediction.modelPredictions.randomForest === "home_win") modelScore += 1;
  if (data.prediction.modelPredictions.poisson.homeGoals > data.prediction.modelPredictions.poisson.awayGoals) modelScore += 1;
  modelScore += data.prediction.modelPredictions.elo.homeWinProb;
  modelScore /= 3; // Average of the three model predictions
  score += modelScore * weights.modelPredictions;

  return score * 10; // Scale to 0-10
};

export const calculateAveragePredictionScore = (predictions: Prediction[]) => {
  if (predictions.length === 0) return 0;
  return predictions.reduce((sum, pred) => sum + (pred.teamAnalysis.predictionScore || 0), 0) / predictions.length;
};

export const calculateHomeWinPercentage = (predictions: Prediction[]) => {
  if (predictions.length === 0) return 0;
  const homeWins = predictions.filter(pred =>
    pred.teamAnalysis.head_to_head_stats.home_wins > pred.teamAnalysis.head_to_head_stats.away_wins
  ).length;
  return (homeWins / predictions.length) * 100;
};

export const calculateBTTSPercentage = (predictions: Prediction[]) => {
  if (predictions.length === 0) return 0;
  return predictions.reduce((sum, pred) => sum + (pred.teamAnalysis.both_teams_scored_percentage || 0), 0) / predictions.length;
};

export const calculateAverageGoals = (predictions: Prediction[]) => {
  if (predictions.length === 0) return '0';
  const totalGoals = predictions.reduce((sum, pred) => {
    const avgGoals = parseFloat(String(pred.teamAnalysis.average_goals.average_total_goals));
    return isNaN(avgGoals) ? sum : sum + avgGoals;
  }, 0);
  return (totalGoals / predictions.length).toFixed(2);
};

export const getMostCommonResult = (predictions: Prediction[]) => {
  if (predictions.length === 0) return 'N/A';
  const results = predictions.map(pred => {
    const homeWins = pred.teamAnalysis.head_to_head_stats.home_wins || 0;
    const awayWins = pred.teamAnalysis.head_to_head_stats.away_wins || 0;
    if (homeWins > awayWins) return 'Home Win';
    if (awayWins > homeWins) return 'Away Win';
    return 'Draw';
  });

  const resultCounts = results.reduce((counts: Record<string, number>, result) => {
    counts[result] = (counts[result] || 0) + 1;
    return counts;
  }, {});

  let mostCommon = null;
  let maxCount = 0;

  for (const result in resultCounts) {
    if (resultCounts[result] > maxCount) {
      mostCommon = result;
      maxCount = resultCounts[result];
    }
  }

  return mostCommon || 'N/A';
};

export const calculatePredictionScoreDistribution = (predictions: Prediction[]) => {
  const distribution = [0, 0, 0, 0, 0];
  predictions.forEach(pred => {
    const score = pred.teamAnalysis.predictionScore || 0;
    const index = Math.min(Math.floor(score / 2), 4);
    distribution[index]++;
  });
  return distribution;
};

export const calculateGoalsDistribution = (predictions: Prediction[]) => {
  const distribution = [0, 0, 0, 0, 0, 0];
  predictions.forEach(pred => {
    const goals = pred.teamAnalysis.average_goals.average_total_goals || 0;
    const index = Math.min(Math.floor(goals), 5);
    distribution[index]++;
  });
  return distribution;
};

export const calculateFormIndexTrend = (type: string) => {
  // Mock function that simulates form index trend data
  return Array(5).fill(0).map(() => Math.random() * 100);
};

export const calculateResultDistribution = (predictions: Prediction[]) => {
  const distribution = [0, 0, 0];
  predictions.forEach(pred => {
    const stats = pred.teamAnalysis.head_to_head_stats;
    if (stats.home_wins > stats.away_wins) distribution[0]++;
    else if (stats.home_wins < stats.away_wins) distribution[2]++;
    else distribution[1]++;
  });
  return distribution;
};