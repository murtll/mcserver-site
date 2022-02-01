import React from 'react';
import {
  ChakraProvider, extendTheme, theme} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mode } from "@chakra-ui/theme-tools"

import { Bans } from './components/Bans';
import { Header } from './components/Header'
import { Cases } from './components/Cases'
import { Privileges } from './components/Privileges'
import { Money } from './components/Money'
import { Home } from './components/Home'
import { Footer } from './components/Footer'

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

  console.log(theme)

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
      <Footer />
    </ChakraProvider>
  );
}

export default App;
