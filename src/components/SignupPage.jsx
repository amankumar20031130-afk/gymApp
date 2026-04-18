import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function SignupPage({ onSwitch }) {
  const { signup } = useAuth()
  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.'); return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.'); return
    }
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const strength = (() => {
    const p = form.password
    if (!p) return null
    if (p.length < 6) return { label: 'Too short', color: '#ef4444', width: '25%' }
    if (p.length < 8) return { label: 'Weak', color: '#f97316', width: '45%' }
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) return { label: 'Strong', color: '#22c55e', width: '100%' }
    return { label: 'Medium', color: '#eab308', width: '70%' }
  })()

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>💪</span>
          <h1>GymRoutine</h1>
        </div>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-sub">Start planning your workouts today — free forever</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Smith"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              autoComplete="new-password"
            />
            {strength && (
              <div className="pw-strength">
                <div className="pw-bar">
                  <div style={{ width: strength.width, background: strength.color }} />
                </div>
                <span style={{ color: strength.color }}>{strength.label}</span>
              </div>
            )}
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <button onClick={onSwitch} className="auth-link">Log in</button>
        </p>
      </div>
    </div>
  )
}
