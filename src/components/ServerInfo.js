import { 
    Text, 
    Flex, 
    Spacer, 
    Skeleton
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { cache } from "../utils/GlobalCache"
import '@fontsource/iosevka'


export const ServerInfo = (props) => {

    const [playerCount, setPlayerCount] = useState(cache.playerCount || null)
    const [showPlayers, setShowPlayers] = useState(false)
    const [playerList, setPlayerList] = useState(cache.playerList || [])
        // ['aboba', 'murtll', 'jairman', 'tornado7898', 'BolderHuelderrrrr', 'VOLERA2341', 'CatsGeimer']
    // const [mobileWidth, setMobileWidth] = useState(window.matchMedia('(max-width: 767px)').matches)
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)


    const getPlayerCount = () => {
        // setPlayerCount(null)
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            cache.playerCount = res.data.Players
            cache.playerList = res.data.Playerlist
            setPlayerCount(res.data.Players)
            setPlayerList([res.data.Playerlist])

          })
	    .catch((err) => {
		console.log(err)
	    })
    }

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
        position='fixed' 
        marginTop={{base: 45, md: 71}}
        transition='ease 400ms' direction='column' onMouseEnter={() => {setShowPlayers(true); getPlayerCount()}} onMouseLeave={() => setShowPlayers(false)}>
        <Flex _hover={{ cursor: 'pointer' }} height='min-content' width='min-content' {...props}>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={20}>Онлайн:</Text>
                {playerCount === null ? 
                    <Skeleton marginLeft={2} height={25} width={3} borderRadius={15} startColor='purple.400' endColor='purple.900' opacity={0.3}/> : 
                    <Text color="#FFFFFF" 
                    fontFamily="Iosevka" 
                    fontWeight="bold" marginLeft={2} fontSize={20}>{playerCount}</Text>}
        </Flex>
        { showPlayers ?
        <Flex 
        shadow='2xl '
        transition='ease 400ms'
        width={160}
        fontFamily="Iosevka"
        borderWidth={1} 
        backgroundColor='#3D007Aa2'
        borderColor='#69009B' 
        direction='column' 
        justify='center' 
        align='center' 
        marginTop={15} 
        borderRadius={15}
        paddingY={1}
        >
            {
                playerList && playerCount > 0 ? 
                playerList.slice(0, 5).map((playerName, i) => {
                    return <Text
                    textAlign='center'
                    width='80%'
                    paddingTop={1}
                    paddingBottom={1}
                    borderTopColor='purple'
                    borderTopWidth={i === 0 ? 0 : 1}
                    fontSize={18}>
                        {playerName.length > 14 ? `${playerName.substring(0, 11)}...` : playerName}
                    </Text>
                })
                :
                <Text
                    textAlign='center'
                    paddingY={2}
                    fontSize={18}>
                        Никого нет :(
                    </Text>
            }{
                playerCount > 5 ?
                <Text
                    paddingX={35}
                    paddingBottom={1}
                    paddingTop={1}
                    fontSize={16}>
                        {`и ещё ${playerCount - 5}`}
                    </Text>
                : <></>
            }
        </Flex>
        : <></>
        }
        </Flex>
    )
}
