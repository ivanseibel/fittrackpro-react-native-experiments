import { UserDTO } from '@dtos/UserDTO'
import { createContext } from 'react'

type AuthContextDataType = {
  user: UserDTO
  isAuthenticated: boolean
}

const INITIAL_STATE: AuthContextDataType = {
  user: {} as UserDTO,
  isAuthenticated: false,
}

export const AuthContext = createContext<AuthContextDataType>(INITIAL_STATE)
