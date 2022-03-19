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


export const ServerInfo = (props) => {

    const [playerCount, setPlayerCount] = useState(cache.playerCount || null)
    const [showPlayers, setShowPlayers] = useState(false)
    const [playerList, setPlayerList] = useState(
        cache.playerList || []
        // ['aboba', 'murtll', 'jairman', 'tornado7898', 'vitalik', 'BolderHuelder', 'VOLERA2341', 'CatsGeimer']
        )
    // const [mobileWidth, setMobileWidth] = useState(window.matchMedia('(max-width: 767px)').matches)
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)


    // const getPlayerCount = () => {
    //     // setPlayerCount(null)
    //     axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
    //         cache.playerCount = res.data.Players
    //         cache.playerList = res.data.Playerlist
    //         setPlayerCount(res.data.Players)
    //         setPlayerList(res.data.Playerlist)

    //       })
	//     .catch((err) => {
	// 	console.log(err)
	//     })
    // }

    const getPlayerCountAndUpdate = () => {
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            cache.playerCount = res.data.Players
            cache.playerList = res.data.Playerlist
            setPlayerCount(res.data.Players)
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
        {/* { showPlayers ? */}
        <Fade collapse top when={showPlayers} duration={400} distance='45px'>
        <Flex         
        shadow='2xl'
        transition='ease 400ms'
        width={160}
        fontFamily="Iosevka"
        borderWidth={1} 
        backgroundColor='#3f007c'
        borderColor='#69009B' 
        direction='column' 
        justify='center' 
        align='center' 
        marginTop={35} 
        borderRadius={15}
        paddingY={2}
        zIndex='3'
        >
            {
                playerList 
                && playerCount > 0 
                ? 
                playerList.slice(0, 5).map((playerName, i) => {
                    return <HStack
                    width='80%'
                    paddingTop={1}
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
                :
                <Text
                    textAlign='center'
                    paddingY={2}
                    fontSize={18}>
                        Никого нет :(
                    </Text>
            }{
                playerCount > 5 
                ?
                <Text
                    paddingX={35}
                    paddingBottom={1}
                    paddingTop={1}
                    fontSize={14}>
                        {`и ещё ${playerCount - 5}`}
                    </Text>
                : <></>
            }
        </Flex>
        </Fade>
        {/* : <></>
        } */}
        </Flex>
    )
}
