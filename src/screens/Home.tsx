import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, VStack } from 'native-base'
import { useState } from 'react'

type GroupOfExercises =
  | 'back'
  | 'biceps'
  | 'chest'
  | 'legs'
  | 'shoulders'
  | 'triceps'

const groups: GroupOfExercises[] = [
  'back',
  'biceps',
  'chest',
  'legs',
  'shoulders',
  'triceps',
]

export function Home() {
  const [selectedGroup, setSelectedGroup] = useState<GroupOfExercises>('biceps')

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(group) => group}
        horizontal
        backgroundColor={'green.100'}
        my={10}
        // maxH={10}
        _contentContainerStyle={{ px: 8 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            active={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />
    </VStack>
  )
}
