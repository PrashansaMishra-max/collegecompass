'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface College {
  id: string
  name: string
  location: string
  state: string
  fees: number
  rating: number
  type: string
}

interface SavedCollege {
  id: string
  college: College
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [saved, setSaved] = useState<SavedCollege[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated') fetchSaved()
  }, [status])

  async function fetchSaved() {
    const res = await fetch('/api/saved')
    const data = await res.json()
    setSaved(data)
    setLoading(false)
  }

  async function handleUnsave(collegeId: string) {
    await fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId }),
    })
    setSaved(prev => prev.filter(s => s.college.id !== collegeId))
  }

  if (status === 'loading' || loading) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '120px', color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    </>
  )

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>My Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {session?.user?.name}</p>
        </div>

        <h2 style={{ fontSize: '1.3rem', marginBottom: '24px' }}>Saved Colleges ({saved.length})</h2>

        {saved.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            color: 'var(--text-secondary)',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>🔖</div>
            <p>No saved colleges yet.</p>
            <Link href="/colleges" style={{
              display: 'inline-block',
              marginTop: '16px',
              background: 'var(--accent)',
              color: '#0a0f1e',
              textDecoration: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 600,
            }}>
              Explore Colleges
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}>
            {saved.map(({ college }) => (
              <div key={college.id} style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '24px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{
                    background: 'rgba(240,165,0,0.1)',
                    color: 'var(--accent)',
                    border: '1px solid rgba(240,165,0,0.2)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}>
                    ⭐ {college.rating}
                  </span>
                  <button
                    onClick={() => handleUnsave(college.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      borderRadius: '6px',
                      padding: '4px 10px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                    }}
                  >
                    Remove
                  </button>
                </div>

                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  marginBottom: '8px',
                  fontFamily: 'Playfair Display, serif',
                }}>
                  {college.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  📍 {college.location}, {college.state}
                </p>
                <div style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                    ₹{college.fees.toLocaleString('en-IN')}
                  </span>
                  <Link href={`/colleges/${college.id}`} style={{
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                  }}>
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}