import { 
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
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

export const DeleteCategoryDialog = ({category, isOpen, onClose, reload}) => {

    const apiUrl = config.apiUrl
    const [loading, setLoading] = useState('initial')

    var adminKey = null

    const sendCategory = async () => {
        setLoading('loading')
        try {
            const res = await axios.delete(`${apiUrl}/admin/category`, {
                data: JSON.stringify(category),
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

    if (category) return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 'max-content'}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{category.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                {/* <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${item.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>{item.description ? parse(item.description) : ''}</Text>
                </VStack> */}
                <Text>Link: {category.link}</Text>
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
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Удаление..." onClick={sendCategory}>{loading === 'ok' ? 'Удалено!' : loading === 'error' ? 'Ошибка' : 'Удалить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}
