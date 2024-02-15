import { IButtonProps, Button as NativeBaseButton } from 'native-base'

type ButtonProps = IButtonProps & {
  variant?: 'solid' | 'outline'
}

export function Button({ variant = 'solid', children, ...rest }: ButtonProps) {
  return (
    <NativeBaseButton
      rounded={'6px'}
      bg={variant === 'outline' ? 'transparent' : 'green.700'}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor={'green.500'}
      _text={{
        fontFamily: 'heading',
        color: variant === 'outline' ? 'green.700' : 'white',
        fontSize: 'md',
      }}
      _pressed={{
        bg: variant === 'outline' ? 'green.700' : 'green.500',
        _text: {
          fontFamily: 'heading',
          color: 'white',
          fontSize: 'md',
        },
      }}
      variant={variant}
      {...rest}
    >
      {children}
    </NativeBaseButton>
  )
}
