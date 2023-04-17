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
  
  const  professionalRegister = async(data) => {
    try {
      const response = await axios.post('/api/signup-professional', data, {
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
  
  const  recruiterRegister = async(data) => {
    try {
      const response = await axios.post('/api/signup-recruiter', data, {
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
  
  const  professionalLogin = async(data) => {
    try {
      const response = await axios.post('api/login-professional', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      alert('Login completed!');
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed.');
    }
  }

  const  recruiterLogin = async(data) => {
    try {
      const response = await axios.post('api/login-recruiter', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      alert('Login completed!');
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
