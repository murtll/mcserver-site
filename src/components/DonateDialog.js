import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    Button,
    Text,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Spacer
  } from '@chakra-ui/react'
import '@fontsource/iosevka'
import { Markup } from 'interweave'
import { FaInfoCircle } from 'react-icons/fa'
// import parse from 'html-react-parser'
import config from '../config'



export const DonateDialog = ({donateItem, isOpen, onClose}) => {
    const apiUrl = config.apiUrl

    return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={{base: 'outside', md: 'inside'}} isCentered={window.innerHeight > 800}>
        <ModalOverlay bgColor='#18003690' />
        <ModalContent bgColor="#311056" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{donateItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Flex direction='column'>
              <Flex transition='ease 1000ms' direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                  <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${donateItem.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>
                      <Markup content={donateItem.description} />
                    </Text>
                  </VStack>
                  <Spacer minWidth={10}></Spacer>
                <form>
                    <FormControl paddingTop={{base: 8, md: 0}} width="full" isRequired>
                        <FormLabel>Ник в игре</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text" placeholder="Nickname" />
                    </FormControl>
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="email" placeholder="example@example.com" />
                    </FormControl>
                    <Button width="full" backgroundColor="#99107B" borderRadius={15} px="8" mt={10} type="submit">
                        Купить за {donateItem.price}₽
                    </Button>
                </form>
            </Flex>

            <Flex direction='row' alignItems='center' justify='center' padding={3} marginTop={8} backgroundColor='#31406652' borderRadius={15}>
              <FaInfoCircle color='#9555b5' size={25}/>
              <Text fontSize={13} textAlign='center' textColor='#9555b5' marginLeft={4}>Купленный товар будет начислен на ваш аккаунт автоматически после оплаты</Text>
            </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
        </Modal>
    )
}
