import { HStack, Button, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const Categories = () => {

    const categories = [
        {
            name: 'Кейсы',
            link: '/cases'
        },
        {
            name: 'Привилегии',
            link: '/privileges'
        },
        {
            name: 'Гемы',
            link: '/money'
        },
        {
            name: 'Разбаны',
            link: '/bans'
        },
    ]

    return (
        <HStack spacing={47}>
            {
                categories.map((category) => {
                    if (window.location.pathname === category.link) return (
                        <Button borderRadius="15" backgroundColor="#180036" borderWidth={3} borderColor="#69009B" py="12" px="14">
                            <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">{category.name}</Text>
                        </Button>          
                    )
                    else return (
                        <Link to={category.link}>
                            <Button borderRadius="15" bgColor="#69009B" py="12" px="14">
                                <Text color="#FCD9FF" fontFamily="Iosevka" fontWeight="normal" fontSize="28">{category.name}</Text>
                            </Button>
                        </Link>
                    )
                })
            }
    </HStack>
    )
}