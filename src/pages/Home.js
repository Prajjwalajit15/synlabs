 
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to User Management</h1>
      <p>This application allows you to create, view, edit, and delete users.</p>
      <Link to="/users">
        <button>Go to User List</button>
      </Link>
    </div>
  );
};

export default Home;
