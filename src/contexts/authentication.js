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
    email: null,
    isAuthenticated: false, // ป้องกันการเข้าถึงหากยังไม่ login
  });
  const [professionalState, setProfessionalState] = useState({
    loading: true,
    error: null,
    user: null,
    email: null,
    professionalId: null,
  });
  const [recruiterState, setRecruiterState] = useState({
    loading: true,
    error: null,
    user: null,
    email: null,
  });

  // const [professionalIdState, setProfessionalIdState] = useState("");

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
      const response = await axios.post(
        "/api/login-professional",
        JSON.stringify(data),
        {
          headers,
          withCredentials: true,
        }
      );
      const { data: professional, error: professionalError } = await supabase
        .from("professional")
        .select("*")
        .eq("email", response.data.user.user.email)
        .eq("role", "professional");

      if (professionalError) {
        console.log(professionalError);
        throw new Error(professionalError.message);
      }

      localStorage.setItem("professional_id", professional[0].professtional_id);
      localStorage.setItem("sb:token", response.data.token);
      localStorage.setItem("email", response.data.user.user.email);
      sessionStorage.setItem("professional_id", professional[0].professtional_id);
      sessionStorage.setItem("sb:token", response.data.token);
      sessionStorage.setItem("email", response.data.user.user.email);
      setProfessionalState({
        ...professionalState,
        user: response.data.user.user,
        email: response.data.user.user.email,
        professionalId: professional[0].professtional_id,
      });
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
      const response = await axios.post(
        "/api/login-recruiter",
        JSON.stringify(data),
        {
          headers,
          withCredentials: true,
        }
      );
      const { data: recruiters, error: recruitersError } = await supabase
        .from("recruiters")
        .select("*")
        .eq("email", response.data.user.user.email)
        .eq("role", "recruiter");

      if (recruitersError) {
        console.log(recruitersError);
        throw new Error(recruitersError.message);
      }
      localStorage.setItem("recruiter_id", recruiters[0].recruiter_id);
      localStorage.setItem("sb:token", response.data.token);
      localStorage.setItem("email", response.data.user.user.email);
      sessionStorage.setItem("recruiter_id", recruiters[0].recruiter_id);
      sessionStorage.setItem("sb:token", response.data.token);
      sessionStorage.setItem("email", response.data.user.user.email);
      setRecruiterState({
        ...recruiterState,
        user: response.data.user.user,
        email: response.data.user.user.email,
      });
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
      localStorage.removeItem("professional_id");
      localStorage.removeItem("recruiter_id");
      localStorage.removeItem("myState");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("recruiter_id");
      sessionStorage.removeItem("professional_id");
      setState({ ...state, user: null });
      setRecruiterState({ ...recruiterState, user: null, email: null });
      setProfessionalState({ ...professionalState, user: null, email: null });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let token = null;
  if (typeof globalThis !== "undefined" && globalThis.localStorage) {
    token = globalThis.localStorage.getItem("sb:token");
  }
  const isAuthenticated = token !== "";

  return (
    <AuthContext.Provider
      value={{
        state,
        professionalState,
        recruiterState,
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