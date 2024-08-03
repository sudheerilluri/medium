import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text,Link as ChakraLink } from '@chakra-ui/react';
import { Navigate,Link as ReactRouterLink } from 'react-router-dom';


export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    const { data,error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      console.log(data);
      //const userinfo = JSON.parse(window.localStorage.getItem('sb-admaosiewryqhrhiokgx-auth-token'));
      console.log(data.user.email);
      setMessage('Registration successful. Please check your email to confirm.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md">
      <Heading mb={6}>Register</Heading>
      <FormControl id="email" mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleRegister}>
        Register
      </Button><div>If you are user <ChakraLink as={ReactRouterLink} to='/'>Login Here</ChakraLink></div>
      {message && <Text mt={4}>{message}</Text>}
    </Box>
  );
};
