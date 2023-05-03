import { createClient } from '@supabase/supabase-js';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RecruiterPostContext = React.createContext({
  post: null,
  isLoading: false,
  isError: null,
  createPost: () => {},
  editJobPost:() => {}
});

export const useRecruiterPost = () => {
  const [post, setPost] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createPost = async (data, authToken) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let token =
        authToken?.access_token ||
        sessionStorage.getItem('sb:token') ||
        localStorage.getItem('sb:token') ||
        '';

      console.log('token', token);
      if (!token) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession({ refreshToken: authToken?.refresh_token });

        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
        sessionStorage.setItem('sb:token', session.access_token);
        localStorage.setItem('sb:token', session.access_token);
        console.log(session);
      }

      const headers = {
        'Content-Type': 'application/json',
        // ตรวจสอบว่า token มีค่าหรือไม่ ถ้ามีให้เพิ่มใน header
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await axios.post('/api/createPost-recruiter', JSON.stringify(data), {
        headers,
        credentials: 'include',
      });
      console.log(response.data);
      setPost(response.data);
      router.push('/job-postings')
    } catch (error) {
      console.error('Error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const editJobPost = async (data, authToken) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let token =
        authToken?.access_token ||
        sessionStorage.getItem('sb:token') ||
        localStorage.getItem('sb:token') ||
        '';
  
      console.log('token', token);
      if (!token) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession({ refreshToken: authToken?.refresh_token });
  
        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
        sessionStorage.setItem('sb:token', session.access_token);
        localStorage.setItem('sb:token', session.access_token);
        console.log(session);
      }
  
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
  
      const response = await axios.put('/api/edit-job-post-recruiter', JSON.stringify(data), {
        headers,
        credentials: 'include',
      });
      console.log(response.data);
      setPost(response.data);
      router.push('/job-postings')
    } catch (error) {
      console.error('Error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const editRecruiterProfile = async (data, authToken) => {
    setIsError(false);
    setIsLoading(true);
    try {
      let token =
        authToken?.access_token ||
        sessionStorage.getItem('sb:token') ||
        localStorage.getItem('sb:token') ||
        '';
  
      console.log('token', token);
      if (!token) {
        const { data: session, error: refreshError } =
          await supabase.auth.refreshSession({ refreshToken: authToken?.refresh_token });
  
        if (refreshError) {
          console.log(refreshError.message);
          return null;
        }
        sessionStorage.setItem('sb:token', session.access_token);
        localStorage.setItem('sb:token', session.access_token);
        console.log(session);
      }
  
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };
  
      const response = await axios.put('/api/edit-reqruiter-profile', JSON.stringify(data), {
        headers,
        credentials: 'include',
      });
      console.log(response.data);
      setPost(response.data);
      router.push('/job-postings')
    } catch (error) {
      console.error('Error:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return { createPost,editJobPost, editRecruiterProfile,post, isLoading, isError };
};

export const RecruiterPostProvider = ({ children }) => {
  const { createPost, post, isLoading, isError , editJobPost } = useRecruiterPost();
  const router = useRouter();
  const { id } = router.query;
  const value = { createPost, post, isLoading, isError, id };
  return <RecruiterPostContext.Provider value={value}>{children}</RecruiterPostContext.Provider>;
};

export const useRecruiterPostContext = () => useContext(RecruiterPostContext);
