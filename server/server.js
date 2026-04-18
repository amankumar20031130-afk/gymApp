const express = require('express')
const cors = require('cors')
const { router: authRouter } = require('./routes/auth')
const routinesRouter = require('./routes/routines')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/routines', routinesRouter)

app.get('/api/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`✅ GymApp server running at http://localhost:${PORT}`)
})
