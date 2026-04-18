import { useEffect, useRef, useState } from 'react'
import { LEVEL_META } from '../data/exerciseLibrary'

const CATEGORY_COLORS = {
  Chest: '#ef4444', Back: '#3b82f6', Legs: '#22c55e',
  Shoulders: '#f97316', Arms: '#a855f7', Core: '#eab308',
  Cardio: '#06b6d4', Other: '#6b7280',
}

export default function ExerciseDetailModal({ exercise, onClose, onAddToRoutine }) {
  const [videoError, setVideoError] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const overlayRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const levelMeta = LEVEL_META[exercise.level]
  const catColor = CATEGORY_COLORS[exercise.category] ?? '#6b7280'
  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.searchQuery)}`

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-box">

        {/* Header */}
        <div className="modal-header" style={{ borderColor: catColor }}>
          <div className="modal-title-row">
            <div>
              <h2 className="modal-title">{exercise.name}</h2>
              <div className="modal-badges">
                <span className="badge-cat" style={{ color: catColor, background: catColor + '22' }}>
                  {exercise.category}
                </span>
                <span className="badge-level" style={{ color: levelMeta.color, background: levelMeta.bg }}>
                  {levelMeta.label}
                </span>
                <span className="badge-equip">🏋️ {exercise.equipment}</span>
              </div>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <p className="modal-desc">{exercise.description}</p>

          {/* Muscles */}
          <div className="muscles-row">
            <span className="muscles-label">Targets:</span>
            {exercise.muscles.map(m => (
              <span key={m} className="muscle-chip">{m}</span>
            ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="modal-video-section">
          {!videoError ? (
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${exercise.videoId}?rel=0&modestbranding=1`}
                title={`${exercise.name} tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onError={() => setVideoError(true)}
              />
            </div>
          ) : (
            <div className="video-fallback">
              <span className="video-fallback-icon">▶</span>
              <p>Video unavailable in embed.</p>
              <a href={ytSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-yt">
                Watch on YouTube →
              </a>
            </div>
          )}
          <a href={ytSearchUrl} target="_blank" rel="noopener noreferrer" className="yt-link">
            Search more tutorials on YouTube ↗
          </a>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {['form', 'tips', 'mistakes'].map(tab => (
            <button
              key={tab}
              className={`modal-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'form' && '📋 Steps'}
              {tab === 'tips' && '💡 Tips'}
              {tab === 'mistakes' && '⚠️ Mistakes'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="modal-content">
          {activeTab === 'form' && (
            <ol className="step-list">
              {exercise.steps.map((step, i) => (
                <li key={i} className="step-item">
                  <span className="step-num">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          )}

          {activeTab === 'tips' && (
            <ul className="tip-list">
              {exercise.tips.map((tip, i) => (
                <li key={i} className="tip-item">
                  <span className="tip-dot" style={{ background: levelMeta.color }} />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'mistakes' && (
            <ul className="mistake-list">
              {exercise.commonMistakes.map((m, i) => (
                <li key={i} className="mistake-item">
                  <span className="mistake-icon">✕</span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {onAddToRoutine && (
          <div className="modal-footer">
            <button
              className="btn-add-routine"
              style={{ background: catColor }}
              onClick={() => onAddToRoutine(exercise)}
            >
              + Add to Today's Routine
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
