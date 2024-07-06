import React from 'react';
import { useLocation } from 'react-router-dom';
import Posts from './Posts';

const Dashboard = () => {
  const location = useLocation();
  const { userInfo } = location.state;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {userInfo.username}!</p>
      {/* Render additional user info if needed */}
      <Posts username={userInfo.username} />
    </div>
  );
};

export default Dashboard;
