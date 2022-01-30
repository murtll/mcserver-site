import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Image,
  Flex,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom'
import { DonateDialog } from './DonateDialog';
import { ItemGrid } from './ItemGrid';

export const Privileges = () => {

  const items = [
    {
      id: 1,
      picture: '/images/privileges/brawler.png',
      name: 'Бравлер',
      description: 'Это бравлер, он просто круче, чем обычный игрок',
      price: 99
    },
    {
      id: 2,
      picture: '/images/privileges/monke.png',
      name: 'Монке',
      description: 'Это монке, он умеет кидаться говном',
      price: 199
    },
    {
      id: 3,
      picture: '/images/privileges/billy.png',
      name: 'Билли',
      description: 'Это Билли, он крутой, RIP',
      price: 499
    },
    {
      id: 4,
      picture: '/images/privileges/gigachad.png',
      name: 'Гигачад',
      description: 'Это Гигачад, да, он слышал про парад планет, а на какой площади он проходит?',
      price: 899
    },
    {
      id: 4,
      picture: '/images/privileges/anonimous.png',
      name: 'Анонимус',
      description: 'Это анонимус, никто не знает, кто он',
      price: 899
    },
    {
      id: 4,
      picture: '/images/privileges/pablo.png',
      name: 'Пабло',
      description: 'Это Пабло, он просто крутой',
      price: 899
    },
    {
      id: 4,
      picture: '/images/privileges/leon.png',
      name: 'Леон',
      description: 'Это Леон, как Пабло, но еще круче',
      price: 899
    },
    {
      id: 4,
      picture: '/images/privileges/master.png',
      name: 'Dungeon Master',
      description: 'Это Dungeon Master, the best of the best',
      price: 899
    }
  ]

  // const { isOpen, onOpen, onClose } = useDisclosure()
  // const [ currentItem, setCurrentItem ] = useState(items[0])

  return (
    <Box width="full" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <HStack spacing={47}>
        <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/cases">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Кейсы с говном</Text>
              </Link>
            </Button>
            <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py="12" px="14">
              {/* <Link to="/privileges"> */}
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">При(колы)вилегии</Text>
              {/* </Link> */}
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/money">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Сюда донатить</Text>
              </Link>
            </Button>
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/bans">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Баны разбаны</Text>
              </Link>
            </Button>
        </HStack>
        <ItemGrid items={items} />
        {/* <DonateDialog donateItem={currentItem} isOpen={isOpen} onClose={onClose}/>
        <SimpleGrid columns={4} spacingY={61} spacingX={41}>
          {items.map((item) => {
            return (
            <Button height={300} maxWidth={250} backgroundColor="#180036" borderRadius={15} borderWidth={3} borderColor="#69009B" py="12" px="14" alignItems="self-end" onClick={() => { setCurrentItem(item) ;onOpen() }}>
              <VStack spacing={11}>
                <Image maxHeight={150} src={item.picture}/>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.name}</Text>
                <Box paddingX={12} paddingY={2} backgroundColor="#69009B" borderRadius={15} px="8">
                  <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.price}₽</Text>
                </Box>
              </VStack>
            </Button>)
          })}
        </SimpleGrid> */}
      </VStack>
    </Box>
  )
}
