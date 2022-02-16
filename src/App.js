import React, { useEffect, useState } from 'react';
import {
  ChakraProvider, extendTheme, theme, Spacer} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mode } from "@chakra-ui/theme-tools"

import { Header } from './components/Header'
import { Home } from './components/Home'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/admin/AdminPanel'
import { CategoryPage } from './components/CategoryPage'
import { LastDonates } from './components/LastDonates';

import Fade from 'react-reveal/Fade';

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
          backgroundImage: 'url("/images/background.png")',
          bg: mode('#180036', '#180036')(props),
		  backgroundAttachment: 'fixed'
        }
      })
    }
  })

  const [ donatesShown, setDonatesShown ] = useState(false)
  const [ footerShown, setFooterShown ] = useState(false)

  const showDonates = () => {
    if (window.scrollY + window.innerHeight > 1200) {
      !donatesShown && setDonatesShown(true)
    }
    if (window.scrollY + window.innerHeight > 1300) {
      !footerShown && setFooterShown(true)
    }
    if (footerShown && donatesShown) {
      window.removeEventListener('scroll', showDonates);
      window.removeEventListener('resize', showDonates);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', showDonates)
    window.addEventListener('resize', showDonates)
    showDonates()
  }, [])


  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <BrowserRouter>
        <Fade top>
          <Header/>
        </Fade>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/admin" element={<AdminPanel/>}/>
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
        <Fade bottom when={donatesShown}>
          <LastDonates />
        </Fade>
      </BrowserRouter>
        <Spacer height={85} />
        <Fade bottom when={footerShown} duration={700}>
          <Footer /> 
        </Fade>
    </ChakraProvider>
  );
}

export default App;
