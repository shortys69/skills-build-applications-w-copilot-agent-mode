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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="component-header mb-0">Teams</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          New Team
        </button>
      </div>
      <div className="row">
        {teams.map((team: any) => (
          <div key={team.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{team.name}</h5>
                  <span className="badge bg-info">{team.member_count} members</span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">{team.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm btn-outline-primary">
                    View Members
                  </button>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;