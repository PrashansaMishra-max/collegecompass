'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface Answer {
  id: string
  body: string
  createdAt: string
  user: { name: string | null }
}

interface Question {
  id: string
  body: string
  createdAt: string
  user: { name: string | null }
  answers: Answer[]
}

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
  image: string | null
  questions: Question[]
}

export default function CollegeDetailPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [college, setCollege] = useState<College | null>(null)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [question, setQuestion] = useState('')
  const [answerMap, setAnswerMap] = useState<{ [key: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function fetchCollege() {
      const res = await fetch(`/api/colleges/${id}`)
      const data = await res.json()
      setCollege(data)
      setLoading(false)
    }
    fetchCollege()
  }, [id])

  async function handleSave() {
    if (!session) { router.push('/login'); return }
    const res = await fetch('/api/saved', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ collegeId: id }),
    })
    const data = await res.json()
    setSaved(data.saved)
  }

  async function handleQuestion(e: React.FormEvent) {
    e.preventDefault()
    if (!session) { router.push('/login'); return }
    setSubmitting(true)
    const res = await fetch('/api/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body: question, collegeId: id }),
    })
    if (res.ok) {
      setQuestion('')
      const updated = await fetch(`/api/colleges/${id}`)
      setCollege(await updated.json())
    }
    setSubmitting(false)
  }

  async function handleAnswer(questionId: string) {
    if (!session) { router.push('/login'); return }
    const body = answerMap[questionId]
    if (!body) return
    const res = await fetch(`/api/questions/${questionId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    })
    if (res.ok) {
      setAnswerMap(prev => ({ ...prev, [questionId]: '' }))
      const updated = await fetch(`/api/colleges/${id}`)
      setCollege(await updated.json())
    }
  }

  if (loading) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '120px', color: 'var(--text-secondary)' }}>
        Loading...
      </div>
    </>
  )

  if (!college) return (
    <>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '120px', color: 'var(--text-secondary)' }}>
        College not found.
      </div>
    </>
  )

  const tabs = ['overview', 'courses', 'placements', 'qa']

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Back */}
        <Link href="/colleges" style={{
          color: 'var(--text-secondary)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '24px',
        }}>
          ← Back to Colleges
        </Link>

        {/* Hero Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '32px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
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
                }}>
                  {college.type}
                </span>
              </div>

              <h1 style={{ fontSize: '1.8rem', marginBottom: '8px', lineHeight: 1.2 }}>
                {college.name}
              </h1>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                📍 {college.location}, {college.state}
              </p>

              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Annual Fees</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>₹{college.fees.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Courses</div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{college.courses.length} Programs</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleSave}
                style={{
                  background: saved ? 'var(--accent)' : 'transparent',
                  color: saved ? '#0a0f1e' : 'var(--accent)',
                  border: '1px solid var(--accent)',
                  borderRadius: '10px',
                  padding: '10px 20px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
              >
                {saved ? '✓ Saved' : '+ Save College'}
              </button>
              <Link href={`/compare?ids=${college.id}`} style={{
                background: 'var(--bg-elevated)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '0.9rem',
                textDecoration: 'none',
                textAlign: 'center',
              }}>
                ⚖️ Compare
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '6px',
          marginBottom: '24px',
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                background: activeTab === tab ? 'var(--accent)' : 'transparent',
                color: activeTab === tab ? '#0a0f1e' : 'var(--text-secondary)',
                border: 'none',
                borderRadius: '8px',
                padding: '10px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: '0.9rem',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'qa' ? 'Q&A' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '32px',
        }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>About</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {college.overview}
              </p>
            </div>
          )}

          {activeTab === 'courses' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Available Programs</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {college.courses.map(course => (
                  <span key={course} style={{
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                  }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'placements' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Placement Statistics</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                {college.placements}
              </p>
            </div>
          )}

          {activeTab === 'qa' && (
            <div>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '24px' }}>Questions & Answers</h2>

              {/* Ask Question */}
              <form onSubmit={handleQuestion} style={{ marginBottom: '32px' }}>
                <textarea
                  value={question}
                  onChange={e => setQuestion(e.target.value)}
                  placeholder={session ? 'Ask a question about this college...' : 'Login to ask a question...'}
                  disabled={!session}
                  rows={3}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '12px 16px',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    outline: 'none',
                    resize: 'vertical',
                    marginBottom: '10px',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                />
                <button
                  type="submit"
                  disabled={submitting || !session || !question}
                  style={{
                    background: 'var(--accent)',
                    color: '#0a0f1e',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    opacity: submitting || !session || !question ? 0.6 : 1,
                  }}
                >
                  {submitting ? 'Posting...' : 'Post Question'}
                </button>
              </form>

              {/* Questions List */}
              {college.questions.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
                  No questions yet. Be the first to ask!
                </p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {college.questions.map(q => (
                    <div key={q.id} style={{
                      borderLeft: '3px solid var(--accent)',
                      paddingLeft: '16px',
                    }}>
                      <div style={{ marginBottom: '8px' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{q.body}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '10px' }}>
                          — {q.user.name || 'Anonymous'}
                        </span>
                      </div>

                      {/* Answers */}
                      {q.answers.map(a => (
                        <div key={a.id} style={{
                          background: 'var(--bg-elevated)',
                          borderRadius: '8px',
                          padding: '10px 14px',
                          marginBottom: '8px',
                          fontSize: '0.9rem',
                        }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{a.body}</span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '8px' }}>
                            — {a.user.name || 'Anonymous'}
                          </span>
                        </div>
                      ))}

                      {/* Answer Input */}
                      {session && (
                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                          <input
                            type="text"
                            placeholder="Write an answer..."
                            value={answerMap[q.id] || ''}
                            onChange={e => setAnswerMap(prev => ({ ...prev, [q.id]: e.target.value }))}
                            style={{
                              flex: 1,
                              background: 'var(--bg-elevated)',
                              border: '1px solid var(--border)',
                              borderRadius: '8px',
                              padding: '8px 12px',
                              color: 'var(--text-primary)',
                              fontSize: '0.9rem',
                              outline: 'none',
                            }}
                            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                            onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                          />
                          <button
                            onClick={() => handleAnswer(q.id)}
                            disabled={!answerMap[q.id]}
                            style={{
                              background: 'var(--accent)',
                              color: '#0a0f1e',
                              border: 'none',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontWeight: 600,
                              cursor: 'pointer',
                              opacity: !answerMap[q.id] ? 0.6 : 1,
                            }}
                          >
                            Answer
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}