import { prisma } from '@/prisma/prisma-client';
import { NextResponse } from 'next/server';
import { authOptions } from '@/shared/constants';
import { getServerSession } from 'next-auth/next';

export const dynamic = 'force-dynamic';

export async function GET(req: any, res: any) {
  try {
    const user = await getServerSession(req, res, authOptions);
    if (!user) {
      return NextResponse.json({ message: 'Вы не авторизованы!' }, { status: 401 });
    }

    const data = await prisma.user.findUnique({
      where: {
        id: Number(user.user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: '[USER_GET] Server Error' }, { status: 500 });
  }
}
