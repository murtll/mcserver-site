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
    HStack,
    VStack,
    FormControl,
    FormLabel,
    Input
  } from '@chakra-ui/react'
import '@fontsource/iosevka'
import parse from 'html-react-parser'
import config from '../config'

export const DonateDialog = ({donateItem, isOpen, onClose}) => {
    const apiUrl = config.apiUrl

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={700} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{donateItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              <HStack spacing={31}>
                  <VStack spacing={21}>
                    <Image src={`${apiUrl}${donateItem.picture}`} maxHeight={300} maxWidth={300} />
                    <Text>{() => {if (donateItem.description) return parse(donateItem.description)}}</Text>
                  </VStack>
                <form>
                    <FormControl width="full" isRequired>
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
            </HStack>
          </ModalBody>
          {/* <ModalFooter>
            <Button>Оплатить</Button>
          </ModalFooter> */}
        </ModalContent>
        </Modal>
    )
}