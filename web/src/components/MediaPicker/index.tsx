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
        id="media"
        type="file"
        className="invisible"
        accept="image/*"
        onChange={onMediaSelected}
        hidden
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
