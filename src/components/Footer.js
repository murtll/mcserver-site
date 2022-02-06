import { Flex, Image, Link, Text } from "@chakra-ui/react"
import '@fontsource/iosevka'

export const Footer = () => {
    return (
        <Flex width='100%' bg="#2D115A72" paddingX={100} paddingY={50} alignItems='center' direction='column' borderTopRadius={50} fontFamily='Iosevka' textAlign='center'>
            <Image src='/images/payments.png' maxWidth={{base: 300, md: 500}} marginBottom={30}></Image>
            <Text>
                Copyright © BrawlCraft 2022. Все права защищены. Сервер BrawlCraft никак не относится к Mojang, AB.
            </Text>
            <Flex marginTop={15} direction={{base: 'column', md: 'row'}} alignItems='center'>
                <Link>Пользовательское соглашение</Link>
                <Text marginX={2}>·</Text>
                <Link>Политика обработки персональных данных</Link>
            </Flex>
        </Flex>
    )
}