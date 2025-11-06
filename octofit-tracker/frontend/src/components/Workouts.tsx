import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Handle both paginated and non-paginated responses
        const workoutsList = data.results || data;
        console.log('Workouts data:', workoutsList);
        setWorkouts(workoutsList);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [apiEndpoint]);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <div className="list-group">
        {workouts.map((workout: any) => (
          <div key={workout.id} className="list-group-item">
            <h5 className="mb-1">{workout.name}</h5>
            <p className="mb-1">{workout.description}</p>
            <small>Difficulty: {workout.difficulty}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;