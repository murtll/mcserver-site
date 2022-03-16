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

import { ServerInfo } from './ServerInfo'

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
        <Flex 
          transition='ease 400ms' 
          top={0} 
          width='full' 
          align={{base: 'center', md: 'start'}}
          justify='center'
          shadow='md' 
          borderBottomRadius={50} 
          paddingBottom={{base: 85, md: 10}} 
          paddingTop={{base: 8, md: 8}} 
          paddingX={{base: 0, md: 12, lg: 20}} 
          bg="#3D005A72" 
          direction={{base: 'column', md: 'row'}}>

            <Button 
              // alignSelf="center" 
              maxWidth={{base: 270, sm: 300, md: 200, lg: 300}} 
              boxShadow="dark-lg" 
              variant='outline' 
              borderRadius="15" 
              borderWidth={3} 
              paddingY={14} 
              paddingX={8} 
              marginTop={1}
              onClick={copyIPToClipboard} 
              onMouseEnter={() => setShow(true)} 
              onMouseLeave={() => setShow(false)}>
              <VStack>
                <Text transition='ease 400ms' color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 20, md: 14, lg: 18, xl: 20}}>IP СЕРВЕРА</Text>
                <Text transition='ease 400ms' color="#FFFFFF" fontFamily="Iosevka" fontWeight="bold" fontSize={{base: 24, md: 16, lg: 20, xl: 24}}>{serverIp}</Text>
                <Text transition='ease 400ms' color="#cCa9cc" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 14, md: 8, lg: 12, xl: 14}}>Версия 1.12-1.18</Text>
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
              transition='ease 400ms' 
              color="#FCD9FF" 
              fontFamily="Love Ya Like A Sister" 
              fontWeight="bold" 
              fontSize={{ base: 50, xl: 60 }}
              letterSpacing="widest">
                BRAWL
              </Text>
              <Text 
              transition='ease 400ms'
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

          <Flex transition='ease 400ms'
            align={{base: 'center', md: 'start'}}
            direction='column'
            marginBottom={{base: 6, md: 3}}
            marginLeft={{base: 0, '2xl': 8}}
            marginRight={{base: 0,xl: 24, '2xl': 12}}
            >

          <Flex transition='ease 400ms'
            // marginBottom={{base: 12, md: 0}}
            // marginTop={{base: 0, md: 41}}
            // marginLeft={{base: 0, lg: 24}}
            alignSelf={{base: 'center', md: 'start'}} 
            align={{base: 'center', md: 'start'}}
            direction={{base: 'row', md: 'column'}}>

            <HStack marginRight={{base: 5, md: 0}} spacing={{base: 2, md: 5}} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://discord.gg/Ncbp76WUZ8', '_blank') }}>
                <FaDiscord size={35} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">Discord</Text>
              </HStack>
              <HStack spacing={{base: 2, md: 5}} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://vk.com/mcbrawl', '_blank') }}>
                <FaVk size={35} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">ВКонтакте</Text>
              </HStack>
          </Flex>


          <ServerInfo 
            transition='ease 400ms' 
            marginTop={3}
            direction='row' 
            align='center' 
            justify='center' 
            paddingTop={2} 
            paddingBottom={2} 
            paddingX={8} 
            borderRadius={15} 
            borderWidth={2} 
            // backgroundColor='#3A005B32'
            borderColor='#69009B'/>

          </Flex>
        </Flex>
    )
}
