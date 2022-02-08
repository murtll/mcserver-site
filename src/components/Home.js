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
          <Text borderRadius={30} shadow='dark-lg' position={{base: '', lg: "absolute"}} letterSpacing="wider" color="#FCD9FF" opacity={{base: 1, lg: 0.8}} fontFamily="Iosevka" fontWeight={{ base: 'normal', lg: 'bold' }} fontStyle='italic' fontSize={{ base: 24, xl: 28 }}  textAlign={{base: 'center', md: 'start'}} paddingX={{base: 5, md: 35, xl: 50}} paddingY={{base: 10, md: 35, '2xl': 50}} marginX={{base: 5, md: 35}} marginTop={{base: 0, '2xl': 25}} maxWidth={{ base: 700, lg: 500, xl: 550, '2xl': 600 }}>
            Hello gamer!
            <br/>
            Мы рады видеть нового бравлера в нашем уютном уголке.
            Сервер BrawlCraft порадует тебя проработанным ванильным Minecraft выживанием. 
            <br/>
            Щщикарной игры!
            <br/><br/>
            - Большие Админы
          </Text>
          <Image paddingTop={{base: 12, '2xl': 0}} paddingLeft={{base: 0, lg: 500, xl: 550, '2xl': 600}} alignSelf={{base: 'center', lg: 'flex-end'}} src='/images/ded.png'></Image>
        </Flex>
      </VStack>
    </Flex>
  )
}
