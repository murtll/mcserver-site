import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Button,
  Image,
  SimpleGrid,
  useDisclosure
} from '@chakra-ui/react';
import '@fontsource/iosevka'
import { DonateDialog } from './DonateDialog';

export const ItemGrid = ({items}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ currentItem, setCurrentItem ] = useState(items[0])
  
    return (
        <>
        <DonateDialog donateItem={currentItem} isOpen={isOpen} onClose={onClose}/>
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
        </SimpleGrid>
        </>
    )
}