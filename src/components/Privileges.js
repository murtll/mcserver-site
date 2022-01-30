import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { ItemGrid } from './ItemGrid';
import { Categories } from './Categories';
import axios from 'axios';
import config from '../config';
import { cache } from '../utils/GlobalCache'

export const Privileges = () => {

  const [items, setItems] = useState(cache.privileges)
  const apiUrl = config.apiUrl

  useEffect(() => {
    axios.get(`${apiUrl}/privileges`).then((res) => {
      console.log(res)
      cache.privileges = res.data
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
