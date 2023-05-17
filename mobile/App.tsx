import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'react-native'
import { useFonts } from './src/hooks'

export default function App() {
  const { hasLoadedFonts, errors } = useFonts()

  if (errors) {
    return <Text>{errors.message}</Text>
  }

  if (!hasLoadedFonts) {
    return null
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-900">
      <Text className="font-alt text-5xl text-zinc-50">Rocketseat</Text>
      <StatusBar style="light" translucent />
    </View>
  )
}
