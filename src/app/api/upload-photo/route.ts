import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const form = await request.formData()
  const photo = form.get('photo') as Blob | null

  if (!photo) {
    return NextResponse.json({ error: 'No photo provided' }, { status: 400 })
  }

  // TODO: save the file (e.g. cloud storage, database, file system)
  console.log('Uploading:', photo)

  return NextResponse.json({ success: true })
}
