import { 
    Flex,
    Spacer,
    Box,
    Text,
    useDisclosure,
    FormControl,
    Input,
    FormLabel,
    Button
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import config from '../../config'
import { cache } from '../../utils/GlobalCache'
import { GoTrashcan, GoPencil, GoPlus } from 'react-icons/go'
import axios from "axios"
import '@fontsource/iosevka'

import { AdminItemGrid } from './AdminItemGrid'
import { EditCategoryDialog } from './EditCategoryDialog'
import { AddCategoryDialog } from './AddCategoryDialog'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'
import { PromosDialog } from './PromosDialog'

export const AdminPanel = () => {
    const [currentCategory, setCurrentCategory] = useState({ link: '/cases' })
    const [categories, setCategories] = useState(cache.categories || [])
    const [loggedIn, setLoggedIn] = useState(false)
    const [adminKey, setAdminKey] = useState()
    const [loading, setLoading] = useState('initial')
    const apiUrl = config.apiUrl

    const editClosure = useDisclosure()
    const addClosure = useDisclosure()
    const deleteClosure = useDisclosure()
    const promoClosure = useDisclosure()

    const loadCategories = () => {
        axios.get(`${apiUrl}/admin/categories`, { withCredentials: true })
            .then((res) => {
                setLoggedIn(true)
                cache.categories = res.data
                setCategories(res.data)
                // setCurrentCategory(categories[0])
          }).catch((err) => {
            setLoggedIn(false)
          })
    }

    useEffect(loadCategories, [])

    const logIn = async () => {
        setLoading('loading')
        try {
            await axios.post(`${apiUrl}/admin/login`, {}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': adminKey
                }
            })
            setLoading('ok')
            loadCategories()
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => {setLoading('initial')}, 2000)
        }
    }
    
    if (categories.length > 0 && currentCategory.link && loggedIn) return (
        <Flex transition='ease 400ms' marginX={10} marginY={70} direction={{base: 'column', lg: 'row'}} alignItems={{base: 'center', md: 'start'}} borderColor="purple" borderRadius={30} borderWidth={1} fontFamily="Iosevka">
            <DeleteCategoryDialog category={currentCategory} isOpen={deleteClosure.isOpen} onClose={deleteClosure.onClose} reload={() => { setCurrentCategory(categories[0]); loadCategories() } }/>
            <EditCategoryDialog category={currentCategory} isOpen={editClosure.isOpen} onClose={editClosure.onClose} reload={loadCategories}/>
            <AddCategoryDialog isOpen={addClosure.isOpen} onClose={addClosure.onClose} reload={loadCategories}/>
            <PromosDialog isOpen={promoClosure.isOpen} onClose={promoClosure.onClose}/>
            <Flex width={{base: 'full', lg: 300}} direction='column' alignItems='center' fontSize={20} borderColor="purple" borderRadius={30} borderRightWidth={1} borderBottomWidth={1} borderLeftWidth={1}>
                {
                    categories.map((category) => {
                        return (
                            <Flex 
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
                             _hover={{
                                 backgroundColor: '#2b144692',
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
                 bgColor='#2c1a4d92' 
                 borderBottomRadius={30}
                 _hover={{
                     backgroundColor: '#2b144692',
                     cursor: 'pointer'
                 }}
                 onClick={addClosure.onOpen}
                 >
                    <GoPlus />
                    <Text marginLeft={3}>Добавить</Text>
                </Flex>

                <Flex 
                 width='full'
                 marginTop={10}
                 paddingX={30} 
                 paddingBottom={4} 
                 paddingTop={4} 
                 direction='row' 
                 alignItems='center' 
                 borderTopColor='purple' 
                 borderTopWidth={1}
                 bgColor='#2c1a4d92' 
                 borderBottomRadius={30}
                 borderTopRadius={15}
                 _hover={{
                     backgroundColor: '#2b144692',
                     cursor: 'pointer'
                 }}
                 onClick={promoClosure.onOpen}
                 >
                    <Text marginLeft={3}>Промокоды</Text>
                </Flex>

            </Flex>
            <Flex width='full' marginY={10} direction='column' align='center'>
                <AdminItemGrid currentCategory={currentCategory}/>
            </Flex>
        </Flex>
    ) 
    else return <Flex align='center' justify='center' marginY={155} fontFamily='Iosevka'>
        <Flex borderRadius={15} maxWidth={400} backgroundColor='#311056aa' shadow='dark-lg' padding={45} direction='column' align='center'>
                    <Input width={300} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="password"
                        textAlign='center'
                        placeholder="* * * * *"
                        onKeyPress={(event) => { if (event.key === 'Enter') logIn() }}
                        onChange={(event) => {setAdminKey(event.target.value)}}
                    />
            <Button marginTop={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={logIn}>{loading === 'ok' ? 'Успешно!' : loading === 'error' ? 'Ошибка' : 'Войти'}</Button>
        </Flex>
    </Flex>
}