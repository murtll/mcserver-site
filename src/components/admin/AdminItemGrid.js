import { 
    Flex,
    Spacer,
    Box,
    Text,
    Image,
    SimpleGrid,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import config from '../../config'
import { cache } from '../../utils/GlobalCache'
import { GoTrashcan, GoPencil, } from 'react-icons/go'
import axios from "axios"
import { FaPlus } from "react-icons/fa"
import '@fontsource/iosevka'

import { DeleteDialog } from './DeleteDialog'
import { AddDialog } from './AddDialog'
import { EditDialog } from './EditDialog'

export const AdminItemGrid = ({ currentCategory }) => {
    const [items, setItems] = useState([])
    const [hovered, setHovered] = useState(null)
    const [ currentItem, setCurrentItem ] = useState(null)

    const editClosure = useDisclosure()
    const addClosure = useDisclosure()
    const deleteClosure = useDisclosure()

    const apiUrl = config.apiUrl

    const loadItems = () => {
        setItems(cache[`/admin${currentCategory.link}`] ? cache[`/admin${currentCategory.link}`] : [])

        axios.get(`${apiUrl}/admin${currentCategory.link}`, { withCredentials: true }).then((res) => {
          cache[`/admin${currentCategory.link}`] = res.data
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
          _hover={{backgroundColor: '#69009B42'}}
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
        <IconButton icon={<FaPlus size={70} color='#69009B' />} height={250} variant='outline' width={{base: 200, sm: 180, md: 200, }} borderRadius={15} borderWidth={3} borderColor="#69009B" py="12" px="14" alignItems="center" onClick={addClosure.onOpen} />
      </SimpleGrid>
      </>
    )
}