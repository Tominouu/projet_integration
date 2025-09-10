import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function QuizLanding() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    return (
        <div style={wrap}>
            <h1 style={{ margin: '0 0 8px' }}>Bordeaux-visages (placeholder)</h1>
            <p style={{ margin: '0 0 16px' }}>
                5 étapes: écouter, connaître, comprendre, se comprendre, communiquer. Avancez au rythme de la vidéo.
            </p>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <button style={btn} onClick={() => setOpen(true)}>Lancer le quiz</button>
                <Link to="/info" style={linkBtn}>Plus d'infos</Link>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: .8 }}>
                Pensez à lancer la vidéo en même temps que le quiz.
            </div>

            {open && (
                <div role="dialog" aria-modal="true" style={backdrop} onClick={() => setOpen(false)}>
                    <div style={card} onClick={(e) => e.stopPropagation()}>
                        <h2 style={{ margin: '0 0 8px' }}>Prêt·e à démarrer ?</h2>
                        <p style={{ margin: '0 0 12px' }}>Lancez la vidéo avant ou en même temps que le quiz.</p>
                        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                            <button style={btn} onClick={() => setOpen(false)}>Annuler</button>
                            <button style={btn} onClick={() => navigate('/quiz/partie/ecouter')}>Commencer</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ marginTop: 24 }}>
                <Link to="/">← Retour à l'accueil</Link>
            </div>
        </div>
    )
}
const wrap = { padding: 16, maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui', textAlign: 'center' }
const btn = { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }
const linkBtn = { ...btn, textDecoration: 'none', display: 'inline-block' }
const backdrop = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.3)', display: 'grid', placeItems: 'center', padding: 16 }
const card = { width: 'min(520px,90vw)', background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 16, textAlign: 'left' }
