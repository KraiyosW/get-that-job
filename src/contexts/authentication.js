import React from "react";
import { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseJWT = process.env.SUPABASE_JWT_SECRET;

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
    email : null
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
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post('/api/login-professional', JSON.stringify(data), {
        headers,
        withCredentials: true,
      });
      localStorage.setItem('sb:token',response.data.token);
      setState({...setState, user : response.data.user.user , email : response.data.user.user.email })
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
      localStorage.setItem('sb:token',response.data.token);
      console.log(response);
      setState({...setState, user : response.data.user.user , email : response.data.user.user.email })
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
      sessionStorage.removeItem("sb:token");
      setState({ ...state, user: null });
      document.cookie =
        "sb:token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite:true; Secure";
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
