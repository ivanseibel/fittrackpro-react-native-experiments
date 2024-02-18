import { Button } from '@components/Button'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import { Center, Heading, ScrollView, Text, VStack } from 'native-base'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const PHOTO_SIZE = 33

export function Profile() {
  async function handleUserPhotoChange() {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
  }

  return (
    <DismissKeyboardView>
      <VStack flex={1}>
        <ScreenHeader title="Profile" />
        <ScrollView
          flex={1}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          paddingBottom={36}
        >
          <Center mt={6} px={10} flex={1}>
            <UserPhoto
              size={PHOTO_SIZE}
              alt="Ivan Seibel"
              source={{
                uri: 'https://ghk.h-cdn.co/assets/16/18/4000x2250/hd-aspect-1462454304-gettyimages-485952777.jpg',
              }}
            />
            <TouchableOpacity
              onPress={handleUserPhotoChange}
              activeOpacity={0.7}
            >
              <Text
                mt={2}
                mb={4}
                fontSize="md"
                color="green.500"
                fontFamily={'heading'}
              >
                Change photo
              </Text>
            </TouchableOpacity>

            <VStack space={4} w={'full'} mb={4}>
              <Input placeholder="Name" bg={'gray.600'} />
              <Input placeholder="E-mail" bg={'gray.600'} isDisabled />
            </VStack>
            <VStack space={4} w={'full'} flex={1} justifyContent={'flex-end'}>
              <Heading
                size="md"
                color="gray.200"
                lineHeight={'md'}
                fontFamily={'heading'}
              >
                Change password
              </Heading>
              <Input placeholder="Password" bg={'gray.600'} secureTextEntry />
              <Input
                placeholder="Confirm password"
                bg={'gray.600'}
                secureTextEntry
              />
              <Button
                mt={4}
                mb={8}
                w={'full'}
                h={14}
                variant={'solid'}
                onPress={() => {}}
              >
                Save
              </Button>
            </VStack>
          </Center>
        </ScrollView>
      </VStack>
    </DismissKeyboardView>
  )
}
