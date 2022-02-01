import React from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Flex,
  Image} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom';
import { Categories } from './Categories';


export const Home = () => {
  return (
    <Flex w="100%" bg="#180036" alignItems='center' direction='column'>
      <VStack marginTop={{base: 50, md: 50}} marginBottom={{base: 50, md: 50}} spacing={{ base: 0, md: 61 }}>
        <Categories />
        <Flex alignItems={{base: "center", lg: 'start'}} maxWidth={1900} direction={{base: 'column-reverse', lg: 'row'}}>
          <Text position={{base: '', lg: "absolute"}} letterSpacing="widest" color="#FCD9FF" opacity={{base: 1, lg: 0.8}} fontFamily="Iosevka" fontWeight={{ base: 'normal', lg: 'bold' }} fontStyle='italic' fontSize={{ base: 24, xl: 28 }} alignSelf={{base: 'center', lg: 'center'}} textAlign={{base: 'center', lg: 'start'}} paddingX={50} paddingY={{base: 0, lg: 170}} maxWidth={{ base: 700, lg: 600 }}>
            Всем привет играйте на нашем серваке и донатьте деньги если не будете донатить будем банить и требовать деньги за разбан все всем пока.
            <br/><br/>
            - Большие Админы
          </Text>
          <Image paddingTop={{base: 12, lg: 0}} paddingLeft={{base: 0, lg: 500}} alignSelf={{base: 'center', lg: 'flex-end'}} src='/images/ded.png'></Image>
        </Flex>
      </VStack>
    </Flex>
  )
}
