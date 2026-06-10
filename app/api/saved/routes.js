import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        savedColleges: {
          include: { college: true },
          orderBy: { id: 'desc' },
        },
      },
    })

    return NextResponse.json(user?.savedColleges || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch saved colleges' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { collegeId } = await req.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId: user.id, collegeId } },
    })

    if (existing) {
      await prisma.savedCollege.delete({
        where: { userId_collegeId: { userId: user.id, collegeId } },
      })
      return NextResponse.json({ saved: false })
    }

    await prisma.savedCollege.create({
      data: { userId: user.id, collegeId },
    })

    return NextResponse.json({ saved: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save college' }, { status: 500 })
  }
}