import { useState, useEffect, useCallback, useRef } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContext'
import { fetchRoutines, saveDay } from './api/routines'
import DaySelector from './components/DaySelector'
import WorkoutPanel from './components/WorkoutPanel'
import ExerciseLibrary from './components/ExerciseLibrary'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import './App.css'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const DEFAULT_ROUTINES = DAYS.reduce((acc, d) => { acc[d] = []; return acc }, {})

function getTodayName() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

function AppShell() {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const [view, setView]           = useState('routines')
  const [authView, setAuthView]   = useState('login')
  const [selectedDay, setSelectedDay] = useState(getTodayName() || 'Monday')
  const [routines, setRoutines]   = useState(DEFAULT_ROUTINES)
  const [loadingDB, setLoadingDB] = useState(true)
  const saveTimers = useRef({})

  // Load routines from DB when user logs in
  useEffect(() => {
    if (!user) { setLoadingDB(false); return }
    setLoadingDB(true)
    fetchRoutines()
      .then(setRoutines)
      .catch(() => setRoutines(DEFAULT_ROUTINES))
      .finally(() => setLoadingDB(false))
  }, [user])

  // Debounce-save a specific day to DB whenever it changes
  const persistDay = useCallback((day, exercises) => {
    clearTimeout(saveTimers.current[day])
    saveTimers.current[day] = setTimeout(() => saveDay(day, exercises), 600)
  }, [])

  const updateRoutines = useCallback((day, exercises) => {
    setRoutines(prev => {
      const next = { ...prev, [day]: exercises }
      persistDay(day, exercises)
      return next
    })
  }, [persistDay])

  const addExercise = (day, exercise) => {
    const next = [...routines[day], { id: Date.now(), completed: false, ...exercise }]
    updateRoutines(day, next)
  }

  const updateExercise = (day, id, updated) => {
    const next = routines[day].map(ex => ex.id === id ? { ...ex, ...updated } : ex)
    updateRoutines(day, next)
  }

  const deleteExercise = (day, id) => {
    const next = routines[day].filter(ex => ex.id !== id)
    updateRoutines(day, next)
  }

  const reorderExercises = (day, reordered) => updateRoutines(day, reordered)

  const addFromLibrary = (libExercise) => {
    addExercise(selectedDay, {
      name: libExercise.name,
      sets: '3', reps: '10', weight: '', category: libExercise.category,
      notes: libExercise.level.charAt(0).toUpperCase() + libExercise.level.slice(1) + ' level',
    })
    setView('routines')
  }

  // Show auth pages if not logged in
  if (!user) {
    return authView === 'login'
      ? <LoginPage onSwitch={() => setAuthView('signup')} />
      : <SignupPage onSwitch={() => setAuthView('login')} />
  }

  if (loadingDB) {
    return (
      <div className="app-loading">
        <span className="app-loading-icon">💪</span>
        <p>Loading your routines…</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">💪</span>
          <h1>GymRoutine</h1>
        </div>
        <p className="tagline">Plan your week. Train with perfect form.</p>

        <nav className="app-nav">
          <button className={`nav-btn ${view === 'routines' ? 'active' : ''}`} onClick={() => setView('routines')}>
            📅 My Routines
          </button>
          <button className={`nav-btn ${view === 'library' ? 'active' : ''}`} onClick={() => setView('library')}>
            📚 Exercise Library
          </button>
          <div className="nav-spacer" />
          <div className="user-menu">
            <button className="btn-theme" onClick={toggle} title="Toggle theme" aria-label="Toggle theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <span className="user-avatar">{user.name.charAt(0).toUpperCase()}</span>
            <span className="user-name">{user.name}</span>
            <button className="btn-logout" onClick={logout} title="Log out">↪ Logout</button>
          </div>
        </nav>
      </header>

      <main className="app-main">
        {view === 'routines' ? (
          <>
            <DaySelector days={DAYS} selectedDay={selectedDay} onSelect={setSelectedDay} routines={routines} />
            <WorkoutPanel
              day={selectedDay}
              exercises={routines[selectedDay]}
              onAdd={(ex) => addExercise(selectedDay, ex)}
              onUpdate={(id, u) => updateExercise(selectedDay, id, u)}
              onDelete={(id) => deleteExercise(selectedDay, id)}
              onReorder={(r) => reorderExercises(selectedDay, r)}
            />
          </>
        ) : (
          <ExerciseLibrary onAddToRoutine={addFromLibrary} />
        )}
      </main>
    </div>
  )
}

export default AppShell
