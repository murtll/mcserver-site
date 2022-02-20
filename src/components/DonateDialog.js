import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
    Button,
    Text,
    Flex,
    VStack,
    FormControl,
    FormLabel,
    Input,
    useRadio,
    useRadioGroup,
    Box,
    HStack,
    Spacer
  } from '@chakra-ui/react'
import '@fontsource/iosevka'
import axios from 'axios'
import { Markup } from 'interweave'
import { useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import Fade from 'react-reveal/Fade'
import config from '../config'

export const DonateDialog = ({donateItem, isOpen, onClose, category}) => {
    const apiUrl = config.apiUrl
    const [ loading, setLoading ] = useState('initial')
    const [ requestData, setRequestData ] = useState({
      itemId: donateItem.id,
      price: donateItem.price,
      successRedirect: `https://mcbrawl.ru/${category}`
    })

    const requestPayment = (e) => {
      e.preventDefault()
      console.log(requestData)
      setLoading('loading')
      axios.post(`${apiUrl}/mcserver/kassa-redirect`, JSON.stringify(requestData), { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            setLoading('ok')
            console.log(res.data.redirectUrl)
            window.location.href = res.data.redirectUrl
            // window.open(res.data.redirectUrl, '_blank')
          })
          .catch((error) => {
            setLoading('error')
            setTimeout(() => setLoading('initial'), 2000)
          })
    }

    return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={{base: 'outside', md: 'inside'}} 
        isCentered={window.innerHeight > 900 && (donateItem.description ? donateItem.description.length < 200: true)}
        // initialFocusRef={initialRef}
        >
        <ModalOverlay bgColor='#18003690' />
        <ModalContent bgColor="#311056" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{donateItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Flex direction='column'>
              <Flex transition='ease 1000ms' direction={{base: 'column', md: 'row'}} alignItems={{base: 'initial', md: 'start'}}>
                  <VStack spacing={21} alignItems='center'>
                    <Image
                    //  ref={initialRef} 
                     alignSelf='center' src={`${apiUrl}${donateItem.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} />
                    <Text>
                      <Markup content={donateItem.description} />
                    </Text>
                  </VStack>
                  <Spacer minWidth={10}></Spacer>
                <form name="payment" onSubmit={requestPayment} accept-charset="UTF-8">
                    <FormControl paddingTop={{base: 8, md: 0}} width="full" isRequired>
                        <FormLabel>Ник в игре</FormLabel>
                        <Input onChange={(username) => {setRequestData({...requestData, username: username.target.value})}} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text" placeholder="Nickname" />
                    </FormControl>
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input onChange={(email) => {setRequestData({...requestData, email: email.target.value})}} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="email" placeholder="example@example.com" />
                    </FormControl>
                    
                    <FormControl marginTop={6} width="full" isRequired>
                      <FormLabel>Платежная система</FormLabel>
                      <PaySystemPicker onChange={(kassa) => {setRequestData({...requestData, kassa: kassa.target ? kassa.target.value: '' })}}/>
                    </FormControl>

                    <Fade when={loading === 'error'} collapse>
                      <Flex backgroundColor='#67345642' paddingX={4} paddingY={2} borderRadius={10} marginTop={3}>
                        <Text color='red.400'>Ошибка!</Text>
                      </Flex>
                    </Fade>
                    <Button transition='ease 500ms' isLoading={loading === "loading"} loadingText="Отправка..." width="full" backgroundColor="#99107B" borderRadius={15} px="8" marginTop={4} type="submit">
                        Купить за {donateItem.price}₽
                    </Button>
                </form>
            </Flex>

            <Flex direction={{base: 'column', md: 'row'}} alignItems='center' justify='center' padding={3} marginTop={8} backgroundColor='#31406652' borderRadius={15}>
              <FaInfoCircle color='#9555b5' size={25}/>
              <Text fontSize={13} textAlign='center' textColor='#9555b5' marginLeft={4}>Купленный товар будет начислен на ваш аккаунт автоматически после оплаты</Text>
            </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
        </Modal>
    )
}

const RadioCard = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
      width='full'
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        shadow='md'
        marginBottom={2}
        _hover={{
          bg: '#79107B22',
          // color: 'white',
          // borderColor: 'teal.600',
        }}
        _checked={{
          bg: '#59107B92',
          // color: 'white',
          // borderColor: 'teal.600',
        }}
        // _focus={{
        //   boxShadow: 'outline',
        // }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

const PaySystemPicker = (props) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'kassa',
    // defaultValue: 'interkassa',
    onChange: props.onChange,
  })

  const group = getRootProps()

  const kasses = [
    {
      name: 'interkassa',
      img: '/images/interkassa-mini.webp'
    },
    {
      name: 'freekassa',
      img: '/images/freekassa-mini.webp'
    }
  ]

  return (
    <Flex direction='column' width='full' {...group} {...props}>
      {
        kasses.map((kassa) => {
          const radio = getRadioProps({value: kassa.name})

          return <RadioCard key={kassa.name} {...radio}>
            <HStack alignItems='center' justify='start'>
              <Image height={25} src={kassa.img} />
              <Text fontSize={13} fontWeight='bold'>
                {`${kassa.name[0].toUpperCase()}${kassa.name.substring(1)}`}
              </Text>
            </HStack>
          </RadioCard>
        })
      }
    </Flex>
  )
}