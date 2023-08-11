import { HStack, Heading, Text, VStack } from 'native-base'

export function HomeHeader() {
  return (
    <HStack bg={'gray.600'} pt={16} pb={5} px={8}>
      <VStack>
        <Text color={'gray.100'} fontSize={'md'}>
          Hello,
        </Text>
        <Heading color={'gray.100'} fontSize={'md'} fontFamily={'heading'}>
          Ivan Seibel
        </Heading>
      </VStack>
    </HStack>
  )
}
