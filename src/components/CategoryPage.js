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
import { useParams } from 'react-router-dom'

export const CategoryPage = () => {

    const { category } = useParams()
    const [items, setItems] = useState(cache[category] ? cache[category] : [])
    const apiUrl = config.apiUrl

    useEffect(() => {
        setItems(cache[category] || [])

        axios.get(`${apiUrl}/${category}`).then((res) => {
        // console.log(res)
        cache[category] = res.data
        setItems(res.data)
        })
    }, [category])

    const renderGrid = () => {
        if (items.length > 0) return (<ItemGrid items={items} />)
        else return (<></>)
    }

    return (
        <Box width="full">
        <VStack marginY={50} spacing={61}>
            <Categories/>
            {renderGrid()}
        </VStack>
        </Box>
    )
}
