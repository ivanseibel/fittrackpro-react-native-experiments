import { Center, HStack, Heading, Icon, Text, VStack } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { UserPhoto } from './UserPhoto'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '@hooks/useAuth'

export function HomeHeader() {
  const { signOut, user, avatarUri } = useAuth()

  return (
    <HStack bg={'gray.600'} pt={16} pb={5} px={8} alignItems={'center'}>
      <Center mr={4}>
        <UserPhoto
          size={16}
          source={!user.avatar ? undefined : { uri: avatarUri }}
          alt={"User's photo"}
        />
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
          {user.name}
        </Heading>
      </VStack>
      <TouchableOpacity onPress={signOut}>
        <Icon as={MaterialIcons} name="logout" size={7} color={'gray.200'} />
      </TouchableOpacity>
    </HStack>
  )
}
