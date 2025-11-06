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
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="component-header mb-0">Workouts</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Create Workout
        </button>
      </div>
      <div className="row">
        {workouts.map((workout: any) => (
          <div key={workout.id} className="col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                  <span className={`badge bg-${getDifficultyBadge(workout.difficulty)}`}>
                    {workout.difficulty}
                  </span>
                </div>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <div className="mt-3">
                  <span className="badge bg-secondary me-2">Duration: {workout.duration} min</span>
                  <span className="badge bg-info me-2">Calories: {workout.calories}</span>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-sm btn-success">
                    <i className="bi bi-play-circle me-2"></i>
                    Start Workout
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

// Helper function for difficulty badge colors
const getDifficultyBadge = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'beginner':
      return 'success';
    case 'intermediate':
      return 'warning';
    case 'advanced':
      return 'danger';
    default:
      return 'secondary';
  }
};

export default Workouts;