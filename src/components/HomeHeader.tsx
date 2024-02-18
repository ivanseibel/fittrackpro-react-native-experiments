import { Center, HStack, Heading, Icon, Text, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'

export function HomeHeader() {
  return (
    <HStack bg={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <Center mr={4}>
        <UserPhoto size={16} source={undefined} alt={"User's photo"} />
      </Center>
      <VStack flex={1}>
        <Text color={'gray.100'} fontSize={'md'} lineHeight={'md'}>
          Hello,
        </Text>
        <Heading
          color={'gray.100'}
          fontSize={'md'}
          lineHeight={'md'}
          fontFamily={'heading'}
        >
          Ivan Seibel
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" size={7} color={'gray.200'} />
      </TouchableOpacity>
    </HStack>
  )
}
