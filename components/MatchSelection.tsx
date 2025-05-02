import React, { useState } from 'react';
import { useMatches } from '../context/MatchContext';
import { useTimer } from '../context/TimerContext';
import { TEAMS } from '../constants';

const MatchSelection: React.FC = () => {
  const { selectedMatches, isTeamSelected, handleTeamSelect, runPredictions, loading, error } = useMatches();
  const { timeLeft, timerExpired } = useTimer();
  const [searchTerm, setSearchTerm] = useState('');
  const [leagueFilter, setLeagueFilter] = useState('');

  const filteredTeams = TEAMS.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (leagueFilter === '' || team.league === leagueFilter)
  );

  const isPredictionDisabled = timerExpired || 
    !selectedMatches.some(match => match?.homeTeam && match?.awayTeam) ||
    loading;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Mérkőzések kiválasztása</h2>
      
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Keresés..."
          className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
        />
        <select
          value={leagueFilter}
          onChange={(e) => setLeagueFilter(e.target.value)}
          className="p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
        >
          <option value="">Minden liga</option>
          <option value="premier-league">Premier League</option>
          <option value="la-liga">La Liga</option>
          <option value="bundesliga">Bundesliga</option>
        </select>
      </div>
      
      {error && (
        <div className="mb-4 text-red-500 bg-red-500/10 p-3 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {selectedMatches.map((match, index) => (
          <div key={index} className="bg-white/5 p-4 rounded-xl">
            <div className="flex items-center mb-2">
              <select
                value={match.homeTeam?.id || ''}
                onChange={(e) => handleTeamSelect(index, 'homeTeam', e.target.value)}
                className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
                aria-label="Select home team"
              >
                <option value="">Válassz hazai csapatot</option>
                {filteredTeams.map(team => (
                  <option
                    key={team.id}
                    value={team.id}
                    disabled={isTeamSelected(team.id) && match.homeTeam?.id !== team.id}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
              {match.homeTeam && (
                <img
                  src={match.homeTeam.logoUrl}
                  alt={`${match.homeTeam.name} Logo`}
                  className="w-8 h-8 ml-2"
                />
              )}
            </div>
            
            <div className="flex items-center">
              <select
                value={match.awayTeam?.id || ''}
                onChange={(e) => handleTeamSelect(index, 'awayTeam', e.target.value)}
                className="w-full p-2 bg-[#141414] border border-[#CCFF00]/20 rounded-md text-white"
                aria-label="Select away team"
              >
                <option value="">Válassz vendég csapatot</option>
                {filteredTeams.map(team => (
                  <option
                    key={team.id}
                    value={team.id}
                    disabled={isTeamSelected(team.id) && match.awayTeam?.id !== team.id}
                  >
                    {team.name}
                  </option>
                ))}
              </select>
              {match.awayTeam && (
                <img
                  src={match.awayTeam.logoUrl}
                  alt={`${match.awayTeam.name} Logo`}
                  className="w-8 h-8 ml-2"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={runPredictions}
        disabled={isPredictionDisabled}
        className="w-full mt-6 py-3 bg-[#CCFF00] text-black font-bold rounded-md hover:bg-[#CCFF00]/90 transition-colors disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed run-predictions-btn"
        aria-label="Predikciók futtatása"
      >
        {loading ? 'Predikciók futtatása...' : 'Predikciók futtatása'}
      </button>
    </div>
  );
};

export default MatchSelection;