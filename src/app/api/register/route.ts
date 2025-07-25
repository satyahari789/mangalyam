import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const firstName = formData.get('firstName') as string;
    const phone = formData.get('phone') as string;
    const dob = formData.get('dob') as string;
    const gender = formData.get('gender') as string;
    const education = formData.get('education') as string;
    const idType = formData.get('idType') as string | null;
    const idFile = formData.get('idFile');

    let fileValue: string | undefined = undefined;

    if (idFile && idFile instanceof File) {
      const buffer = Buffer.from(await idFile.arrayBuffer());
      // Store as Base64 string (for demo, not recommended for large files)
      fileValue = buffer.toString('base64');
    }

    const newUser = await prisma.user.create({
      data: {
        firstName,
        phone,
        dob,
        gender,
        education,
        idType: idType || undefined,
        idFile: fileValue,
      },
    });

    return NextResponse.json({ message: 'Registered', userId: newUser.id }, { status: 200 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Server error during registration' }, { status: 500 });
  }
}
