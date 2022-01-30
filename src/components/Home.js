import React from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom';
import { Categories } from './Categories';


export const Home = () => {
  return (
    <Box w="100%" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <HStack spacing={45} maxWidth={900}>
          <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="24">
            Всем привет играйте на нашем серваке и донатьте деньги если не будете донатить будем банить и требовать деньги за разбан все всем пока.
          </Text>
          <Image src='/images/ded.png' borderRadius="full" boxSize="sm"></Image>
        </HStack>
        <Categories />
        {/* <HStack spacing={47}>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/cases">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Кейсы с говном</Text>
              </Link>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/privileges">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">При(колы)вилегии</Text>
              </Link>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/money">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Сюда донатить</Text>
              </Link>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14" onClick={() => { window.open('/bans', '_self') }}>
              <Link to="/bans">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Баны разбаны</Text>
              </Link>
            </Button>
        </HStack> */}
        {/* <SimpleGrid columns={2} spacingY={61} spacingX={41}>
          {items.map((item) => {
            return (<Box height={300} maxWidth={250} backgroundColor="#180036" borderRadius={15} borderWidth={3} borderColor="#69009B" py="12" px="14">
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.name}</Text>
                <Button backgroundColor="#69009B" borderRadius={15} borderWidth={3} borderColor="#69009B" px="8">
                  <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.price}₽</Text>
                </Button>
              </VStack>
            </Box>)
          })}
        </SimpleGrid> */}
      </VStack>
    </Box>
  )
}
