import { 
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
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

export const AddCategoryDialog = ({isOpen, onClose, reload}) => {

    const defaultCategory = {
        name: '',
        link: ''
    }

    const apiUrl = config.apiUrl
    const [editedCategory, setEditedCategory] = useState(defaultCategory)
    const [loading, setLoading] = useState('initial')

    // useEffect(() => {
    //     setEditedCategory(editedCategory)
    // }, [])

    var adminKey = null

    const sendCategory = async () => {
        setLoading('loading')
        console.log(JSON.stringify(editedCategory));
        try {
            const res = await axios.post(`${apiUrl}/admin/category`, JSON.stringify(editedCategory), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            reload()
            setTimeout(() => {
                setLoading('initial')
                setEditedCategory(defaultCategory);
                onClose()
            }, 500)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

    if (editedCategory) return (
        <Modal onClose={() => {setEditedCategory(defaultCategory); onClose()}} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 'max-content'}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{editedCategory.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              {/* <Flex direction='row'> */}
                  <Flex direction='column'>
                      {
                          Object.keys(defaultCategory)
                          .filter((prop) => prop !== 'id' && prop !== 'category_id')
                          .map((prop) => {
                              return (
                                <FormControl marginTop={6} width="full" isRequired>
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                    <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedCategory[prop]}
                                    isDisabled={prop === 'category'}
                                    onChange={(event) => setEditedCategory({...editedCategory, [prop]: event.target.value})}
                                    />
                                </FormControl>
                              )
                          })
                      }
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Ключ администратора</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        onChange={(event) => {adminKey = event.target.value}}
                        />
                    </FormControl>
                  </Flex>
            {/* </Flex> */}
          </ModalBody>
          <ModalFooter alignItems='start'>
            <Button onClick={() => {setEditedCategory(defaultCategory)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendCategory}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}
