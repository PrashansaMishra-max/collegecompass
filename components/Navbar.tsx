'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{
      background: 'rgba(10, 15, 30, 0.95)',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--accent)',
            letterSpacing: '-0.5px',
          }}>
            College<span style={{ color: 'var(--text-primary)' }}>Compass</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link href="/colleges" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Colleges
          </Link>

          <Link href="/compare" style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: 500,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            Compare
          </Link>

          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/dashboard" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px' }}>
              <Link href="/login" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                padding: '8px 16px',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent)'
                  e.currentTarget.style.color = 'var(--accent)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
              >
                Login
              </Link>
              <Link href="/signup" style={{
                background: 'var(--accent)',
                color: '#0a0f1e',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent-hover)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent)')}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}