import { 
    Flex,
    Textarea,
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
import { useState, useEffect } from "react"
import config from '../../config'
import { cache } from '../../utils/GlobalCache'
import axios from "axios"
import '@fontsource/iosevka'
import { Select } from "chakra-react-select"
import { Markup } from "interweave"

export const AddDialog = ({isOpen, onClose, reload, category}) => {

    const defaultItem = {
        name: '',
        description: '',
        picture: '',
        category: category,
        price: 0,
        min_number: 1,
        max_number: 1,
        command: ''
    }

    const apiUrl = config.apiUrl
    const [editedItem, setEditedItem] = useState(defaultItem)
    const [imageList, setImageList] = useState(cache.imageList || [])
    const [loading, setLoading] = useState('initial')
    const [uploadingImage, setUploadingImage] = useState('initial')
    const [newImage, setNewImage] = useState()

    useEffect(() => {
        setEditedItem({
            ...editedItem,
            category: category
        })
    }, [category])

    const loadImages = () => {
        axios.get(`${apiUrl}/admin/images`, { withCredentials: true }).then((res) => {
            cache.imageList = res.data
            setImageList(res.data)
          })
    }

    const uploadNewImage = (e) => {
        e.preventDefault()
        setUploadingImage('loading')
        const formData = new FormData();
        console.log(newImage);
        formData.append('picture', newImage)
        formData.append('category', category)
        const config = {
            withCredentials: true,
            headers: {
                'content-type': 'multipart/form-data',
            }
        }
        axios.post(`${apiUrl}/admin/image`, formData, config)
                .then((res) => {
                    console.log(res.data);
                    loadImages()
                    setEditedItem({...editedItem, picture: res.data.picture})
                    setUploadingImage('ok')
                    setNewImage(null)
                    setTimeout(() => {
                        setUploadingImage('initial')
                    }, 1000)
                })
                .catch((err) => {
                    setUploadingImage('error')
                    setTimeout(() => {
                        setUploadingImage('initial')
                    }, 1000)
                    console.log(err);
                })
    }

    useEffect(loadImages, [apiUrl])

    const sendItem = async () => {
        setLoading('loading')
        console.log(JSON.stringify(editedItem));
        try {
            await axios.post(`${apiUrl}/admin/item`, JSON.stringify(editedItem), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setLoading('ok')
            reload()
            setTimeout(() => {
                setLoading('initial')
                setEditedItem(defaultItem)
                onClose()
            }, 500)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

    if (editedItem) return (
        <Modal onClose={() => {setEditedItem(defaultItem); onClose()}} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 'max-content'}} marginX={10} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{editedItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              <Flex direction={{base: 'column', md: 'row'}} width='max-content'>
                  <Flex width='full' marginRight={{base: 5, lg: 20}} paddingRight={{base: 5, lg: 20}} marginBottom={{base: 10, lg: 5}} paddingBottom={{base: 10, lg: 5}} direction='column' borderRightWidth={{base: 0, lg: 1}} borderBottomWidth={{base: 1, lg: 0}} borderColor='whitesmoke' >
                      {
                          Object.keys(defaultItem)
                          .filter((prop) => prop !== 'id' && prop !== 'category_id')
                          .map((prop) => {
                              if (prop === 'picture') return (
                                <>
                                <FormControl marginTop={6} width="full" isRequired>
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                    <Select
                                    hasStickyGroupHeaders={true}
                                    selectedOptionColor='purple'
                                    value={editedItem.picture !== '' ? {
                                        label: editedItem.picture.substring(editedItem.picture.lastIndexOf('/') + 1),
                                        value: editedItem.picture
                                    } : null}
                                    size='lg'
                                    options={imageList.map((folder) => { 
                                        return { 
                                            label: `${folder.folder[0].toUpperCase()}${folder.folder.substring(1)}`, 
                                            options: folder.images.map((image) => {
                                                return {
                                                    label: <Flex>
                                                    		<Image
                                                                boxSize='2rem'
                                                                borderRadius='full'
                                                                src={`${apiUrl}${image}`}
                                                                mr='12px'
                                                            />
                                                    		<Text>{image.substring(image.lastIndexOf('/') + 1)}</Text>
                                                    	</Flex>,
                                                    value: image
                                                }
                                            }) } } )}
                                    placeholder="Выбрать из существующих"
                                    closeMenuOnSelect={true}
                                    onChange={(image) => setEditedItem({...editedItem, picture: image.value})}
                                    />
                                    <Text textAlign='center' marginTop={15}>или</Text>
                                    <Flex borderWidth={2} borderRadius={10} paddingX={5} paddingBottom={4} width='full' marginTop={15} direction='column' alignItems='center'>
                                        <form onSubmit={uploadNewImage}>
                                            <Flex marginTop={15} direction={{base: 'column', md: 'row'}} alignItems='center'>
                                                <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                                <Spacer minHeight={3}/>
                                                <Button width={150} type="submit" isLoading={uploadingImage === "loading"} loadingText="Загрузка...">{uploadingImage === 'ok' ? 'Загружено!' : uploadingImage === 'error' ? 'Ошибка' : 'Загрузить'}</Button>
                                            </Flex>
                                        </form>
                                    </Flex>
                                </FormControl>
                                </>
                              )
                              if (prop === 'description') return (
                                <FormControl marginTop={6} width="full" isRequired>
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                    <Textarea borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedItem[prop].replaceAll('<br>', '\n').replaceAll("\\'", "'")}
                                    onChange={(event) => setEditedItem({...editedItem, [prop]: event.target.value.replaceAll('\n', '<br>').replaceAll("'", "\\'")})}
                                    />
                                </FormControl>
                              )
                              return (
                                <FormControl marginTop={6} width="full" isRequired>
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                    <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedItem[prop]}
                                    isDisabled={prop === 'category'}
                                    onChange={(event) => setEditedItem({...editedItem, [prop]: event.target.value})}
                                    />
                                </FormControl>
                              )
                          })
                      }
                  </Flex>

                  <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                  <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${editedItem.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>
                        <Markup content={editedItem.description}/>    
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
                        Купить за {editedItem.price}₽
                    </Button>
                </Flex>
            </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter alignItems='start'>
            <Button onClick={() => {setEditedItem(defaultItem)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendItem}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}
