import { 
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spacer,
    Text,
    Image,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import config from '../../config'
import axios from "axios"
import '@fontsource/iosevka'
import { Markup } from "interweave"
// import parse from 'html-react-parser'

export const DeleteDialog = ({item, isOpen, onClose, reload}) => {

    const apiUrl = config.apiUrl
    const [loading, setLoading] = useState('initial')

    var adminKey = null

    const sendItem = async () => {
        setLoading('loading')
        console.log(JSON.stringify(item));
        try {
            const res = await axios.delete(`${apiUrl}/admin/item`, {
                data: JSON.stringify(item),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            reload()
            setTimeout(() => {
                setLoading('initial')
                onClose()
            }, 500)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

    if (item) return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 'max-content'}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{item.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${item.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>
                        <Markup content={item.description}/>
                    </Text>
                </VStack>
                <Spacer minWidth={10}></Spacer>
                <Flex direction='column'>
                <FormControl paddingTop={{base: 8, md: 0}} width="full" isRequired>
                        <FormLabel>Ник в игре</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text" placeholder="Nickname" />
                    </FormControl>
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="email" placeholder="example@example.com" />
                    </FormControl>
                    <Button width="full" backgroundColor="#69009B" borderRadius={15} px="8" mt={10}>
                        Купить за {item.price}₽
                    </Button>
                </Flex>
            </Flex>
            <Flex direction='row' marginTop={35}>
                    <FormControl marginTop={6} isRequired>
                        <FormLabel>Ключ администратора</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        onChange={(event) => {adminKey = event.target.value}}
                        />
                    </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter alignItems='start'>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Удаление..." onClick={sendItem}>{loading === 'ok' ? 'Удалено!' : loading === 'error' ? 'Ошибка' : 'Удалить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}