import { Flex, Image, Text, Link, Spacer } from "@chakra-ui/react"
import '@fontsource/iosevka'

export const Footer = () => {
    return (
        <Flex width='100%' bg="#2D115A72" paddingX={{base: 8, md: 100}} paddingY={50} alignItems='center' direction='column' borderTopRadius={50} textColor='#bb90aa' fontFamily='Iosevka' fontSize={{base: 12, md: 15}} textAlign='center'>
            <Image alt='PaymentSystems.png' src='/images/payments.webp' maxWidth={{base: 300, md: 500}} marginBottom={30}></Image>
            <Text>
                Copyright © BrawlCraft 2022. Все права защищены. Сервер BrawlCraft никак не относится к Mojang, AB.
            </Text>
            <Flex direction={{base: 'column', '2xl': 'row'}} marginTop={2}>
            <Text>
                Самозанятый: Юсипов Артем Александрович
            </Text>
            <Spacer width={5}/>
            <Text>
                {'Email: '}
                <Link href='mailto:support@mcbrawl.ru'>
                    support@mcbrawl.ru
                </Link>
            </Text>
            <Spacer width={5}/>
            <Text>
                {'Телефон: '}
                <Link href='tel:+79955946134'>
                +79955946134
                </Link>
            </Text>
            <Spacer width={5}/>
            <Text>
                ИНН: 332709750981
            </Text>
            </Flex>
            <Flex marginTop={15} direction={{base: 'column', xl: 'row'}} alignItems='center'>
                <Link href='/public_offer.pdf' isExternal>Публичная оферта</Link>
                <Text marginX={2}>·</Text>
                <Link href='/privacy.pdf' isExternal>Политика конфиденциальности</Link>
                <Text marginX={2}>·</Text>

            <Link href='/paying_security_policy.pdf' isExternal>Политика безопасности PСI DSS при оплате картой</Link>
            </Flex>
        </Flex>
    )
}