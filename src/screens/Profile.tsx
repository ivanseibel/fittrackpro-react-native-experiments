import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, Skeleton, Text, VStack } from 'native-base'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const PHOTO_SIZE = 33

export function Profile() {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <DismissKeyboardView>
      <VStack flex={1}>
        <ScreenHeader title="Profile" />
        <ScrollView>
          <Center mt={6} px={10}>
            {!imageLoaded && (
              <Skeleton
                startColor="gray.500"
                endColor="gray.400"
                height={PHOTO_SIZE}
                width={PHOTO_SIZE}
                rounded={'full'}
              />
            )}
            <UserPhoto
              size={PHOTO_SIZE}
              display={imageLoaded ? 'flex' : 'none'}
              alt="Ivan Seibel"
              source={{
                uri: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg',
              }}
              onLoad={() => {
                setImageLoaded(true)
              }}
            />

            <TouchableOpacity>
              <Text
                mt={2}
                mb={8}
                fontSize="md"
                color="green.500"
                fontFamily={'heading'}
              >
                Change photo
              </Text>
            </TouchableOpacity>

            <VStack space={4} w={'full'}>
              <Input placeholder="Name" bg={'gray.600'} />
              <Input placeholder="E-mail" bg={'gray.600'} isDisabled />
            </VStack>
          </Center>
        </ScrollView>
      </VStack>
    </DismissKeyboardView>
  )
}
