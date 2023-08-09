import { IPressableProps, Pressable, Text } from 'native-base'

type GroupProps = IPressableProps & {
  name: string
  onPress?: () => void
}

export function Group({ name, ...rest }: GroupProps) {
  return (
    <Pressable
      {...rest}
      mr={3}
      w={24}
      h={10}
      bg={'gray.600'}
      rounded="4px"
      justifyContent={'center'}
      alignItems={'center'}
      overflow={'hidden'}
    >
      <Text
        color={'gray.200'}
        textTransform={'uppercase'}
        fontSize={'xs'}
        fontWeight={'bold'}
      >
        {name}
      </Text>
    </Pressable>
  )
}
