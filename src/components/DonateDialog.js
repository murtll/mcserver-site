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
    FormControl,
    FormLabel,
    Input,
    useRadio,
    useRadioGroup,
    Box,
    HStack,
    Spacer,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    InputRightElement,
    InputGroup,
    CircularProgress,
  } from '@chakra-ui/react'
import '@fontsource/iosevka'
import axios from 'axios'
import { Markup } from 'interweave'
import { useEffect, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { GoAlert, GoCheck } from 'react-icons/go'
import Fade from 'react-reveal/Fade'
import config from '../config'

export const DonateDialog = ({donateItem, isOpen, onClose, category}) => {
    const apiUrl = config.apiUrl
    const [ loading, setLoading ] = useState('initial')
    const [ requestData, setRequestData ] = useState({
      itemId: donateItem.id,
      price: donateItem.price,
      number: donateItem.min_number,
      kassa: 'freekassa',
      successRedirect: `https://mcbrawl.ru/${category}`,
    })
    const [ promoIsValid, setPromoIsValid ] = useState('initial')
    const [ promoMultiplier, setPromoMultiplier ] = useState(1)
    const [ promoMessage, setPromoMessage ] = useState(null)

    useEffect(() => {
      setRequestData({
        itemId: donateItem.id,
        price: donateItem.price,
        number: donateItem.min_number,
        kassa: 'freekassa',
        successRedirect: `https://mcbrawl.ru/${category}`,
      })
    }, [donateItem])

    const requestPayment = (e) => {
      e.preventDefault()
      console.log(requestData)
      if (promoIsValid === 'loading' || promoIsValid === 'error') {
        return
      }
      setLoading('loading')
      axios.post(`${apiUrl}/mcserver/kassa-redirect`, JSON.stringify(requestData), { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            setLoading('ok')
            console.log(res.data.redirectUrl)
            window.location.href = res.data.redirectUrl
          })
          .catch((error) => {
            setLoading('error')
            setTimeout(() => setLoading('initial'), 2000)
          })
    }

    const checkPromo = (promo) => {
      setRequestData({...requestData, promo: null})
      setPromoMultiplier(1)
      if (promo === '') {
        setPromoIsValid('initial')
        return
      }

      setPromoIsValid('loading')
      axios.get(`${apiUrl}/check-promo?promo=${promo}`)
            .then((res) => {
              setPromoMultiplier(res.data.multiplier)
              setPromoIsValid('ok')
              setRequestData({...requestData, promo: promo})
            })
            .catch((err) => {
                setPromoMultiplier(1)
                setRequestData({...requestData, promo: null})
                setPromoIsValid('error')
            })
    }

    const calculateSale = (number) => Math.round(50 / (Math.pow(Math.E, 3 - (number / Math.pow(Math.PI, 2))) + 1))
    const calculatePrice = (price, number) => number > 1 ? number * Math.round((price) * ((100 - calculateSale(number)) / 100)) : (price)

    return (
        <Modal onClose={onClose} isOpen={isOpen} scrollBehavior={{base: 'outside', md: 'inside'}} 
        isCentered={window.innerHeight > 1000 && (donateItem.description ? donateItem.description.length < 200: true)}
        // initialFocusRef={initialRef}
        >
        <ModalOverlay bgColor='#18003690' />
        <ModalContent bgColor="#311056" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">{donateItem.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
            <Flex direction='column'>
              <Flex transition='ease 1000ms' direction={{base: 'column', md: 'row'}} align={{base: 'initial', md: 'start'}} justify='space-around'>
                  <Flex direction='column' align='center' justify='center' >
                    <Image alt='Donate.png'
                    //  ref={initialRef} 
                     alignSelf='center' src={`${apiUrl}${donateItem.picture}`} maxHeight={{ base:200, md: 300 }} maxWidth={{ base:200, md: 300 }} margin={3}/>
	    	    <Spacer minHeight={21}/>
                    <Text>
                      <Markup content={donateItem.description} />
                    </Text>
                  </Flex>
                  <Spacer maxWidth={10} minWidth={10}></Spacer>
                <form name="payment" onSubmit={requestPayment}>
                    <FormControl paddingTop={{base: 8, md: 0}} width="full" isRequired>
                        <FormLabel>Ник в игре</FormLabel>
                        <Input onChange={(username) => {setRequestData({...requestData, username: username.target.value})}} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text" placeholder="Nickname" />
                    </FormControl>
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input onChange={(email) => {setRequestData({...requestData, email: email.target.value})}} borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="email" placeholder="example@example.com" />
                    </FormControl>

              		{donateItem.max_number > donateItem.min_number ?
                    <FormControl marginTop={6} width="full" isRequired>
                        <FormLabel>Количество</FormLabel>
                        <NumberInput defaultValue={requestData.number} min={donateItem.min_number} max={donateItem.max_number} onChange={(number) => {setRequestData({...requestData, number: number})}}>
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>      
                        <Fade when={calculatePrice(donateItem.price, requestData.number) < donateItem.price * requestData.number} top collapse duration={400}>                  
                          <Text marginTop={1} fontSize={14} color='#9990aa'>Выгода - {calculateSale(requestData.number)}%</Text>
                        </Fade>
                    </FormControl>
                    : <></>}

                    <FormControl marginTop={6} width="full">
                        <FormLabel>Промокод</FormLabel>
                        <InputGroup>
                          <Input 
                          onChange={(promo) => {checkPromo(promo.target.value)}} 
                          borderRadius={10} borderWidth={2} 
                          _placeholder={{ color: 'purple.400' }} 
                          type="text" 
                          />

                          <InputRightElement children={ promoIsValid === 'initial' ? '' 
                          : promoIsValid === 'loading' ? 
                          <CircularProgress isIndeterminate size={15} color="purple.400" /> 
                          : promoIsValid === 'error' ?
                          <GoAlert color='#F41E7E' onMouseEnter={() => setPromoMessage('Промокода не существует')} onMouseLeave={() => setPromoMessage(null)}/>
                          : <GoCheck color='#1EF443' />} />
                        </InputGroup>
                        {
                          promoMessage ?
                          <Flex 
                          shadow='2xl'
                          transition='ease 400ms'
                          // width={160}
                          paddingX={3}
                          marginLeft={20}
                          fontFamily="Iosevka"
                          backgroundColor='#1A001A62'
                          direction='column' 
                          justify='center' 
                          align='center' 
                          // marginTop={1} 
                          borderRadius={10}
                          paddingY={3}
                          position='fixed'
                          zIndex={2} 
                          fontSize={14}
                          >
                          {promoMessage}
                          </Flex>
                          : <></>
                        }
                    </FormControl>

                    {/* <FormControl marginTop={6} width="full" isRequired>
                      <FormLabel>Платежная система</FormLabel>
                      <PaySystemPicker onChange={(kassa) => {setRequestData({...requestData, kassa: kassa.target ? kassa.target.value: '' })}}/>
                    </FormControl> */}

                    <Fade when={loading === 'error'} collapse>
                      <Flex backgroundColor='#67345642' paddingX={4} paddingY={2} borderRadius={10} marginTop={3}>
                        <Text color='red.400'>Ошибка!</Text>
                      </Flex>
                    </Fade>
                    <Button transition='ease 500ms' isLoading={loading === "loading"} loadingText="Отправка..." width="full" backgroundColor="#99107B" borderRadius={15} px="8" marginTop={4} type="submit">
                        Купить за {Math.round(promoMultiplier * calculatePrice(requestData.price, requestData.number))}₽
                    </Button>
                </form>
            </Flex>

            <Flex direction={{base: 'column', md: 'row'}} alignItems='center' justify='start' paddingY={3} marginTop={8} paddingX={{ base: 3, md: 8 }} backgroundColor='#31406652' borderRadius={15}>
              <FaInfoCircle color='#9555b5' size={21}/>
              <Text fontSize={13} textAlign={{ base: 'center', md: 'left' }} textColor='#9555b5' marginLeft={{base: 0, md: 4}}>Купленный товар будет начислен на ваш аккаунт автоматически после оплаты</Text>
            </Flex>

            <Flex direction={{base: 'column', md: 'row'}} alignItems='center' justify='start' paddingY={3} paddingX={{ base: 3, md: 8 }} marginTop={3} backgroundColor='#cddc3922' borderRadius={15}>
              <GoAlert color='#fcdc0072' size={21}/>
              <Text fontSize={13} textAlign={{ base: 'center', md: 'left' }} textColor='#fcdc0092' marginLeft={{base: 0, md: 4}}>При запросе возврата денежных средств при отказе от покупки, возврат не осуществляется.</Text>
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
