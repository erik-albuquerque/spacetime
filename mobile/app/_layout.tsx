import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text } from 'react-native'

import { useFonts } from '../src/hooks'
import blurBg from '../src/common/assets/bg-blur.png'
import StripesComponent from '../src/common/assets/stripes.svg'

const Stripes = styled(StripesComponent)

const Layout = () => {
  const { hasLoadedFonts, errors } = useFonts()

  if (errors) {
    return <Text>{errors.message}</Text>
  }

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{
        position: 'absolute',
        left: '-100%',
      }}
    >
      <Stripes className="absolute left-2" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}

export default Layout
