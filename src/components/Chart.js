import { Flex, Text } from "@chakra-ui/react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import '@fontsource/iosevka'

const data = [
  {
    time: new Date(1646003842).toISOString(),
    number: 1
  },
  {
    time: new Date(1646003843).toISOString(),
    number: 0
  },
  {
    time: new Date(1646003844).toISOString(),
    number: 2
  },
  {
    time: new Date(1646003845).toISOString(),
    number: 3
  },
  {
    time: new Date(1646003846).toISOString(),
    number: 1
  },
  {
    time: new Date(1646003847).toISOString(),
    number: 1
  },
]


export const Chart = () => {
	return (
    <Flex fontFamily='Iosevka' direction='column' align='center' justify='center'>
    <Text>Количество игроков</Text>
    <ResponsiveContainer width={400} height={400}>
      <AreaChart data={data}>

        <defs>
          <linearGradient id='area-color' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stopColor='purple' stopOpacity={0.8} />
            <stop offset='80%' stopColor='purple' stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Area dataKey='number' stroke='purple' fill='url(#area-color)' />
        <XAxis dataKey='time' axisLine={false} tickLine={false} />
        <YAxis  dataKey='number' axisLine={false} tickLine={false} tickCount={4} />
        <Tooltip />
        <CartesianGrid opacity={0.1} vertical={false} />

      </AreaChart>
    </ResponsiveContainer>
    </Flex>
  )
}
