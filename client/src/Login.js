import React, { useState } from 'react';
import { supabase } from './supabaseClient';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text,Link as ChakraLink } from '@chakra-ui/react';
import { useNavigate ,Link as ReactRouterLink } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data: { session },error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      try {
        let jdata = JSON.stringify({
          userid: session.user.id,
          emailaddress:session.user.email
        });
        await axios.post('http://localhost:5000/add-user',jdata,{headers:
          {"Content-Type" : "application/json"}});
        navigate('/events');
      } catch (error) {
        console.log(error);
      };
      setMessage('Login successful!');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} boxShadow="lg" borderRadius="md">
      <Heading mb={6}>Login</Heading>
      <FormControl id="email" mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleLogin}>
        Login
      </Button>
      {message && <Text mt={4} color='tomato'>{message}</Text>}
      <div>if new user <ChakraLink as={ReactRouterLink} to='/registor' color='blueviolet'>Register Here</ChakraLink></div>
    </Box>
  );
};
