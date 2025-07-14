'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RiUploadCloud2Line } from 'react-icons/ri'

export default function ProfileVerifyPage() {
  const router = useRouter()
  const [idType, setIdType] = useState('Aadhar Card')
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/profile/verify/photos')
  }

  return (
    <div className="min-h-screen bg-matri-bg p-4">
      <div className="bg-matri-bg py-6 text-center">
        <h1 className="text-3xl font-semibold text-[#4A1515]">Profile Verification</h1>
        <p className="text-gray-700 mt-2">Complete your verification to access all features</p>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-4">
        {[1, 2, 3, 4].map((step, i) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${
                step === 1
                  ? 'border-red-500 bg-red-100 text-red-700'
                  : 'border-gray-300 bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            {i < 3 && <div className="flex-1 h-1 mx-2 bg-gray-300" />}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg mt-6 p-6 border border-yellow-200"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-[#4A1515]">Step 1: ID Verification</h2>
          <span className="inline-flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
            Profile pending verification
          </span>
        </div>

        <p className="mb-4 text-gray-600">Upload a government-issued ID for verification</p>
        <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded mb-6">
          <strong>Why we verify?</strong> Verification helps ensure all members on our platform are genuine and trustworthy.
        </div>

        <label className="block mb-2 font-medium text-gray-700">ID Type</label>
        <select
          value={idType}
          onChange={(e) => setIdType(e.target.value)}
          className="block w-full bg-[#FEF9F1] border border-gray-300 rounded-md p-2 mb-6"
        >
          <option>Aadhar Card</option>
          <option>Voter ID</option>
          <option>PAN Card</option>
          <option>Passport</option>
          <option>Driving Licence</option>
        </select>

        <label className="block mb-2 font-medium text-gray-700">Upload ID Proof</label>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center mb-4 hover:border-yellow-500 hover:bg-yellow-50 transition"
        >
          <input
            type="file"
            id="id-upload"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="id-upload" className="cursor-pointer">
            <RiUploadCloud2Line className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-gray-600 text-sm">
              {file ? file.name : 'Click to upload or drag file here'}
            </p>
          </label>
        </div>

        {file && file.type.startsWith('image/') && (
          <img src={URL.createObjectURL(file)} alt="Preview" className="mx-auto max-h-40 mb-6" />
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4 flex items-center space-x-4">
          <span className="text-xl font-semibold text-gray-800">₹50,000</span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">FREE</span>
          <span className="text-gray-600 flex-grow">Limited time offer! Complete verification now.</span>
        </div>

        <div className="text-right">
          <button type="submit" className="px-6 py-3 bg-red-600 text-white rounded-md font-medium">
            Continue
          </button>
        </div>

        <p className="mt-6 text-center text-gray-500">
          Your info is secure and will only be used for verification purposes. Need help?{' '}
          <Link href="/support" className="text-red-600 underline">
            Contact Support
          </Link>
        </p>
      </form>
    </div>
  )
}
