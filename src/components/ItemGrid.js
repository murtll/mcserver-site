import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  SimpleGrid,
  useDisclosure,
  Skeleton,
} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { DonateDialog } from './DonateDialog';
import config from '../config';
import Fade from 'react-reveal/Fade'
import { cache } from '../utils/GlobalCache';
import axios from 'axios';

export const ItemGrid = ( { category } ) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ currentItem, setCurrentItem ] = useState()
    const [ items, setItems ] = useState([])
    // const [items, setItems] = useState(cache[category] || [])

    const apiUrl = config.apiUrl

    useEffect(() => {

        // console.log(cache[category]);

        setItems([])
        // setItems(cache[category] || [])

        axios.get(`${apiUrl}/${category}`).then((res) => {
          cache[category] = res.data
          setItems(res.data)
          setCurrentItem(res.data[0])
        })
    }, [apiUrl, category])
  
    if (items.length > 0 && currentItem) return (
        <>
        <DonateDialog donateItem={currentItem} isOpen={isOpen} onClose={onClose}/>
        <SimpleGrid transition='ease 1000ms' columns={{base: 1, md: 2, lg: 3, xl: items.length > 4 ? 4 : items.length}} spacingY={61} spacingX={41}>
        <Fade>
          {items.map((item) => {
            return (
            <Button shadow='dark-lg' height={300} maxWidth={250} backgroundColor="#18003652" borderRadius={15} borderWidth={2} borderColor="#69009B" py="12" px="14" alignItems="self-end" onClick={() => { setCurrentItem(item); onOpen() }}>
              <VStack spacing={11}>
                <Image maxHeight={150} src={`${apiUrl}${item.picture}`}/>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.name}</Text>
                <Box paddingX={12} paddingY={2} backgroundColor="#69009B" borderRadius={15} px="8">
                  <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.price}₽</Text>
                </Box>
              </VStack>
            </Button>)
          })}
          </Fade>
        </SimpleGrid>
        </>
    )
    else
    if (!cache[category]) 
    return (
      <SimpleGrid columns={{base: 1, md: 2, lg: 3, xl: 4}} spacingY={61} spacingX={41}>
        <Skeleton shadow='dark-lg' height={300} width={250} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.5}/>
        <Skeleton shadow='dark-lg' height={300} width={250} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.5}/>
        <Skeleton shadow='dark-lg' height={300} width={250} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.5}/>
        <Skeleton shadow='dark-lg' height={300} width={250} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.5}/>
      </SimpleGrid>
  )
  else return ( <Box height={300}/> )
}
