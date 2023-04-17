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

  const professionalRegister = async (data) => {
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
  };

  const recruiterRegister = async (data) => {
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
  };

  const professionalLogin = async (data) => {
    try {
      const response = await axios.post('/api/login-professional', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response; // เพิ่ม return ค่า response
    } catch (error) {
      console.error('Error:', error);
      throw error; // หากเกิด error ให้ throw error
    }
  };

  const recruiterLogin = async (data) => {
    try {
      const response = await axios.post('api/login-recruiter', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      return response; // เพิ่ม return ค่า response
    } catch (error) {
      console.error('Error:', error);
      throw error; // หากเกิด error ให้ throw error
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('token');
      setState({ ...state, user: null });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const isAuthenticated =
    typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));

  return (
    <AuthContext.Provider
      value={{
        state,
        professionalRegister,
        recruiterRegister,
        professionalLogin,
        recruiterLogin,
        logout,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
