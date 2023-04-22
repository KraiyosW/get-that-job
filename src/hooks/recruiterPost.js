import React, { useState } from 'react';
import axios from 'axios';

export const useRecruiterPost = () => {
  const [post, setPost] = useState(null);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  
  const createPost = async (data) => {
    setIsError(false);
    setIsLoading(true);
    try {
      const response = await axios.post('/api/createPost-recruiter', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      alert('Create Job Post successfully');
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