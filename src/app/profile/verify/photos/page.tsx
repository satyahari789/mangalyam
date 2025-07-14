'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RiUploadCloud2Line } from 'react-icons/ri'

export default function UploadPhotosPage() {
  const router = useRouter()
  const [photos, setPhotos] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPhotos(Array.from(e.target.files))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) {
      setPhotos(Array.from(e.dataTransfer.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/profile/verify/step3') // adjust to your next route
  }

  return (
    <div className="min-h-screen bg-matri-bg p-4">
      <div className="bg-matri-bg py-6 text-center">
        <h1 className="text-3xl font-semibold text-[#4A1515]">Profile Verification</h1>
        <p className="text-gray-700 mt-2">Complete your verification to access all features</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-6 p-6 border border-yellow-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#4A1515]">Step 2: Upload Photos</h2>
          <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Profile pending verification
          </span>
        </div>

        <p className="mb-4 text-gray-600">Upload clear photos or request professional photography</p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center mb-4 hover:border-yellow-500 hover:bg-yellow-50 transition"
        >
          <input type="file" accept="image/*" multiple onChange={handleChange} className="hidden" id="photo-upload" />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <RiUploadCloud2Line className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600 text-sm">
              {photos.length > 0
                ? `${photos.length} photo${photos.length > 1 ? 's' : ''} selected`
                : 'Click to upload or drag photos here'}
            </p>
            <button type="button" className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md">
              Select Photos
            </button>
          </label>
        </div>

        {photos.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {photos.map((file, idx) => (
              file.type.startsWith('image/') && (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              )
            ))}
          </div>
        )}

        <div className="text-right">
          <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-md font-medium">
            Continue
          </button>
        </div>

        <p className="mt-6 text-center text-gray-500">
          Your information is secure and will only be used for verification purposes. Need help?{' '}
          <Link href="/support" className="text-red-600 underline">
            Contact Support
          </Link>
        </p>
      </form>
    </div>
  )
}
