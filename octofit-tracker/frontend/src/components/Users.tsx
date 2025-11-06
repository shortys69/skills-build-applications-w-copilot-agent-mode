import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        
        // Handle both paginated and non-paginated responses
        const usersList = data.results || data;
        console.log('Users data:', usersList);
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [apiEndpoint]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="component-header mb-0">Users</h2>
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>
          Add User
        </button>
      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Team</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle bg-light p-2 me-2">
                      <i className="bi bi-person"></i>
                    </div>
                    <span className="fw-bold">{user.username}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className="badge bg-info">{user.team_name}</span>
                </td>
                <td>
                  <span className="badge bg-success">Active</span>
                </td>
                <td>
                  <button className="btn btn-sm btn-outline-primary me-2">
                    Edit
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;