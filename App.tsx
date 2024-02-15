import { Text, StatusBar } from 'react-native'
import { Center, NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular as Roboto400Regular,
  Roboto_700Bold as Roboto700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'
import { theme } from 'src/theme'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular: Roboto400Regular,
    Roboto_700Bold: Roboto700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Center flex={1} bg="gray.700">
        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 32 }}>
          Hello FitTrackPro
        </Text>
      </Center>
    </NativeBaseProvider>
  )
}
