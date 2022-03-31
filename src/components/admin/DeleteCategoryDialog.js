import { 
    Flex,
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

    const sendCategory = async () => {
        setLoading('loading')
        try {
            await axios.delete(`${apiUrl}/admin/category`, {
                data: JSON.stringify(category),
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
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
                <Text>Link: {category.link}</Text>
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
