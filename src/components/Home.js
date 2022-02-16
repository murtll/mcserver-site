import React, { useEffect, useState } from 'react';
import {
  Text,
  VStack,
  Flex,
  Image} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Categories } from './Categories';
import Fade from "react-reveal/Fade"


export const Home = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
      window.addEventListener('resize', () => {
          setWindowWidth(window.innerWidth)
      })
  }, [])


  return (
    <Flex overflow='hidden' alignItems='center' direction='column'>
      <VStack transition='ease 1000ms' marginTop={{base: 50, md: 50}} marginBottom={{base: 50, md: 100, '2xl': 50}} spacing={{ base: 0, md: 41 }}>
        {/* <Fade collapse> */}
          <Categories />
        {/* </Fade> */}
        <Flex transition='ease 1000ms' alignItems={{base: "center", lg: 'start'}} maxWidth={1900} direction={{base: 'column-reverse', lg: 'row'}}>
          <Fade cascade right>
          <Flex transition='ease 1000ms' borderRadius={30} shadow='dark-lg' position={{base: '', lg: "absolute"}} letterSpacing="wider" color="#FCD9FF" opacity={{base: 1, lg: 0.8}} fontFamily="Iosevka" fontWeight={{ base: 'normal', lg: 'bold' }} fontStyle='italic' fontSize={{ base: 24, xl: 28 }}  textAlign={{base: 'center', md: 'start'}} paddingX={{base: 5, md: 35, xl: 50}} paddingY={{base: 10, md: 35, '2xl': 50}} marginX={{base: 5, md: 35}} marginTop={{base: 0, '2xl': 25}} maxWidth={{ base: 700, lg: 500, xl: windowWidth * 0.4 > 550 ? 550: '40%', '2xl': windowWidth * 0.4 > 600 ? 600: '40%' }}>
            <Fade delay={400}>
              <Text>
              Hello gamer!
              <br/>
              Мы рады видеть нового бравлера в нашем уютном уголке.
              Сервер BrawlCraft порадует тебя проработанным ванильным Minecraft выживанием. 
              <br/>
              Щщикарной игры!
              <br/><br/>
              - Большие Админы
              </Text>
            </Fade>
          </Flex>
          <Image transition='ease 1000ms' marginTop={{base: 12, '2xl': 0}} marginLeft={{base: 0, lg: 450, xl: 500, '2xl': 500}} maxWidth={{base: 'full', lg: '70%'}} alignSelf={{base: 'center', lg: 'flex-end'}} src='/images/ded.webp'></Image>
          </Fade>
        </Flex>
      </VStack>
    </Flex>
  )
}
