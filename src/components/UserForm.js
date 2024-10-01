 
import React, { useState, useEffect } from 'react';
import './UserList.css'; 

const UserForm = ({ user, onSave }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
 
  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email, phone: user.phone });
    }
  }, [user]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;

