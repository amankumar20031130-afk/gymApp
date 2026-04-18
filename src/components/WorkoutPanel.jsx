import { useState } from 'react'
import ExerciseCard from './ExerciseCard'
import AddExerciseForm from './AddExerciseForm'
import SuggestionsPanel from './SuggestionsPanel'

export default function WorkoutPanel({ day, exercises, onAdd, onUpdate, onDelete, onReorder }) {
  const [showForm, setShowForm] = useState(false)
  const [dragIndex, setDragIndex] = useState(null)
  const [toast, setToast] = useState(null)

  const handleDragStart = (index) => setDragIndex(index)

  const handleDragOver = (e, index) => {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) return
    const reordered = [...exercises]
    const [moved] = reordered.splice(dragIndex, 1)
    reordered.splice(index, 0, moved)
    onReorder(reordered)
    setDragIndex(index)
  }

  const handleDragEnd = () => setDragIndex(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2200)
  }

  const handleApplyAll = (suggestedExercises) => {
    suggestedExercises.forEach(ex => onAdd({ ...ex, completed: false }))
    showToast(`✓ Added ${suggestedExercises.length} exercises to ${day}`)
  }

  const handleApplyOne = (ex) => {
    onAdd({ ...ex, completed: false })
    showToast(`✓ "${ex.name}" added to ${day}`)
  }

  const completedCount = exercises.filter(e => e.completed).length
  const progress = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0

  return (
    <div className="workout-panel">
      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}

      <div className="panel-header">
        <div className="panel-title">
          <h2>{day}'s Workout</h2>
          <span className="exercise-summary">
            {exercises.length === 0
              ? 'No exercises yet'
              : `${completedCount}/${exercises.length} done`}
          </span>
        </div>
        <button className="btn-add" onClick={() => setShowForm(true)}>
          + Add Exercise
        </button>
      </div>

      {exercises.length > 0 && (
        <div className="progress-bar-wrap">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Suggestions Panel — always available */}
      <SuggestionsPanel
        day={day}
        existingCount={exercises.length}
        onApplyAll={handleApplyAll}
        onApplyOne={handleApplyOne}
      />

      {showForm && (
        <AddExerciseForm
          onAdd={(ex) => { onAdd(ex); setShowForm(false) }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {exercises.length === 0 && !showForm ? (
        <div className="empty-state">
          <span className="empty-icon">🏋️</span>
          <p>No exercises planned for {day}.</p>
          <p>Use <strong>Suggestions</strong> above or <strong>+ Add Exercise</strong> to get started!</p>
        </div>
      ) : (
        <div className="exercise-list">
          {exercises.map((ex, index) => (
            <ExerciseCard
              key={ex.id}
              exercise={ex}
              index={index}
              onUpdate={(updated) => onUpdate(ex.id, updated)}
              onDelete={() => onDelete(ex.id)}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              isDragging={dragIndex === index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
