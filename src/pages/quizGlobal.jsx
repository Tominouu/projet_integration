import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuestionPager from './quiz/QuestionPager'
import { quiz as Q1 } from './quiz/jsons/source1.js'
import { quiz as Q2 } from './quiz/jsons/source2.js'
import { quiz as Q3 } from './quiz/jsons/source3.js'
import { quiz as Q4 } from './quiz/jsons/source4.js'
import { quiz as Q5 } from './quiz/jsons/source5.js'
import { compareSelections, isMultiple, normalizeCorrectIndexes, toAnswerTexts } from './quiz/engine/utils'
const emptyQuiz = (title) => ({ quizTitle: title, quizSynopsis: '', questions: [] })
//
import '../pages/styles/quizglobal.css'

export default function QuizGlobal(){
    const navigate = useNavigate()
    const parts = useMemo(() => ([
        Q1 || emptyQuiz('Écouter'),
        Q2 || emptyQuiz('Connaître'),
        Q3 || emptyQuiz('Comprendre'),
        Q4 || emptyQuiz('Se comprendre'),
        Q5 || emptyQuiz('Communiquer'),
    ]), [])

    // indexs
    const [pi, setPi] = useState(0) // p pour PART 
    const [ki, setKi] = useState(0) // k pour question pske kestion

    const part = parts[pi]
    const totalQuestions = useMemo(() => parts.reduce((acc, p) => acc + (p?.questions?.length || 0), 0), [parts])

    const resultsRef = useRef({
        total: totalQuestions,
        correct: 0,
        incorrect: 0,
        sections: parts.map(p => ({
            title: p.quizTitle || '',
            questions: []
        })),
    })

    const questionObj = part?.questions?.[ki]

    const submitAnswer = (userSelIdxArr) => {
        const q = questionObj
        if (!q) return
        const correctIdxArr = normalizeCorrectIndexes(q)
        const isOk = compareSelections(correctIdxArr, userSelIdxArr)
        const answers = q.answers || []

        const entry = {
            question: q.question,
            userAnswerIdx: userSelIdxArr,
            userAnswerText: toAnswerTexts(answers, userSelIdxArr),
            correctIdx: correctIdxArr,
            correctText: toAnswerTexts(answers, correctIdxArr),
            isCorrect: isOk,
        }

        const r = resultsRef.current
        const sec = r.sections[pi]
        if (sec) sec.questions.push(entry)
        if (isOk) r.correct += 1
        else r.incorrect += 1

        const count = part?.questions?.length || 0
        if (ki + 1 < count) {
            setKi(ki + 1)
        } else if (pi + 1 < parts.length) {
            setPi(pi + 1)
            setKi(0)
        } else {
            try { localStorage.setItem('quizResult', JSON.stringify(r)) } catch {}
            navigate('/resultats')
        }
    }

    // autoskip mais useless normalement si les jsons sont pas foirés

    useEffect(() => {
        if (!questionObj) {
            const count = part?.questions?.length || 0
            if (count === 0) {
                if (pi + 1 < parts.length) {
                    setPi(pi + 1)
                    setKi(0)
                } else {
                    try { localStorage.setItem('quizResult', JSON.stringify(accRef.current)) } catch {}
                    navigate('/resultats')
                }
            }
        }
    }, [part, questionObj])

    return (
        <div style={{ padding: 16, maxWidth: 900, margin: '0 auto', fontFamily: 'system-ui' }}>
            {(() => {
                const answered = (resultsRef.current.correct || 0) + (resultsRef.current.incorrect || 0)
                const pct = totalQuestions ? Math.min(100, Math.max(0, Math.round((answered / totalQuestions) * 100))) : 0
                return (
                    <div style={{ margin: '8px 0 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#555', marginBottom: 6 }}>
                        </div>
                        <div
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={{
                                height: 8,
                                background: '#fff',
                                borderRadius: 999,
                                overflow: 'hidden'
                            }}
                        >
                            <div
                                style={{
                                    width: pct + '%',
                                    height: '100%',
                                    background: '#6C1227',
                                    transition: 'width 200ms ease'
                                }}
                            />
                        </div>
                    </div>
                )
            })()}
            <div className="quiz-info-progress">Partie {pi + 1} / {parts.length}</div>
            <div className="quiz-info">
                Q{ki + 1} :
                {' '}
                {questionObj?.question ? questionObj.question : 'Nom de la question'}
            </div>

            <div className="quiz-card" style={{ marginTop: 8 }}>
                <QuestionPager questionObj={questionObj} onSubmit={submitAnswer} />
            </div>
        </div>
    )
}