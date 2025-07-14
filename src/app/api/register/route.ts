import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const data = await req.formData();

  const firstName = data.get('firstName') as string;
  const phone = data.get('phone') as string;
  const dob = data.get('dob') as string;
  const gender = data.get('gender') as string;
  const education = data.get('education') as string;
  const idType = data.get('idType') as string;

  let idFilePath: string | null = null;
  const idFile = data.get('idFile') as File;

  if (idFile && idFile.name) {
    const bytes = await idFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${idFile.name}`;
    const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

    await writeFile(filePath, buffer);
    idFilePath = `/uploads/${fileName}`;
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      phone,
      dob,
      gender,
      education,
      idType,
      idFile: idFilePath || undefined,
    },
  });

  return NextResponse.json({ message: 'User created', user });
}
