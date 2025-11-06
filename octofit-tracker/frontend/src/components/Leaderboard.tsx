import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Handle both paginated and non-paginated responses
        const leaderboardList = data.results || data;
        console.log('Leaderboard data:', leaderboardList);
        setLeaderboard(leaderboardList);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, [apiEndpoint]);

  return (
    <div className="container">
      <h2 className="component-header">Leaderboard</h2>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
              <th>Team</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry: any, index: number) => (
              <tr key={entry.id}>
                <td>
                  <span className="badge bg-primary">{index + 1}</span>
                </td>
                <td className="fw-bold">{entry.user_name}</td>
                <td>
                  <span className="badge bg-success">{entry.score} pts</span>
                </td>
                <td>{entry.team_name}</td>
                <td>
                  <div className="progress" style={{ height: '20px' }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${Math.min(entry.score/10, 100)}%` }}
                      aria-valuenow={entry.score}
                      aria-valuemin={0}
                      aria-valuemax={1000}
                    >
                      {entry.score}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;