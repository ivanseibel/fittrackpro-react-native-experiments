import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'

type Inputs = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (data: Inputs) => console.log('hey', data)

  const navigation = useNavigation()

  function handleNavigateToSignIn() {
    navigation.goBack()
  }

  return (
    <DismissKeyboardView>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <VStack flex={1} px={'10'}>
          <Image
            source={BackgroundImg}
            alt=""
            resizeMode="contain"
            position="absolute"
          />
          <Center mt={24} mb={16}>
            <LogoSvg />
            <Text fontSize="sm" color="gray.100" lineHeight={'sm'}>
              Strengthen your mind and body
            </Text>
          </Center>
          <Center>
            <Heading
              color="gray.100"
              fontSize="xl"
              mb={6}
              fontFamily="heading"
              lineHeight={'xl'}
            >
              Create your account
            </Heading>
          </Center>
          <VStack space={4}>
            <Controller
              control={control}
              rules={{
                required: 'Name is required',
              }}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Name"
                  inputMode="text"
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please enter a valid email',
                },
              }}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Email"
                  inputMode="email"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: 'Password is required',
              }}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Password"
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
                  secureTextEntry
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  onSubmitEditing={handleSubmit(onSubmit)}
                  returnKeyType="send"
                />
              )}
            />
          </VStack>
          <Center mt={8}>
            <Button w={'full'} h={14} onPress={handleSubmit(onSubmit)}>
              Create account
            </Button>
          </Center>
          <VStack
            flex={1}
            justifyContent={'flex-end'}
            mb={'10'}
            alignItems={'center'}
            space={4}
          >
            <Button
              w={'full'}
              h={14}
              variant={'outline'}
              onPress={handleNavigateToSignIn}
            >
              Back to Sign in
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </DismissKeyboardView>
  )
}
