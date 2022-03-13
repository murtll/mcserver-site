import { Box, VStack, Text, Flex, Link, HStack, Image, Spacer } from "@chakra-ui/react"
import '@fontsource/iosevka'
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa"
import Fade from "react-reveal/Fade"
import config from '../config'

const devs = [
    {
        name: 'murtll',
        description: 'Чел который не шарит за Майнкрафт, но любит прогать. Поэтому когда jairman предложил сделать сайт, перепрофилировался из линуксоида и бэкендера во фронтендера и сделал сайт.',
        image: '/images/special/iVan.png',
        social: [
            {
                link: 'https://instagram.com/esskeetiter',
                item: <><FaInstagram size={20}/><Text>@esskeetiter</Text></>
            }
        ]
    },
    {
        name: 'jairman',
        description: 'Босс этой шарашкиной конторы, который все придумал. Все детство слушал Славу КПСС и играл в Майнкрафт, а теперь - главный девопс и инженер Майнкрафта. Человек инфобизнеса и инфобезопасности.',
        image: '/images/special/jairman.png',
        social: [
            {
                link: 'https://youtube.com/Jairman',
                item: <><FaYoutube size={20}/><Text>Jairman</Text></>
            }
        ]
    },
    {
        name: 'BoulderHuelder',
        description: 'Дед, который решает вопросы с налогами и платежными системами. Если что-то пойдет не так, он сядет в тюрьму :)',
        image: '/images/special/boulder.png',
        social: [
            {
                link: 'https://www.tiktok.com/@yusipovj',
                item: <><FaTiktok size={20}/><Text>@yusipovj</Text></>
            }
        ]
    }
]

export const Developers = () => {
    return (
        <Flex width='full' justify='center' marginTop={20} marginBottom={40} overflow='hidden'>
        <VStack fontFamily='Iosevka' spacing={10} fontSize={20} align='start' width='60%'>
            {/* <Fade cascade bottom> */}
            {
                devs.map((dev, i) => {
                    return (
                        <Fade left={i % 2 == 0} right={i % 2 != 0}>
                        <Flex>
                        <Image height={100} width={100} borderRadius={15} src={config.apiUrl + dev.image} marginRight={10}/>
                        <Box>
                            <Text fontSize={24} fontWeight='bold'>{dev.name}</Text>
                            <Text color='#eeddff' >{dev.description}</Text>
                            {
                                dev.social.map((soc) => {
                                    return (
                                        <Link href={soc.link} isExternal>
                                            <HStack marginTop={3} fontSize={18}>
                                                {soc.item}
                                            </HStack>
                                        </Link>
                                    )
                                })
                            }
                        </Box>
                        </Flex>
                        </Fade>
                    )
                })
            }
            {/* </Fade> */}
        </VStack>
        </Flex>
    )
}
