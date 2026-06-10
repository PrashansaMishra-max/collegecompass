import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get('search') || ''
    const state = searchParams.get('state') || ''
    const type = searchParams.get('type') || ''
    const minFees = searchParams.get('minFees')
    const maxFees = searchParams.get('maxFees')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 9

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (state) where.state = { equals: state, mode: 'insensitive' }
    if (type) where.type = { equals: type, mode: 'insensitive' }
    if (minFees) where.fees = { ...where.fees, gte: parseInt(minFees) }
    if (maxFees) where.fees = { ...where.fees, lte: parseInt(maxFees) }

    const total = await prisma.college.count({ where })
    const colleges = await prisma.college.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json({
      colleges,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}