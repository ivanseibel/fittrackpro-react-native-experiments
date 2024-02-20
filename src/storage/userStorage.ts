import { UserDTO } from '@dtos/UserDTO'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { USER_STORAGE_PREFIX } from 'src/utils/constants'

export async function userStorageSave(user: UserDTO) {
  await AsyncStorage.setItem(
    `${USER_STORAGE_PREFIX}:${user.id}`,
    JSON.stringify(user),
  )
}
