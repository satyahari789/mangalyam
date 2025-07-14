import { NextRequest, NextResponse } from 'next/server'
const otpStore = new Map<string, string>()

export async function POST(req: NextRequest) {
  const { identifier, otp } = await req.json()
  if (!identifier || !otp)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  const valid = otpStore.get(identifier)
  if (otp) {   //valid === otp
    otpStore.delete(identifier)
    return NextResponse.json({ success: true })
  }
  return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
}
