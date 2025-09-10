import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import QuestionPager from './quiz/QuestionPager'
import { quiz as Q1 } from './quiz/jsons/source1.js'
import { quiz as Q2 } from './quiz/jsons/source2.js'
import { quiz as Q3 } from './quiz/jsons/source3.js'
import { quiz as Q4 } from './quiz/jsons/source4.js'
import { quiz as Q5 } from './quiz/jsons/source5.js'
// Les sources 2..5 sont vides pour l'instant; on met des placeholders minimaux
const emptyQuiz = (title) => ({ quizTitle: title, quizSynopsis: '', questions: [] })

export default function QuizGlobal(){
    const navigate = useNavigate()
    // Dans l’ordre: écouter, connaître, comprendre, se comprendre, communiqueré
    const parts = useMemo(() => ([
        Q1 || emptyQuiz('Écouter'),
        Q2 || emptyQuiz('Connaître'),
        Q3 || emptyQuiz('Comprendre'),
        Q4 || emptyQuiz('Se comprendre'),
        Q5 || emptyQuiz('Communiquer'),
    ]), [])

    const [pi, setPi] = useState(0) // part index
    const [ki, setKi] = useState(0) // question index dans la partie

    const part = parts[pi]
    const singleQuestionData = useMemo(() => {
        const q = part?.questions?.[ki]
        if (!q) return { quizTitle: part?.quizTitle, quizSynopsis: part?.quizSynopsis, questions: [] }
        return { quizTitle: part?.quizTitle, quizSynopsis: part?.quizSynopsis, questions: [q] }
    }, [part, ki])

    const onDoneQuestion = () => {
        const remaining = (part?.questions?.length || 0) - 1
        if (ki < remaining) {
            setKi(ki + 1)
        } else {
            // fin de la partie → partie suivante si dispo
            if (pi < parts.length - 1) {
                setPi(pi + 1)
                setKi(0)
            } else {
                // fin de la 5e partie: page de résultats
                navigate('/resultats')
            }
        }
    }

    return (
        <div style={{ padding: 16, maxWidth: 900, margin: '0 auto', fontFamily: 'system-ui' }}>
            <h1>Quiz Vidéo</h1>
            <div style={{ fontSize: 12, opacity: .7, marginBottom: 8 }}>Partie {pi + 1} / {parts.length} — Question {ki + 1} / {part?.questions?.length || 0}</div>

            <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fff' }}>
                <QuestionPager data={singleQuestionData} onDone={onDoneQuestion} />
            </div>

            <div style={{ marginTop: 12 }}>
                <Link to="/choix">↩ Retour</Link>
            </div>
        </div>
    )
}