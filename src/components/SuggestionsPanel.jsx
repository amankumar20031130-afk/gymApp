import { useState } from 'react'
import { PROGRAMS, TYPE_META } from '../data/workoutSuggestions'
import { getVideo } from '../data/videoMap'
import VideoModal from './VideoModal'

const CATEGORY_COLORS = {
  Chest: '#ef4444', Back: '#3b82f6', Legs: '#22c55e',
  Shoulders: '#f97316', Arms: '#a855f7', Core: '#eab308',
  Cardio: '#06b6d4', Other: '#6b7280',
}

export default function SuggestionsPanel({ day, onApplyAll, onApplyOne, existingCount }) {
  const [open, setOpen] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS[0].id)
  const [watchingEx, setWatchingEx] = useState(null) // { name, videoId, searchQuery }

  const program = PROGRAMS.find(p => p.id === selectedProgram)
  const dayPlan = program?.plan[day]
  const typeMeta = dayPlan ? TYPE_META[dayPlan.type] : null

  const handleWatch = (ex) => {
    const video = getVideo(ex.name)
    setWatchingEx({ name: ex.name, ...video })
  }

  return (
    <>
      <div className="suggestions-wrap">
        <button className="suggestions-toggle" onClick={() => setOpen(o => !o)}>
          <span className="suggestions-toggle-left">
            <span className="suggestions-icon">✨</span>
            <span>
              <strong>Workout Suggestions</strong>
              <span className="suggestions-hint">Get a beginner-friendly plan for {day}</span>
            </span>
          </span>
          <span className={`suggestions-chevron ${open ? 'open' : ''}`}>›</span>
        </button>

        {open && (
          <div className="suggestions-body">

            {/* Program Selector */}
            <div className="program-selector">
              {PROGRAMS.map(p => (
                <button
                  key={p.id}
                  className={`program-btn ${selectedProgram === p.id ? 'active' : ''}`}
                  style={selectedProgram === p.id ? { borderColor: p.tagColor, background: p.tagColor + '18' } : {}}
                  onClick={() => setSelectedProgram(p.id)}
                >
                  <span className="prog-icon">{p.icon}</span>
                  <span className="prog-name">{p.name}</span>
                  <span className="prog-tag" style={{ color: p.tagColor, background: p.tagColor + '22' }}>
                    {p.tag}
                  </span>
                </button>
              ))}
            </div>

            {/* Program Info */}
            <div className="program-info">
              <div className="prog-info-row">
                <span className="prog-info-item">📅 {program.frequency}</span>
                <span className="prog-info-item">🎯 {program.goal}</span>
              </div>
              <p className="prog-desc">{program.description}</p>
            </div>

            {/* Day Plan */}
            {dayPlan && (
              <div className="day-plan">
                <div
                  className="day-plan-header"
                  style={{ borderColor: typeMeta.color, background: typeMeta.color + '12' }}
                >
                  <div className="day-plan-title">
                    <span style={{ fontSize: '1.2rem' }}>{typeMeta.icon}</span>
                    <div>
                      <strong className="day-plan-label">{dayPlan.label}</strong>
                      <span className="day-plan-focus">{dayPlan.focus}</span>
                    </div>
                  </div>
                  {dayPlan.type === 'workout' && dayPlan.exercises.length > 0 && (
                    <button
                      className="btn-apply-all"
                      style={{ background: typeMeta.color }}
                      onClick={() => { onApplyAll(dayPlan.exercises); setOpen(false) }}
                    >
                      {existingCount > 0 ? '+ Add All to Routine' : '✓ Apply Full Plan'}
                    </button>
                  )}
                </div>

                {dayPlan.type === 'rest' || dayPlan.type === 'cardio' ? (
                  <div className="rest-card" style={{ borderColor: typeMeta.color + '55' }}>
                    <span style={{ fontSize: '2rem' }}>{typeMeta.icon}</span>
                    <div>
                      <strong style={{ color: typeMeta.color }}>{typeMeta.label}</strong>
                      <p>{dayPlan.focus}</p>
                      {dayPlan.type === 'cardio' && dayPlan.exercises.length > 0 && (
                        <div className="cardio-ex-list">
                          {dayPlan.exercises.map((ex, i) => (
                            <div key={i} className="cardio-ex-row">
                              <span className="cardio-ex-name">{ex.name}</span>
                              <div className="cardio-ex-actions">
                                <button
                                  className="btn-watch-sm"
                                  onClick={() => handleWatch(ex)}
                                  title="Watch video"
                                >
                                  ▶ Watch
                                </button>
                                <button
                                  className="btn-add-one"
                                  onClick={() => onApplyOne(ex)}
                                  title="Add to routine"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                          <button
                            className="btn-apply-cardio"
                            style={{ color: typeMeta.color, borderColor: typeMeta.color }}
                            onClick={() => { onApplyAll(dayPlan.exercises); setOpen(false) }}
                          >
                            + Add all cardio to schedule
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="suggested-exercises">
                    {dayPlan.exercises.map((ex, i) => {
                      const catColor = CATEGORY_COLORS[ex.category] ?? '#6b7280'
                      return (
                        <div key={i} className="suggested-ex">
                          <div className="sug-ex-accent" style={{ background: catColor }} />
                          <div className="sug-ex-body">
                            <span className="sug-ex-name">{ex.name}</span>
                            <div className="sug-ex-meta">
                              <span className="sug-stat">{ex.sets} sets</span>
                              <span className="sug-stat">{ex.reps} reps</span>
                              <span className="sug-cat" style={{ color: catColor, background: catColor + '22' }}>
                                {ex.category}
                              </span>
                            </div>
                            {ex.notes && <p className="sug-notes">💡 {ex.notes}</p>}
                          </div>

                          <div className="sug-ex-actions">
                            <button
                              className="btn-watch-sm"
                              onClick={() => handleWatch(ex)}
                              title={`Watch ${ex.name} tutorial`}
                            >
                              ▶ Watch
                            </button>
                            <button
                              className="btn-add-one"
                              onClick={() => onApplyOne(ex)}
                              title="Add to routine"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {watchingEx && (
        <VideoModal
          exerciseName={watchingEx.name}
          videoId={watchingEx.videoId}
          searchQuery={watchingEx.searchQuery}
          onClose={() => setWatchingEx(null)}
        />
      )}
    </>
  )
}
