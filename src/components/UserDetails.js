import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetails.css'; 

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => setError(error));
  }, [id]);

  if (error) {
    return <p>Error fetching user details: {error.message}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>
        <span>Name:</span> {user.name}
      </p>
      <p>
        <span>Email:</span> {user.email}
      </p>
      <p>
        <span>Phone:</span> {user.phone}
      </p>
      <p>
        <span>Website:</span> {user.website}
      </p>
      <p>
        <span>Address:</span> {user.address.street}, {user.address.city}, {user.address.zipcode}
      </p>
      <p>
        <span>Company:</span> {user.company.name}
      </p>

      <Link to="/">
        <button className="back-button">Back to User List</button>
      </Link>
    </div>
  );
};

export default UserDetails;

