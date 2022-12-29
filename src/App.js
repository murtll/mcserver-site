import React, { useEffect, useState } from 'react';
import { ChakraProvider, extendTheme, theme, Spacer, Flex} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { mode } from "@chakra-ui/theme-tools"
import Fade from 'react-reveal/Fade'
import Snowfall from 'react-snowfall'

import { Header } from './components/Header'
import { Home } from './components/Home'
import { Footer } from './components/Footer'
import { AdminPanel } from './components/admin/AdminPanel'
import { CategoryPage } from './components/CategoryPage'
import { LastDonates } from './components/LastDonates'

import { Chart } from './components/Chart';
import { Developers } from './components/Developers'
import { RatingTable } from './components/RatingTable';

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
	  fontFamily: 'Arial',
          // transition: 'ease 1000ms',
          bgGradient: 'linear(to-tl, #48048c, #3b005c)',
          backgroundImage: 'url("/images/background.webp")',
          bg: mode('#3b005c', '#3b005c')(props),
		      backgroundAttachment: 'fixed',
		      backgroundSize: 'cover'
        }
      })
    }
  })

  const [ donatesShown, setDonatesShown ] = useState(false)
  const [ ratingShown, setRatingShown ] = useState(false)
  const [ footerShown, setFooterShown ] = useState(false)
  
  var prevScroll = 0

  const showDonates = () => {
    const newScroll = window.scrollY + window.innerHeight
    if (newScroll > 1200) {
      !donatesShown && setDonatesShown(true)
    } 

    if (newScroll > 1300) {
      !ratingShown && setRatingShown(true)
    }

    if (newScroll > 1700) {
      !footerShown && setFooterShown(true)
    }

    if (footerShown && ratingShown && donatesShown) {
      window.removeEventListener('scroll', showDonates);
      window.removeEventListener('resize', showDonates);
    }
  }

  useEffect(() => {
    prevScroll = window.scrollY + window.innerHeight
    window.addEventListener('scroll', showDonates)
    window.addEventListener('resize', showDonates)
    showDonates()
  }, [])

  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {
        (new Date().getMonth() == 11 && new Date().getDate() > 15) || (new Date().getMonth() == 0 && new Date().getDate() < 15) ?
        <Snowfall/> :
        <></>
      }
      <BrowserRouter>
        {/* <Fade top> */}
          <Header/>
        {/* </Fade> */}
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/admin" element={<AdminPanel/>}/>
          <Route exact path="/developers" element={<Developers/>}/>
          <Route path="/:category" element={<CategoryPage />} />
        </Routes>
        <Flex marginTop={20} marginX={20} justify='center' direction={{base: 'column', md: 'row-reverse'}}> 
          <Fade bottom when={donatesShown}>
            <LastDonates />
          </Fade>
          <Fade bottom when={donatesShown}>
            <Chart />
          </Fade>
        </Flex>
        <Spacer height={85} />
        <Fade bottom when={ratingShown}>
          <RatingTable />        
        </Fade>
        <Spacer height={85} />        
        <Fade bottom when={footerShown} duration={700}>
          <Footer /> 
        </Fade>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
