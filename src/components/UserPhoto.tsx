import { Center, Image, IImageProps } from 'native-base'

type UserPhotoProps = IImageProps & {
  size: number
}

export function UserPhoto({ size, alt, ...rest }: UserPhotoProps) {
  return (
    <Center>
      <Image
        w={size}
        h={size}
        alt={alt}
        rounded={'full'}
        borderColor={'gray.400'}
        borderWidth={2}
        {...rest}
      />
    </Center>
  )
}
