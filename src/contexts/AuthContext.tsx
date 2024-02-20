import { UserDTO } from '@dtos/UserDTO'
import { createContext } from 'react'

type AuthContextDataType = {
  user: UserDTO
  isAuthenticated: boolean
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

const INITIAL_STATE: AuthContextDataType = {
  user: {} as UserDTO,
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContextDataType>(INITIAL_STATE)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          id: '1',
          name: 'User',
          email: 'user@email.com',
          avatar: 'user.png',
        },
        isAuthenticated: false,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
