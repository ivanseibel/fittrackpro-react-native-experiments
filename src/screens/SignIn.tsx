import { VStack, Image, Text, Center, Heading } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'
import { DismissKeyboardView } from '@components/DismissKeyboardView'

export default function SignIn() {
  return (
    <DismissKeyboardView>
      <VStack flex={1} bg={'gray.700'} px={'10'}>
        <Image
          source={BackgroundImg}
          alt=""
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text fontSize="sm" color="gray.100">
            Strengthen your mind and body
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Access your account
          </Heading>
        </Center>
        <VStack space={4}>
          <Input placeholder="Email" inputMode="email" />
          <Input placeholder="Password" secureTextEntry />
        </VStack>
      </VStack>
    </DismissKeyboardView>
  )
}
