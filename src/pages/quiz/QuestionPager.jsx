import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import '../../pages/styles/transitions.css'
import '../styles/quiz-skin.css'
import '../styles/quizglobal.css'

// NOTES UTILES DOCU PAS SUPPR
// Props:
// questionObj: { question, answerSelectionType, answers, correctAnswer }
// onSubmit(selectedIdxArrAsStrings)

export default function QuestionPager({ questionObj, onSubmit }) {
    const q = questionObj
    const multiple = (q?.answerSelectionType || 'single') === 'multiple'
    const [sel, setSel] = useState([]) // array de strings ("1", "2", ...)

    const answers = useMemo(() => q?.answers || [], [q])

    if (!q) return <div>Aucune question</div>

    useEffect(() => {
        setSel([])
    }, [q])

    // Optional media above the answers if provided in the question JSON
    const mediaSrc = q?.questionPic || q?.questionImage || q?.image || null

    const toggle = (i) => {
        const key = String(i + 1)
        if (multiple) {
            setSel((prev) => prev.includes(key) ? prev.filter(x => x !== key) : [...prev, key])
        } else {
            setSel([key])
        }
    }

    const canSubmit = sel.length > 0

    return (
        <div className="fadeSlideIn">
            {mediaSrc && (
                <div className="quiz-media" style={{ marginBottom: 12 }}>
                    <img
                        src={mediaSrc}
                        alt=""
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', borderRadius: 10, display: 'block' }}
                    />
                </div>
            )}
            <div style={{ display: 'grid', gap: 10 }}>
                {answers.map((a, i) => {
                    const key = String(i + 1)
                    const isSel = sel.includes(key)
                    return (
                        <button
                            key={i}
                            className={`btn-option ${isSel ? 'is-selected' : ''}`}
                            onClick={() => toggle(i)}
                        >
                            {a}
                        </button>
                    )
                })}
            </div>
            <div className="quiz-actions">
                <button
                    className="quiz-next-fab"
                    onClick={() => canSubmit && onSubmit?.(sel)}
                    disabled={!canSubmit}
                    aria-label="Question suivante"
                    title="Question suivante"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" aria-hidden="true">
                        <path d="M2.6831e-07 22.5C1.20216e-07 34.9189 10.0662 45 22.5 45C34.9338 45 45 34.9338 45 22.5C45 10.0662 34.9338 -1.16034e-06 22.5 -1.30861e-06C10.0662 -1.45688e-06 4.16582e-07 10.0662 2.6831e-07 22.5ZM24.4954 11.9722L33.9659 21.4428C34.5467 22.0235 34.5467 22.9616 33.9659 23.5424L24.4954 33.0129C23.9146 33.5936 22.9765 33.5936 22.3958 33.0129C21.815 32.4322 21.815 31.494 22.3958 30.9133L29.3349 23.9742L12.0764 23.9742C11.2574 23.9742 10.5874 23.3041 10.5874 22.4851C10.5874 21.6661 11.2574 20.996 12.0764 20.996L29.3349 20.996L22.3958 14.0569C21.815 13.4762 21.815 12.5381 22.3958 11.9573C22.9765 11.3766 23.9146 11.3766 24.4954 11.9573L24.4954 11.9722Z" fill="currentColor" />
                    </svg>
                </button>
            </div>
            <Link className="quiz-exit-fab" to="/" aria-label="Quitter" title="Quitter">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
            
        </div >
    )
}
