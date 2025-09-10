import { Link } from 'react-router-dom'

export default function Choice() {
    return (
        <div style={{ padding: 16, fontFamily: 'system-ui', textAlign: 'center' }}>
            <h1>Choisir une option</h1>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '12px 0' }}>
                <Link to="/quizglobal" style={btn}>Lancer le quiz</Link>
                <Link to="/infos" style={btn}>Plus d'infos</Link>
            </div>
            <div>
                <Link to="/">← Retour accueil</Link>
            </div>
        </div>
    )
}

const btn = { padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', textDecoration: 'none', color: '#111', background: '#fff' }
