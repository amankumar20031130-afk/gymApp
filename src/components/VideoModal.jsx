import { useEffect, useRef, useState } from 'react'

export default function VideoModal({ exerciseName, videoId, searchQuery, onClose }) {
  const overlayRef = useRef(null)
  const [embedFailed, setEmbedFailed] = useState(false)

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`

  return (
    <div
      className="vm-overlay"
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      <div className="vm-box">
        <div className="vm-header">
          <h3 className="vm-title">{exerciseName}</h3>
          <button className="vm-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="vm-body">
          {videoId && !embedFailed ? (
            <>
              <div className="vm-video-wrap">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
                  title={`${exerciseName} tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={() => setEmbedFailed(true)}
                />
              </div>
              <a
                href={ytSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vm-more-link"
              >
                🔍 Search more "{exerciseName}" tutorials on YouTube ↗
              </a>
            </>
          ) : (
            <div className="vm-no-video">
              <span className="vm-no-video-icon">▶</span>
              <p>No embedded video available.</p>
              <a
                href={ytSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="vm-yt-btn"
              >
                Watch on YouTube →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
