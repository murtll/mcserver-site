import React from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  SimpleGrid
} from '@chakra-ui/react';
import '@fontsource/iosevka'


export const Bans = () => {

  const items = [
    {
      id: 1,
      picture: '/images/bans/unban.gif',
      name: 'Разбан',
      price: 60
    },
    {
      id: 2,
      picture: '/images/bans/unmute.gif',
      name: 'Размут',
      price: 290
    },
  ]


  return (
    <Box w="100%" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <HStack spacing={47}>
        <Button borderRadius="15" bgColor="#69009B" py="12" px="14" onClick={() => { window.open('/cases', '_self') }}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Кейсы с говном</Text>
              </VStack>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14" onClick={() => { window.open('/privileges', '_self') }}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">При(колы)вилегии</Text>
              </VStack>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14" onClick={() => { window.open('/money', '_self') }}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Сюда донатить</Text>
              </VStack>
            </Button>
            <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py="12" px="14">
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Баны разбаны</Text>
              </VStack>
            </Button>
        </HStack>
        <SimpleGrid columns={2} spacingY={61} spacingX={41}>
        {items.map((item) => {
            return (<Button height={300} maxWidth={250} backgroundColor="#180036" borderRadius={15} borderWidth={3} borderColor="#69009B" py="12" px="14" alignItems="self-end">
              <VStack spacing={11}>
                <Image maxHeight={150} src={item.picture}/>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.name}</Text>
                <Button backgroundColor="#69009B" borderRadius={15} borderWidth={3} borderColor="#69009B" px="8">
                  <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.price}₽</Text>
                </Button>
              </VStack>
            </Button>)
          })}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}
