import { 
    Flex,
    Spacer,
    Box,
    Text,
    useDisclosure,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import config from '../../config'
import { cache } from '../../utils/GlobalCache'
import { GoTrashcan, GoPencil, GoPlus, } from 'react-icons/go'
import axios from "axios"
import '@fontsource/iosevka'

import { AdminItemGrid } from './AdminItemGrid'
import { EditCategoryDialog } from './EditCategoryDialog'
import { AddCategoryDialog } from './AddCategoryDialog'
import { DeleteCategoryDialog } from './DeleteCategoryDialog'

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
            </Flex>
            <Flex width='full' marginY={10} marginX={20} direction='column' alignItems='center'>
                <AdminItemGrid currentCategory={currentCategory}/>
            </Flex>
        </Flex>
    ) 
    else return <></>
}