import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Handle both paginated and non-paginated responses
        const activitiesList = data.results || data;
        console.log('Activities data:', activitiesList);
        setActivities(activitiesList);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, [apiEndpoint]);

  return (
    <div className="container">
      <h2 className="component-header">Activities</h2>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity: any) => (
              <tr key={activity.id}>
                <td className="fw-bold">{activity.name}</td>
                <td>{activity.description}</td>
                <td>{activity.duration} minutes</td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activities;