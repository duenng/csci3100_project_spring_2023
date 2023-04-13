import React, { useState } from 'react';

const NewUserForm = ({ user, onUserDetailsSubmit }) => {
  const [userId, setUserId] = useState('');
  const [tag, setTag] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserDetailsSubmit(userId, tag);
  };

  return (
    <div className="new-user-form">
      <h2>Welcome, {user?.displayName || 'User'}</h2>
      <p>Please fill in your user ID and tag:</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <label htmlFor="tag">Tag:</label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUserForm;
