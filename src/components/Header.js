import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  HStack,
  useColorMode,
  Spacer
} from '@chakra-ui/react';
import { FaDiscord, FaVk } from 'react-icons/fa'
import MouseTooltip from 'react-sticky-mouse-tooltip';
import '@fontsource/iosevka'
import { Link } from 'react-router-dom'


export const Header = () => {
    const [ show, setShow ] = useState(false)
    const [ hoverText, setHoverText ] = useState('Нажми, чтобы скопировать IP')

    const colorMode = useColorMode();
    colorMode.setColorMode('dark')

    const serverIp = 'play.mcbrawl.ru'

    const copyIPToClipboard = () => {
        navigator.clipboard.writeText(serverIp + ':25565')
        setHoverText('Скопировано!')
        setTimeout(() => {setHoverText('Нажми, чтобы скопировать IP')}, 1000)
    }

    return (
        <Box bg="#3D005A" p="8">
        <Flex marginLeft={24}>
            <Button boxShadow="dark-lg" borderRadius="15" bgColor="#69009B" py="14" px="8" onClick={copyIPToClipboard} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="24">IP СЕРВЕРА</Text>
                <Text color="#FFFFFF" fontFamily="Iosevka" fontWeight="normal" fontSize="30">{serverIp}</Text>
              </VStack>
            </Button>

          <MouseTooltip
          visible={show}
          offsetX={20}
          offsetY={-40}>
            <Box bg="purple.900" opacity={0.9} padding={2} borderRadius={15}>
              <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="18">{hoverText}</Text>
            </Box>
          </MouseTooltip>

          <Spacer></Spacer>
          <Link to="/">
          <VStack spacing={0} _hover={{cursor: 'pointer'}}>
            <Flex>
              <Text 
              color="#FCD9FF" 
              fontFamily="Iosevka" 
              fontWeight="bold" 
              fontSize="50"
              letterSpacing="widest">
                BRAWL
              </Text>
              <Text 
              color="#FF4291" 
              fontFamily="Iosevka" 
              fontWeight="bold" 
              fontSize="50" 
              letterSpacing="widest">
                CRAFT
              </Text>
            </Flex>
            <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="24" letterSpacing="widest">Minecraft servers</Text>
          </VStack>
          </Link>
          <Spacer></Spacer>
          <Flex alignItems="center" marginRight={24}>
            <VStack alignItems="start">
            <HStack spacing={5} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://discord.com', '_blank') }}>
                <FaDiscord size={40} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">Discord</Text>
              </HStack>
              <HStack spacing={5} _hover={{cursor: 'pointer'}} onClick={() => { window.open('https://vk.com/mcbrawl', '_blank') }}>
                <FaVk size={40} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka" fontWeight="normal" fontSize="20" letterSpacing="widest">ВКонтакте</Text>
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </Box>
    )
}
