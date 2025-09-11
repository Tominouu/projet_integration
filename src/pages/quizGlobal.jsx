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

    // autoskip mais useless normalement

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
            <h1>Quiz Vidéo</h1>
            <div style={{ fontSize: 12, opacity: .7, marginBottom: 8 }}>Partie {pi + 1} / {parts.length} — Question {ki + 1} / {part?.questions?.length || 0}</div>

            <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fff' }}>
                <QuestionPager questionObj={questionObj} onSubmit={submitAnswer} />
            </div>

            <div style={{ marginTop: 12 }}>
                <Link to="/choix">↩ Retour</Link>
            </div>
        </div>
    )
}