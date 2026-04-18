import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage({ onSwitch }) {
  const { login } = useAuth()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      await login(form.email, form.password)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <span>💪</span>
          <h1>GymRoutine</h1>
        </div>
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-sub">Log in to access your workout routines</p>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && <div className="auth-error">{error}</div>}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={e => set('password', e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Log In'}
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button onClick={onSwitch} className="auth-link">Sign up free</button>
        </p>
      </div>
    </div>
  )
}
