'use client'

import { useState, useEffect } from 'react'
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
  image: string | null
}

export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [state, setState] = useState('')
  const [type, setType] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function fetchColleges() {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (state) params.set('state', state)
    if (type) params.set('type', type)
    params.set('page', page.toString())

    const res = await fetch(`/api/colleges?${params.toString()}`)
    const data = await res.json()
    setColleges(data.colleges || [])
    setTotalPages(data.pages || 1)
    setLoading(false)
  }
  useEffect(() => {
    fetchColleges()
  }, [page])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setPage(1)
    fetchColleges()
  }

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Explore Colleges</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Find the right college for your future</p>
        </div>

        {/* Search & Filters */}
        <form onSubmit={handleSearch} style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
          gap: '12px',
          alignItems: 'end',
        }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="College name or city..."
              style={{
                width: '100%',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              State
            </label>
            <select
              value={state}
              onChange={e => setState(e.target.value)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">All States</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Punjab">Punjab</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Type
            </label>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                outline: 'none',
                cursor: 'pointer',
              }}
            >
              <option value="">All Types</option>
              <option value="Government">Government</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              background: 'var(--accent)',
              color: '#0a0f1e',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </form>

        {/* College Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            Loading colleges...
          </div>
        ) : colleges.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            No colleges found. Try different filters.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {colleges.map(college => (
              <Link key={college.id} href={`/colleges/${college.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, transform 0.2s',
                  height: '100%',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Rating + Type */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
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
                    <span style={{
                      background: college.type === 'Government' ? 'rgba(34,197,94,0.1)' : 'rgba(99,102,241,0.1)',
                      color: college.type === 'Government' ? '#22c55e' : '#818cf8',
                      border: `1px solid ${college.type === 'Government' ? 'rgba(34,197,94,0.2)' : 'rgba(99,102,241,0.2)'}`,
                      borderRadius: '6px',
                      padding: '4px 10px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}>
                      {college.type}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: 'Playfair Display, serif',
                    lineHeight: 1.3,
                  }}>
                    {college.name}
                  </h3>

                  {/* Location */}
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
                    📍 {college.location}, {college.state}
                  </p>

                  {/* Fees */}
                  <div style={{
                    borderTop: '1px solid var(--border)',
                    paddingTop: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>Annual Fees</div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        ₹{college.fees.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500 }}>
                      View Details →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  background: p === page ? 'var(--accent)' : 'var(--bg-card)',
                  color: p === page ? '#0a0f1e' : 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: p === page ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </main>
    </>
  )
}