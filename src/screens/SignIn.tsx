import { VStack, Image, Text, Center, Heading } from 'native-base'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from '@components/Input'

export default function SignIn() {
  return (
    <VStack flex={1} bg={'gray.700'}>
      <Image
        source={BackgroundImg}
        alt=""
        resizeMode="contain"
        position="absolute"
      />
      <Center flex={1} justifyContent={'flex-start'} paddingX="10">
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
        <Center>
          <Input placeholder="Email" />
        </Center>
      </Center>
    </VStack>
  )
}
