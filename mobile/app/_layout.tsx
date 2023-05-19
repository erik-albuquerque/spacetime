import { styled } from 'nativewind'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text } from 'react-native'

import * as SecureStore from 'expo-secure-store'

import { useFonts } from '../src/hooks'
import blurBg from '../src/common/assets/bg-blur.png'
import StripesComponent from '../src/common/assets/stripes.svg'
import { useEffect, useState } from 'react'

const Stripes = styled(StripesComponent)

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const { hasLoadedFonts, errors } = useFonts()

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      setIsAuthenticated(!!token)
    })
  }, [])

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
      >
        <Stack.Screen name="index" redirect={isAuthenticated} />

        <Stack.Screen name="memories" />
      </Stack>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}

export default Layout
