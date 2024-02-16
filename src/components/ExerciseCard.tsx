import { HStack, Image, VStack, Text, Heading, Icon } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
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
            uri: 'https://williamcarvalhoamaral.files.wordpress.com/2020/01/dorsal-blog.jpg?w=640',
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
            Front pulldown
          </Heading>
          <Text
            fontSize={'sm'}
            lineHeight={'sm'}
            color="gray.200"
            mt={1}
            numberOfLines={2}
          >
            3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Excepturi praesentium omnis error vero porro inventore,
            tempore corrupti dolores odit? Provident eos adipisci, doloribus
            minima fugit esse voluptatum. Quisquam, quod dolorum?
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
