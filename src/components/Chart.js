import { Flex, Text } from "@chakra-ui/react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import '@fontsource/iosevka'
import { cache } from '../utils/GlobalCache'
import axios from 'axios'
import { useState, useEffect } from 'react'
import config from '../config'

export const Chart = () => {

	const [chartData, setChartData] = useState(cache.chartData || null)

	const getGraphInfo = () => {
		axios.get(`${config.apiUrl}/serverinfo/graphinfo`)
		.then((res) => {
			const preparedData = { max: res.data.max, data: res.data.data.map((e) => { return { number: e.number, time: new Date(e.time) } }) }
			cache.chartData = preparedData
			setChartData(preparedData)

			setTimeout(getGraphInfo, 300000)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	useEffect(getGraphInfo, [])

	return (
   <Flex fontFamily='Iosevka' direction='column' align='center' justify='center'>
	<Text fontSize={24} color="#FCD9FF" fontWeight='bold' textAlign='center'>Количество игроков</Text>
    <Flex shadow='inset 0px 0px 30px 10px #00000052' transition='ease 1000ms'
          marginTop={5} marginRight={{ base: 0, sm: 2, lg: 5, xl: 10 }} borderColor='purple' borderWidth={1} borderRadius={15} paddingY={5} paddingRight={10} width={{ base: 240, sm: 420, md: 400, xl: 500, '2xl': 650 }}>

    <ResponsiveContainer width='100%' height={265}>
      <AreaChart data={chartData ? chartData.data : []}
          margin={{
	    top: 10,
            right: 10,
            left: 5,
            bottom: 5,
          }} >

        <defs>
          <linearGradient id='area-color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#bb88bb' stopOpacity={0.8} />
            <stop offset='75%' stopColor='#bb88bb' stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area 
		type='monotone' 
		dataKey='number' 
		stroke='#a33cb0' 
		fill='url(#area-color)' 
		dot={{ stroke: 'purple', r: 3 }} 
		activeDot={{ stroke: 'white', r: 5 }} />
        <XAxis dataKey='time' axisLine={false} tickLine={false} tickFormatter={(date) => chartData ? `${date.getHours()}:00` : '' } tickMargin={5} tickCount={5}/>
        <YAxis allowDecimals={false} dataKey='number' axisLine={false} tickLine={false} tickCount={5} tickMargin={0}/>
        <Tooltip content={<CustomTooltip />}
		cursor={false} offset={10} allowEscapeViewBox={{x: true, y: true}} animationDuration={400} animationEasing='ease-in-out' 
		/>
        <CartesianGrid opacity={0.1} vertical={false} />

      </AreaChart>
    </ResponsiveContainer>
    </Flex>
   </Flex>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload) {
		return (
			<Flex paddingY={1} paddingX={3} direction='column' backgroundColor='purple' borderRadius={10}>
				<Text fontSize={14} fontWeight='bold'>{label ? `${label.toLocaleDateString('ru')} ${label.getHours()}:00` : ''}</Text>
				<Text fontSize={15}>{`Игроков: ${payload[0].value}`}</Text>
			</Flex>
		)
	}
	return (<></>)
}
