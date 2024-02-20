import { SignInDTO } from '@dtos/SignInDTO'
import { UserDTO } from '@dtos/UserDTO'
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
  isAuthenticated: boolean
  isLoading: boolean
  token: string
  refreshToken: string
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
  const [token, setToken] = useState<string>('')
  const [refreshToken, setRefreshToken] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

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

      setUser(data.user)
      setToken(data.token)
      setRefreshToken(data.refresh_token)
      setIsAuthenticated(true)

      await userStorageSave(data.user)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignOut() {
    setUser({} as UserDTO)
    setIsAuthenticated(false)
    setToken('')
    setRefreshToken('')

    await userStorageRemove()
  }

  async function handleSignUp(data: SignUpProps) {
    try {
      setIsLoading(true)

      const response = await api.post('/users', data)

      if (response.status !== 201) {
        throw new AppError(response.data.message)
      }

      const user = response.data as UserDTO
      setUser(user)
      setIsAuthenticated(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function loadStorageData() {
      setIsLoading(true)

      const user = await userStorageGet()

      if (user) {
        setUser(user)
        setIsAuthenticated(true)
      }

      setIsLoading(false)
    }

    loadStorageData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        token,
        refreshToken,
        signIn: handleSignIn,
        signOut: handleSignOut,
        signUp: handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
