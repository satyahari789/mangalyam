import { NextRequest, NextResponse } from 'next/server'
const otpStore = new Map<string, string>()

export async function POST(req: NextRequest) {
  const { identifier } = await req.json()
  if (!identifier)
    return NextResponse.json({ error: 'Email or phone required' }, { status: 400 })

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  otpStore.set(identifier, otp)
  console.log(`🟢 OTP for ${identifier}:`, otp)
  return NextResponse.json({ success: true })
}
