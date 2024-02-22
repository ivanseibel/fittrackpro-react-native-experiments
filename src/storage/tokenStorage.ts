import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN_STORAGE_PREFIX } from '@utils/constants'

type TokenStorageProps = {
  token: string
  refreshToken: string
}

export async function tokenStorageSave({
  token,
  refreshToken,
}: TokenStorageProps) {
  await AsyncStorage.setItem(
    TOKEN_STORAGE_PREFIX,
    JSON.stringify({ token, refreshToken }),
  )
}

export async function tokenStorageGet(): Promise<TokenStorageProps | null> {
  const result = await AsyncStorage.getItem(TOKEN_STORAGE_PREFIX)

  if (result) {
    const { token, refreshToken } = JSON.parse(result)

    return {
      token,
      refreshToken,
    }
  }

  return null
}

export async function tokenStorageRemove() {
  await AsyncStorage.removeItem(TOKEN_STORAGE_PREFIX)
}
