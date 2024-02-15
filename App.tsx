import { Text, StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import {
  useFonts,
  Roboto_400Regular as Roboto400Regular,
  Roboto_700Bold as Roboto700Bold,
} from '@expo-google-fonts/roboto'
import { Loading } from '@components/Loading'

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular: Roboto400Regular,
    Roboto_700Bold: Roboto700Bold,
  })

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={'transparent'}
        translucent={true}
      />
      {!fontsLoaded ? (
        <Loading />
      ) : (
        <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 32 }}>
          Hello FitTrackPro
        </Text>
      )}
    </NativeBaseProvider>
  )
}
