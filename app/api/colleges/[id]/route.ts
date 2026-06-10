import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
        questions: {
          include: {
            user: { select: { name: true } },
            answers: {
              include: { user: { select: { name: true } } },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!college) {
      return NextResponse.json({ error: 'College not found' }, { status: 404 })
    }

    return NextResponse.json(college)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch college' }, { status: 500 })
  }
}