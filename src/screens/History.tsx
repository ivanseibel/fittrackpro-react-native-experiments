import { HistoryCard } from '@components/HistoryCard'
import { ScreenHeader } from '@components/ScreenHeader'
import { VStack, SectionList, Heading, Text } from 'native-base'

type Exercise = {
  group: string
  name: string
  time: string
}

type ExerciseHistorySectionList = {
  title: string
  data: Exercise[]
}

const exercises: ExerciseHistorySectionList[] = [
  {
    title: '26.08.2021',
    data: [
      {
        group: 'Back',
        name: 'Front pulldown',
        time: '07:30',
      },
      {
        group: 'Chest',
        name: 'Bench press',
        time: '08:30',
      },
    ],
  },
  {
    title: '27.08.2021',
    data: [
      {
        group: 'Back',
        name: 'Front pulldown',
        time: '07:30',
      },
      {
        group: 'Chest',
        name: 'Bench press',
        time: '08:30',
      },
    ],
  },
  {
    title: '28.08.2021',
    data: [
      {
        group: 'Back',
        name: 'Front pulldown',
        time: '07:30',
      },
      {
        group: 'Chest',
        name: 'Bench press',
        time: '08:30',
      },
    ],
  },
]

export function History() {
  return (
    <VStack flex={1}>
      <ScreenHeader title="Exercise History" />

      <SectionList
        sections={exercises}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <HistoryCard {...item} />}
        px={8}
        ListEmptyComponent={() => (
          <Text
            color={'gray.100'}
            fontSize={'md'}
            lineHeight={'md'}
            w="80%"
            textAlign={'center'}
          >
            Your fitness journey awaits - let&apos;s start logging those
            workouts!
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }
        renderSectionHeader={({ section: { title } }) => (
          <Heading
            color={'gray.200'}
            fontSize={'md'}
            lineHeight={'md'}
            mt={10}
            mb={3}
          >
            {title}
          </Heading>
        )}
      />
    </VStack>
  )
}
