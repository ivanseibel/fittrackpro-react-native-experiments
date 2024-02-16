import { HStack, Image, VStack, Text, Heading, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps & {
  name: string
  image: string
  description: string
}

export function ExerciseCard({
  name,
  image,
  description,
  ...rest
}: ExerciseCardProps) {
  return (
    <TouchableOpacity {...rest} style={{ marginBottom: 12 }}>
      <HStack
        bg={'gray.500'}
        alignItems={'center'}
        p={2}
        pr={4}
        rounded={8}
        h={88}
      >
        <Image
          source={{
            uri: image,
          }}
          alt="Exercise image"
          w={16}
          h={16}
          rounded={'6px'}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading
            color="white"
            size="md"
            fontFamily={'heading'}
            lineHeight={'md'}
          >
            {name}
          </Heading>
          <Text
            fontSize={'sm'}
            lineHeight={'sm'}
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            {description}
          </Text>
        </VStack>
        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color={'gray.300'}
          size={4}
          ml={4}
        />
      </HStack>
    </TouchableOpacity>
  )
}
