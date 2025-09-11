import { useEffect } from "react";

export default function GlobeViewer() {
  useEffect(() => {
    // ✅ Charger ton image équirectangulaire
    const panorama = new window.PANOLENS.ImagePanorama("/test.jpg");

    // ✅ Créer le viewer
    const viewer = new window.PANOLENS.Viewer({
      container: document.querySelector("#panorama-container"),
      autoHideInfospot: false,
      controlBar: true,   // options utiles : zoom, full screen
    });

    viewer.add(panorama);

    // ✅ Exemple de hotspot interactif
    const infospot = new window.PANOLENS.Infospot(350, window.PANOLENS.DataImage.Info);
    infospot.position.set(5000, 0, 0); // coord X Y Z sur la sphère
    infospot.addHoverText("La Tour Eiffel");
    infospot.addEventListener("click", () => {
      alert("Bienvenue à la Tour Eiffel 🌍");
    });

    panorama.add(infospot);

    return () => {
      viewer.dispose();
    };
  }, []);

  return <div id="panorama-container" className="w-full h-screen" />;
}
