import React from "react";
import { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: true,
    error: null,
    user: null,
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
      // Check if the user has an existing session
      const { data: session, error } = await supabase.auth.getSession();

      // If there is no session, refresh the session and store the new token in the cookie
      if (error || !session) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession();

        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }

        document.cookie = `sb:token=${session.access_token}; path=/; expires=${session.expires_at}; domain=.supabase.io; HttpOnly; SameSite=Lax`;
      }

      const response = await axios.post(
        "/api/login-professional",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // เพิ่ม options นี้
        }
      );

      console.log(response);

      if (response.data && response.data.user) {
        // เปลี่ยนจาก session เป็น user
        console.log(response.data.user);
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const recruiterLogin = async (data) => {
    try {
      // Check if the user has an existing session
      const { data: session, error } = await supabase.auth.getSession();

      // If there is no session, refresh the session and store the new token in the cookie
      if (error || !session) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession();

        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }

        document.cookie = `sb:token=${session.access_token}; path=/; expires=${session.expires_at}; domain=.supabase.io; HttpOnly; SameSite=Lax`;
      }

      const response = await axios.post(
        "/api/login-recruiter",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // เพิ่ม options นี้
        }
      );

      console.log(response);

      if (response.data && response.data.user) {
        // เปลี่ยนจาก session เป็น user
        console.log(response.data.user);
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  const logoutAuth = async () => {
    try {
      await axios.post("/api/logout");
      sessionStorage.removeItem("token");
      setState({ ...state, user: null });
      document.cookie =
        "sb:token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure";
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
