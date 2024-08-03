import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        // Redirect to the login page if no session is found
        navigate('/');
      }
    };

    checkSession();
  }, [navigate]);

  return children;
}

export default ProtectedRoute;
