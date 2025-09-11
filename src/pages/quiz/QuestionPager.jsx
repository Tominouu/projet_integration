import { useMemo, useState } from 'react'
import '../../pages/styles/transitions.css'

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
            <div className="quiz-q-title">{q.question}</div>
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
            <div className="quiz-actions" style={{ marginTop: 12 }}>
                <button className="quiz-next-fab" onClick={() => canSubmit && onSubmit?.(sel)} disabled={!canSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M1.78873e-07 15C8.01437e-08 23.2793 6.71079 30 15 30C23.2892 30 30 23.2892 30 15C30 6.71079 23.2892 2.77721e-07 15 1.78873e-07C6.71079 8.00253e-08 2.77721e-07 6.71079 1.78873e-07 15ZM16.3302 7.98147L22.6439 14.2952C23.0311 14.6823 23.0311 15.3077 22.6439 15.6949L16.3302 22.0086C15.9431 22.3958 15.3177 22.3958 14.9305 22.0086C14.5433 21.6214 14.5433 20.996 14.9305 20.6089L19.5566 15.9828L8.05096 15.9828C7.50496 15.9828 7.05824 15.5361 7.05824 14.9901C7.05824 14.4441 7.50496 13.9974 8.05096 13.9974L19.5566 13.9974L14.9305 9.37128C14.5433 8.98412 14.5433 8.35871 14.9305 7.97154C15.3177 7.58438 15.9431 7.58438 16.3302 7.97154L16.3302 7.98147Z" fill="#6C1227" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
