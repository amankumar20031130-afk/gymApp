import { useState } from 'react'

const CATEGORY_COLORS = {
  Chest: '#ef4444',
  Back: '#3b82f6',
  Legs: '#22c55e',
  Shoulders: '#f97316',
  Arms: '#a855f7',
  Core: '#eab308',
  Cardio: '#06b6d4',
  Other: '#6b7280',
}

export default function ExerciseCard({
  exercise, onUpdate, onDelete,
  onDragStart, onDragOver, onDragEnd, isDragging,
}) {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ ...exercise })

  const handleSave = () => {
    onUpdate(form)
    setEditing(false)
  }

  const color = CATEGORY_COLORS[exercise.category] ?? CATEGORY_COLORS.Other

  if (editing) {
    return (
      <div className="exercise-card editing">
        <div className="edit-form">
          <input
            className="edit-input"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="Exercise name"
          />
          <div className="edit-row">
            <input
              className="edit-input small"
              type="number"
              min="1"
              value={form.sets}
              onChange={e => setForm(f => ({ ...f, sets: e.target.value }))}
              placeholder="Sets"
            />
            <input
              className="edit-input small"
              type="number"
              min="1"
              value={form.reps}
              onChange={e => setForm(f => ({ ...f, reps: e.target.value }))}
              placeholder="Reps"
            />
            <input
              className="edit-input small"
              value={form.weight}
              onChange={e => setForm(f => ({ ...f, weight: e.target.value }))}
              placeholder="Weight"
            />
            <select
              className="edit-input small"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            >
              {Object.keys(CATEGORY_COLORS).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <input
            className="edit-input"
            value={form.notes ?? ''}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Notes (optional)"
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>Save</button>
            <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`exercise-card ${isDragging ? 'dragging' : ''} ${exercise.completed ? 'completed' : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div className="card-accent" style={{ backgroundColor: color }} />

      <button
        className="checkbox"
        onClick={() => onUpdate({ completed: !exercise.completed })}
        aria-label="Toggle complete"
      >
        {exercise.completed ? '✓' : ''}
      </button>

      <div className="card-body">
        <div className="card-top">
          <span className="exercise-name">{exercise.name}</span>
          <span className="category-badge" style={{ backgroundColor: color + '22', color }}>
            {exercise.category}
          </span>
        </div>
        <div className="card-stats">
          {exercise.sets && <span className="stat">{exercise.sets} sets</span>}
          {exercise.reps && <span className="stat">{exercise.reps} reps</span>}
          {exercise.weight && <span className="stat">{exercise.weight}</span>}
        </div>
        {exercise.notes && <p className="card-notes">{exercise.notes}</p>}
      </div>

      <div className="card-actions">
        <button className="btn-icon" onClick={() => setEditing(true)} title="Edit">✏️</button>
        <button className="btn-icon danger" onClick={onDelete} title="Delete">🗑️</button>
      </div>

      <div className="drag-handle" title="Drag to reorder">⠿</div>
    </div>
  )
}
