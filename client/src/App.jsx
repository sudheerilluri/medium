import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import { Register } from './Register';
import { Login } from './Login';
import Events from './Events.jsx';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <ChakraProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registor" element={<Register />} />
        <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
      </Routes>
    </Router>
    </ChakraProvider>
  );
}

export default App;
