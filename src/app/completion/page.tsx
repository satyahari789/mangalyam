'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CompletionPage() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="min-h-screen bg-matri-bg p-4">
      {/* Header */}
      <div className="bg-matri-bg py-6 text-center">
        <h1 className="text-3xl font-semibold">
          Create Your <span className="text-red-600">Matrimony Profile</span>
        </h1>
        <p className="text-gray-700 mt-2 mx-auto max-w-2xl">
          Join thousands of people finding their perfect match through our trusted platform. Start your journey to a happy marriage today.
        </p>
      </div>

      {/* Completion Card */}
      <div className="flex justify-center mt-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6 text-center">
          <h2 className="text-xl font-semibold text-[#4A1515]">Registration Complete!</h2>
          <p className="text-gray-600">Your profile has been created successfully</p>
          <div className="text-4xl">🎉</div>
          <p className="text-gray-700">
            Welcome to our platform! Your profile is now ready for verification.
          </p>

          {/* Button that turns yellow on click */}
          <Link
            href="/profile/verify"
            onClick={() => setClicked(true)}
            className={`block py-3 text-white rounded-md font-medium ${
              clicked ? 'bg-yellow-500' : 'bg-yellow-600'
            }`}
          >
            Continue to Profile Verification
          </Link>
        </div>
      </div>
    </div>
  )
}
