import { Flex, Image, Text, TableContainer, Table, TableCaption, Tr, Th, Td, Tbody, Thead } from "@chakra-ui/react"
import '@fontsource/iosevka'
import { cache } from '../utils/GlobalCache'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { FaCrown, FaPoop } from "react-icons/fa"

import { secToTime, dateString } from "../utils/DateUtils"

export const RatingTable = () => {

	const [playerRatings, setPlayerRatings] = useState(cache.playerRatings || [])

	const getRatingData = () => {
		axios.get('https://api.mineserv.top/api/players/project/?name=mcbrawl&offset=0&limit=15&timeframe=all_time')
		.then((res) => {
			cache.playerRatings = res.data.players
			setPlayerRatings(res.data.players)

			setTimeout(getRatingData, 300000)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	useEffect(getRatingData, [])

	return (
    <Flex fontFamily='Iosevka' direction='column' align='center' justify='center'>
    	<Text fontSize={24} color="#FCD9FF" fontWeight='bold' textAlign='center'>Рейтинг игроков</Text>
        <Flex shadow='inset 0px 0px 30px 10px #00000052' transition='ease 1000ms'
            marginTop={5} borderColor='purple' borderWidth={1} borderRadius={15} paddingY={5} width={{ base: 580, sm: 840, md: 800, xl: 1000, '2xl': 1300 }} direction='column'>
            <TableContainer>
            <Table variant='simple' colorScheme='purple'>
                <TableCaption><Flex fontFamily='Iosevka' justify='center' width='full'>Остальные - амогусы</Flex></TableCaption>
                <Thead>
                <Tr>
                    <Th><Flex fontFamily='Iosevka' justify='center' width='full'>Место</Flex></Th>
                    <Th><Flex fontFamily='Iosevka' justify='center' width='full'>Аватар</Flex></Th>
                    <Th><Flex fontFamily='Iosevka' justify='center' width='full'>Никнейм</Flex></Th>
                    <Th><Flex fontFamily='Iosevka' justify='center' width='full'>Время на сервере</Flex></Th>
                    <Th><Flex fontFamily='Iosevka' justify='center' width='full'>Последний онлайн</Flex></Th>
                </Tr>
                </Thead>
                <Tbody>
                {
                    playerRatings.map((player) => {
                        return <Tr>
                            <Td><Flex justify='center' width='full'>{player.place <= 3 ? <FaCrown color={player.place == 1 ? 'gold' : player.place == 2 ? 'silver' : '#C67444'}/> : player.place}</Flex></Td>
                            <Td><Flex justify='center' width='full'><Image src={`https://minotar.net/avatar/${player.name}/25`} height={25} borderRadius={5}/></Flex></Td>
                            <Td><Flex justify='center' width='full'>{player.name}</Flex></Td>
                            <Td><Flex justify='center' width='full'>{secToTime(player.game_time)}</Flex></Td>
                            <Td><Flex justify='center' width='full'>{dateString(new Date(player.last_online))}</Flex></Td>
                        </Tr>
                    })
                }
                </Tbody>
            </Table>
            </TableContainer>
            </Flex>
        </Flex>
    // </Flex>
  )
}