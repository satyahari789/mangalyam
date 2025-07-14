'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Link from 'next/link'
import Image from 'next/image'
 

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<string>()
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  const identifier = email.trim() || phone || ''

  const sendOtp = async () => {
    setError('')
    if (!identifier) {
      setError('Please enter email or phone')
      return
    }
    const res = await fetch('/api/otp/generate', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    })
    if (res.ok) {
      setOtpSent(true)
    } else {
      setError('Failed to send OTP')
    }
  }

  const verifyOtp = async () => {
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ identifier, otp }),
    })
    if (res.ok) {
      router.push('/options')
    } else {
      setError('Invalid OTP')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-4">
        <Image
          src="/images/logo.png"
          width={90}
          height={90}
          alt="App Logo"
          className="mx-auto"
        />
        <h2 className="text-center text-2xl font-semibold">Create Your Account</h2>
        <p className="text-center text-gray-600">
          Join us and discover something amazing.
        </p>

        <input
          type="email"
          placeholder="Enter Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-full px-4 py-2 focus:ring-blue-400 focus:outline-none"
        />

        <div className="flex items-center text-xs text-gray-400">
          <span className="flex-grow border-b"></span>
          <span className="px-2">or</span>
          <span className="flex-grow border-b"></span>
        </div>

        <PhoneInput
          placeholder="Enter Phone number"
          defaultCountry="IN"
          value={phone}
          onChange={setPhone} 
          className="w-full border rounded-full px-4 py-2 focus:ring-blue-400 focus:outline-none  "
        />

        {!otpSent && (<button
          onClick={sendOtp}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full transition"
        >
          Get OTP
        </button>)}

        {otpSent && (
          <div className="space-y-2">
            <input
              type="text"
              maxLength={5}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-full px-4 py-2 focus:ring-blue-400 focus:outline-none"
            />
            <button
              onClick={verifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition"
            >
              Continue
            </button>
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link href="/log" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
