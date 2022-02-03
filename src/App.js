import React from 'react';
import {
  ChakraProvider, extendTheme, theme} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mode } from "@chakra-ui/theme-tools"

import { Header } from './components/Header'
import { Home } from './components/Home'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/AdminPanel'
import { CategoryPage } from './components/CategoryPage'

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
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/admin" element={<AdminPanel/>}/>
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </ChakraProvider>
  );
}

export default App;
