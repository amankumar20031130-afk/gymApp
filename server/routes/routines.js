const express = require('express')
const db = require('../db')
const { authMiddleware } = require('./auth')

const router = express.Router()
router.use(authMiddleware)

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// GET /api/routines  — fetch all 7 days for the logged-in user
router.get('/', (req, res) => {
  const rows = db
    .prepare('SELECT day, exercises FROM routines WHERE user_id = ?')
    .all(req.user.id)

  const routines = DAYS.reduce((acc, day) => {
    const row = rows.find(r => r.day === day)
    acc[day] = row ? JSON.parse(row.exercises) : []
    return acc
  }, {})

  res.json(routines)
})

// PUT /api/routines/:day  — upsert a single day's exercises
router.put('/:day', (req, res) => {
  const { day } = req.params
  if (!DAYS.includes(day)) {
    return res.status(400).json({ error: 'Invalid day' })
  }

  const exercises = JSON.stringify(req.body.exercises ?? [])

  db.prepare(`
    INSERT INTO routines (user_id, day, exercises)
    VALUES (?, ?, ?)
    ON CONFLICT(user_id, day) DO UPDATE SET exercises = excluded.exercises
  `).run(req.user.id, day, exercises)

  res.json({ ok: true })
})

module.exports = router
