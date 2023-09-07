import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from 'src/service/api'
import { TOAST_DEFAULT } from '@utils/constants'
import { AppError } from '@utils/AppError'
import { ExerciseDTO } from '@dtos/ExerciseDTO'
import { GroupDTO } from '@dtos/GroupDTO'
import { Loading } from '@components/Loading'

export function Home() {
  const [groups, setGroups] = useState<GroupDTO[]>([])
  const [selectedGroup, setSelectedGroup] = useState<GroupDTO>('')
  const [exercises, setExercises] = useState<ExerciseDTO[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpenExercise(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId })
  }

  useEffect(() => {
    async function fetchGroups() {
      try {
        const result = await api.get('/groups')

        if (result.status === 200) {
          setGroups(result.data)
          setSelectedGroup(result.data[0])
        }
      } catch (error) {
        const isAppError = error instanceof AppError

        if (isAppError) {
          return toast.show({
            description: isAppError
              ? error.message
              : 'An error occurred while listing the groups of exercise. \nPlease try again later.',
            bgColor: 'red.500',
            ...TOAST_DEFAULT,
          })
        }
      }
    }
    fetchGroups()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      async function fetchExercisesByGroup() {
        try {
          setIsLoading(true)

          const result = await api.get(`/exercises/bygroup/${selectedGroup}`)

          if (result.status === 200) {
            setExercises(result.data as ExerciseDTO[])
          }
        } catch (error) {
          const isAppError = error instanceof AppError

          if (isAppError) {
            return toast.show({
              description: isAppError
                ? error.message
                : 'An error occurred while listing the exercises. \nPlease try again later.',
              bgColor: 'red.500',
              ...TOAST_DEFAULT,
            })
          }
        } finally {
          setIsLoading(false)
        }
      }

      fetchExercisesByGroup()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGroup]),
  )

  return (
    <VStack flex={1}>
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={(group) => group}
        horizontal
        showsHorizontalScrollIndicator={false}
        my={10}
        maxH={10}
        _contentContainerStyle={{ px: 8 }}
        renderItem={({ item }) => (
          <Group
            name={item}
            active={selectedGroup === item}
            onPress={() => setSelectedGroup(item)}
          />
        )}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent={'space-between'} mb={5}>
            <Heading
              color={'gray.200'}
              fontSize={'md'}
              lineHeight={'md'}
              fontFamily={'heading'}
            >
              Exercises
            </Heading>
            <Text color={'gray.200'} fontSize={'sm'}>
              {exercises.length}
            </Text>
          </HStack>
          <FlatList
            data={exercises}
            keyExtractor={(exercise, index) => `${exercise.name}-${index}`}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 8 }}
            renderItem={({ item }) => (
              <ExerciseCard
                description={`${item.series} series - ${item.repetitions} reps`}
                name={item.name}
                image={item.thumb}
                onPress={() => handleOpenExercise(item.id)}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
