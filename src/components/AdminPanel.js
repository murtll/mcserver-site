import { 
    Flex,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spacer,
    Box,
    Text,
    Image,
    VStack,
    SimpleGrid,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import config from '../config'
import { cache } from '../utils/GlobalCache'
import { GoTrashcan, GoPencil, GoPlus, } from 'react-icons/go'
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import '@fontsource/iosevka'
import parse from 'html-react-parser'

export const AdminPanel = () => {
    const [currentCategory, setCurrentCategory] = useState({link: '/cases'})
    const [categories, setCategories] = useState(cache.categories)
    const apiUrl = config.apiUrl

    const editClosure = useDisclosure()
    const addClosure = useDisclosure()
    const deleteClosure = useDisclosure()

    const loadCategories = () => {
        axios.get(`${apiUrl}/categories`).then((res) => {
            console.log(res)
            cache.categories = res.data
            setCategories(res.data)
            // setCurrentCategory(categories[0])
          })
    }

    useEffect(loadCategories, [])
    
    if (categories.length > 0 && currentCategory.link) return (
        <Flex marginX={{base: 10, xl: 100}} marginY={70} direction={{base: 'column', lg: 'row'}} alignItems={{base: 'center', md: 'start'}} borderColor="purple" borderRadius={30} borderWidth={1} fontFamily="Iosevka">
            <DeleteCategoryDialog category={currentCategory} isOpen={deleteClosure.isOpen} onClose={deleteClosure.onClose} reload={() => { setCurrentCategory(categories[0]); loadCategories() } }/>
            <EditCategoryDialog category={currentCategory} isOpen={editClosure.isOpen} onClose={editClosure.onClose} reload={loadCategories}/>
            <AddCategoryDialog isOpen={addClosure.isOpen} onClose={addClosure.onClose} reload={loadCategories}/>
            <Flex width={{base: 'full', lg: 300}} direction={{base: 'column', md: 'column'}} alignItems='center' fontSize={20} borderColor="purple" borderRadius={30} borderRightWidth={1} borderBottomWidth={1} borderLeftWidth={1}>
                {/* maxWidth={{base: 'full', md: undefined}} borderColor="purple" borderRadius={30} borderTopEndRadius={0} borderRightWidth={1} borderBottomWidth={1} borderLeftWidth={1} */}
                {
                    categories.map((category) => {
                        return (
                            <Flex 
                            //  maxWidth={{base: 'full', md: 300}}
                             width={{base: 'full', lg: 300}}
                             paddingX={30} 
                             paddingBottom={4} 
                             paddingTop={4} 
                             direction='row' 
                             alignItems='center' 
                             borderBottomColor='purple' 
                             backgroundColor={ category.link === currentCategory.link ? 'purple' : '' } 
                             borderBottomWidth={1}
                             borderTopRadius={category.link === categories[0].link ? 30 : 0}
                            //  borderTopEndRadius={category.link !== categories[0].link ? 30 : 0}
                             _hover={{
                                 backgroundColor: '#2b1446',
                                 cursor: 'pointer'
                             }}
                             onClick={() => setCurrentCategory(category)}
                             >
                                <Text _hover={{cursor: 'pointer'}} onClick={() => setCurrentCategory(category.link.substring(1))}>{category.name}</Text>
                                { currentCategory.link === category.link ? <>
                                <Spacer minWidth={8}/>
                                <Box _hover={{cursor: 'pointer'}}  onClick={editClosure.onOpen}>
                                    <GoPencil />
                                </Box>
                                <Spacer maxWidth={2} width={2}/>
                                <Box _hover={{cursor: 'pointer'}} onClick={deleteClosure.onOpen}>
                                    <GoTrashcan color="red"/>
                                </Box>
                                </> : <></>}
                            </Flex>
                        )
                    })
                }
                <Flex 
                 width='full' 
                 paddingX={30} 
                 paddingBottom={4} 
                 paddingTop={4} 
                 direction='row' 
                 alignItems='center' 
                 borderBottomColor='purple' 
                 borderBottomWidth={1}
                 bgColor='#2c1a4d' 
                 borderBottomRadius={30}
                 _hover={{
                     backgroundColor: '#2b1446',
                     cursor: 'pointer'
                 }}
                 onClick={addClosure.onOpen}
                 >
                    <GoPlus />
                    <Text marginLeft={3}>Добавить</Text>
                </Flex>
            </Flex>
            <Flex width='full' marginY={10} marginX={20} alignItems='center'>
                <AdminItemGrid currentCategory={currentCategory}/>
            </Flex>                
        </Flex>
    ) 
    else return <></>
}

const AdminItemGrid = ({ currentCategory }) => {
    const [items, setItems] = useState([])
    const [hovered, setHovered] = useState(null)
    const [ currentItem, setCurrentItem ] = useState(null)

    const editClosure = useDisclosure()
    const addClosure = useDisclosure()
    const deleteClosure = useDisclosure()

    const apiUrl = config.apiUrl

    const loadItems = () => {
        console.log(currentCategory);
        setItems(cache[currentCategory.link] ? cache[currentCategory.link] : [])

        axios.get(`${apiUrl}${currentCategory.link}`).then((res) => {
          console.log(res)
          cache[currentCategory.link] = res.data
          setItems(res.data)
        })
    }

    useEffect(loadItems, [currentCategory, apiUrl])

    return (<>
        <EditDialog item={currentItem} isOpen={editClosure.isOpen} onClose={editClosure.onClose} reload={loadItems}/>
        <DeleteDialog item={currentItem} isOpen={deleteClosure.isOpen} onClose={deleteClosure.onClose} reload={loadItems}/>
        <AddDialog isOpen={addClosure.isOpen} onClose={addClosure.onClose} reload={loadItems} category={currentCategory ? currentCategory.link.substring(1) : ''}/>
        <SimpleGrid columns={{base: 1, sm: 2, md: 2, lg: 3, xl: 4, '2xl': 5}} spacingY={61} spacingX={41}>
        {items.map((item) => {
          return (
          <Box height={250} width={{base: 200, sm: 180, md: 200, }} variant='outline' borderRadius={15} borderWidth={3} borderColor="#69009B" py="4" px="4" alignItems="center"
          onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}
          _hover={{backgroundColor: '#2b1446'}}
          >
            {item.id === hovered ? 
            <Flex height='full' direction='column' alignItems='center'>
                <IconButton marginTop={10} boxSize={65} icon={<GoPencil size={40}/>} variant='outline' onClick={() => { setCurrentItem(item); editClosure.onOpen() }}/>
                <Spacer />
                <IconButton marginBottom={25} boxSize={55} icon={<GoTrashcan size={30}/>} backgroundColor='red' onClick={() => { setCurrentItem(item); deleteClosure.onOpen() }}/>
            </Flex> : 
            <Flex height='full' direction='column' alignItems='center'>
              <Image maxHeight={100} maxWidth={100} src={`${apiUrl}${item.picture}`}/>
              <Spacer />
              <Text cqlor="#FCD9FF"  fontWeight="normal" fontSize="18" textAlign="center">{item.name}</Text>
              <Spacer />
              <Box paddingX={12} paddingY={2} backgroundColor="#69009B" borderRadius={15} px="8">
                <Text color="#FCD9FF" fontWeight="normal" fontSize="18" textAlign="center">{item.price}₽</Text>
              </Box>
            </Flex>}
          </Box>)
        })}
        <IconButton icon={<FaPlus size={70} color='#69009B' />} height={250} variant='outline' maxWidth={200} borderRadius={15} borderWidth={3} borderColor="#69009B" py="12" px="14" alignItems="center" onClick={addClosure.onOpen} />
      </SimpleGrid>
      </>
    )
}

