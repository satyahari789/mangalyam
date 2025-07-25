'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SignInPage() {
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
    try {
      const res = await fetch('/api/otp/generate', {
        method: 'POST',
        body: JSON.stringify({ identifier }),
      })
      if (res.ok) {
        setOtpSent(true)
      } else {
        setError('Failed to send OTP')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  const verifyOtp = async () => {
    try {
      const res = await fetch('/api/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ identifier, otp }),
      })
      if (res.ok) {
        router.push('/poojari')
      } else {
        setError('Invalid OTP')
      }
    } catch (err) {
      setError('Something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-[#fffaf5] flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* Left Hero Section */}
        <div className="bg-[#fffaf5] p-10 space-y-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug">
            Welcome to Your <span className="text-red-600">Matrimony</span>{' '}
            Journey
          </h1>
          <p className="text-gray-700">
            Sign in with your phone number for a personalized experience in
            finding your perfect match.
          </p>

          <ul className="space-y-4 text-gray-700">
            {[
              'Simple and secure login with OTP',
              'Access to verified profiles only',
              'Your data is kept private and secure',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle className="text-red-500 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-sm">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>

        {/* Right Form Section */}
        <div className="p-10 space-y-6 flex flex-col justify-center">
          <h2 className="text-center text-2xl font-semibold">Login</h2>
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
            className="w-full border rounded-full px-4 py-2 focus:ring-blue-400 focus:outline-none"
          />

          {!otpSent && (
            <button
              onClick={sendOtp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full transition"
            >
              Get OTP
            </button>
          )}

          {otpSent && (
            <>
              <input
                type="text"
                maxLength={6}
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
            </>
          )}

          {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </div>
    </div>
  )
}
