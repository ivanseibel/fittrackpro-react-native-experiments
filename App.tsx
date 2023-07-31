import { Text, View } from 'react-native'
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 32 }}>
        Hello FitTrackPro
      </Text>
    </View>
  )
}
