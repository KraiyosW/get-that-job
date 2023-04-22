import React from "react";
import { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseJWT = process.env.SUPABASE_JWT_SECRET;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString()
    document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; `
    document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; `
  } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
    document.cookie = `my-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; `
    document.cookie = `my-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; `
  }
})

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: true,
  });

  const professionalRegister = async (data) => {
    try {
      const response = await axios.post("/api/signup-professional", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Registration completed!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed.");
    }
  };

  const recruiterRegister = async (data) => {
    try {
      const response = await axios.post("/api/signup-recruiter", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Registration completed!");
    } catch (error) {
      console.error("Error:", error);
      alert("Registration failed.");
    }
  };

  const professionalLogin = async (data) => {
    try {
      let token = sessionStorage.getItem('sb:token') || localStorage.getItem('sb:token');
      if (!token) {
        const { data: session, error: refreshError } = await supabase.auth.refreshSession();
  
        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
  
        sessionStorage.setItem('sb:token', session.access_token);
        localStorage.setItem('sb:token', session.access_token);
        token = session.access_token;
      }
  
      console.log('token:', token);
  
      const headers = {
        "Content-Type": "application/json",
        // ตรวจสอบว่า token มีค่าหรือไม่ ถ้ามีให้เพิ่มใน header
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      };
  
      const response = await axios.post(
        "/api/login-professional",
        JSON.stringify(data),
        {
          headers,
          credentials: "include"
        }
      );
  
      console.log('headers:', response.headers);
      console.log('token:', token);
  
      if (response.headers && response.headers['set-cookie']) {
        const token = response.headers['set-cookie']
          .split('; ')
          .find(cookie => cookie.startsWith('sb:token='))
          .split('=')[1];
        console.log('token:', token);
        sessionStorage.setItem('sb:token', token);
        localStorage.setItem('sb:token', token);
      }
  
      if (response.data && response.data.user) {
        console.log(response.data.user);
      }
  
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  const recruiterLogin = async (data) => {
    try {
      let token = sessionStorage.getItem('sb:token') || localStorage.getItem('sb:token');
      if (!token) {
        const { data: session, error: refreshError } = await supabase.auth.refreshSession();
  
        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
  
        sessionStorage.setItem('sb:token', session.access_token);
        localStorage.setItem('sb:token', session.access_token);
        token = session.access_token;
      }
  
      console.log('token:', token);
  
      const headers = {
        "Content-Type": "application/json",
        // ตรวจสอบว่า token มีค่าหรือไม่ ถ้ามีให้เพิ่มใน header
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      };
  
      const response = await axios.post(
        "/api/login-recruiter",
        JSON.stringify(data),
        {
          headers,
          credentials: "include"
        }
      );
  
      console.log('headers:', response.headers);
      console.log('token:', token);
  
      if (response.headers && response.headers['set-cookie']) {
        const token = response.headers['set-cookie']
          .split('; ')
          .find(cookie => cookie.startsWith('sb:token='))
          .split('=')[1];
        console.log('token:', token);
        sessionStorage.setItem('sb:token', token);
        localStorage.setItem('sb:token', token);
      }
  
      if (response.data && response.data.user) {
        console.log(response.data.user);
      }
  
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  const logoutAuth = async () => {
    try {
      await axios.post("/api/logout");
      sessionStorage.removeItem("token");
      setState({ ...state, user: null });
      document.cookie = 'sb:token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite:true; Secure';
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const token =
    typeof window !== "undefined" ? window.sessionStorage.getItem("token") : "";
  const isAuthenticated = token !== "";

  return (
    <AuthContext.Provider
      value={{
        state,
        professionalRegister,
        recruiterRegister,
        professionalLogin,
        recruiterLogin,
        logoutAuth,
        isAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
