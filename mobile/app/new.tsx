import { Link, useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

import {
  Switch,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import NLWLogo from '../src/common/assets/nlw-spacetime-logo.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import React, { useState } from 'react'
import { api } from '../src/lib'

const NewMemories = () => {
  const router = useRouter()

  const { bottom, top } = useSafeAreaInsets()

  const [isLoading, setIsLoading] = useState(false)

  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [isPublic, setIsPublic] = useState(false)

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      })

      if (result.assets[0]) {
        setPreview(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateMemory = async () => {
    let coverUrl = ''

    if (preview) {
      setIsLoading(true)

      const uploadFormData = new FormData()

      uploadFormData.append('file', {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpg',
      } as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      coverUrl = uploadResponse.data.fileUrl

      setIsLoading(false)
    }

    const token = await SecureStore.getItemAsync('token')

    setIsLoading(true)

    await api.post(
      '/memories',
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    setIsLoading(false)

    router.push('/memories')
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NLWLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#fff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            trackColor={{
              false: '#767577',
              true: '#372560',
            }}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={openImagePicker}
          className="h-32 justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              className="h-full w-full rounded-lg object-cover"
              alt=""
            />
          ) : (
            <View className="flex-row items-center justify-center gap-2">
              <Icon name="image" color="#9e9ea0" size={16} />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou vídeo de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          textAlignVertical="top"
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCreateMemory}
          disabled={isLoading}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          {isLoading ? (
            <View className="w-[53px]">
              <ActivityIndicator color="#000" />
            </View>
          ) : (
            <Text className="font-alt text-sm uppercase text-black">
              Salvar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default NewMemories
