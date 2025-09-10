import { Link } from 'react-router-dom'

export default function Info() {
    return (
        <div style={{ padding: 16, maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui' }}>
            <h1>Plus d'informations</h1>
            <p style={{ marginTop: 8 }}>Page placeholder — contenu à venir.</p>

            <div style={{ marginTop: 12 }}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula, dolor non vulputate
                    ullamcorper, augue turpis tristique massa, eu faucibus neque lacus non mi.
                </p>
                <p>
                    Cras porta nisi risus, in dictum mauris euismod non. Integer tristique, nulla et fermentum varius,
                    mi tortor finibus libero.
                </p>
            </div>

            <div style={{ marginTop: 12 }}>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        </div>
    )
}
