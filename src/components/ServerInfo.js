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
    // const [mobileWidth, setMobileWidth] = useState(window.matchMedia('(max-width: 767px)').matches)
    // const [windowWidth, setWindowWidth] = useState(window.innerWidth)


    const getPlayerCount = () => {
        setPlayerCount(null)
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            cache.playerCount = res.data.Players
            setPlayerCount(res.data.Players)
          })
	    .catch((err) => {
		console.log(err)
	    })
    }

    const getPlayerCountAndUpdate = () => {
        axios.get(`https://api.minetools.eu/query/play.mcbrawl.ru/25565`).then((res) => {
            cache.playerCount = res.data.Players
            setPlayerCount(res.data.Players)

            // to auto update
            setTimeout(getPlayerCountAndUpdate,
                10000)
          })
	    .catch((err) => {
		console.log(err)
	    })
    }

    useEffect(() => {
        getPlayerCountAndUpdate()
    }, [])

    return (
        <Flex _hover={{ cursor: 'pointer' }} onClick={getPlayerCount} height='min-content' width='min-content' {...props}>
                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={20}>Онлайн:</Text>
                {playerCount === null ? 
                    <Skeleton marginLeft={2} height={25} width={3} borderRadius={15} startColor='purple.400' endColor='purple.900' opacity={0.3}/> : 
                    <Text color="#FFFFFF" 
                    fontFamily="Iosevka" 
                    fontWeight="bold" marginLeft={2} fontSize={20}>{playerCount}</Text>}
        </Flex>
    )
}
