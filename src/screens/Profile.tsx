import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, ScrollView, VStack } from 'native-base'

export function Profile() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Profile" />
      <ScrollView>
        <Center mt={6} px={10}>
          <UserPhoto
            size={33}
            alt="Ivan Seibel"
            source={{ uri: 'https://github.com/ivanseibel.png' }}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
