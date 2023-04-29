import React from "react";
import { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT" || event === "USER_DELETED") {
    // delete cookies on sign out
    const expires = new Date(0).toUTCString();
    document.cookie = `my-access-token=; path=/token; expires=${expires}; SameSite=Lax; `;
    document.cookie = `my-refresh-token=; path=/token; expires=${expires}; SameSite=Lax; `;
  } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
    const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
    document.cookie = `my-access-token=${session.access_token}; path=/token; max-age=${maxAge}; SameSite=Lax; `;
    document.cookie = `my-refresh-token=${session.refresh_token}; path=/token; max-age=${maxAge}; SameSite=Lax; `;
  }
});

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
    email: null 
  });
  const [recruiterState, setRecruiterState] = useState({
    loading: true,
    error: null,
    user: null,
    email: null 
  });

  const professionalRegister = async (data) => {
    try {
      const response = await axios.post("/api/signup-professional", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const professionalLogin = async (data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post('/api/login-professional', JSON.stringify(data), {
        headers,
        withCredentials: true,
      });
      localStorage.setItem('sb:token',response.data.token);
      localStorage.setItem('email',response.data.user.user.email)
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const recruiterLogin = async (data) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post('/api/login-recruiter', JSON.stringify(data), {
        headers,
        withCredentials: true,
      });
      localStorage.setItem('sb:token', response.data.token);
      localStorage.setItem('email',response.data.user.user.email)
      setRecruiterState({...recruiterState , user : response.data.user.user , email : response.data.user.user.email});
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const logoutAuth = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("sb:token");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      sessionStorage.removeItem("sb:token");
      setState({ ...state, user: null });
      setRecruiterState({ ...recruiterState, user: null , email: null });
      setProfessionalState({ ...professionalState, user: null , email: null });
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
        recruiterState,
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