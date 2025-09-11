import { Link } from 'react-router-dom'

const Check = ({ ok }) => (
    <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, borderRadius: 999,
        background: ok ? '#22c55e' : '#ef4444', color: '#fff', fontSize: 12,
    }}>{ok ? '✓' : '✕'}</span>
)

export default function Resultats() {
    let data = null
    try { data = JSON.parse(localStorage.getItem('quizResult')) } catch {}
    const total = data?.total ?? 0
    const ok = data?.correct ?? 0
    const pct = total ? Math.round((ok / total) * 100) : 0

    return (
        <div className="quiz-skin">
            <div className="quiz-wrap">
                <div className="quiz-card">
                    <h1 className="quiz-title">Votre note</h1>
                    <p style={{ marginTop: 6, fontWeight: 700, fontSize: 18 }}>{ok} / {total} ({pct}%)</p>
                    <div className="quiz-progress" style={{ marginTop: 12 }}>
                        <div className="fill" style={{ width: `${pct}%` }} />
                    </div>
                </div>

                {Array.isArray(data?.sections) && data.sections.map((sec, sidx) => (
                    <div key={sidx} className="quiz-card" style={{ marginTop: 16 }}>
                        <div className="quiz-title" style={{ marginBottom: 8 }}>{sec.title || `Axe ${sidx + 1}`}</div>
                        <div style={{ display: 'grid', gap: 10 }}>
                            {sec.questions?.map((q, qidx) => (
                                <div key={qidx} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 10, background: '#fff' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Check ok={q.isCorrect} />
                                        <div style={{ fontWeight: 600 }}>{q.question}</div>
                                    </div>
                                    {!q.isCorrect && (
                                        <div style={{ marginTop: 6 }}>
                                            <div style={{ color: '#991b1b' }}>
                                                Votre réponse: {q.userAnswerText?.length ? q.userAnswerText.join(', ') : '—'}
                                            </div>
                                            <div style={{ color: '#065f46' }}>
                                                Bonne réponse: {q.correctText?.length ? q.correctText.join(', ') : '—'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="quiz-actions">
                    <Link className="link-btn" to="/choix">↩ Retour</Link>
                </div>
            </div>
        </div>
    )
}
