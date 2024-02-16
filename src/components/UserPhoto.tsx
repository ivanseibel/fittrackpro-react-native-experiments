import { Center, Image, IImageProps, Skeleton } from 'native-base'
import { useState } from 'react'

type UserPhotoProps = IImageProps & {
  size: number
}

export function UserPhoto({ size, alt, ...rest }: UserPhotoProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Center position="relative">
      <Skeleton
        w={size}
        h={size}
        rounded="full"
        startColor="gray.500"
        endColor="gray.600"
      />
      <Image
        w={size}
        h={size}
        alt={alt}
        position={'absolute'}
        rounded="full"
        borderColor="gray.400"
        borderWidth={2}
        onLoad={() => setImageLoaded(true)}
        onLoadStart={() => setImageLoaded(false)}
        opacity={imageLoaded ? 1 : 0} // Ensure the image becomes visible only when loaded
        {...rest}
      />
    </Center>
  )
}
