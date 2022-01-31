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
    <Box w="100%" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <Flex maxWidth={900} direction={{base: 'column', md: 'row'}}>
          <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="24" alignSelf='center' textAlign={{base: 'center', md: 'start'}} paddingX={{base: 12, md: 0}}>
            Всем привет играйте на нашем серваке и донатьте деньги если не будете донатить будем банить и требовать деньги за разбан все всем пока.
          </Text>
          <Image paddingTop={{base: 12, md: 0}} alignSelf={{base: 'center', md: 'end'}} src='/images/ded.png' borderRadius="full" boxSize="sm"></Image>
        </Flex>
        <Categories />
      </VStack>
    </Box>
  )
}
