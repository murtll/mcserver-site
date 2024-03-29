import { 
    Text, 
    Flex, 
    Spacer, 
    Skeleton,
    Image,
    HStack
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { cache } from "../utils/GlobalCache"
import '@fontsource/iosevka'
import Fade from 'react-reveal/Fade'

import './Scroll.css'

export const ServerInfo = (props) => {

    const [playerCount, setPlayerCount] = useState(cache.playerCount || null)
    const [showPlayers, setShowPlayers] = useState(false)
    const [playerList, setPlayerList] = useState(
        cache.playerList || []
        // ['aboba', 'murtll', 'jairman', 'tornado7898', 'vitalik', 'BolderHuelder', 'VOLERA2341', 'CatsGeimer']
        )

    const getPlayerCountAndUpdate = () => {
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            // cache.playerCount = res.data.Players
            // cache.playerList = res.data.Playerlist
            setPlayerCount(res.data.Playerlist.length)
            setPlayerList(res.data.Playerlist)

            // to auto update
            setTimeout(getPlayerCountAndUpdate,
                10000)
          })
	    .catch((err) => {
		console.log(err)
	    })
    }

    useEffect(getPlayerCountAndUpdate, [])

    return (
        <Flex 
        position='absolute'
        // zIndex={10}
        align='center'
        marginTop={{base: 45, md: 71}}
        transition='ease 400ms' direction='column' onMouseLeave={() => setShowPlayers(false)}>
        <Flex zIndex='5' _hover={{ cursor: 'pointer' }} height='min-content' width='min-content' {...props} onMouseEnter={() => { setShowPlayers(true) }} >
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={20}>Онлайн:</Text>
                {playerCount === null ? 
                    <Skeleton marginLeft={2} height={25} width={3} borderRadius={15} startColor='purple.400' endColor='purple.900' opacity={0.3}/> : 
                    <Text color="#FFFFFF" 
                    fontFamily="Iosevka" 
                    fontWeight="bold" marginLeft={2} fontSize={20}>{playerCount}</Text>}
        </Flex>
        <Fade collapse top when={showPlayers} duration={400} distance='45px'>
        <Flex
        shadow='2xl'
        overflow='hidden'
        transition='ease 400ms'
        width={160}
        fontFamily="Iosevka"
        borderWidth={1} 
        backgroundColor='#3f007c'
        borderColor='#69009B' 
        justify='center' 
        align='center' 
        marginTop={35} 
        borderRadius={15}
        paddingBottom={playerCount > 5 || playerCount == 0 ? 0 : 3}
        zIndex='3'
        >

            {
                playerList 
                && playerCount > 0 
                ? 
                <Flex width='full' align='center' direction='column' overflow={`hidden ${playerCount > 5 ? 'scroll' : 'none'}`} height={playerCount < 5 ? 37 * playerCount : 176} paddingY={2} scrollPaddingY={2}>
                {
                playerList.map((playerName, i) => {
                    return <HStack
                    width='80%'
                    paddingTop={1}
                    marginX={3}
                    paddingBottom={1}
                    borderTopColor='purple'
                    borderTopWidth={i === 0 ? 0 : 1}
                    >
                        <Image src={`https://minotar.net/avatar/${playerName}/25`} height={25} borderRadius={5}/>
                        <Text
                        textAlign='center'
                        fontSize={16}>
                            {playerName.length > 12 ? `${playerName.substring(0, 9)}...` : playerName}
                        </Text>
                    </HStack> 
                })
                }
                </Flex>
                :
                <Text
                    textAlign='center'
                    paddingY={2}
                    fontSize={18}>
                        Никого нет :(
                    </Text>
            }

        </Flex>
        </Fade>
        </Flex>
    )
}
