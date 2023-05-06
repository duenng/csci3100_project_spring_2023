import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your authentication logic here.
    // For example, you can send the credentials to the backend for validation.
    // If the credentials are valid, redirect the admin to the Home page.
    console.log('Username:', username, 'Password:', password);

    // Redirect to the homepage
    navigate('/home');
  };

  return (
    <div className="admin-login">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
