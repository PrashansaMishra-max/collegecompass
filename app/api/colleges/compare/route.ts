import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.get('ids')

    if (!ids) {
      return NextResponse.json({ error: 'No college IDs provided' }, { status: 400 })
    }

    const idArray = ids.split(',').slice(0, 3)

    const colleges = await prisma.college.findMany({
      where: { id: { in: idArray } },
    })

    return NextResponse.json(colleges)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}