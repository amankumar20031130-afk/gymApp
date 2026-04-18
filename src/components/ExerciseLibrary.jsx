import { useState } from 'react'
import { exerciseLibrary, LEVELS, LEVEL_META } from '../data/exerciseLibrary'
import ExerciseDetailModal from './ExerciseDetailModal'

const CATEGORIES = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio']

const CATEGORY_COLORS = {
  Chest: '#ef4444', Back: '#3b82f6', Legs: '#22c55e',
  Shoulders: '#f97316', Arms: '#a855f7', Core: '#eab308',
  Cardio: '#06b6d4', Other: '#6b7280',
}

const LEVEL_ICONS = { beginner: '🌱', intermediate: '🔥', advanced: '⚡' }

export default function ExerciseLibrary({ onAddToRoutine }) {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = exerciseLibrary.filter(ex => {
    const matchLevel = selectedLevel === 'all' || ex.level === selectedLevel
    const matchCat = selectedCategory === 'All' || ex.category === selectedCategory
    const matchSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.muscles.some(m => m.toLowerCase().includes(search.toLowerCase()))
    return matchLevel && matchCat && matchSearch
  })

  const countByLevel = (level) => exerciseLibrary.filter(e => e.level === level).length

  return (
    <div className="library">
      <div className="library-header">
        <div>
          <h2 className="library-title">Exercise Library</h2>
          <p className="library-sub">Learn proper form to train hard and stay injury-free.</p>
        </div>
        <input
          className="library-search"
          placeholder="Search exercises or muscles…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Level Filter */}
      <div className="level-tabs">
        <button
          className={`level-tab ${selectedLevel === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedLevel('all')}
        >
          All
          <span className="level-count">{exerciseLibrary.length}</span>
        </button>
        {LEVELS.map(level => {
          const meta = LEVEL_META[level]
          const isActive = selectedLevel === level
          return (
            <button
              key={level}
              className={`level-tab ${isActive ? 'active' : ''}`}
              style={isActive ? { borderColor: meta.color, color: meta.color, background: meta.bg } : {}}
              onClick={() => setSelectedLevel(level)}
            >
              {LEVEL_ICONS[level]} {meta.label}
              <span className="level-count" style={isActive ? { background: meta.color } : {}}>
                {countByLevel(level)}
              </span>
            </button>
          )
        })}
      </div>

      {/* Category Filter */}
      <div className="cat-filter">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
            style={selectedCategory === cat && cat !== 'All'
              ? { background: CATEGORY_COLORS[cat] + '22', color: CATEGORY_COLORS[cat], borderColor: CATEGORY_COLORS[cat] }
              : {}}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="library-empty">
          <span>🔍</span>
          <p>No exercises found. Try a different filter.</p>
        </div>
      ) : (
        <div className="exercise-grid">
          {filtered.map(ex => {
            const levelMeta = LEVEL_META[ex.level]
            const catColor = CATEGORY_COLORS[ex.category] ?? '#6b7280'
            return (
              <button key={ex.id} className="ex-card" onClick={() => setSelected(ex)}>
                <div className="ex-card-accent" style={{ background: catColor }} />

                <div className="ex-card-top">
                  <span className="ex-card-name">{ex.name}</span>
                  <span
                    className="ex-card-level"
                    style={{ color: levelMeta.color, background: levelMeta.bg }}
                  >
                    {LEVEL_ICONS[ex.level]} {levelMeta.label}
                  </span>
                </div>

                <div className="ex-card-cat" style={{ color: catColor }}>
                  {ex.category}
                </div>

                <div className="ex-card-muscles">
                  {ex.muscles.slice(0, 3).map(m => (
                    <span key={m} className="ex-muscle-tag">{m}</span>
                  ))}
                  {ex.muscles.length > 3 && (
                    <span className="ex-muscle-tag muted">+{ex.muscles.length - 3}</span>
                  )}
                </div>

                <div className="ex-card-footer">
                  <span className="ex-equip">🏋️ {ex.equipment}</span>
                  <span className="ex-watch">▶ Watch</span>
                </div>
              </button>
            )
          })}
        </div>
      )}

      {selected && (
        <ExerciseDetailModal
          exercise={selected}
          onClose={() => setSelected(null)}
          onAddToRoutine={onAddToRoutine ? (ex) => { onAddToRoutine(ex); setSelected(null) } : null}
        />
      )}
    </div>
  )
}
