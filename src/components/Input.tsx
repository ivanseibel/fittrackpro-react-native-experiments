import { Input as NativeBaseInput } from 'native-base'

type InputProps = React.ComponentProps<typeof NativeBaseInput>

export function Input(props: InputProps) {
  return (
    <NativeBaseInput
      bg="gray.650"
      h={14}
      px={4}
      borderWidth={0}
      fontSize={'md'}
      color={'white'}
      fontFamily={'body'}
      placeholderTextColor={'gray.300'}
      rounded={'6px'}
      _focus={{
        bg: 'gray.650',
        borderWidth: 1,
        borderColor: 'green.500',
      }}
      {...props}
    />
  )
}
