import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { ItemGrid } from './ItemGrid';
import { Categories } from './Categories';
import axios from 'axios';
import config from '../config';
import { cache } from '../utils/GlobalCache';

export const Money = () => {

  const [items, setItems] = useState(cache.donates)
  const apiUrl = config.apiUrl

  useEffect(() => {
    axios.get(`${apiUrl}/money`).then((res) => {
      console.log(res)
      cache.donates = res.data
      setItems(res.data)
    })
  }, [setItems, apiUrl])

  const renderGrid = () => {
    if (items.length > 0) return (<ItemGrid items={items} />)
    else return (<></>)
  }

  return (
    <Box width="full" bg="#180036">
      <VStack paddingY={100} spacing={61}>
        <Categories/>
        {renderGrid()}
      </VStack>
    </Box>
  )
}
