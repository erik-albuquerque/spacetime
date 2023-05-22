import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import Icon from '@expo/vector-icons/Feather'

import React, { useEffect, useState } from 'react'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'

import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native'
import * as SecureStore from 'expo-secure-store'

import NLWLogo from '../src/common/assets/nlw-spacetime-logo.svg'

import { api } from '../src/lib/api'

dayjs.locale(ptBR)

type Memory = {
  coverUrl: string
  excerpt: string
  createdAt: string
  id: string
}

const NewMemory = () => {
  const router = useRouter()
  const { bottom, top } = useSafeAreaInsets()

  const [isLoading, setIsLoading] = useState(false)

  const [memories, setMemories] = useState<Memory[]>([])

  const signOut = async () => {
    await SecureStore.deleteItemAsync('token')

    router.push('/')
  }

  const loadMemories = async () => {
    setIsLoading(true)

    const token = await SecureStore.getItemAsync('token')

    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data.memories)

    setIsLoading(false)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <SafeAreaView
      className="flex-1"
      style={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between px-8">
        <NLWLogo />

        <View className="flex-row gap-2">
          <Link href="/new" asChild>
            <TouchableOpacity className="h-8 w-8 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            onPress={signOut}
            className="h-8 w-8 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {isLoading ? (
          <View className="h-[85vh] items-center justify-center">
            <ActivityIndicator color="#8257e5" size="large" />
          </View>
        ) : (
          <FlatList
            data={memories}
            renderItem={({ item: memory }) => (
              <View key={memory.id} className="space-y-4">
                <View className="flex-row items-center gap-2">
                  <View className="h-px w-5 bg-gray-50" />
                  <Text className="font-body text-sm text-gray-100">
                    {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                  </Text>
                </View>
                <View className="space-y-4 px-8">
                  <Image
                    source={{
                      uri: memory.coverUrl,
                    }}
                    className="aspect-video w-full rounded-lg"
                    alt=""
                  />
                  <Text className="font-body text-base leading-relaxed text-gray-100">
                    {memory.excerpt}
                  </Text>
                  <Link href="/memories/id" asChild>
                    <TouchableOpacity className="flex-row items-center gap-2">
                      <Text className="font-body text-sm text-gray-200">
                        Ler mais
                      </Text>
                      <Icon name="arrow-right" size={16} color="#9e9ea0" />
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              flexDirection: 'column',
              gap: 16,
            }}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default NewMemory
