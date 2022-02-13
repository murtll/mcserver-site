import React from 'react';
import {
  Box,
  VStack} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { ItemGrid } from './ItemGrid';
import { Categories } from './Categories';
import { useParams } from 'react-router-dom'

export const CategoryPage = () => {

    const { category } = useParams()

    return (
        <Box width="full">
        <VStack marginY={50} spacing={61}>
            <Categories/>
            <ItemGrid category={category}/>
        </VStack>
        </Box>
    )
}