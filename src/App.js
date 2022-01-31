import React from 'react';
import {
  ChakraProvider, extendTheme, theme} from '@chakra-ui/react';
import { Header } from './components/Header'
import { Cases } from './components/Cases'
import { Privileges } from './components/Privileges'
import { Money } from './components/Money'
import { Home } from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bans } from './components/Bans';
import { mode } from "@chakra-ui/theme-tools"


function App() {

  const customTheme = extendTheme({
    ...theme,
    config: {
      initialColorMode: "dark",
      useSystemColorMode: false,
    },
    styles: {
      global: (props) => ({
        body: {
          bg: mode('#180036', '#180036')(props)
        }
      })
    }
  })

  return (
    <ChakraProvider resetCSS theme={customTheme}>
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
