'use client'

import { ChangeEvent, useState } from 'react'

const MediaPicker = () => {
  const [preview, setPreview] = useState<string | null>(null)

  const onMediaSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (!files) {
      return
    }

    const mediaFile = files[0]

    const mediaPreviewUrl = URL.createObjectURL(mediaFile)

    setPreview(mediaPreviewUrl)
  }

  return (
    <>
      <input
        onChange={onMediaSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line
        <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}

export { MediaPicker }
