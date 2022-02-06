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
    Textarea
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import config from '../../config'
import { cache } from '../../utils/GlobalCache'
import axios from "axios"
import '@fontsource/iosevka'
import parse from 'html-react-parser'
import { Select } from "chakra-react-select";


export const EditDialog = ({item, isOpen, onClose, reload}) => {
    const apiUrl = config.apiUrl
    const [editedItem, setEditedItem] = useState()
    const [loading, setLoading] = useState('initial')

    const [imageList, setImageList] = useState(cache.imageList || [])
    const [uploadingImage, setUploadingImage] = useState('initial')
    const [adminKey, setAdminKey] = useState()
    const [newImage, setNewImage] = useState()


    useEffect(() => {
        setEditedItem(item)
    }, [item])

    const loadImages = () => {
        axios.get(`${apiUrl}/admin/images`).then((res) => {
            console.log(res)
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
        formData.append('category_id', item.category_id)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': adminKey
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
            const res = await axios.put(`${apiUrl}/admin/item`, JSON.stringify(editedItem), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            setAdminKey(null)
            setEditedItem(null) 
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

    if (item && editedItem) return (
        <Modal onClose={() => {setAdminKey(null); setEditedItem(item); onClose()}} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 'max-content'}} fontFamily="Iosevka" marginX={10}>
          <ModalHeader fontSize={24} alignSelf="center">{editedItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              <Flex direction={{base: 'column', lg: 'row'}} alignItems='center' width='full'>
                  <Flex width='full' marginRight={{base: 5, lg: 20}} paddingRight={{base: 5, lg: 20}} marginBottom={{base: 10, lg: 5}} paddingBottom={{base: 10, lg: 5}} direction='column' borderRightWidth={{base: 0, lg: 1}} borderBottomWidth={{base: 1, lg: 0}} borderRightColor='whitesmoke' borderColor='whitesmoke'>
                      {
                          Object.keys(item)
                          .filter((prop) => prop !== 'id' && prop !== 'category_id')
                          .map((prop) => {

                            if (prop === 'picture') return (
                                <>
                                <FormControl marginTop={6} width="full">
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                <Select
                                    hasStickyGroupHeaders={true}
                                    selectedOptionColor='purple'
                                    value={{
                                        label: editedItem.picture.substring(editedItem.picture.lastIndexOf('/') + 1),
                                        value: editedItem.picture
                                    }}
                                    size='lg'
                                    options={imageList.map((folder) => { 
                                        return { 
                                            label: `${folder.folder[0].toUpperCase()}${folder.folder.substring(1)}`, 
                                            options: folder.images.map((image) => {
                                                return {
                                                    label: image.substring(image.lastIndexOf('/') + 1),
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
                                            <Flex marginTop={15} direction='row' alignItems='center'>
                                                <input type="file" onChange={(e) => setNewImage(e.target.files[0])} />
                                                <Button width={150} type="submit" isLoading={uploadingImage === "loading"} loadingText="Загрузка...">{uploadingImage === 'ok' ? 'Загружено!' : uploadingImage === 'error' ? 'Ошибка' : 'Загрузить'}</Button>
                                            </Flex>
                                        </form>
                                        { newImage ? <FormControl marginTop={6} width="full" isRequired>
                                            <FormLabel>Ключ администратора</FormLabel>
                                            <Input value={adminKey} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                                            onChange={(event) => {setAdminKey(event.target.value)}}
                                            />
                                        </FormControl> : <></>}
                                    </Flex>
                                </FormControl>
                                </>
                              )
                              
                            if (prop === 'description') return (
                                <FormControl marginTop={6} width="full">
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                    <Textarea height='max-content' borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedItem[prop].replaceAll('<br>', '\n')}
                                    onChange={(event) => setEditedItem({...editedItem, [prop]: event.target.value.replaceAll('\n', '<br>')})}
                                    />
                                </FormControl>
                              )

                              return (
                                <FormControl marginTop={6} width="full">
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                {<Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedItem[prop]}
                                    onChange={(event) => setEditedItem({...editedItem, [prop]: event.target.value})}
                                    />}
                                </FormControl>
                              )


                          })
                      }
                    { !newImage ? <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Ключ администратора</FormLabel>
                        <Input value={adminKey} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        onChange={(event) => {setAdminKey(event.target.value)}}
                        />
                    </FormControl> : <></>}
                  </Flex>

                  <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                  <VStack spacing={21} alignItems='center'>
                    <Image alignSelf='center' src={`${apiUrl}${editedItem.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>{editedItem.description ? parse(editedItem.description) : ''}</Text>
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
            <Button onClick={() => {setAdminKey(null); setEditedItem(item)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendItem}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}