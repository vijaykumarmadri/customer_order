import React, { useState } from 'react';
import Login from './components/login';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLogin = (token, userId) => {
    setToken(token);
    setUserId(userId);
  };

  return (
    <div>
      {token ? (
        <AdminDashboard token={token} userId={userId} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