const EditDialog = ({item, isOpen, onClose, reload}) => {
    const apiUrl = config.apiUrl
    const [editedItem, setEditedItem] = useState()
    const [loading, setLoading] = useState('initial')

    var adminKey = null

    useEffect(() => {
        setEditedItem(item)
    }, [item])

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
            setTimeout(() => {
                setLoading('initial')
                reload()
                onClose()
            }, 1500)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

// todo a lot of shit

    if (item && editedItem) return (
        <Modal onClose={() => {setEditedItem(item); onClose()}} isOpen={isOpen} scrollBehavior='inside' isCentered>
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
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Ключ администратора</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        onChange={(event) => {adminKey = event.target.value}}
                        />
                    </FormControl>
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
            <Button onClick={() => {setEditedItem(item)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendItem}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}

const AddDialog = ({isOpen, onClose, reload, category}) => {

    const defaultItem = {
        name: '',
        description: '',
        picture: '',
        category: category,
        price: 0
    }

    const apiUrl = config.apiUrl
    const [editedItem, setEditedItem] = useState(defaultItem)
    const [loading, setLoading] = useState('initial')

    useEffect(() => {
        setEditedItem({
            ...editedItem,
            category: category
        })
    }, [category])

    var adminKey = null

    const sendItem = async () => {
        setLoading('loading')
        console.log(JSON.stringify(editedItem));
        try {
            const res = await axios.post(`${apiUrl}/admin/item`, JSON.stringify(editedItem), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            setTimeout(() => {
                setLoading('initial')
                onClose()
                reload()
            }, 2000)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

    if (editedItem) return (
        <Modal onClose={() => {setEditedItem(defaultItem); onClose()}} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 'max-content'}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{editedItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              <Flex direction='row'>
                  <Flex marginRight={20} paddingRight={20} direction='column' borderRightWidth={1} borderRightColor='whitesmoke'>
                      {
                          Object.keys(defaultItem)
                          .filter((prop) => prop !== 'id' && prop !== 'category_id')
                          .map((prop) => {
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
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Ключ администратора</FormLabel>
                        <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        onChange={(event) => {adminKey = event.target.value}}
                        />
                    </FormControl>
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
            <Button onClick={() => {setEditedItem(defaultItem)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendItem}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}

const DeleteDialog = ({item, isOpen, onClose, reload}) => {

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
            setTimeout(() => {
                setLoading('initial')
                onClose()
                reload()
            }, 2000)
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
                    <Text>{item.description ? parse(item.description) : ''}</Text>
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

const DeleteCategoryDialog = ({category, isOpen, onClose, reload}) => {

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
            setTimeout(() => {
                setLoading('initial')
                onClose()
                reload()
            }, 2000)
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

const EditCategoryDialog = ({category, isOpen, onClose, reload}) => {
    // TODO recheck 100 times
    const apiUrl = config.apiUrl
    const [editedCategory, setEditedCategory] = useState()
    const [loading, setLoading] = useState('initial')

    var adminKey = null

    useEffect(() => {
        setEditedCategory(category)
    }, [category])

    const sendCategory = async () => {
        setLoading('loading')
        console.log(JSON.stringify(editedCategory));
        try {
            const res = await axios.put(`${apiUrl}/admin/category`, JSON.stringify(editedCategory), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            setTimeout(() => {
                setLoading('initial')
                reload()
                onClose()
            }, 1500)
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }

    if (category && editedCategory) return (
        <Modal onClose={() => {setEditedCategory(category); onClose()}} isOpen={isOpen} scrollBehavior='inside' isCentered>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 'max-content'}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{editedCategory.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
              {/* <Flex direction='row'> */}
                  <Flex direction='column'>
                      {
                          Object.keys(category)
                          .filter((prop) => prop !== 'id' && prop !== 'category_id')
                          .map((prop) => {
                              return (
                                <FormControl marginTop={6} width="full">
                                    <FormLabel>{`${prop[0].toUpperCase()}${prop.substring(1)}`}</FormLabel>
                                {<Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                                    value={editedCategory[prop]}
                                    onChange={(event) => setEditedCategory({...editedCategory, [prop]: event.target.value})}
                                    />}
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

                  {/* <Flex direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
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
            </Flex>*/}
            {/* </Flex>  */}
          </ModalBody>
          <ModalFooter alignItems='start'>
            <Button onClick={() => {setEditedCategory(category)}}>Cбросить</Button>
            <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendCategory}>{loading === 'ok' ? 'Сохранено!' : loading === 'error' ? 'Ошибка' : 'Сохранить'}</Button>
          </ModalFooter>
        </ModalContent>
        </Modal>
    )
    else return (<></>)
}


const AddCategoryDialog = ({isOpen, onClose, reload}) => {

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
            setTimeout(() => {
                setLoading('initial')
                onClose()
                reload()
            }, 2000)
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
