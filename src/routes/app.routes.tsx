import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'
import { Center, useTheme } from 'native-base'
import { Platform } from 'react-native'

type AppRoutes = {
  home: undefined
  history: undefined
  profile: undefined
  exercise: { exerciseId: string }
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[7]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          paddingTop: sizes[10],
          paddingBottom: Platform.OS === 'ios' ? sizes[16] : sizes[10],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Center h={sizes[4]} w={sizes[4]}>
              <HomeSvg fill={color} width={iconSize} height={iconSize} />
            </Center>
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <Center h={sizes[4]} w={sizes[4]}>
              <HistorySvg fill={color} width={iconSize} height={iconSize} />
            </Center>
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <Center h={sizes[4]} w={sizes[4]}>
              <ProfileSvg fill={color} width={iconSize} height={iconSize} />
            </Center>
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
