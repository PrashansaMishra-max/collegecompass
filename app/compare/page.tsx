'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
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
  courses: string[]
  overview: string
  placements: string
}

function ComparePage() {
  const searchParams = useSearchParams()
  const [colleges, setColleges] = useState<College[]>([])
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const ids = searchParams.get('ids')
    if (ids) {
      const idArray = ids.split(',').filter(Boolean)
      setSelectedIds(idArray)
      fetchCompare(idArray)
    }
    fetchAllColleges()
  }, [])

  async function fetchAllColleges() {
    const res = await fetch('/api/colleges?page=1')
    const data = await res.json()
    setAllColleges(data.colleges ?? [])
  }

  async function fetchCompare(ids: string[]) {
    if (ids.length === 0) { setColleges([]); return }
    setLoading(true)
    const res = await fetch(`/api/colleges/compare?ids=${ids.join(',')}`)
    const data = await res.json()
    setColleges(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  function addCollege(id: string) {
    if (selectedIds.includes(id) || selectedIds.length >= 3) return
    const newIds = [...selectedIds, id]
    setSelectedIds(newIds)
    fetchCompare(newIds)
  }

  function removeCollege(id: string) {
    const newIds = selectedIds.filter(i => i !== id)
    setSelectedIds(newIds)
    fetchCompare(newIds)
  }

  const rows = [
    { label: 'Location', key: 'location', format: (c: College) => `${c.location}, ${c.state}` },
    { label: 'Type', key: 'type', format: (c: College) => c.type },
    { label: 'Annual Fees', key: 'fees', format: (c: College) => `₹${c.fees.toLocaleString('en-IN')}` },
    { label: 'Rating', key: 'rating', format: (c: College) => `⭐ ${c.rating}` },
    { label: 'Courses', key: 'courses', format: (c: College) => c.courses.join(', ') },
    { label: 'Placements', key: 'placements', format: (c: College) => c.placements },
  ]

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Compare Colleges</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Select up to 3 colleges to compare side by side</p>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
        }}>
          <div style={{ marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Add colleges to compare ({selectedIds.length}/3 selected)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {allColleges.map(college => {
              const isSelected = selectedIds.includes(college.id)
              return (
                <button
                  key={college.id}
                  onClick={() => isSelected ? removeCollege(college.id) : addCollege(college.id)}
                  disabled={!isSelected && selectedIds.length >= 3}
                  style={{
                    background: isSelected ? 'var(--accent)' : 'var(--bg-elevated)',
                    color: isSelected ? '#0a0f1e' : 'var(--text-secondary)',
                    border: `1px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '8px',
                    padding: '8px 14px',
                    cursor: !isSelected && selectedIds.length >= 3 ? 'not-allowed' : 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 600 : 400,
                    opacity: !isSelected && selectedIds.length >= 3 ? 0.5 : 1,
                    transition: 'all 0.2s',
                  }}
                >
                  {isSelected ? '✓ ' : '+ '}{college.name}
                </button>
              )
            })}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            Loading...
          </div>
        ) : colleges.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px',
            color: 'var(--text-secondary)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
          }}>
            Select at least one college to start comparing
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)`,
              borderBottom: '1px solid var(--border)',
            }}>
              <div style={{ padding: '20px', background: 'var(--bg-elevated)' }} />
              {colleges.map(college => (
                <div key={college.id} style={{
                  padding: '20px',
                  borderLeft: '1px solid var(--border)',
                  position: 'relative',
                }}>
                  <button
                    onClick={() => removeCollege(college.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    ✕
                  </button>
                  <Link href={`/colleges/${college.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      lineHeight: 1.3,
                      paddingRight: '20px',
                    }}>
                      {college.name}
                    </h3>
                  </Link>
                </div>
              ))}
            </div>

            {rows.map((row, i) => (
              <div key={row.key} style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${colleges.length}, 1fr)`,
                borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
              }}>
                <div style={{
                  padding: '16px 20px',
                  background: 'var(--bg-elevated)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {row.label}
                </div>
                {colleges.map(college => (
                  <div key={college.id} style={{
                    padding: '16px 20px',
                    borderLeft: '1px solid var(--border)',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                  }}>
                    {row.format(college)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}

export default function ComparePageWrapper() {
  return (
    <Suspense fallback={
      <div style={{ textAlign: 'center', padding: '120px', color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    }>
      <ComparePage />
    </Suspense>
  )
}