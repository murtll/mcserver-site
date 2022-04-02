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
    ModalBody,
    ModalCloseButton,
    CircularProgress,
    Box,
    Text,
    Spacer
} from "@chakra-ui/react"
import { GoTrashcan, GoPlus} from 'react-icons/go'
import { useState, useEffect } from "react"
import config from '../../config'
import axios from "axios"
import '@fontsource/iosevka'

import { cache } from '../../utils/GlobalCache'

export const PromosDialog = ({isOpen, onClose}) => {
    const apiUrl = config.apiUrl
    const [loading, setLoading] = useState('initial')
    const [promos, setPromos] = useState(cache.promos || [])
    const [newPromo, setNewPromo] = useState({
        name: '',
        multiplier: 1
    })

    const getPromos = async () => {
        try {
            setLoading('loading')
            const res = await axios.get(`${apiUrl}/admin/promos`, { withCredentials: true })
            setPromos(res.data)
            setLoading('ok')
        } catch (error) {
            setLoading('error')
        }
    }

    useEffect(() => {
        getPromos()
        setNewPromo({
            name: '',
            multiplier: 1
        })
    }, [isOpen])

    const sendPromo = async () => {
        setLoading('loading')
        try {
            await axios.post(`${apiUrl}/admin/promo`, JSON.stringify(newPromo), {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setNewPromo({
                name: '',
                multiplier: 1
            })
            getPromos()
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => setLoading('ok'),
                    1000)
        }
    }

    const deletePromo = async (id) => {
        setLoading('loading')
        try {
            await axios.delete(`${apiUrl}/admin/promo`, {
                data: JSON.stringify({ id: id }),
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setNewPromo({
                name: '',
                multiplier: 1
            })
            getPromos()
        } catch (error) {
            console.log(error);
            setLoading('error')
            setTimeout(() => setLoading('ok'),
            1000)
        }
    }

    return (
        <Modal onClose={() => { setNewPromo({name: '', multiplier: 1 }); onClose() }} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">Промокоды</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
                { loading === 'ok' ?
                    <Flex direction='column'>
                      {
                        promos.map((promo) => {
                          return ( <Flex borderWidth={1} borderColor='purple' borderRadius={5} paddingY={3} paddingX={5} align='center' marginTop={6} width="full"> 
                          <Flex direction={{base: 'column', md: 'row'}}>
                            { Object.keys(promo)
                                .filter((prop) => prop !== 'id')
                                .map((prop) => {
                                    return (
                                    <>
                                      <Flex marginRight={10} align='center'>
                                          <Text>{`${prop[0].toUpperCase()}${prop.substring(1)}:`}</Text>
                                          <Text marginLeft={3} padding={1}>{promo[prop]}</Text>
                                      </Flex>
                                    </>
                                    )
                              }) 
                            }
                            </Flex>
                            <Spacer/>
                            <Box _hover={{cursor: 'pointer'}} onClick={() => deletePromo(promo.id)}>
                                <GoTrashcan color="red" size={24}/>
                            </Box>
                        </Flex> )
                        })
                      }
                        <Flex marginTop={6} marginLeft={5} width="full" direction={{base: 'column', md: 'row'}} align='center'>
                            { Object.keys(newPromo)
                                .filter((prop) => prop !== 'id')
                                .map((prop) => {
                                    return (
                                        <>
                                          <Flex direction='row' align='center' justify='start' width={{base: 'full', md: 'min-content'}} marginRight={3} marginBottom={{base: 3, md: 0}}>
                                          <Text>{`${prop[0].toUpperCase()}${prop.substring(1)}:`}</Text>
                                          <Input marginLeft={2} width={100} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} 
                                            type={ prop === 'multiplier' ? "number" : "text" }
                                            value={newPromo[prop]}
                                            onChange={(event) => setNewPromo({...newPromo, [prop]: event.target.value})}
                                          />
                                          </Flex>
                                        </>
                                    )
                              }) 
                            }
                            <Spacer/>
                            <Button width={150} onClick={sendPromo} marginRight={10}>Добавить</Button>
                        </Flex>
                  </Flex>
                  : loading === 'loading' ?
                  <Flex align='center' justify='center'>
                      <CircularProgress isIndeterminate/>
                  </Flex>
                  :
                  <Flex backgroundColor='#67345642' paddingX={4} paddingY={2} borderRadius={10} marginTop={3}>
                    <Text color='red.400'>Ошибка!</Text>
                  </Flex>
                  }
          </ModalBody>
        </ModalContent>
        </Modal>
    )
}