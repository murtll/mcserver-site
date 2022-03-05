import { Flex, Image, Box, Text, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import config from '../config'
import { cache } from '../utils/GlobalCache'
import '@fontsource/iosevka'

import './Slideshow.css'

const Slideshow = ({ donates }) => {
  const [index, setIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [koeff, setKoeff] = useState(windowWidth > 1800 ? 0 : windowWidth > 1400 ? 27 : windowWidth > 1100 ? 35 : windowWidth > 500 ? 52 : 100)
  const [minus, setMinus] = useState(windowWidth > 1800 ? 5 : windowWidth > 1400 ? 4 : windowWidth > 1100 ? 3 : windowWidth > 500 ? 2 : 1)
  const [slice, setSlice] = useState(windowWidth > 1800 ? 4 : windowWidth > 1400 ? 3 : windowWidth > 1100 ? 2 : windowWidth > 500 ? 1 : 0)
  const timeoutRef = useRef(null)

  useEffect(() => {
      window.addEventListener('resize', () => {
          setWindowWidth(window.innerWidth)
          setKoeff(window.innerWidth > 1800 ? 0 : window.innerWidth > 1400 ? 27 : window.innerWidth > 1100 ? 35 : window.innerWidth > 500 ? 52 : 100)
          setMinus(window.innerWidth > 1800 ? 5 : window.innerWidth > 1400 ? 4 : window.innerWidth > 1100 ? 3 : window.innerWidth > 500 ? 2 : 1)
          setSlice(window.innerWidth > 1800 ? 4 : window.innerWidth > 1400 ? 3 : window.innerWidth > 1100 ? 2 : window.innerWidth > 500 ? 1 : 0)
      })
  }, [])


  const delay = 2500;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();

    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === donates.length - minus || prevIndex > donates.length - minus ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index, minus]);


  return (
    <Box overflow='hidden'
        boxShadow='inset 0px 0px 30px 10px #00000052'
        marginTop={5} borderColor='purple' borderWidth={1} borderRadius={15} paddingY={5} paddingX={5}
    >
      <Flex
        maxWidth={windowWidth > 1800 ? 1000 : windowWidth > 1400 ? 750 : windowWidth > 1100 ? 560 : windowWidth > 500 ? 370 : 190}
        direction='row'
          transition='ease 1000ms'
        transform={`translate3d(-${index * koeff}%, 0, 0)`}
        whiteSpace='nowrap'
        // onDrag={(e) => {
        //   console.log(e.clientX);
        //   setIndex(index - 1)
        // }}
      >
        {donates.map((donate, index) => (
          <Flex
            direction='row'
            display='inline-block'
            marginX={5}
            marginY={3}
            key={index}
            transition='ease 200ms'
            _hover={{ marginY: 1 }}
          >
              { donate.amount > 1 ?
              <Link to={`${donate.link}?id=${donate.itemId}`}>
              <Flex 
              position='absolute'
              boxShadow='lg' _hover={{ boxShadow: '2xl', cursor: 'pointer' }} 
              backgroundColor='#bb88bb22' 
              direction='column' justify='flex-end' alignItems='center'
              height={200} width={150} borderColor='purple' borderWidth={2} borderRadius={10} paddingBottom={3} paddingX={5}>

                <Text fontSize={16} marginTop={1} textShadow='0px 0px 5px white'>x{donate.amount}</Text>
                <Spacer />
                <Image maxHeight={70} src={`${config.apiUrl}${donate.picture}`}/>
                <Text color="#FCD9FF" fontSize={15} marginTop={1}>{donate.name}</Text>
                <Text fontSize={15} paddingX={2} borderRadius={5} backgroundColor='purple' marginTop={1}>{donate.price}₽</Text>
                <Text fontWeight='bold' color="#ccccdd" fontSize={15} marginTop={1}>{donate.donaterUsername}</Text>
              </Flex>

              <Flex
              clipPath='polygon(93% 0, 140% 10%, 100% 93%)'
              zIndex={-1}
              transformOrigin='left bottom'
              transform='rotate(3deg)'
              boxShadow='lg' _hover={{ boxShadow: '2xl', cursor: 'pointer' }} 
              backgroundColor='#bb88bb22' direction='column' justify='flex-end' alignItems='center'
              height={200} width={150} borderColor='purple' borderWidth={2} borderRadius={10} paddingBottom={3} paddingX={5}>
              </Flex>
            </Link> 
            :
            <Link to={`${donate.link}?id=${donate.itemId}`}>
              <Flex 
              boxShadow='lg' _hover={{ boxShadow: '2xl', cursor: 'pointer' }} 
              backgroundColor='#bb88bb22' direction='column' justify='flex-end' alignItems='center'
              height={200} width={150} borderColor='purple' borderWidth={2} borderRadius={10} paddingBottom={3} paddingX={5}>
                <Image maxHeight={70} src={`${config.apiUrl}${donate.picture}`}/>
                <Text color="#FCD9FF" fontSize={15} marginTop={1}>{donate.name}</Text>
                <Text fontSize={15} paddingX={2} borderRadius={5} backgroundColor='purple' marginTop={1}>{donate.price}₽</Text>
                <Text fontWeight='bold' color="#ccccdd" fontSize={15} marginTop={1}>{donate.donaterUsername}</Text>
              </Flex>
            </Link> 
            }
          </Flex>
        ))}
      </Flex>

      <div className="slideshowDots">
        {donates.slice(0, 5 - slice).map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </Box>
  );
}


export const LastDonates = () => {
    const [ donates, setDonates ] = useState(cache.donates || [])

    useEffect(() => {
        axios.get(`${config.apiUrl}/last-donates`)
        .then((res) => {
            setDonates(res.data)
            cache.donates = res.data
        })
    }, [])

     if (donates && donates.length >= 5) return (
        <Flex width='full' alignItems='center' direction='column' marginBottom={20} fontFamily='Iosevka' textAlign='center'>
            <Text fontSize={24} color="#FCD9FF" fontWeight='bold'>Последние донаты</Text>
                <Slideshow donates={donates} />
        </Flex>
    )
    else return (<></>)
}
