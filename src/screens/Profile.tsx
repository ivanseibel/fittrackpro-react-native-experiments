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
import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { api } from 'src/service/api'

const PHOTO_SIZE = 33

type PhotoFileInfoProps = FileSystem.FileInfo & {
  size: number
}

type Inputs = {
  name: string
  email?: string
  oldPassword?: string
  password?: string
  confirmPassword?: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Name is required'),
  password: yup
    .string()
    .test(
      'minLength',
      'Password must be at least 6 characters long',
      (val) => !val || val.length >= 6,
    ),
  confirmPassword: yup
    .string()
    .test('passwords-match', 'Passwords do not match', function (val) {
      return !this.parent.password || !val || val === this.parent.password
    }),
})

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false)

  const toast = useToast()
  const { user, updateUserProfile, avatarUri } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: user.name,
      email: user.email,
      oldPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(signUpSchema),
  })

  async function onSubmit(data: Inputs) {
    try {
      setIsUpdating(true)

      const response = await api.put('/users', {
        name: data.name,
        password: data.password,
        old_password: data.oldPassword,
      })

      if (response.status !== 200) {
        throw new AppError(response.data.message)
      }

      toast.show({
        description: 'Profile updated successfully.',
        bgColor: 'green.500',
        ...TOAST_DEFAULT,
      })

      await updateUserProfile({
        ...user,
        name: data.name,
      })
    } catch (error) {
      const isAppError = error instanceof AppError

      toast.show({
        description: isAppError
          ? error.message
          : 'An error occurred while updating the profile. Please try again later.',
        bgColor: 'red.500',
        ...TOAST_DEFAULT,
      })
    } finally {
      setIsUpdating(false)
    }
  }

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

      const fileExtension = fileInfo.uri.split('.').pop()
      const uri = result.assets[0].uri
      const type = `${result.assets[0].type}/${fileExtension}`
      const name = `${user.id}_${user.name}.${fileExtension}`
        .toLowerCase()
        .replace(/\s/g, '_')

      const userPhotoUploadForm = new FormData()

      userPhotoUploadForm.append('avatar', {
        uri,
        type,
        name,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any)

      const response = await api.patch('/users/avatar', userPhotoUploadForm, {
        headers: {
          accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      })

      if (response.status !== 200) {
        throw new AppError(response.data.message)
      }

      const userPhoto = response.data.avatar

      await updateUserProfile({
        ...user,
        avatar: userPhoto,
      })

      toast.show({
        description: 'Photo updated successfully.',
        bgColor: 'green.700',
        ...TOAST_DEFAULT,
      })
    } catch (error) {
      console.log(error)
      const isAppError = error instanceof AppError
      toast.show({
        description: isAppError
          ? error.message
          : 'An error occurred while updating the photo. Please try again later.',
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
              source={!user.avatar ? undefined : { uri: avatarUri }}
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
              <Controller
                control={control}
                name="email"
                render={({ field: { value } }) => (
                  <Input
                    placeholder="E-mail"
                    bg={'gray.600'}
                    isDisabled
                    isReadOnly
                    value={value}
                  />
                )}
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
                name="oldPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Old password"
                    bg={'gray.600'}
                    secureTextEntry
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorMessage={errors.oldPassword?.message}
                  />
                )}
              />
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
                    returnKeyType="send"
                    onSubmitEditing={handleSubmit(onSubmit)}
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
                isLoading={isUpdating}
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
