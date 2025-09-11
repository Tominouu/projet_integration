import { Link } from 'react-router-dom'
import '../pages/styles/results.css'

const RightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <mask id="mask0_114_67" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
            <rect x="0.631836" y="0.631592" width="39.1579" height="39.1579" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_114_67)">
            <path d="M16.2137 25.35L30.0414 11.5224C30.3677 11.1961 30.7484 11.0329 31.1835 11.0329C31.6186 11.0329 31.9993 11.1961 32.3256 11.5224C32.6519 11.8487 32.815 12.2362 32.815 12.6849C32.815 13.1336 32.6519 13.5211 32.3256 13.8474L17.3558 28.8579C17.0295 29.1842 16.6488 29.3474 16.2137 29.3474C15.7786 29.3474 15.3979 29.1842 15.0716 28.8579L8.05583 21.8421C7.72952 21.5158 7.57316 21.1283 7.58675 20.6796C7.60035 20.2309 7.77031 19.8434 8.09662 19.5171C8.42294 19.1908 8.81044 19.0276 9.25912 19.0276C9.70781 19.0276 10.0953 19.1908 10.4216 19.5171L16.2137 25.35Z" fill="#6C1227" />
        </g>
    </svg>
)

const WrongIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
        <mask id="mask0_114_79" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
            <rect x="0.631836" y="0.631592" width="39.1579" height="39.1579" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_114_79)">
            <path d="M20.2105 22.4947L12.2158 30.4894C11.9167 30.7886 11.536 30.9381 11.0737 30.9381C10.6114 30.9381 10.2307 30.7886 9.93159 30.4894C9.63247 30.1903 9.48291 29.8096 9.48291 29.3473C9.48291 28.885 9.63247 28.5043 9.93159 28.2052L17.9263 20.2105L9.93159 12.2157C9.63247 11.9166 9.48291 11.5359 9.48291 11.0736C9.48291 10.6114 9.63247 10.2307 9.93159 9.93153C10.2307 9.63241 10.6114 9.48285 11.0737 9.48285C11.536 9.48285 11.9167 9.63241 12.2158 9.93153L20.2105 17.9263L28.2053 9.93153C28.5044 9.63241 28.8851 9.48285 29.3474 9.48285C29.8097 9.48285 30.1904 9.63241 30.4895 9.93153C30.7886 10.2307 30.9382 10.6114 30.9382 11.0736C30.9382 11.5359 30.7886 11.9166 30.4895 12.2157L22.4948 20.2105L30.4895 28.2052C30.7886 28.5043 30.9382 28.885 30.9382 29.3473C30.9382 29.8096 30.7886 30.1903 30.4895 30.4894C30.1904 30.7886 29.8097 30.9381 29.3474 30.9381C28.8851 30.9381 28.5044 30.7886 28.2053 30.4894L20.2105 22.4947Z" fill="#6C1227" />
        </g>
    </svg>
)

export default function Resultats() {
    let data = null
    try { data = JSON.parse(localStorage.getItem('quizResult')) } catch {}

    const sections = Array.isArray(data?.sections) ? data.sections : []
    const computedTotal = sections.reduce((acc, s) => acc + (s.questions?.length || 0), 0)
    const total = data?.total ?? computedTotal
    const ok = data?.correct ?? sections.reduce((acc, s) => acc + (s.questions?.filter(q => q.isCorrect).length || 0), 0)
    const pct = total ? Math.round((ok / total) * 100) : 0

    return (
        <div className="quiz-skin">
            <div className="quiz-wrap">
                <div className="results-title">
                    <h1>Vous avez obtenu</h1>
                    <p>{ok} / {total}</p>
                </div>

                {sections.map((sec, sidx) => (
                    <section key={sidx} style={{ marginTop: sidx ? 24 : 0 }}>
                        <h1 className="quiz-title" style={{ marginBottom: 12 }}>{sec.title || `Axe ${sidx + 1}`}</h1>
                        <hr style={{ border: 'none', height: 2, background: '#6C1227', margin: '12px 0' }} />
                        <div style={{ display: 'grid', gap: 8 }}>
                            {sec.questions?.map((q, qidx) => (
                                <div key={qidx} style={{ padding: '8px 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        {q.isCorrect ? <RightIcon /> : <WrongIcon />}
                                        <div>{q.isCorrect ? <span style={{ color: '#1b6c12ff' }}>{q.question}</span> : <span style={{ color: '#c21e1eff' }}>{q.question}</span>}</div>
                                    </div>
                                    {!q.isCorrect && (
                                        <div style={{ marginLeft: 48, marginTop: 4 }}>
                                            <span style={{ color: '#c21e1eff' }}>Bonne réponse:</span> {q.correctText?.length ? q.correctText.join(', ') : '—'}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ))}

                <div className="quiz-actions" style={{ marginTop: 16 }}>
                    <Link className="link-btn" to="/choix">↩ Retour</Link>
                </div>
            </div>
        </div>
    )
}
