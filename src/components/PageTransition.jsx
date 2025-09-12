import { useEffect, useState } from 'react'
import '../styles/page-transition.css'

export default function PageTransition({ pathname }) {
    const [visible, setVisible] = useState(false)
    const [phase, setPhase] = useState('idle')

    useEffect(() => {
        setPhase('leaving')
        setVisible(true)
        const t1 = setTimeout(() => { setPhase('entering') }, 40)
        const t2 = setTimeout(() => { setVisible(false); setPhase('idle') }, 640)
        return () => { clearTimeout(t1); clearTimeout(t2) }
    }, [pathname])

    if (!visible) return null
    return (
        <div className={`pt-root pt-${phase}`} aria-hidden>
            <div className="pt-cover" />
            <div className="pt-layer pt-layer--1" />
            <div className="pt-layer pt-layer--2" />
            <div className="pt-layer pt-layer--3" />
            <div className="pt-logo">Bordeaux</div>
        </div>
    )
}