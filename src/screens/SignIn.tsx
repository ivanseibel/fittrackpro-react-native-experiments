import { VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { DismissKeyboardView } from '@components/DismissKeyboardView'
import { Button } from '@components/Button'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '@hooks/useAuth'

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  const { signIn } = useAuth()

  function handleNavigateToSignUp() {
    navigation.navigate('signUp')
  }

  function handleSignIn() {
    signIn()
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
              Access your account
            </Heading>
          </Center>
          <VStack space={4}>
            <Input
              placeholder="Email"
              inputMode="email"
              autoCapitalize="none"
            />
            <Input placeholder="Password" secureTextEntry />
          </VStack>
          <Center mt={8}>
            <Button w={'full'} h={14} onPress={handleSignIn}>
              Sign in
            </Button>
          </Center>
          <VStack
            flex={1}
            justifyContent={'flex-end'}
            mb={'10'}
            alignItems={'center'}
            space={4}
          >
            <Heading color="gray.100" fontSize="md" mt={4} lineHeight={'md'}>
              Don&apos;t have an account?
            </Heading>
            <Button
              w={'full'}
              h={14}
              variant={'outline'}
              onPress={handleNavigateToSignUp}
            >
              Sign up
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </DismissKeyboardView>
  )
}
