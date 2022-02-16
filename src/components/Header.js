import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  HStack,
  // useColorMode,
  Spacer
} from '@chakra-ui/react';
import { FaDiscord, FaVk } from 'react-icons/fa'
import MouseTooltip from 'react-sticky-mouse-tooltip';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom'
import WebFont from 'webfontloader';

export const Header = () => {
    const [ show, setShow ] = useState(false)
    const [ hoverText, setHoverText ] = useState('Нажми, чтобы скопировать IP')

    // const colorMode = useColorMode();
    // colorMode.setColorMode('dark')

    const serverIp = 'play.mcbrawl.ru'

    const copyIPToClipboard = () => {
        navigator.clipboard.writeText(serverIp + ':25565')
        setHoverText('Скопировано!')
        setTimeout(() => {setHoverText('Нажми, чтобы скопировать IP')}, 1000)
    }

    useEffect(() => {
      WebFont.load({
        google: {
          families: ['Love Ya Like A Sister']
        }
      })
    }, [])

    return (
        // <Flex bg="#3D005A" p="8">
        <Flex transition='ease 1000ms' top={0} width='full' shadow='md' borderBottomRadius={50} paddingBottom={{base: 0, md: 8}} paddingTop={{base: 8, md: 8}} paddingX={{base: 0, md: 12, lg: 24}} bg="#3D005A72" direction={{base: 'column', md: 'row'}}>
            <Button alignSelf="center" maxWidth={{base: 270, sm: 300, md: 200, lg: 300}} boxShadow="dark-lg" variant='outline' borderRadius="15" borderWidth={3} paddingY={14} paddingX={8} onClick={copyIPToClipboard} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 24, md: 18, lg: 22, xl: 24}}>IP СЕРВЕРА</Text>
                <Text color="#FFFFFF" fontFamily="Iosevka" fontWeight="bold" fontSize={{base: 30, md: 22, lg: 26, xl: 30}}>{serverIp}</Text>
              </VStack>
            </Button>

          <MouseTooltip
          visible={show}
          offsetX={20}
          offsetY={-40}>
            <Box transition='ease 400ms' shadow='dark-lg' bg="purple.900" opacity={0.9} paddingY={2} paddingX={4} borderRadius={15}>
              <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="18">{hoverText}</Text>
            </Box>
          </MouseTooltip>

          <Spacer></Spacer>
          <Link to="/">
          <VStack padding={{base: 10, md: 0}} spacing={0} _hover={{cursor: 'pointer'}}>
            <Flex>
              <Text
              transition='ease 1000ms' 
              color="#FCD9FF" 
              fontFamily="Love Ya Like A Sister" 
              fontWeight="bold" 
              fontSize={{ base: 50, xl: 60 }}
              letterSpacing="widest">
                BRAWL
              </Text>
              <Text 
              transition='ease 1000ms'
              color="#FF4291" 
              fontFamily="Love Ya Like A Sister" 
              fontWeight="bold" 
              fontSize={{ base: 50, xl: 60 }}
              letterSpacing="widest">
                CRAFT
              </Text>
            </Flex>
            <Text lineHeight={1} color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="24" letterSpacing="widest">Minecraft servers</Text>
          </VStack>
          </Link>
          <Spacer></Spacer>

          <Flex transition='ease 1000ms' marginBottom={{base: 12, md: 0}} marginTop={{base: 0, md: 4}} marginRight={{base: 0, md: 0, lg: 24}} alignSelf={{base: 'center', md: 'start'}} alignItems={{base: 'center', md: 'start'}} direction={{base: 'row', md: 'column'}}>
            {/* <VStack alignItems={{base: "center", md: "start"}}> */}
            <HStack marginRight={{base: 5, md: 0}} spacing={{base: 2, md: 5}} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://discord.gg/Ncbp76WUZ8', '_blank') }}>
                <FaDiscord size={40} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">Discord</Text>
              </HStack>
              <HStack spacing={{base: 2, md: 5}} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://vk.com/mcbrawl', '_blank') }}>
                <FaVk size={40} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">ВКонтакте</Text>
              </HStack>
            {/* </VStack> */}
          </Flex>
        </Flex>
      // </Box>
    )
}
