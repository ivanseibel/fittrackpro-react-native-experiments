import { SignInDTO } from '@dtos/SignInDTO'
import { UserDTO } from '@dtos/UserDTO'
import { tokenStorageGet, tokenStorageSave } from '@storage/tokenStorage'
import {
  userStorageGet,
  userStorageRemove,
  userStorageSave,
} from '@storage/userStorage'
import { AppError } from '@utils/AppError'
import { createContext, useEffect, useMemo, useState } from 'react'
import { api } from 'src/service/api'

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthContextDataType = {
  user: UserDTO
  avatarUri: string
  isLoading: boolean
  signIn: (props: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  signUp: (props: SignUpProps) => Promise<void>
  updateUserProfile: (data: UserDTO) => Promise<void>
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataType>(
  {} as AuthContextDataType,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<UserDTO>({} as UserDTO)

  function updateUserStateAndSetToken({
    user,
    token,
  }: {
    user: UserDTO
    token: string
  }) {
    setUser(user)

    api.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  async function updateUserAndTokenStorage(data: SignInDTO) {
    await userStorageSave(data.user)
    await tokenStorageSave({
      token: data.token,
      refreshToken: data.refresh_token,
    })
  }

  async function handleSignIn({ email, password }: SignInProps) {
    if (email === '' || password === '') {
      throw new AppError('Invalid credentials')
    }

    try {
      setIsLoading(true)

      const response = await api.post('/sessions', {
        email,
        password,
      })

      const data = response.data as SignInDTO

      if (!data || !data.user || !data.token || !data.refresh_token) {
        throw new AppError('Invalid credentials')
      }

      await updateUserAndTokenStorage(data)

      updateUserStateAndSetToken(data)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignOut() {
    await userStorageRemove()
    setUser({} as UserDTO)
  }

  async function handleSignUp(data: SignUpProps) {
    try {
      setIsLoading(true)

      const response = await api.post('/users', data)

      if (response.status !== 201) {
        throw new AppError(response.data.message)
      }

      await handleSignIn({
        email: data.email,
        password: data.password,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleUpdateUserProfile(data: UserDTO) {
    setUser(data)
    await userStorageSave(data)
  }

  const avatarUri = useMemo(() => {
    const baseUri = api.defaults.baseURL
    const avatarFileName = user.avatar

    return `${baseUri}/avatar/${avatarFileName}`
  }, [user.avatar])

  useEffect(() => {
    async function loadStorageData() {
      try {
        setIsLoading(true)

        const userFromStorage = await userStorageGet()
        const tokenFromStorage = await tokenStorageGet()

        if (userFromStorage && tokenFromStorage) {
          updateUserStateAndSetToken({
            user: userFromStorage,
            token: tokenFromStorage.token,
          })
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadStorageData()
  }, [])

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(handleSignOut)

    return () => subscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        avatarUri,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
        updateUserProfile: handleUpdateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
