import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(240,165,0,0.08) 0%, transparent 70%)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            opacity: 0.3,
          }} />

          <div style={{ position: 'relative', maxWidth: '800px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(240,165,0,0.1)',
              border: '1px solid rgba(240,165,0,0.3)',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '0.85rem',
              color: 'var(--accent)',
              marginBottom: '24px',
              fontWeight: 500,
            }}>
              🎓 India's Premier College Discovery Platform
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '24px',
              letterSpacing: '-1px',
            }}>
              Find Your Perfect
              <span style={{
                display: 'block',
                color: 'var(--accent)',
              }}>
                College Match
              </span>
            </h1>

            <p style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              marginBottom: '40px',
              maxWidth: '560px',
              margin: '0 auto 40px',
            }}>
              Search, compare and decide on the best engineering and technology colleges across India. Make informed decisions backed by real data.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/colleges" style={{
                background: 'var(--accent)',
                color: '#0a0f1e',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '14px 32px',
                borderRadius: '10px',
                transition: 'background 0.2s',
              }}>
                Explore Colleges →
              </Link>
              <Link href="/compare" style={{
                background: 'transparent',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                padding: '14px 32px',
                borderRadius: '10px',
                border: '1px solid var(--border)',
                transition: 'border-color 0.2s',
              }}>
                Compare Colleges
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: '60px 24px',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center',
          }}>
            {[
              { number: '15+', label: 'Top Colleges' },
              { number: '10+', label: 'States Covered' },
              { number: '50+', label: 'Courses Listed' },
              { number: '100%', label: 'Free to Use' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--accent)',
                  fontFamily: 'Playfair Display, serif',
                }}>
                  {stat.number}
                </div>
                <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '80px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2rem',
              marginBottom: '48px',
              color: 'var(--text-primary)',
            }}>
              Everything you need to decide
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}>
              {[
                { icon: '🔍', title: 'Smart Search', desc: 'Filter by location, fees, type and rating to find colleges that match your criteria.' },
                { icon: '⚖️', title: 'Side-by-Side Compare', desc: 'Compare up to 3 colleges on fees, placements, ratings and more.' },
                { icon: '💬', title: 'Q&A Community', desc: 'Ask questions and get answers from students and alumni of each college.' },
                { icon: '🔖', title: 'Save & Shortlist', desc: 'Save your favourite colleges and build your shortlist for easy access.' },
              ].map((feature) => (
                <div key={feature.title} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '32px',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{feature.icon}</div>
                  <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    marginBottom: '8px',
                    fontFamily: 'DM Sans, sans-serif',
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}