import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  useColorMode,
  Box
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header'
import { Cases } from './components/Cases'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <ChakraProvider>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/cases" element={<Cases/>}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
