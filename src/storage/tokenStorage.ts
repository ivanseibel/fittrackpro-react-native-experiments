import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_STORAGE_PREFIX } from '@utils/constants'

export async function tokenStorageSave(token: string) {
  await AsyncStorage.setItem(TOKEN_STORAGE_PREFIX, token)
}

export async function tokenStorageGet(): Promise<string | null> {
  return await AsyncStorage.getItem(TOKEN_STORAGE_PREFIX)
}

export async function tokenStorageRemove() {
  await AsyncStorage.removeItem(TOKEN_STORAGE_PREFIX)
}
