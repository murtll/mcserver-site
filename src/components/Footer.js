import { Flex, Image, Text, Link, Spacer } from "@chakra-ui/react"
import '@fontsource/iosevka'

export const Footer = () => {
    return (
        <Flex width='100%' bg="#2D115A72" paddingX={{base: 8, md: 100}} paddingY={50} alignItems='center' direction='column' borderTopRadius={50} textColor='#bb90aa' fontFamily='Iosevka' fontSize={{base: 12, md: 15}} textAlign='center'>
            <Image alt='PaymentSystems.png' src='/images/payments.webp' maxWidth={{base: 300, md: 500}} marginBottom={30}></Image>

            {/* <Flex marginBottom={5}>
                <Text marginTop={2} marginRight={2}>Данные для таблицы рейтинга получены с помощью </Text> <link rel="stylesheet" href="https://mineserv.top/widgets.min.css" /> <a href="https://mineserv.top/mcbrawl" target="_blank" rel="noopener noreferrer" class="mn-srv-btn mn-srv-btn--small"><span class="mn-srv-btn__icon"><svg width="16" height="16" viewBox="0 0 360 360"><g fill="none" fill-rule="evenodd"><path d="M0 0H360V360H0z" transform="translate(-371 -350) translate(371 350)"></path> <g fill="#FFF"><path d="M253.844 259.461L253.844.539 203.075.539 203.065 52.329 152.307 52.324 152.307 104.108 203.065 104.108 203.075 259.461zM152.307 156.432L152.307 104.647 101.538 104.647 101.538 156.432zM50.769.539L0 .539 0 259.461 50.769 259.461 50.769 104.108 101.538 104.108 101.538 52.324 50.769 52.324z" transform="translate(-371 -350) translate(371 350) translate(53 50)"></path></g></g></svg></span> <span class="mn-srv-btn__text">Mineserv</span></a>
            </Flex> */}
            <link rel="stylesheet" href="https://mineserv.top/widgets.min.css" /> <a style={{ backgroundColor: '#A000FF' }} href="https://mineserv.top/mcbrawl?vote" target="_blank" rel="noopener noreferrer" class="mn-srv-btn"><span class="mn-srv-btn__icon"><svg width="20" height="20" viewBox="0 0 20 20"><g fill="none" fill-rule="evenodd"><path d="M0 0H20V20H0z"></path> <path fill="white" fill-rule="nonzero" d="M9.731 1.818c-.351.032-.665.289-.748.66L8.52 4.514l-2.26 2.51c-.275.306-.428.703-.428 1.115v7.693c0 .921.746 1.667 1.667 1.667h6.693c.617 0 1.176-.364 1.427-.928l2.502-5.63c.139-.311.211-.65.211-.99v-.785c0-.917-.75-1.667-1.666-1.667h-5.834s.834-1.976.834-3.447c0-1.344-.865-1.933-1.577-2.19-.12-.043-.241-.056-.359-.045zM2.917 7.5c-.69 0-1.25.56-1.25 1.25v7.5c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-7.5c0-.69-.56-1.25-1.25-1.25z"></path></g></svg></span> <span class="mn-srv-btn__text">Голосовать за сервер</span></a>
            <Text marginTop={8}>
                Copyright © BrawlCraft 2022. Все права защищены. Сервер BrawlCraft не имеет отношения к Mojang AB.
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
                <Text marginX={2}>·</Text>
                <Link href='/developers'>О нас</Link>
            </Flex>
        </Flex>
    )
}