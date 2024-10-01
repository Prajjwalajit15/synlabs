 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import './UserList.css'; 

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);  
  const [userBeingEdited, setUserBeingEdited] = useState(null);  

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => setError(error));
  }, []);

   
  const handleDelete = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setUsers(users.filter(user => user.id !== id)); 
        } else {
          throw new Error('Failed to delete user');
        }
      })
      .catch(error => alert('Error deleting user: ' + error.message));
  };
 
  const handleEdit = (user) => {
    setEditingUserId(user.id);  
    setUserBeingEdited(user);  
  };
 
  const handleSave = (updatedData) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${editingUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),  
    })
      .then(response => response.json())
      .then(updatedUser => { 
        setUsers(users.map(user => (user.id === editingUserId ? updatedUser : user)));
        setEditingUserId(null);  
        setUserBeingEdited(null); 
      })
      .catch(error => alert('Error updating user: ' + error.message));
  };

  return (
    <div className="user-list-container">
      {error ? (
        <p>Error fetching users: {error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  {editingUserId === user.id ? (
                    <UserForm user={userBeingEdited} onSave={handleSave} />  
                  ) : (
                    <>
                      <Link to={`/users/${user.id}`}>
                        <button>View Details</button>
                      </Link>
                      <button className="edit-button" onClick={() => handleEdit(user)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
