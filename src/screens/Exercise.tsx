import { HStack, Heading, Icon, VStack, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg={'gray.600'} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <VStack w={10} h={7}>
            <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
          </VStack>
        </TouchableOpacity>
        <HStack justifyContent={'space-between'} mt={4} mb={8} space={2}>
          <Heading
            color={'gray.100'}
            fontSize={'lg'}
            lineHeight={'lg'}
            fontFamily={'heading'}
            flexShrink={1}
          >
            Front pulldown
          </Heading>
          <HStack alignItems={'center'}>
            <BodySvg width={18} height={18} />
            <Text
              color="gray.200"
              fontSize={'md'}
              ml={1}
              textTransform="capitalize"
            >
              Back
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </VStack>
  )
}
