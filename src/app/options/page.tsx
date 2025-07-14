'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OptionsPage() {
  const router = useRouter()
  const options = [
    //{ title: 'For Myself', desc: 'Looking for my own match' },
    //{ title: 'For Son/Daughter', desc: "Looking for my child's match" },
    { title: 'Users', desc: 'Professional matchmaking service' },
    { title: 'Poojari', desc: 'Religious ceremony services' }
  ]

  const onSelect = (title: string) => {
    console.log('Selected:', title)
    router.push('register')
  }

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

      {/* Option Cards */}
      <div className="flex justify-center mt-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-8 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Who are you looking for?</h2>
          <p className="text-center text-gray-600 mb-4">This helps us provide you with the right experience</p>

          <div className="grid grid-cols-2 gap-4">
            {options.map(opt => (
              <button
                key={opt.title}
                className="p-4 bg-[#FEF9F1] rounded-lg shadow hover:bg-[#fdeecc] text-left"
                onClick={() => onSelect(opt.title)}
              >
                <h3 className="font-medium text-lg text-[#4A1515]">{opt.title}</h3>
                <p className="text-sm text-gray-600">{opt.desc}</p>
              </button>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/log" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
