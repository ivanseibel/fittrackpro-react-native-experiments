import { Text, StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular as Roboto400Regular,
  Roboto_700Bold as Roboto700Bold,
} from '@expo-google-fonts/roboto'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular: Roboto400Regular,
    Roboto_700Bold: Roboto700Bold,
  })

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>
  }

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 32 }}>
        Hello FitTrackPro
      </Text>
    </NativeBaseProvider>
  )
}
