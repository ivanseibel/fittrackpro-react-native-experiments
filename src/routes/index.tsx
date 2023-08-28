import { Box, useTheme } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { AuthContext } from '@contexts/AuthContext'
import { useContext } from 'react'

export function Routes() {
  const contextData = useContext(AuthContext)

  const { isAuthenticated } = contextData as { isAuthenticated: boolean }

  const { colors } = useTheme()
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.gray[700],
    },
  }

  // const isAuthenticated = false

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
