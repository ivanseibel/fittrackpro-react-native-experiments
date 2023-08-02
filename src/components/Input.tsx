import { Input as NativeBaseInput } from 'native-base'

type InputProps = React.ComponentProps<typeof NativeBaseInput>

export function Input(props: InputProps) {
  return (
    <NativeBaseInput
      bg="gray.700"
      h={14}
      px={4}
      borderWidth={0}
      fontSize={'md'}
      color={'white'}
      fontFamily={'body'}
      placeholderTextColor={'gray.300'}
      {...props}
    />
  )
}
