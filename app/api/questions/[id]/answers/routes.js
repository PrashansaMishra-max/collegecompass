import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { body } = await req.json()

    if (!body) {
      return NextResponse.json({ error: 'Answer body required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const answer = await prisma.answer.create({
      data: { body, questionId: params.id, userId: user.id },
      include: {
        user: { select: { name: true } },
      },
    })

    return NextResponse.json(answer, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post answer' }, { status: 500 })
  }
}