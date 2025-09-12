import { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Assure-toi d'importer Link !
import '../pages/styles/quiz-skin.css'

export default function GlobeViewer() {
    const ExitFab = () => (
        <Link className="quiz-exit-fab" to="/" aria-label="Accueil" title="Accueil">
            <svg viewBox="0 0 24 24" width="64" height="64" aria-hidden>
                <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z" />
            </svg>
        </Link>
    );

    const containerRef = useRef(null);

    useEffect(() => {
        if (!window.PANOLENS || !window.THREE) {
            console.error("PANOLENS ou THREE non trouvé !");
            return;
        }

        const panorama = new window.PANOLENS.ImagePanorama("/globe3.jpg");

        const viewer = new window.PANOLENS.Viewer({
            container: containerRef.current,
            autoHideInfospot: false,
        });

        viewer.add(panorama);

        const infospot = new window.PANOLENS.Infospot(
            350,
            window.PANOLENS.DataImage.Info
        );
        infospot.position.set(5000, 0, 0);
        infospot.addHoverText("Centre du Marché des Capucins");
        panorama.add(infospot);

        return () => {
            viewer.dispose();
        };
    }, []);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <ExitFab />
            <div
                ref={containerRef}
                style={{ width: "100vw", height: "100vh" }}
            />
        </div>
    );
}
