import { Button } from '@components/Button'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Input } from '@components/Input'
import { ScreenHeader } from '@components/ScreenHeader'
import { UserPhoto } from '@components/UserPhoto'
import {
  Center,
  Heading,
  ScrollView,
  Text,
  VStack,
  useToast,
} from 'native-base'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TOAST_DEFAULT } from '../utils/constants'

const PHOTO_SIZE = 33

type PhotoFileInfoProps = FileSystem.FileInfo & {
  size: number
}

type Inputs = {
  name: string
  password: string
  confirmPassword: string
}

const signUpSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password is too short'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
})

export function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = (data: Inputs) => console.log('hey', data)

  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  const toast = useToast()

  async function handleUserPhotoChange() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (result.canceled) {
        return
      }

      const fileInfo = (await FileSystem.getInfoAsync(result.assets[0].uri, {
        size: true,
      })) as PhotoFileInfoProps

      if (fileInfo.size > 5 * 1024 * 1024) {
        toast.show({
          description: 'The image size must be less than 5MB.',
          bgColor: 'red.500',
          ...TOAST_DEFAULT,
        })
        return
      }

      setUserPhoto(result.assets[0].uri)
    } catch (err) {
      toast.show({
        description: 'An error occurred while changing the photo.',
        bgColor: 'red.500',
        ...TOAST_DEFAULT,
      })
    }
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
              source={!userPhoto ? undefined : { uri: userPhoto }}
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
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Name"
                    bg={'gray.600'}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Input
                placeholder="E-mail"
                bg={'gray.600'}
                isDisabled
                isReadOnly
              />
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
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Password"
                    bg={'gray.600'}
                    secureTextEntry
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.password?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Confirm password"
                    bg={'gray.600'}
                    secureTextEntry
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />
              <Button
                mt={4}
                mb={8}
                w={'full'}
                h={14}
                variant={'solid'}
                onPress={handleSubmit(onSubmit)}
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
