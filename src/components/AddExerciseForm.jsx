import { useState } from 'react'

const CATEGORIES = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio', 'Other']

const empty = { name: '', sets: '', reps: '', weight: '', category: 'Chest', notes: '' }

export default function AddExerciseForm({ onAdd, onCancel }) {
  const [form, setForm] = useState(empty)
  const [error, setError] = useState('')

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) {
      setError('Exercise name is required.')
      return
    }
    onAdd({ ...form, name: form.name.trim() })
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>New Exercise</h3>

      {error && <p className="form-error">{error}</p>}

      <input
        className="form-input"
        placeholder="Exercise name *"
        value={form.name}
        onChange={e => { set('name', e.target.value); setError('') }}
        autoFocus
      />

      <div className="form-row">
        <input
          className="form-input small"
          type="number"
          min="1"
          placeholder="Sets"
          value={form.sets}
          onChange={e => set('sets', e.target.value)}
        />
        <input
          className="form-input small"
          type="number"
          min="1"
          placeholder="Reps"
          value={form.reps}
          onChange={e => set('reps', e.target.value)}
        />
        <input
          className="form-input small"
          placeholder="Weight (e.g. 60kg)"
          value={form.weight}
          onChange={e => set('weight', e.target.value)}
        />
        <select
          className="form-input small"
          value={form.category}
          onChange={e => set('category', e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <input
        className="form-input"
        placeholder="Notes (optional)"
        value={form.notes}
        onChange={e => set('notes', e.target.value)}
      />

      <div className="form-actions">
        <button type="submit" className="btn-primary">Add Exercise</button>
        <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
