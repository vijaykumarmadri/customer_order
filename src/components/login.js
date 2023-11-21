import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://stg.dhunjam.in/account/admin/login', {
        username: 'DJ@4',
        password: 'Dhunjam@2023',
      });

      if (response.data.status === 200) {
        onLogin(response.data.data.token, response.data.data.id);
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='d-grid justify-content-center align-items-center'>
      <h1 style={{color:"white"}}>Venue Admin Login</h1>
      <label>
        
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username:'/>
      </label>
      <label>
        
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password::'/>
      </label>
      <button onClick={handleLogin}className='btn-sign'>Sign in</button>
    </div>
  );
};

export default Login;
