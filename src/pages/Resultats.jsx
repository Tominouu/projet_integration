import { Link } from 'react-router-dom'

export default function Resultats() {
    return (
        <div className="quiz-skin">
            <div className="quiz-wrap">
                <div className="quiz-card">
                    <h1 className="quiz-title">Résultats</h1>
                    <p>Quiz terminé !</p>
                    <p style={{ fontSize: 12, opacity: .8 }}>Faudra juste add le récap des resultats + progressbar</p>
                    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                        <Link className="btn" to="/quizglobal">Rejouer</Link>
                        <Link className="btn" to="/infos">Plus d'infos</Link>
                    </div>
                </div>
                <div className="quiz-actions">
                    <Link className="link-btn" to="/choix">↩ Retour</Link>
                </div>
            </div>
        </div>
    )
}
