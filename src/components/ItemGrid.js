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
  Flex
} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { DonateDialog } from './DonateDialog';
import config from '../config';
import Fade from 'react-reveal/Fade'
import { cache } from '../utils/GlobalCache';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const ItemGrid = ( { category } ) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ currentItem, setCurrentItem ] = useState()
    const [ items, setItems ] = useState([])
    const navigate = useNavigate()

    const skeletons = [0, 0, 0, 0]

    const apiUrl = config.apiUrl

    useEffect(() => {
        console.log(items);

        const params = new URLSearchParams(window.location.search)
        const itemId = params.get('id')
        const from = params.get('from')

        if (!itemId && isOpen) {
          onClose()
          navigate(`/${category}`)
        } else if (from === 'self' && items.length > 0) {
          if  (isOpen) return 

          const thatItem = itemId ? items.find((item) => item.id == itemId) : undefined
          if (thatItem) {
            setCurrentItem(thatItem)
            onOpen()
          }     
        } else {
          setItems([])

          axios.get(`${apiUrl}/${category}`).then((res) => {
            cache[category] = res.data
            setItems(res.data)

            const thatItem = res.data.find((item) => item.id == itemId)

            if (thatItem) {
              setCurrentItem(thatItem)
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });

              setTimeout(onOpen, 500)
            } else {
              setCurrentItem(res.data[0])
            }
          })
        }
    }, [category, window.location.search])
  
    return (
        <Flex minHeight='max-content'>
        { currentItem ? <DonateDialog category={category} donateItem={currentItem} isOpen={isOpen} onClose={() => {onClose(); navigate(`/${category}?from=self`)}} /> : <></> }
        <SimpleGrid columns={{base: 1, md: 2, lg: 3, xl: (items.length > 4 || items.length === 0) ? 4 : items.length }}
        justifyItems='center'
         >
          { items.length > 0 ? items.map((item) => {
            return (
              <Fade key={item.id} >
	  <Flex align='center' justify='center' height={341}
	       width={291}
	       //_hover={{ height: 321 }} 
               //paddingX={21} 
               //paddingY={31} 
	       >
          <Button as={Link} to={`/${category}?id=${item.id}&from=self`} transition='ease 400ms' key={item.id} 
	  _hover={{ marginTop: 4, shadow: '0px 20px 20px 5px #00000052', maxWidth: 260 }} 
          shadow='dark-lg' height={300} width='full' maxWidth={250} backgroundColor="#18003652" borderRadius={15} borderWidth={2} borderColor="#69009B"
          paddingY={12} paddingX={14} alignItems="self-end"
	  marginTop={10}
          //onClick={() => { setCurrentItem(item); onOpen() }}
          >
              <VStack spacing={11}>
		            <Flex alignItems='center' justify='center' height={150}>
                  <Image maxHeight={150} src={`${apiUrl}${item.picture}`}/>
		            </Flex>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.name}</Text>
                <Box paddingX={12} paddingY={2} backgroundColor="#69009B" borderRadius={15} px="8">
                  <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" textAlign="center">{item.price}₽</Text>
                </Box>
              </VStack>
            </Button>
	          </Flex>
            </Fade>
            )
          }) :
            skeletons.map((_) => {
              return (<Skeleton marginX={21} marginY={31} shadow='dark-lg' height={300} width={250} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={ cache[category] ? 0 : 0.4 }/>)
            })
          }        

        </SimpleGrid>
        </Flex>
    )
}
