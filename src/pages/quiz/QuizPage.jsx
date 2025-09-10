import { useMemo, useRef, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import Quiz from 'react-quiz-component'

// Cinq temps du quiz
const STEPS = ['ecouter', 'connaitre', 'comprendre', 'se-comprendre', 'communiquer']
const STEP_LABELS = {
    'ecouter': 'Écouter',
    'connaitre': 'Connaître',
    'comprendre': 'Comprendre',
    'se-comprendre': 'Se comprendre',
    'communiquer': 'Communiquer'
}

// Données de quiz factices pour démonstration des types
const QUIZ_BANK = {
    'ecouter': {
        quizTitle: 'Écouter',
        quizSynopsis: 'Questions simples pour la démo (sans correction immédiate).',
        questions: [
            { question: 'Choix unique — question exemple', questionType: 'text', answerSelectionType: 'single', answers: ['Option A', 'Option B', 'Option C', 'Option D'], correctAnswer: '2' },
            { question: 'Choix multiple — question exemple', questionType: 'text', answerSelectionType: 'multiple', answers: ['Réponse 1', 'Réponse 2', 'Réponse 3'], correctAnswer: ['1', '3'] },
            { question: 'Vrai / Faux — question exemple', questionType: 'text', answerSelectionType: 'single', answers: ['Vrai', 'Faux'], correctAnswer: '1' }
        ]
    },
    'connaitre': {
        quizTitle: 'Connaître',
        quizSynopsis: 'Section factice pour la mise en forme.',
        questions: [
            { question: 'Une autre question simple', questionType: 'text', answerSelectionType: 'single', answers: ['A', 'B'], correctAnswer: '1' },
            { question: 'Plusieurs réponses possibles', questionType: 'text', answerSelectionType: 'multiple', answers: ['1', '2', '3', '4'], correctAnswer: ['2', '4'] }
        ]
    },
    'comprendre': {
        quizTitle: 'Comprendre',
        quizSynopsis: 'Démonstration de contenu.',
        questions: [
            { question: 'Question neutre', questionType: 'text', answerSelectionType: 'single', answers: ['Oui', 'Non'], correctAnswer: '1' }
        ]
    },
    'se-comprendre': {
        quizTitle: 'Se comprendre',
        quizSynopsis: 'On continue.',
        questions: [
            { question: 'Exemple multi', questionType: 'text', answerSelectionType: 'multiple', answers: ['X', 'Y', 'Z'], correctAnswer: ['1'] }
        ]
    },
    'communiquer': {
        quizTitle: 'Communiquer',
        quizSynopsis: 'Dernière partie factice.',
        questions: [
            { question: 'Dernière — single', questionType: 'text', answerSelectionType: 'single', answers: ['A', 'B', 'C'], correctAnswer: '3' }
        ]
    }
}

export default function QuizPage() {
    const { id } = useParams() // id = step slug
    const navigate = useNavigate()
    const quizRef = useRef(null)
    const stepIndex = useMemo(() => Math.max(0, STEPS.indexOf(id)), [id])
    const currentKey = STEPS[stepIndex] || STEPS[0]
    const quizData = QUIZ_BANK[currentKey]
    const label = STEP_LABELS[currentKey]

    // Animation d’intro type "jingle" quand on arrive sur une section
    const [showBanner, setShowBanner] = useState(true)
    useEffect(() => {
        setShowBanner(true)
        const t = setTimeout(() => setShowBanner(false), 1200)
        return () => clearTimeout(t)
    }, [currentKey])

    const goNext = () => {
        const next = stepIndex + 1
        if (next < STEPS.length) navigate(`/quiz/partie/${STEPS[next]}`)
        else navigate('/quiz')
    }

    const goPrev = () => {
        const prev = stepIndex - 1
        if (prev >= 0) navigate(`/quiz/partie/${STEPS[prev]}`)
        else navigate('/quiz')
    }

    return (
        <div style={wrap}>
            {/* Jingle */}
            <div style={{ ...banner, transform: showBanner ? 'translateY(0)' : 'translateY(-120%)', opacity: showBanner ? 1 : 0 }}>
                <div style={pill}>{label}</div>
            </div>

            <div style={box}>
                <div style={{ marginBottom: 8 }}>
                    <div style={stepsRow}>
                        {STEPS.map((k, i) => (
                            <span key={k} style={{ ...step, opacity: i <= stepIndex ? 1 : .5 }}>{STEP_LABELS[k]}</span>
                        ))}
                    </div>
                </div>

                <Quiz
                    ref={quizRef}
                    quiz={quizData}
                    showInstantFeedback={false}
                    disableSynopsis={false}
                    shuffle={false}
                    allowNavigation={true}
                />

                <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', marginTop: 8 }}>
                    <button style={btn} onClick={goPrev}>← Précédent</button>
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button style={btn} onClick={goNext}>Passer</button>
                        <button style={btn} onClick={goNext}>Valider et continuer →</button>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: 12 }}>
                <Link to="/quiz">↩ Retour</Link>
            </div>
        </div>
    )
}

const wrap = { padding: 16, maxWidth: 900, margin: '0 auto', fontFamily: 'system-ui' }
const box = { border: '1px solid #ddd', borderRadius: 8, padding: 12, background: '#fff' }
const banner = { position: 'sticky', top: 8, zIndex: 1, display: 'grid', placeItems: 'center', marginBottom: 8, transition: 'all .4s ease', opacity: 0 }
const pill = { display: 'inline-block', padding: '6px 10px', borderRadius: 999, border: '1px solid #ddd', background: '#fff' }
const stepsRow = { display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', gap: 6, fontSize: 12 }
const step = { padding: '4px 6px', textAlign: 'center', borderRadius: 6, border: '1px solid #eee' }
const btn = { padding: '8px 10px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }
