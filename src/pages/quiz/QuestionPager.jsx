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
                    →
                </button>
            </div>
        </div>
    )
}
