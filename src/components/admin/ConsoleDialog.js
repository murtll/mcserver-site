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
    ModalFooter,
    Text,
    Spacer
} from "@chakra-ui/react"
import { useState } from "react"
import config from '../../config'
import axios from "axios"
import '@fontsource/iosevka'
import { Markup } from "interweave"

export const ConsoleDialog = ({isOpen, onClose}) => {
    const apiUrl = config.apiUrl
    const [loading, setLoading] = useState('initial')
    const [response, setResponse] = useState('')
    const [command, setCommand] = useState('')

    const sendCommand = () => {
        setLoading('loading')
        if (command == '') {
            setLoading('error')
            return
        }
        axios.post(`${apiUrl}/admin/command`, JSON.stringify({command: command}), {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
                console.log(res.data)
                setResponse(res.data.message)
                setLoading('ok')
                setTimeout(() => {setLoading('initial')}, 1000)
             })
             .catch((err) => {
                console.log(err)
                setLoading('error')
                setTimeout(() => {setLoading('initial')}, 1000)
             })
    }

    return (
        <Modal onClose={() => { setResponse(''); setCommand(''); setLoading('initial'); onClose() }} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent bgColor="#180036" borderRadius={15} maxWidth={{base: 400, md: 700}} fontFamily="Iosevka">
          <ModalHeader fontSize={24} alignSelf="center">Консоль</ModalHeader>
          <ModalCloseButton />
          <ModalBody margin={10}>
                {loading === 'error'?
                  <Flex backgroundColor='#67345642' paddingX={4} paddingY={2} borderRadius={10} marginTop={3}>
                    <Text color='red.400'>Ошибка!</Text>
                  </Flex>
                  : <></>
                  }
                <FormControl marginTop={6} width="full">
                    <FormLabel>Команда</FormLabel>
                    <Flex direction='row'>
                    <Input borderRadius={10} borderWidth={2} _placeholder={{ color: 'purple.400' }} type="text"
                    onChange={(event) => setCommand(event.target.value)}
                    />
                   <Button marginLeft={10} isLoading={loading === "loading"} loadingText="Отправка..." onClick={sendCommand}>{loading === 'ok' ? 'Выполнено!' : loading === 'error' ? 'Ошибка' : 'Выполнить'}</Button>
                    </Flex>
                    {
                        response === '' ? <></>
                        :
                        <Text marginTop={10} padding={10} backgroundColor='#69009B42' borderRadius={25}>
                            <Markup content={response.replace('\n', '<br>').replace(/§.{1}/g, '')}/>    
                        </Text> 
                    }
                </FormControl>
          </ModalBody>
        </ModalContent>
        </Modal>
    )
}