import React, { useEffect } from 'react';
import { useMatches } from '../context/MatchContext';
import {
  calculateAveragePredictionScore,
  calculateHomeWinPercentage,
  calculateBTTSPercentage,
  calculatePredictionScoreDistribution,
  calculateGoalsDistribution,
  calculateFormIndexTrend,
  calculateResultDistribution,
  calculateAverageGoals,
  getMostCommonResult
} from '../utils/predictionUtils';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface StatisticsProps {
  useFavorites?: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ useFavorites = false }) => {
  const { predictions, favoritePredictions } = useMatches();
  const dataSource = useFavorites ? favoritePredictions : predictions;
  
  useEffect(() => {
    // Initialize charts
    const charts: Record<string, Chart> = {};
    
    // Only render if we have predictions
    if (dataSource.length > 0) {
      // Prediction Score Distribution Chart
      const predScoreCtx = document.getElementById('predictionScoreDistribution') as HTMLCanvasElement;
      if (predScoreCtx) {
        if (charts.predictionScore) {
          charts.predictionScore.destroy();
        }
        
        charts.predictionScore = new Chart(predScoreCtx, {
          type: 'bar',
          data: {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            datasets: [{
              label: 'Prediction Score Distribution',
              data: calculatePredictionScoreDistribution(dataSource),
              backgroundColor: '#CCFF00',
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: 'white'
                }
              },
              title: {
                display: true,
                text: 'Prediction Score Distribution',
                color: 'white'
              }
            },
            scales: {
              x: {
                ticks: { color: 'white' }
              },
              y: {
                ticks: { color: 'white' }
              }
            }
          }
        });
        
        // Goals Distribution Chart
        const goalsCtx = document.getElementById('goalsDistribution') as HTMLCanvasElement;
        if (goalsCtx) {
          if (charts.goals) {
            charts.goals.destroy();
          }
          
          charts.goals = new Chart(goalsCtx, {
            type: 'line',
            data: {
              labels: ['0', '1', '2', '3', '4', '5+'],
              datasets: [{
                label: 'Goals Distribution',
                data: calculateGoalsDistribution(dataSource),
                borderColor: '#CCFF00',
                tension: 0.1,
                fill: false
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'white'
                  }
                },
                title: {
                  display: true,
                  text: 'Goals Distribution',
                  color: 'white'
                }
              },
              scales: {
                x: {
                  ticks: { color: 'white' }
                },
                y: {
                  ticks: { color: 'white' }
                }
              }
            }
          });
        }
        
        // Form Index Trend Chart
        const formCtx = document.getElementById('formIndexTrend') as HTMLCanvasElement;
        if (formCtx) {
          if (charts.form) {
            charts.form.destroy();
          }
          
          charts.form = new Chart(formCtx, {
            type: 'line',
            data: {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
              datasets: [{
                label: 'Home Form Index',
                data: calculateFormIndexTrend('home'),
                borderColor: '#CCFF00',
                tension: 0.1,
                fill: false
              }, {
                label: 'Away Form Index',
                data: calculateFormIndexTrend('away'),
                borderColor: '#FF00CC',
                tension: 0.1,
                fill: false
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'white'
                  }
                },
                title: {
                  display: true,
                  text: 'Form Index Trend',
                  color: 'white'
                }
              },
              scales: {
                x: {
                  ticks: { color: 'white' }
                },
                y: {
                  ticks: { color: 'white' }
                }
              }
            }
          });
        }
        
        // Result Distribution Chart
        const resultCtx = document.getElementById('resultDistribution') as HTMLCanvasElement;
        if (resultCtx) {
          if (charts.result) {
            charts.result.destroy();
          }
          
          charts.result = new Chart(resultCtx, {
            type: 'pie',
            data: {
              labels: ['Home Win', 'Draw', 'Away Win'],
              datasets: [{
                label: 'Result Distribution',
                data: calculateResultDistribution(dataSource),
                backgroundColor: ['#CCFF00', '#FFCC00', '#FF00CC']
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                  labels: {
                    color: 'white'
                  }
                },
                title: {
                  display: true,
                  text: 'Result Distribution',
                  color: 'white'
                }
              }
            }
          });
        }
      }
    }
    
    return () => {
      // Cleanup charts on unmount
      Object.values(charts).forEach(chart => chart.destroy());
    };
  }, [dataSource]);
  
  if (dataSource.length === 0) {
    return (
      <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">
          {useFavorites ? 'Kedvenc Statisztikák' : 'Részletes Statisztikák'}
        </h2>
        <p className="text-center py-10">
          Nincs elég adat a statisztikák megjelenítéséhez. {useFavorites ? 'Kedvenceld a predikciókat.' : 'Futtass predikciókat!'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-[#141414]/50 backdrop-blur-md border border-[#CCFF00]/20 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">
        {useFavorites ? 'Kedvenc Statisztikák' : 'Részletes Statisztikák'}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Összes predikció</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{dataSource.length}</p>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Átlagos gólszám</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{calculateAverageGoals(dataSource)}</p>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Leggyakoribb eredmény</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{getMostCommonResult(dataSource)}</p>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Átlagos predikciós pontszám</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{calculateAveragePredictionScore(dataSource).toFixed(2)}</p>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Hazai győzelmek aránya</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{calculateHomeWinPercentage(dataSource).toFixed(2)}%</p>
        </div>
        <div className="bg-[#1A1A1A]/50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Mindkét csapat gólját %</h3>
          <p className="text-3xl font-bold text-[#CCFF00]">{calculateBTTSPercentage(dataSource).toFixed(2)}%</p>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-xl font-semibold mb-4">Predikciós pontszámok eloszlása</h3>
          <canvas id="predictionScoreDistribution"></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Gólok eloszlása</h3>
          <canvas id="goalsDistribution"></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Forma index trend</h3>
          <canvas id="formIndexTrend"></canvas>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Eredmények megoszlása</h3>
          <canvas id="resultDistribution"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Statistics;