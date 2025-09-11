import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import bgImage from './assets/fond-home.jpg'
import './pages/styles/quizGlobal.css'
import './pages/styles/home.css'

const UNLOCK_THRESHOLD = -140 //en px ig

export default function Home() {
  const [unlocked, setUnlocked] = useState(false)
  const [dragY, setDragY] = useState(0)
  const startY = useRef(null)
  const dragging = useRef(false)
  const nav = useNavigate()

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prevOverflow }
  }, [])

  const finish = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    if (dragY <= UNLOCK_THRESHOLD) {
      setUnlocked(true)
      setDragY(0)
      if ('vibrate' in navigator) navigator.vibrate(30)
    } else setDragY(0)
  }, [dragY])

  const onMove = useCallback((clientY) => {
    if (!dragging.current || unlocked) return
    const delta = clientY - startY.current
    if (delta < 0) setDragY(delta)
  }, [unlocked])

  const onPointerDown = (e) => {
    if (unlocked) return
    dragging.current = true
    startY.current = e.clientY ?? e.touches?.[0]?.clientY
  }
  const onPointerMove = (e) => {
    const y = e.clientY ?? (e.touches && e.touches[0]?.clientY)
    if (y != null) onMove(y)
  }
  const onPointerUp = () => finish()

  return (
    <div className={'home-root' + (unlocked ? ' is-unlocked' : '')}>
      <div
        className={'home-lock' + (unlocked ? ' home-lock--out' : '')}
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onPointerUp}
        onTouchStart={onPointerDown}
        onTouchMove={onPointerMove}
        onTouchEnd={onPointerUp}
        role="button"
        aria-label="Glisser vers le haut pour entrer"
      >
        <div className="home-lock__content" style={{ transform: `translateY(${dragY * 0.25}px)` }}>
          <h1 className="home-lock__title">Bordeaux visage</h1>
          <p className="home-lock__sub">Glisse vers le haut pour entrer</p>
          <div className="home-lock__btn-wrap" style={{ transform: `translateY(${dragY}px)` }}>
            <div className="home-lock__btn">
              <svg width="38" height="38" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: `translateY(${Math.min(12, Math.abs(dragY)/10)}px)` }}>
                <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="home-lock__hint">{dragY <= UNLOCK_THRESHOLD ? 'Relâche' : 'Swipe'}</div>
          </div>
        </div>
      </div>

      <div className={'home-unlocked' + (unlocked ? ' home-unlocked--in' : '')}>
        <div className="home-unlocked__inner">
          <header className="home-hero">
            <h1 className="home-hero__title">Bordeaux visage</h1>
            <div className="home-hero__bar" />
            {/* <img src={bgImage} alt="Rue de Bordeaux" className="home-hero__img" loading="lazy" /> */}
          </header>
          <section className="home-actions" aria-label="Actions principales">
            <button className="home-btn home-btn--primary" onClick={() => nav('/quizglobal')}>Passer au quiz</button>
            <div className="home-ou">OU</div>
            <button className="home-btn home-btn--outline" onClick={() => nav('/globe')}>Globe interactif</button>
            <div className="home-ou">OU</div>
            <button className="home-btn home-btn--outline" onClick={() => nav('/infos')}>Plus d'infos</button>
          </section>
          <footer className="home-foot"><small>&copy; {new Date().getFullYear()} Projet Intégration</small></footer>
        </div>
      </div>
    </div>
  )
}