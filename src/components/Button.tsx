import { IButtonProps, Button as NativeBaseButton, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      rounded={'6px'}
      _pressed={{
        bg: 'green.500',
      }}
      {...rest}
    >
      <Text fontFamily={'heading'} color={'white'} fontSize={'md'}>
        {title}
      </Text>
    </NativeBaseButton>
  )
}
