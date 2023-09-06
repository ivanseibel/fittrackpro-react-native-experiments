import { SignInDTO } from '@dtos/SignInDTO'
import { UserDTO } from '@dtos/UserDTO'
import { tokenStorageGet, tokenStorageSave } from '@storage/tokenStorage'
import {
  userStorageGet,
  userStorageRemove,
  userStorageSave,
} from '@storage/userStorage'
import { AppError } from '@utils/AppError'
import { createContext, useEffect, useState } from 'react'
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
  isLoading: boolean
  signIn: (props: SignInProps) => void
  signOut: () => void
  signUp: (props: SignUpProps) => void
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

  function updateUserStateAndSetToken(data: SignInDTO) {
    setUser(data.user)

    api.defaults.headers.common.Authorization = `Bearer ${data.token}`
  }

  async function updateUserAndTokenStorage(data: SignInDTO) {
    await userStorageSave(data.user)
    await tokenStorageSave(data.token)
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

  useEffect(() => {
    async function loadStorageData() {
      setIsLoading(true)

      const userFromStorage = await userStorageGet()
      const tokenFromStorage = await tokenStorageGet()

      if (userFromStorage && tokenFromStorage) {
        updateUserStateAndSetToken({
          user: userFromStorage,
          token: tokenFromStorage,
          refresh_token: '',
        })
      }

      setIsLoading(false)
    }

    loadStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
