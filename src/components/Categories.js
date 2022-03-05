import { 
    Button, 
    Text, 
    Flex, 
    Spacer, 
    Menu, 
    MenuButton,
    MenuList,
    MenuItem,
    Skeleton
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import config from "../config"
import { useEffect, useState } from "react"
import axios from "axios"
import { cache } from "../utils/GlobalCache"
import { FaChevronDown } from 'react-icons/fa'

export const Categories = () => {

    const [categories, setCategories] = useState(cache.categories || [])
    const apiUrl = config.apiUrl
    const [mobileWidth, setMobileWidth] = useState(window.matchMedia('(max-width: 767px)').matches)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  
    useEffect(() => {
      axios.get(`${apiUrl}/categories`).then((res) => {
        // console.log(res)
        cache.categories = res.data
        setCategories(res.data)
      })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setMobileWidth(window.matchMedia('(max-width: 767px)').matches)
            setWindowWidth(window.innerWidth)
        })
    }, [])

        if (mobileWidth) {
            if (categories.length > 0)
            return (
                <Flex width='full' fontFamily='Iosevka' fontSize={20}>
                    <Menu>
                    <MenuButton as={Button} variant='outline' shadow='2xl' borderWidth={3} borderRadius={15} borderColor="#69009B" rightIcon={<FaChevronDown />} width='full' marginX={25} paddingY={8}>
                        <Text fontSize={20}>{(categories.find((category) => category.link === window.location.pathname) || { name: 'Категории' }).name}</Text>
                    </MenuButton>
                    <MenuList minWidth={windowWidth - 50} 
                    // bg='#2b1446'
                    bg='#3d0061'
                    borderWidth={0}
                    position='absolute'>
                        {
                            categories.map((category) => {
                                if (category.link !== window.location.pathname) return (
                                    <Link to={category.link} key={category.id}>
                                <MenuItem key={category.id} textAlign='center'>
                                        <Flex paddingY={3} width='full' textAlign='center' alignItems='center' justify='space-around'>
                                            <Text>{category.name}</Text>
                                        </Flex>
                                    </MenuItem>
                                    </Link>
                                )
                                else return (<></>)
                            })
                        }
                    </MenuList>
                </Menu>
                </Flex>
            )
            else return (
                <Skeleton shadow='dark-lg' height={70} width='90%' borderRadius={15} startColor='purple.400' endColor='purple.900' opacity={0.3}/>
            )
        } else {
            if (categories.length > 0) return (
                <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'center'}} transition='ease 1000ms'>
                    {
                        categories.map((category) => {
                            if (window.location.pathname === category.link) return ( <>
                                <Button transition='ease 200ms' 
                                key={category.id} shadow='dark-lg' borderRadius="15" variant='outline' borderWidth={3} borderColor="#69009B" py={{base: 12, md: 8, lg: 12}} px={{base: 14, md: 10, lg: 14}}>
                                    <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 24, md: 20, lg: 24}}>{category.name}</Text>
                                </Button>
                                {category !== categories[categories.length - 1] ? <Spacer key={`spacer${categories.id}`} minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} /> : <></> }
                                </>
                            )
                            else return (<>
                                <Link to={category.link} key={category.id}>
                                    <Button transition='ease 200ms'
                                    shadow='dark-lg' borderRadius={15} bgColor="#69009B92" py={{base: 12, md: 8, lg: 12}} px={{base: 14, md: 10, lg: 14}}>
                                        <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 24, md: 20, lg: 24}}>{category.name}</Text>
                                    </Button>
                                </Link>
                                {category !== categories[categories.length - 1] ? <Spacer key={`spacer${categories.id}`} minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} /> : <></> }
                                </>
                            )
                        })
                    }
            </Flex>
            )
            else
            return (
                <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'center'}}>
                    <Skeleton key={1} shadow='dark-lg' height={100} width={200} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.3}/>
                    <Spacer key={2} minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} />                
                    <Skeleton key={3} shadow='dark-lg' height={100} width={200} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.3}/>
                    <Spacer key={4} minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} />
                    <Skeleton key={5} shadow='dark-lg' height={100} width={200} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.3}/>
                    <Spacer key={6} minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} />                
                    <Skeleton key={7} shadow='dark-lg' height={100} width={200} borderRadius={15} startColor='#18003682' endColor='#180036dd' opacity={0.3}/>                
                </Flex>
            )
        }
    }
