import { HStack, Button, Text, Flex, Spacer } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import config from "../config"
import { useEffect, useState } from "react"
import axios from "axios"
import { cache } from "../utils/GlobalCache"

export const Categories = () => {

    const [categories, setCategories] = useState(cache.categories)
    const apiUrl = config.apiUrl
  
    useEffect(() => {
      axios.get(`${apiUrl}/categories`).then((res) => {
        console.log(res)
        cache.categories = res.data
        setCategories(res.data)
      })
    }, [setCategories, apiUrl])
  
    if (categories.length > 0) return (
        <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'center'}}>
            {
                categories.map((category) => {
                    if (window.location.pathname === category.link) return ( <>
                        <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py={{base: 12, md: 8, lg: 12}} px={{base: 14, md: 10, lg: 14}}>
                            <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 24, md: 20, lg: 24}}>{category.name}</Text>
                        </Button>
                        <Spacer minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} /></>
                    )
                    else return (<>
                        <Link to={category.link}>
                            <Button borderRadius="15" bgColor="#69009B" py={{base: 12, md: 8, lg: 12}} px={{base: 14, md: 10, lg: 14}}>
                                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize={{base: 24, md: 20, lg: 24}}>{category.name}</Text>
                            </Button>
                        </Link>
                        <Spacer minHeight={10} minWidth={{base: 47, md: 15, lg: 47}} />
                        </>
                    )
                })
            }
    </Flex>
    )
    else return (<></>)
}
