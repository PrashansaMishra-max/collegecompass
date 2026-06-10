import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { body, collegeId } = await req.json()

    if (!body || !collegeId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const question = await prisma.question.create({
      data: { body, collegeId, userId: user.id },
      include: {
        user: { select: { name: true } },
        answers: true,
      },
    })

    return NextResponse.json(question, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}