import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, Skeleton, VStack } from 'native-base'
import { useState } from 'react'

const PHOTO_SIZE = 33

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              startColor="gray.500"
              endColor="gray.400"
              height={PHOTO_SIZE}
              width={PHOTO_SIZE}
              rounded={'full'}
            />
          ) : (
            <UserPhoto
              size={PHOTO_SIZE}
              alt="Ivan Seibel"
              source={{ uri: 'https://github.com/ivanseibel.png' }}
            />
          )}
        </Center>
      </ScrollView>
    </VStack>
  )
}
