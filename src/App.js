import React from 'react';
import {
  ChakraProvider} from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Header } from './components/Header'
import { Cases } from './components/Cases'
import { Privileges } from './components/Privileges'
import { Money } from './components/Money'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bans } from './components/Bans';

function App() {

  return (
    <ChakraProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/cases" element={<Cases/>}></Route>
          <Route path="/privileges" element={<Privileges/>}></Route>
          <Route path="/money" element={<Money/>}></Route>
          <Route path="/bans" element={<Bans/>}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
