'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function UploadPhotoPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const openFilePicker = () => inputRef.current?.click()

  const handleChosen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleCapture = () => {
    if (inputRef.current) {
      inputRef.current.setAttribute('capture', 'user')
      inputRef.current.click()
      inputRef.current.removeAttribute('capture')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const data = new FormData()
    data.append('photo', file)

    const res = await fetch('/api/upload-photo', {
      method: 'POST',
      body: data,
    })

    if (res.ok) {
      router.push('/poojari')
    } else {
      alert('Upload failed')
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="flex items-center p-4">
        <button onClick={() => router.back()} className="text-red-500 text-xl">←</button>
        <h1 className="flex-grow text-center font-semibold text-lg"> Upload Profile Photo</h1>
        <div className="w-6" />
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden mb-6 flex items-center justify-center">
          {file ? (
            <img
              src={URL.createObjectURL(file)}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400">A photo of you</span>
          )}
        </div>
        <p className="text-center text-gray-500 mb-8 px-8">
          Please make sure your photo clearly shows your face.
        </p>
        <button
          onClick={handleCapture}
          className="w-full max-w-xs bg-gray-500 text-white py-3 rounded-full mb-3"
        >
          Take photo
        </button>
        <button
          onClick={openFilePicker}
          className="w-full max-w-xs bg-gray-500 text-white py-3 rounded-full"
        >
          Choose from camera roll
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChosen}
          className="hidden"
        />
      </main>

      <footer className="p-4 text-center ">
        <button
          onClick={handleUpload}
          disabled={!file}
          className={`w-full max-w-xs bg-gray-500 text-white py-3 rounded-full mb-3 ${
            file ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300'
          }`}
        >
          Upload
        </button>
      </footer>
    </div>
  )
}
