import type { Metadata } from 'next'
import './globals.css'
import { getServerSession } from 'next-auth'
import SessionProvider from '@/components/SessionProvider'

export const metadata: Metadata = {
  title: 'CollegeCompass — Find Your Perfect College',
  description: 'Discover, compare and decide on the best colleges in India',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}