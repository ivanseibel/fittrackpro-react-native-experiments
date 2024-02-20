import { UserDTO } from '@dtos/UserDTO'
import { createContext, useState } from 'react'

type SignInProps = {
  email: string
  password: string
}

type AuthContextDataType = {
  user: UserDTO
  isAuthenticated: boolean
  signIn: (props: SignInProps) => void
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

  function handleSignIn({ email, password }: SignInProps) {
    if (email === '' || password === '') {
      return
    }

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
