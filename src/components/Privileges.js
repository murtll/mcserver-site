import React from 'react';
import {
  Box,
  Code,
  VStack} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { ItemGrid } from './ItemGrid';
import { Categories } from './Categories';

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
      description: <ul>
        <li>Префикс Леон в чате/табе/над головой</li>
        <li>Набор Леон - <Code borderRadius={5}>/kit leon</Code></li>
        <li>+35 дополнительных слотов на аукционе</li>
        <li>+40 доступных точек дома</li>
        <li>40 регионов для привата</li>
      </ul>,
      price: 1250
    },
    {
      id: 4,
      picture: '/images/privileges/master.png',
      name: 'Dungeon Master',
      description: 'Это Dungeon Master, the best of the best',
      price: 899
    }
  ]

  return (
    <Box width="full" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <Categories/>
        <ItemGrid items={items} />
      </VStack>
    </Box>
  )
}
