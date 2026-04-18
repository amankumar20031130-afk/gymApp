const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'gymapp-jwt-secret-change-in-production'

function signToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Authentication required' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Session expired, please log in again' })
  }
}

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body ?? {}

  if (!name?.trim()) return res.status(400).json({ error: 'Name is required' })
  if (!email?.trim()) return res.status(400).json({ error: 'Email is required' })
  if (!password)      return res.status(400).json({ error: 'Password is required' })
  if (password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' })

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email address' })

  try {
    const hashed = await bcrypt.hash(password, 10)
    const result = db
      .prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)')
      .run(name.trim(), email.toLowerCase().trim(), hashed)

    const user = { id: result.lastInsertRowid, name: name.trim(), email: email.toLowerCase().trim() }
    res.status(201).json({ token: signToken(user), user })
  } catch (err) {
    if (err.message?.includes('UNIQUE')) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }
    console.error('Signup error:', err)
    res.status(500).json({ error: 'Server error. Please try again.' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email.toLowerCase().trim())

  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(401).json({ error: 'Invalid email or password' })

  const payload = { id: user.id, name: user.name, email: user.email }
  res.json({ token: signToken(payload), user: payload })
})

// GET /api/auth/me
router.get('/me', authMiddleware, (req, res) => {
  const user = db
    .prepare('SELECT id, name, email, created_at FROM users WHERE id = ?')
    .get(req.user.id)

  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user })
})

module.exports = { router, authMiddleware }
