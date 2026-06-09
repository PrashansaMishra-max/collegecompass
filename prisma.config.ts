import path from 'path'
import type { PrismaConfig } from 'prisma'

export default {
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    adapter: async () => {
      const { PrismaNeon } = await import('@prisma/adapter-neon')
      const { neonConfig } = await import('@neondatabase/serverless')
      const ws = await import('ws')
      neonConfig.webSocketConstructor = ws.default
      const connectionString = process.env.DATABASE_URL!
      return new PrismaNeon({ connectionString })
    },
  },
} satisfies PrismaConfig