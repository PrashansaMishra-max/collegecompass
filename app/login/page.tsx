'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.08) 0%, transparent 70%)',
      backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.08) 0%, transparent 70%),
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
      backgroundSize: 'auto, 60px 60px, 60px 60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--accent)',
            }}>
              College<span style={{ color: 'var(--text-primary)' }}>Compass</span>
            </span>
          </Link>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.95rem' }}>
            Welcome back
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '40px',
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            marginBottom: '24px',
            fontFamily: 'Playfair Display, serif',
          }}>
            Sign In
          </h1>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#ef4444',
              fontSize: '0.9rem',
              marginBottom: '20px',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                fontWeight: 500,
              }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                placeholder="you@email.com"
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
                fontWeight: 500,
              }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: 'var(--accent)',
                color: '#0a0f1e',
                border: 'none',
                borderRadius: '10px',
                padding: '13px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
          }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}