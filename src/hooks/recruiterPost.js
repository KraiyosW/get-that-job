import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const RecruiterPostContext = React.createContext({
  post: null,
  isLoading: false,
  isError: null,
  createPost: () => {},
});

export const useRecruiterPost = () => {
  const [post, setPost] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const createPost = async ( data ,authToken) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let token =
      authToken?.access_token ||
      sessionStorage.getItem("sb-zsvpcibqzkxoqqpektgc-auth-token") ||
      localStorage.getItem("sb-zsvpcibqzkxoqqpektgc-auth-token") ||
      "";
  
      console.log('token',token);
      if (!token) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession({ refreshToken: authToken?.refresh_token });
      
  
      if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
        sessionStorage.setItem("sb-zsvpcibqzkxoqqpektgc-auth-token", session.access_token);
        localStorage.setItem("sb-zsvpcibqzkxoqqpektgc-auth-token", session.access_token);
        console.log(session);
      }
      
  
      const headers = {
        "Content-Type": "application/json",
        // ตรวจสอบว่า token มีค่าหรือไม่ ถ้ามีให้เพิ่มใน header
        ...(token ? { 'authorization': `Bearer ${token}` } : {}),
      };
  
     

      const response = await axios.post("/api/createPost-recruiter/", JSON.stringify(data), {
        headers: {
          'Authorization': `Bearer ${authToken.access_token}`
        },
        credentials: "include"
      });
      console.log(response.data);
      alert('Create Job Post successfully');
      setPost(response.data);
    
   } catch (error) {
      console.error('Error:', error);
      setIsError(true);
      alert(`Failed to create job post: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { createPost, post, isLoading, isError };
};

export const RecruiterPostProvider = ({ children }) => {
  const { createPost, post, isLoading, isError } = useRecruiterPost();
  const router = useRouter();
  const { id } = router.query;
  const value = { createPost, post, isLoading, isError, id };
  return <RecruiterPostContext.Provider value={value}>{children}</RecruiterPostContext.Provider>;
};

export const useRecruiterPostContext = () => useContext(RecruiterPostContext);