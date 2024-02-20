import { GroupDTO } from './GroupDTO'

export type ExerciseDTO = {
  created_at: string
  demo: string
  group: GroupDTO
  id: number
  name: string
  repetitions: number
  series: number
  thumb: string
  updated_at: string
}
