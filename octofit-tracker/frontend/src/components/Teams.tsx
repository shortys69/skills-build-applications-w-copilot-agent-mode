import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Handle both paginated and non-paginated responses
        const teamsList = data.results || data;
        console.log('Teams data:', teamsList);
        setTeams(teamsList);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [apiEndpoint]);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team: any) => (
          <div key={team.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <small className="text-muted">Members: {team.member_count}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;