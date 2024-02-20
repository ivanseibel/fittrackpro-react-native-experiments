import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { Exercise } from './Exercise'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { api } from 'src/service/api'
import { TOAST_DEFAULT } from '@utils/constants'
import { AppError } from '@utils/AppError'

type Group = string

type Exercise = {
  id: string
  name: string
  series: string
  repetitions: string
  group: Group
}

// const exercises: Exercise[] = [
//   {
//     name: 'Front pulldown',
//     image:
//       'https://williamcarvalhoamaral.files.wordpress.com/2020/01/dorsal-blog.jpg?w=640',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Bent-Over row',
//     image:
//       'https://post.healthline.com/wp-content/uploads/2022/04/female-workout-bent-over-row-1296-728-header.jpg',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Single-Arm Row',
//     image:
//       'https://hips.hearstapps.com/hmg-prod/images/form-check-index-1591205064.png?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Deadlifts',
//     image:
//       'https://www.shape.com/thmb/hHanf-antsddTCTA5LrUq-Oj6TM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/101323-Deadlifts-f3b42d2d25a84c91b98e412aa4ed4d33.jpg',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Deadlifts',
//     image:
//       'https://www.shape.com/thmb/hHanf-antsddTCTA5LrUq-Oj6TM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/101323-Deadlifts-f3b42d2d25a84c91b98e412aa4ed4d33.jpg',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Deadlifts',
//     image:
//       'https://www.shape.com/thmb/hHanf-antsddTCTA5LrUq-Oj6TM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/101323-Deadlifts-f3b42d2d25a84c91b98e412aa4ed4d33.jpg',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
//   {
//     name: 'Deadlifts',
//     image:
//       'https://www.shape.com/thmb/hHanf-antsddTCTA5LrUq-Oj6TM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/101323-Deadlifts-f3b42d2d25a84c91b98e412aa4ed4d33.jpg',
//     description:
//       '3 sets - 12 reps Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi praesentium omnis error vero porro inventore, tempore corrupti dolores odit? Provident eos adipisci, doloribus minima fugit esse voluptatum. Quisquam, quod dolorum?',
//     group: 'back',
//   },
// ]

export function Home() {
  const [groups, setGroups] = useState<Group[]>([])
  const [selectedGroup, setSelectedGroup] = useState<Group>('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  function handleOpenExercise() {
    navigation.navigate('exercise')
  }

  useEffect(() => {
    async function fetchGroups() {
      try {
        const result = await api.get('/groups')

        if (result.status === 200) {
          setGroups(result.data)
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
          const result = await api.get(`/exercises/bygroup/${selectedGroup}`)

          if (result.status === 200) {
            console.log('result.data', result.data)
            setExercises(result.data as Exercise[])
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
              image={
                'https://hips.hearstapps.com/hmg-prod/images/one-young-man-sport-clothes-back-lat-pulldown-royalty-free-image-1636375894.jpg'
              }
              onPress={handleOpenExercise}
            />
          )}
        />
      </VStack>
    </VStack>
  )
}
