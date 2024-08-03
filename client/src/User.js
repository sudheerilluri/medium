import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Button, Box, Text } from '@chakra-ui/react';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md">
      {user ? (
        <>
          <Text>Welcome, {user.email}</Text>
          <Button colorScheme="teal" onClick={handleLogout} mt={4}>
            Logout
          </Button>
        </>
      ) : (
        <Text>You are not logged in.</Text>
      )}
    </Box>
  );
};

export default Account;
