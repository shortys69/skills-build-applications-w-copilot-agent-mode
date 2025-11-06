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
    <div className="container mt-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity: any) => (
          <div key={activity.id} className="list-group-item">
            <h5 className="mb-1">{activity.name}</h5>
            <p className="mb-1">{activity.description}</p>
            <small>Duration: {activity.duration} minutes</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;