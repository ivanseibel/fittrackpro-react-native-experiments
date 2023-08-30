import { UserDTO } from '@dtos/UserDTO'
import { createContext, useEffect, useState } from 'react'

type AuthContextDataType = {
  user: UserDTO
  isAuthenticated: boolean
  signIn: () => void
  signOut: () => void
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataType>(
  {} as AuthContextDataType,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  function handleSignIn() {
    setUser({
      id: '1',
      name: 'User',
      email: 'user@email.com',
      avatar: 'user.png',
    })

    setIsAuthenticated(true)
  }

  function handleSignOut() {
    setUser({} as UserDTO)
    setIsAuthenticated(false)
  }

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
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
