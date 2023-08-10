import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { HStack, VStack } from 'native-base'
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
      <HStack>
        {groups.map((group) => (
          <Group
            key={group}
            name={group}
            active={selectedGroup === group}
            onPress={() => setSelectedGroup(group)}
          />
        ))}
      </HStack>
    </VStack>
  )
}
