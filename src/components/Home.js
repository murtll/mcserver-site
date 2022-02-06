import React from 'react';
import {
  Text,
  VStack,
  Flex,
  Image} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Categories } from './Categories';


export const Home = () => {
  return (
    <Flex w="100%" alignItems='center' direction='column'>
      <VStack marginTop={{base: 50, md: 50}} marginBottom={{base: 50, md: 50}} spacing={{ base: 0, md: 41 }}>
        <Categories />
        <Flex alignItems={{base: "center", lg: 'start'}} maxWidth={1900} direction={{base: 'column-reverse', lg: 'row'}}>
          <Text textShadow='dark-lg' borderRadius={30} shadow='dark-lg' position={{base: '', lg: "absolute"}} letterSpacing="wider" color="#FCD9FF" opacity={{base: 1, lg: 0.8}} fontFamily="Iosevka" fontWeight={{ base: 'normal', lg: 'bold' }} fontStyle='italic' fontSize={{ base: 24, xl: 28 }} alignSelf={{base: 'center', lg: 'center'}} textAlign={{base: 'center', lg: 'start'}} paddingX={50} paddingY={{base: 20, lg: 50}} marginX={10} maxWidth={{ base: 700, lg: 600, xl: 650 }}>
            Hello gamer!
            <br/>
            Мы рады видеть нового бравлера в нашем уютном уголке.
            Сервер BrawlCraft порадует тебя проработанным ванильным Minecraft выживанием. 
            <br/>
            Щщикарной игры!
            <br/><br/>
            - Большие Админы
          </Text>
          <Image paddingTop={{base: 12, lg: 0}} paddingLeft={{base: 0, lg: 600}} alignSelf={{base: 'center', lg: 'flex-end'}} src='/images/ded.png'></Image>
        </Flex>
      </VStack>
    </Flex>
  )
}
