import { HStack, Heading, Text, VStack } from 'native-base'

type HistoryCardProps = {
  group: string
  name: string
  time: string
}

export function HistoryCard({ group, name, time }: HistoryCardProps) {
  return (
    <HStack
      px={5}
      py={4}
      mb={3}
      bg={'gray.600'}
      rounded={'8px'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <VStack mr={5}>
        <Heading
          color="white"
          fontSize={'md'}
          lineHeight={'md'}
          textTransform={'capitalize'}
        >
          {group}
        </Heading>
        <Text
          color="gray.100"
          fontSize={'lg'}
          numberOfLines={2}
          lineHeight={'lg'}
        >
          {name}
        </Text>
      </VStack>
      <Text color="gray.300" fontSize={'md'} lineHeight={'md'}>
        {time}
      </Text>
    </HStack>
  )
}
