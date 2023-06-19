import { Flex, Image, Text, TableContainer, Table, TableCaption, Tr, Th, Td, Tbody, Thead, Box } from "@chakra-ui/react"
import '@fontsource/iosevka'
import { cache } from '../utils/GlobalCache'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaCrown, FaPoop } from "react-icons/fa"

import { secToTime, dateString } from "../utils/DateUtils"

import './Scroll.css'

export const RatingTable = () => {

	const [playerRatings, setPlayerRatings] = useState(cache.playerRatings || [])
    const [activePlayers, setActivePlayers] = useState(cache.playerList || [])

	const getRatingData = () => {
		axios.get('https://api.mineserv.top/api/players/project/?name=mcbrawl&offset=0&limit=25&timeframe=all_time')
		.then((res) => {
			cache.playerRatings = res.data.players
			setPlayerRatings(res.data.players)

			setTimeout(getRatingData, 300000)
		})
		.catch((err) => {
			console.log(err)
		})
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            setActivePlayers(res.data.Playerlist)
          })
	    .catch((err) => {
    		console.log(err)
	    })
	}

	useEffect(getRatingData, [])

	return (
    <Flex fontFamily='Iosevka' direction='column' align='center' justify='center'>
    	<Text fontSize={24} color="#FCD9FF" fontWeight='bold' textAlign='center'>Рейтинг игроков</Text>
        <Box shadow='inset 0px 0px 30px 10px #00000052' transition='ease 1000ms' overflow='scroll'
            marginTop={5} borderColor='purple' borderWidth={1} borderRadius={15} width={{ base: 300, sm: 500, md: 800, xl: 1000, '2xl': 1300 }} direction='column' height='515'>
            {/* <TableContainer> */}
            <Table variant='simple' colorScheme='purple'>
                <TableCaption paddingBottom={6}>
                    <Flex fontFamily='Iosevka' justify='center' width='full'>Здесь показаны первые 25 игроков. Чтобы попасть в этот список, больше играйте на нашем сервере!</Flex>
                    <Flex fontFamily='Iosevka' justify='center' width='full' marginTop={4}>
                <Text marginTop={2} marginRight={2} textColor='#ddaabb'>Данные получены с помощью </Text> 
                <link rel="stylesheet" href="https://mineserv.top/widgets.min.css" /> 
                    <a href="https://mineserv.top/mcbrawl" 
                       target="_blank"
                       rel="noopener noreferrer"
                       class="mn-srv-btn mn-srv-btn--small">
                        <span class="mn-srv-btn__icon">
                            <svg width="16"
                                 height="16"
                                 viewBox="0 0 360 360">
                                    <g fill="none"
                                       fill-rule="evenodd">
                                        <path d="M0 0H360V360H0z"
                                              transform="translate(-371 -350) translate(371 350)"></path>
                                              <g fill="#FFF">
                                                <path d="M253.844 259.461L253.844.539 203.075.539 203.065 52.329 152.307 52.324 152.307 104.108 203.065 104.108 203.075 259.461zM152.307 156.432L152.307 104.647 101.538 104.647 101.538 156.432zM50.769.539L0 .539 0 259.461 50.769 259.461 50.769 104.108 101.538 104.108 101.538 52.324 50.769 52.324z" transform="translate(-371 -350) translate(371 350) translate(53 50)"></path>
                                              </g>
                                    </g>
                            </svg>
                        </span>
                        <span class="mn-srv-btn__text">Mineserv</span>
                    </a>
            </Flex>

                </TableCaption>
                <Thead position='sticky' top='0' background='#2D115A'>
                <Tr>
                    <Th><Flex paddingTop='10px' fontFamily='Iosevka' justify='center' width='full'>Место</Flex></Th>
                    <Th><Flex paddingTop='10px' fontFamily='Iosevka' justify='center' width='full'>Аватар</Flex></Th>
                    <Th><Flex paddingTop='10px' fontFamily='Iosevka' justify='center' width='full'>Никнейм</Flex></Th>
                    <Th><Flex paddingTop='10px' fontFamily='Iosevka' justify='center' width='full'>Время на сервере</Flex></Th>
                    <Th><Flex paddingTop='10px' fontFamily='Iosevka' justify='center' width='full'>Последний онлайн</Flex></Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                    playerRatings.map((player) => {
                        return <Tr _hover={{backgroundColor: '#69009B42'}} background={player.place == 3 ? '#C6744445' : player.place == 2 ? '#d3d3d345' : player.place == 1 ? '#fff70045' : '' }>
                            <Td><Flex justify='center' width='full'>{player.place <= 3 ? <FaCrown color={player.place == 1 ? 'gold' : player.place == 2 ? 'silver' : '#C67444'}/> : player.place}</Flex></Td>
                            <Td><Flex justify='center' width='full'><Image src={`https://minotar.net/avatar/${player.name}/25`} height={25} borderRadius={5}/></Flex></Td>
                            <Td><Flex justify='center' width='full'>{player.name}</Flex></Td>
                            <Td><Flex justify='center' width='full'>{secToTime(player.game_time)}</Flex></Td>
                            <Td><Flex justify='center' width='full'>{ activePlayers.includes(player.name) ? <div><a style={{ color: '#39FF14', textShadow: '0px 0px 10px #aaffbb' }}>⬤</a> Онлайн сейчас</div> : dateString(new Date(player.last_online)) }</Flex></Td>
                        </Tr>
                    })
                }
                </Tbody>
            </Table>
            {/* </TableContainer> */}
            </Box>
        </Flex>
    // </Flex>
  )
}