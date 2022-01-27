import React, { useState } from 'react';
import {
  ChakraProvider,
  theme,
  Box
} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
