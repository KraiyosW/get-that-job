import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

function AuthProvider(props) {   

  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
  });
  
  async function professionalRegister(email, password) {
    try {
      const response = await axios.post('/api/signup-professional', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      alert('Registration completed!');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed.');
    }
  }
  
  async function recruiterRegister(email, password) {
    try {
      const response = await axios.post('/api/signup-recruiter', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      alert('Registration completed!');
    } catch (error) {
      console.error('Error:', error);
      alert('Registration failed.');
    }
  }
  
  async function professionalLogin(email, password) {
    try {
      const { data } = await axios.post('/api/login-professional', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', data.access_token);
      alert('Login successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed.');
    }
  }

  async function recruiterLogin(email, password) {
    try {
      const { data } = await axios.post('/api/login-recruiter', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('token', data.access_token);
      alert('Login successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed.');
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setState({ ...state, user: null });
    navigate("/login");
  };

  const isAuthenticated = typeof window !== 'undefined' && Boolean(localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{ state, professionalRegister, recruiterRegister, professionalLogin, recruiterLogin, logout ,isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// this is a hook that consume AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
