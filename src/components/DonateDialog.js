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
import parse from 'html-react-parser'
import config from '../config'

export const DonateDialog = ({donateItem, isOpen, onClose}) => {
    const apiUrl = config.apiUrl

    return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{donateItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                  <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${donateItem.picture}`} maxHeight={300} maxWidth={300} />
                    <Text>{donateItem.description ? parse(donateItem.description) : ''}</Text>
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
                    <Button width="full" backgroundColor="#69009B" borderRadius={15} px="8" mt={10} type="submit">
                        Купить за {donateItem.price}₽
                    </Button>
                </form>
            </Flex>
          </ModalBody>
          {/* <ModalFooter>
            <Button>Оплатить</Button>
          </ModalFooter> */}
        </ModalContent>
        </Modal>
    )
}