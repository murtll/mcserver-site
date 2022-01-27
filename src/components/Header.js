import React, { useState } from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Flex,
  Button,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa'
import MouseTooltip from 'react-sticky-mouse-tooltip';


export const Header = () => {
    const [ show, setShow ] = useState(false)
    const [ hoverText, setHoverText ] = useState('Нажми, чтобы скопировать IP')

    const serverIp = '132.226.206.139'

    const copyIPToClipboard = () => {
        navigator.clipboard.writeText(serverIp)
        setHoverText('Скопировано!')
        setTimeout(() => {setHoverText('Нажми, чтобы скопировать IP')}, 1000)
    }

    return (
        <Box bg="#3D005A" p="8">
        <Flex marginLeft={24}>
            <Button boxShadow="dark-lg" borderRadius="15" bgColor="#69009B" py="12" px="8" onClick={copyIPToClipboard} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
              <VStack>
                <Text color="#FCD9FF" fontFamily="Iosevka Nerd Font" fontWeight="normal" fontSize="24">IP СЕРВЕРА</Text>
                <Text fontFamily="Iosevka Nerd Font" fontWeight="normal" fontSize="30">{serverIp}</Text>
              </VStack>
            </Button>

          <MouseTooltip
          visible={show}
          offsetX={20}
          offsetY={-40}
          >
            <Box bg="purple.900" opacity={0.9} padding={2} borderRadius={15}>
              <Text color="#FCD9FF" fontFamily="Iosevka Nerd Font" fontWeight="normal" fontSize="18">{hoverText}</Text>
            </Box>
          </MouseTooltip>

          <Spacer></Spacer>
          <VStack spacing={0}>
            <Flex>
              <Text 
              color="#FCD9FF" 
              fontFamily="Iosevka Nerd Font" 
              fontWeight="bold" 
              fontSize="48"
              letterSpacing="widest">
                ITMO.
              </Text>
              <Text 
              color="#FF4291" 
              fontFamily="Iosevka Nerd Font" 
              fontWeight="bold" 
              fontSize="48" 
              letterSpacing="widest">
                SQUAD
              </Text>
            </Flex>
            <Text color="#FCD9FF" fontFamily="Iosevka Nerd Font" fontWeight="normal" fontSize="24" letterSpacing="widest">Minecraft servers</Text>
          </VStack>
          <Spacer></Spacer>
          <Flex alignItems="center" marginRight={24}>
            <Link href='https://discord.com'>
              <HStack spacing={5}>
                <FaDiscord size={60} color="#A000FF"/>
                <Text color="#A000FF" fontFamily="Iosevka Nerd Font" fontWeight="normal" fontSize="24" letterSpacing="widest">Обновления</Text>
              </HStack>
            </Link>
          </Flex>
        </Flex>
      </Box>
    )
}