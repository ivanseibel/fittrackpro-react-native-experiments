import { HStack, Heading, Icon, VStack, Text, Image, Center } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { AppNavigatorRoutesProps } from '@routes/app.routes'

import BodySvg from '@assets/body.svg'
import { Button } from '@components/Button'

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
              lineHeight={'md'}
              ml={1}
              textTransform="capitalize"
            >
              Back
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <VStack flex={1} p={8} space={3}>
        <Image
          source={{
            uri: 'https://williamcarvalhoamaral.files.wordpress.com/2020/01/dorsal-blog.jpg?w=640',
          }}
          alt="Exercise image"
          w={364}
          h={364}
          rounded={'8px'}
          mr={4}
          resizeMode="cover"
        />

        <VStack pt={4} pb={2} px={2} space={6}>
          <HStack justifyContent={'center'} space={20}>
            <Center flexDir={'row'}>
              <Text color={'gray.200'} fontSize={'md'} lineHeight={'md'}>
                Icon
              </Text>
              <Text color={'gray.200'} fontSize={'md'} lineHeight={'md'}>
                3 series
              </Text>
            </Center>
            <Center flexDir={'row'}>
              <Text color={'gray.200'} fontSize={'md'} lineHeight={'md'}>
                Icon
              </Text>
              <Text color={'gray.200'} fontSize={'md'} lineHeight={'md'}>
                12 reps
              </Text>
            </Center>
          </HStack>

          <Button>Mark as completed</Button>
        </VStack>
      </VStack>
    </VStack>
  )
}
