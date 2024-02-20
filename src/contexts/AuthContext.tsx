import { UserDTO } from '@dtos/UserDTO'
import { createContext, useEffect, useState } from 'react'

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
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setUser({
      id: '1',
      name: 'User',
      email: 'user@email.com',
      avatar: 'user.png',
    })
    setIsAuthenticated(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
