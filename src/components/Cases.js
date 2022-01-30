import React from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  HStack} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom'
import { ItemGrid } from './ItemGrid';

export const Cases = () => {

  const items = [
    {
      id: 1,
      picture: '/images/cases/case1.png',
      name: 'Мини кейс с говном',
      description: 'Может дропнуться чуть чуть гемов и говна, мб привилегия, но не больше, чем Билли',
      price: 99
    },
    {
      id: 2,
      picture: '/images/cases/case2.png',
      name: 'Обычный кейс с говном',
      description: 'Дропаются гемы с говном, скорее всего привилегия не больше, чем Анонимус',
      price: 199
    },
    {
      id: 3,
      picture: '/images/cases/case3.png',
      name: 'Кейс с говном манки',
      description: 'Дропается достаточно гемов и говна, повышенный шанс на выпадение привилегии Манки',
      price: 499
    },
    {
      id: 4,
      picture: '/images/cases/case4.png',
      name: 'Супер кейс с Леоном',
      description: 'Дропаются гемы с говном, повышенный шанс на выпадение привилегии Леон',
      price: 899
    },
  ]


  return (
    <Box w="100%" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <HStack spacing={47}>
        <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py="12" px="14">
              {/* <Link> */}
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Кейсы с говном</Text>
              {/* </Link> */}
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
            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
              <Link to="/bans">
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">Баны разбаны</Text>
              </Link>
            </Button>
        </HStack>
        <ItemGrid items={items} />
        {/* <SimpleGrid columns={4} spacingY={61} spacingX={41}>
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
        </SimpleGrid> */}
      </VStack>
    </Box>
  )
}
