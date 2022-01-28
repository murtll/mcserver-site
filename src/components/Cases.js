import React, { useState } from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Flex,
  Button,
  HStack,
  Spacer,
  SimpleGrid
} from '@chakra-ui/react';


export const Cases = () => {

  const items = [
    {
      id: 1,
      picture: <svg></svg>,
      name: 'Мини кейс с мини говном',
      price: 99
    },
    {
      id: 2,
      picture: <svg></svg>,
      name: 'Обычный кейс с говном',
      price: 199
    },
    {
      id: 3,
      picture: <svg></svg>,
      name: 'Кейс с говном манки',
      price: 499
    },
    {
      id: 4,
      picture: <svg></svg>,
      name: 'Супер кейс с Леоном',
      price: 899
    },
  ]


  return (
    <Box w="100%" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <HStack spacing={47}>
        <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py="12" px="14">
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Кейсы с говном</Text>
              </VStack>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Сюда донатить</Text>
              </VStack>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Баны разбаны</Text>
              </VStack>
            </Button>
        </HStack>
        <SimpleGrid columns={2} spacingY={61} spacingX={41}>
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
        </SimpleGrid>
      </VStack>
    </Box>
  )
}
